// Shopify Product Types
export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  metafields: Array<{
    key: string;
    value: string;
    namespace: string;
  }>;
}

// Watch Metafields
export interface WatchMetafields {
  brand?: string;
  model?: string;
  reference?: string;
  year?: string;
  case_size_mm?: string;
  material?: string;
  movement?: string;
  condition?: string;
  availability_status?: 'available' | 'reserved' | 'sold';
  show_price?: boolean;
}

// Product for Display
export interface Watch {
  id: string;
  handle: string;
  title: string;
  description: string;
  price?: string;
  brand?: string;
  model?: string;
  reference?: string;
  year?: string;
  caseSizeMm?: string;
  material?: string;
  movement?: string;
  condition?: string;
  availabilityStatus?: 'available' | 'reserved' | 'sold';
  showPrice?: boolean;
  imageUrl: string; // Always placeholder for now
}

// Shopify Collection
export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}
