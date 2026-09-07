import type { Product } from "../types/product";

const API_URL = "https://fakestoreapi.com/products";
const CACHE_KEY = "products_cache";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface ApiProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
}

interface ProductCache {
  products: Product[];
  timestamp: number;
}

export const fetchProducts = async (): Promise<Product[]> => {
  // Check cache
  const cachedData = localStorage.getItem(CACHE_KEY);

  if (cachedData) {
    try {
      const cache: ProductCache = JSON.parse(cachedData);

      const isCacheValid =
        Date.now() - cache.timestamp < CACHE_DURATION;

      if (isCacheValid) {
        return cache.products;
      }
    } catch {
      // Invalid cache, fetch fresh data
      localStorage.removeItem(CACHE_KEY);
    }
  }

  // Fetch from API
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ApiProduct[] = await response.json();

  const products: Product[] = data.map((product) => ({
    ...product,
    stock: 10,
  }));

  // Store in cache
  const cache: ProductCache = {
    products,
    timestamp: Date.now(),
  };

  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));

  return products;
};

export const fetchProductById = async (
  id: number
): Promise<Product> => {
  // First try cached products
  const cachedData = localStorage.getItem(CACHE_KEY);

  if (cachedData) {
    try {
      const cache: ProductCache = JSON.parse(cachedData);

      const isCacheValid =
        Date.now() - cache.timestamp < CACHE_DURATION;

      if (isCacheValid) {
        const product = cache.products.find(
          (product) => product.id === id
        );

        if (product) {
          return product;
        }
      }
    } catch {
      localStorage.removeItem(CACHE_KEY);
    }
  }

  // If product isn't in cache, fetch it
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const product: ApiProduct = await response.json();

  return {
    ...product,
    stock: 10,
  };
};

export const clearProductCache = (): void => {
  localStorage.removeItem(CACHE_KEY);
};
