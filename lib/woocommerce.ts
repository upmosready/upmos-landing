// WooCommerce API Integration
// Docs: https://woocommerce.github.io/woocommerce-rest-api-docs/

export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
  short_description: string;
  description: string;
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  average_rating: string;
  rating_count: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: {
    src: string;
    alt: string;
  } | null;
  count: number;
}

const WC_API_URL = process.env.NEXT_PUBLIC_WC_API_URL || 'https://upmos.com/wp-json/wc/v3';
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || '';

// Create Basic Auth header
const getAuthHeader = () => {
  if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    console.warn('WooCommerce API credentials not configured');
    return '';
  }
  const credentials = btoa(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`);
  return `Basic ${credentials}`;
};

/**
 * Fetch featured products from WooCommerce
 * @param limit - Number of products to fetch (default: 8)
 */
export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
  try {
    const authHeader = getAuthHeader();
    if (!authHeader) {
      console.warn('Returning empty array - API credentials not configured');
      return [];
    }

    const url = `${WC_API_URL}/products?featured=true&per_page=${limit}&status=publish`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`WooCommerce API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const products: Product[] = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

/**
 * Fetch all products with optional filters
 * @param params - Query parameters (category, page, per_page, etc.)
 */
export async function getProducts(params: {
  category?: string;
  page?: number;
  per_page?: number;
  orderby?: 'date' | 'title' | 'price' | 'popularity' | 'rating';
  order?: 'asc' | 'desc';
} = {}): Promise<Product[]> {
  try {
    const authHeader = getAuthHeader();
    if (!authHeader) {
      return [];
    }

    const queryParams = new URLSearchParams();
    queryParams.append('status', 'publish');
    
    if (params.category) queryParams.append('category', params.category);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params.orderby) queryParams.append('orderby', params.orderby);
    if (params.order) queryParams.append('order', params.order);

    const url = `${WC_API_URL}/products?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`WooCommerce API error: ${response.status}`);
      return [];
    }

    const products: Product[] = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const authHeader = getAuthHeader();
    if (!authHeader) {
      return null;
    }

    const url = `${WC_API_URL}/products?slug=${slug}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const products: Product[] = await response.json();
    return products.length > 0 ? products[0] : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * Fetch product categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const authHeader = getAuthHeader();
    if (!authHeader) {
      return [];
    }

    const url = `${WC_API_URL}/products/categories?per_page=100`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`WooCommerce API error: ${response.status}`);
      return [];
    }

    const categories: Category[] = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
