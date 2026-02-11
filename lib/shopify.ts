import { ShopifyProduct, Watch } from '@/types/shopify';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

async function shopifyFetch<T>({ query, variables }: { query: string; variables?: Record<string, unknown> }): Promise<T> {
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`);
    }

    return data;
  } catch (error) {
    console.error('Shopify fetch error:', error);
    throw error;
  }
}

// Transform Shopify product to Watch
export function transformProduct(product: ShopifyProduct): Watch {
  const metafields = product.metafields || [];
  
  const getMetafield = (key: string): string | undefined => {
    const field = metafields.find((m) => m.key === key);
    return field?.value;
  };

  const availabilityStatus = getMetafield('availability_status') as 'available' | 'reserved' | 'sold' | undefined;
  const showPrice = getMetafield('show_price') === 'true';

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    price: showPrice ? product.priceRange.minVariantPrice.amount : undefined,
    brand: getMetafield('brand'),
    model: getMetafield('model'),
    reference: getMetafield('reference'),
    year: getMetafield('year'),
    caseSizeMm: getMetafield('case_size_mm'),
    material: getMetafield('material'),
    movement: getMetafield('movement'),
    condition: getMetafield('condition'),
    availabilityStatus: availabilityStatus || 'available',
    showPrice,
    imageUrl: '/placeholders/watch-placeholder.svg', // Always use placeholder
  };
}

// Get all products (watches)
export async function getAllProducts(): Promise<Watch[]> {
  // If no Shopify credentials, return mock data
  if (!domain || !storefrontAccessToken) {
    return getMockProducts();
  }

  const query = `
    query getAllProducts {
      products(first: 50) {
        edges {
          node {
            id
            handle
            title
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            metafields(identifiers: [
              {namespace: "custom", key: "brand"},
              {namespace: "custom", key: "model"},
              {namespace: "custom", key: "reference"},
              {namespace: "custom", key: "year"},
              {namespace: "custom", key: "case_size_mm"},
              {namespace: "custom", key: "material"},
              {namespace: "custom", key: "movement"},
              {namespace: "custom", key: "condition"},
              {namespace: "custom", key: "availability_status"},
              {namespace: "custom", key: "show_price"}
            ]) {
              key
              value
              namespace
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>({ query });
    return data.products.edges.map(({ node }) => transformProduct(node));
  } catch (error) {
    console.error('Error fetching products:', error);
    return getMockProducts();
  }
}

// Get product by handle
export async function getProductByHandle(handle: string): Promise<Watch | null> {
  // If no Shopify credentials, return mock data
  if (!domain || !storefrontAccessToken) {
    const mockProducts = getMockProducts();
    return mockProducts.find((p) => p.handle === handle) || null;
  }

  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        metafields(identifiers: [
          {namespace: "custom", key: "brand"},
          {namespace: "custom", key: "model"},
          {namespace: "custom", key: "reference"},
          {namespace: "custom", key: "year"},
          {namespace: "custom", key: "case_size_mm"},
          {namespace: "custom", key: "material"},
          {namespace: "custom", key: "movement"},
          {namespace: "custom", key: "condition"},
          {namespace: "custom", key: "availability_status"},
          {namespace: "custom", key: "show_price"}
        ]) {
          key
          value
          namespace
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ product: ShopifyProduct | null }>({ query, variables: { handle } });
    return data.product ? transformProduct(data.product) : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    const mockProducts = getMockProducts();
    return mockProducts.find((p) => p.handle === handle) || null;
  }
}

// Mock products for development without Shopify
function getMockProducts(): Watch[] {
  return [
    {
      id: '1',
      handle: 'rolex-submariner',
      title: 'Rolex Submariner Date',
      description: 'Eine ikonische Taucheruhr mit zeitlosem Design. Die Submariner ist seit 1953 ein Symbol für Präzision und Zuverlässigkeit.',
      brand: 'Rolex',
      model: 'Submariner Date',
      reference: '126610LN',
      year: '2023',
      caseSizeMm: '41',
      material: 'Edelstahl 904L',
      movement: 'Automatik, Kaliber 3235',
      condition: 'Neuwertig',
      availabilityStatus: 'available',
      showPrice: true,
      price: '13500',
      imageUrl: '/examples/2820_cre_006_Uhr_schwarz_frontal.jpg',
    },
    {
      id: '2',
      handle: 'omega-speedmaster',
      title: 'Omega Speedmaster Professional',
      description: 'Die legendäre Moonwatch - die erste Uhr auf dem Mond. Ein Meisterwerk der Uhrmacherkunst.',
      brand: 'Omega',
      model: 'Speedmaster Professional',
      reference: '310.30.42.50.01.001',
      year: '2022',
      caseSizeMm: '42',
      material: 'Edelstahl',
      movement: 'Handaufzug, Kaliber 1861',
      condition: 'Sehr gut',
      availabilityStatus: 'available',
      showPrice: true,
      price: '6800',
      imageUrl: '/examples/Gents_watch_Soldiershot_echt-eppelt.jpg',
    },
    {
      id: '3',
      handle: 'patek-philippe-nautilus',
      title: 'Patek Philippe Nautilus',
      description: 'Eine der begehrtesten Luxusuhren der Welt. Sportlich-elegantes Design von Gérald Genta.',
      brand: 'Patek Philippe',
      model: 'Nautilus',
      reference: '5711/1A-010',
      year: '2021',
      caseSizeMm: '40',
      material: 'Edelstahl',
      movement: 'Automatik, Kaliber 26-330 S C',
      condition: 'Ausgezeichnet',
      availabilityStatus: 'reserved',
      showPrice: true,
      price: '89000',
      imageUrl: '/examples/Watch_photography_webshop_echt-eppelt.jpg',
    },
    {
      id: '4',
      handle: 'audemars-piguet-royal-oak',
      title: 'Audemars Piguet Royal Oak',
      description: 'Die revolutionäre Luxus-Sportuhr mit dem unverwechselbaren oktogonalen Gehäuse.',
      brand: 'Audemars Piguet',
      model: 'Royal Oak',
      reference: '15500ST.OO.1220ST.01',
      year: '2020',
      caseSizeMm: '41',
      material: 'Edelstahl',
      movement: 'Automatik, Kaliber 4302',
      condition: 'Sehr gut',
      availabilityStatus: 'sold',
      showPrice: true,
      price: '42000',
      imageUrl: '/examples/Solidershot_Swiss_Watch_echt-eppelt.jpg',
    },
    {
      id: '5',
      handle: 'roamer-classic',
      title: 'Roamer Swiss Timepiece',
      description: 'Traditionelle Schweizer Uhrmacherkunst in zeitlosem Design. Präzision und Eleganz vereint.',
      brand: 'Roamer',
      model: 'Classic',
      reference: 'RO-508837',
      year: '2023',
      caseSizeMm: '40',
      material: 'Edelstahl',
      movement: 'Automatik',
      condition: 'Neuwertig',
      availabilityStatus: 'available',
      showPrice: true,
      price: '1250',
      imageUrl: '/examples/Roamer_Uhr_Produktaufnahme_echt-eppelt.jpg',
    },
    {
      id: '6',
      handle: 'swiss-military-hanowa',
      title: 'Swiss Military Hanowa Chronograph',
      description: 'Robuste Militäruhr mit präzisem Chronographen. Schweizer Qualität für höchste Ansprüche.',
      brand: 'Swiss Military Hanowa',
      model: 'Chronograph',
      reference: 'SMH-06-5331',
      year: '2022',
      caseSizeMm: '44',
      material: 'Edelstahl',
      movement: 'Quarz Chronograph',
      condition: 'Sehr gut',
      availabilityStatus: 'available',
      showPrice: true,
      price: '850',
      imageUrl: '/examples/Swiss_Military_Hanowa_Uhr-echt-eppelt.jpg',
    },
    {
      id: '7',
      handle: 'rodania-ladies',
      title: 'Rodania Damen Luxusuhr',
      description: 'Exquisite Damenuhr mit elegantem Design. Perfekte Verbindung von Stil und Präzision.',
      brand: 'Rodania',
      model: 'Ladies Collection',
      reference: 'RD-2516346',
      year: '2023',
      caseSizeMm: '32',
      material: 'Edelstahl & Rotgold',
      movement: 'Quarz',
      condition: 'Neuwertig',
      availabilityStatus: 'available',
      showPrice: true,
      price: '680',
      imageUrl: '/examples/Rodania_Watch_watchphotography_echt-eppelt.jpg',
    },
    {
      id: '8',
      handle: 'tissot-heritage',
      title: 'Tissot Heritage Chronograph',
      description: 'Klassischer Chronograph mit historischem Flair. Schweizer Tradition trifft modernes Design.',
      brand: 'Tissot',
      model: 'Heritage',
      reference: 'T0297',
      year: '2022',
      caseSizeMm: '42',
      material: 'Edelstahl',
      movement: 'Automatik',
      condition: 'Sehr gut',
      availabilityStatus: 'available',
      showPrice: true,
      price: '1450',
      imageUrl: '/examples/0297_tmo_083_uhr_frontal_13_.jpg',
    },
    {
      id: '9',
      handle: 'victorinox-fieldforce',
      title: 'Victorinox Swiss Army Fieldforce',
      description: 'Robuste Schweizer Armbanduhr für jeden Tag. Zuverlässigkeit in jeder Situation.',
      brand: 'Victorinox',
      model: 'Fieldforce',
      reference: 'VIC-06-4334',
      year: '2023',
      caseSizeMm: '42',
      material: 'Edelstahl',
      movement: 'Quarz',
      condition: 'Neuwertig',
      availabilityStatus: 'available',
      showPrice: true,
      price: '420',
      imageUrl: '/examples/06-4334.09.003.jpg',
    },
    {
      id: '10',
      handle: 'ladies-elegant-rose',
      title: 'Elegante Damen Rosé Uhr',
      description: 'Feine Damenuhr in zartem Rosé-Gold. Perfekt für jeden besonderen Anlass.',
      brand: 'Swiss Collection',
      model: 'Ladies Elegant',
      reference: 'SC-LE-30',
      year: '2023',
      caseSizeMm: '30',
      material: 'Edelstahl Rosé vergoldet',
      movement: 'Quarz',
      condition: 'Neuwertig',
      availabilityStatus: 'available',
      showPrice: true,
      price: '550',
      imageUrl: '/examples/Ladies_Watch_30Grad_Shot_echt-eppelt.jpg',
    },
    {
      id: '11',
      handle: 'ladies-soldiershot',
      title: 'Swiss Ladies Premium',
      description: 'Luxuriöse Damenuhr mit Perlmutt-Zifferblatt. Eleganz für den modernen Lifestyle.',
      brand: 'Swiss Collection',
      model: 'Ladies Premium',
      reference: 'SC-LP-32',
      year: '2022',
      caseSizeMm: '32',
      material: 'Edelstahl & Keramik',
      movement: 'Automatik',
      condition: 'Ausgezeichnet',
      availabilityStatus: 'reserved',
      showPrice: true,
      price: '1850',
      imageUrl: '/examples/Ladies_Watch_Soldiershot_echt-eppelt.jpg',
    },
    {
      id: '12',
      handle: 'swiss-military-premium',
      title: 'Swiss Military Premium Chronograph',
      description: 'Hochwertige Militäruhr mit Komplikationen. Präzision auf höchstem Niveau.',
      brand: 'Swiss Military',
      model: 'Premium Chronograph',
      reference: 'SM-06-5331',
      year: '2021',
      caseSizeMm: '44',
      material: 'Titan',
      movement: 'Automatik Chronograph',
      condition: 'Sehr gut',
      availabilityStatus: 'available',
      showPrice: true,
      price: '2100',
      imageUrl: '/examples/06-5331.04.003_3viertel.jpg',
    },
  ];
}
