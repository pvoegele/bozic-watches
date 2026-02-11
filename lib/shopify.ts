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
      showPrice: false,
      imageUrl: '/placeholders/watch-placeholder.svg',
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
      showPrice: false,
      imageUrl: '/placeholders/watch-placeholder.svg',
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
      showPrice: false,
      imageUrl: '/placeholders/watch-placeholder.svg',
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
      showPrice: false,
      imageUrl: '/placeholders/watch-placeholder.svg',
    },
  ];
}
