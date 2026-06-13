import axios from 'axios';
import type { Product, Category, Cart, CartItemCreate, Order, OrderItem, WishlistItem, Banner, Collection, ProductFilters } from '../types';
import { mockCatalogService, mockCartService, mockWishlistService, mockHomeService, mockOrderService } from './mockData';

const API_BASE_URL = 'http://localhost:8000/api/v1';
const USE_MOCK_DATA = true; // Переключиться на false для использования реального API

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Catalog service
export const catalogService = {
  async getCategories(): Promise<Category[]> {
    if (USE_MOCK_DATA) {
      return mockCatalogService.getCategories();
    }
    const response = await api.get<Category[]>('/catalog/categories');
    return response.data;
  },

  async getProducts(
    categoryId?: string,
    search?: string,
    minPrice?: number,
    maxPrice?: number,
    page = 1,
    pageSize = 20
  ): Promise<{ products: Product[]; total: number; page: number; pageSize: number }> {
    if (USE_MOCK_DATA) {
      return mockCatalogService.getProducts(categoryId, search, minPrice, maxPrice, page, pageSize);
    }
    const params = new URLSearchParams();
    if (categoryId) params.append('category_id', categoryId);
    if (search) params.append('search', search);
    if (minPrice !== undefined) params.append('min_price', minPrice.toString());
    if (maxPrice !== undefined) params.append('max_price', maxPrice.toString());
    params.append('page', page.toString());
    params.append('page_size', pageSize.toString());

    const response = await api.get<{ 
      products: Product[]; 
      total: number; 
      page: number; 
      page_size: number 
    }>(`/catalog/products?${params}`);
    
    return {
      products: response.data.products,
      total: response.data.total,
      page: response.data.page,
      pageSize: response.data.page_size,
    };
  },

  async getProduct(productId: string): Promise<Product> {
    if (USE_MOCK_DATA) {
      return mockCatalogService.getProduct(productId);
    }
    const response = await api.get<Product>(`/catalog/products/${productId}`);
    return response.data;
  },

  async getFilters(categoryId: string): Promise<ProductFilters> {
    if (USE_MOCK_DATA) {
      return mockCatalogService.getFilters(categoryId);
    }
    const response = await api.get<ProductFilters>(`/catalog/categories/${categoryId}/filters`);
    return response.data;
  },
};

// Cart service
export const cartService = {
  async getCart(userId: string): Promise<Cart> {
    if (USE_MOCK_DATA) {
      return mockCartService.getCart(userId);
    }
    const response = await api.get<Cart>(`/cart?user_id=${userId}`);
    return response.data;
  },

  async addToCart(userId: string, item: CartItemCreate): Promise<Cart> {
    if (USE_MOCK_DATA) {
      return mockCartService.addToCart(userId, item);
    }
    const response = await api.post<Cart>(`/cart?user_id=${userId}`, item);
    return response.data;
  },

  async updateCartItem(userId: string, cartItemId: number, quantity: number): Promise<Cart> {
    if (USE_MOCK_DATA) {
      return mockCartService.updateCartItem(userId, cartItemId, quantity);
    }
    const response = await api.put<Cart>(`/cart/${cartItemId}?user_id=${userId}&quantity=${quantity}`);
    return response.data;
  },

  async removeFromCart(userId: string, cartItemId: number): Promise<Cart> {
    if (USE_MOCK_DATA) {
      return mockCartService.removeFromCart(userId, cartItemId);
    }
    const response = await api.delete<Cart>(`/cart/${cartItemId}?user_id=${userId}`);
    return response.data;
  },

  async clearCart(userId: string): Promise<Cart> {
    if (USE_MOCK_DATA) {
      return mockCartService.clearCart(userId);
    }
    const response = await api.delete<Cart>(`/cart?user_id=${userId}`);
    return response.data;
  },
};

// Order service
export const orderService = {
  async createOrder(userId: string, items: OrderItem[]): Promise<Order> {
    if (USE_MOCK_DATA) {
      return mockOrderService.createOrder(userId, items);
    }
    const response = await api.post<Order>(`/orders?user_id=${userId}`, { items });
    return response.data;
  },

  async getOrders(userId: string): Promise<Order[]> {
    if (USE_MOCK_DATA) {
      return mockOrderService.getOrders(userId);
    }
    const response = await api.get<Order[]>(`/orders?user_id=${userId}`);
    return response.data;
  },

  async getOrder(userId: string, orderId: string): Promise<Order> {
    if (USE_MOCK_DATA) {
      return mockOrderService.getOrder(userId, orderId);
    }
    const response = await api.get<Order>(`/orders/${orderId}?user_id=${userId}`);
    return response.data;
  },

  async cancelOrder(userId: string, orderId: string): Promise<Order> {
    if (USE_MOCK_DATA) {
      return mockOrderService.cancelOrder(userId, orderId);
    }
    const response = await api.post<Order>(`/orders/${orderId}/cancel?user_id=${userId}`);
    return response.data;
  },
};

// Wishlist service
export const wishlistService = {
  async getWishlist(userId: string): Promise<WishlistItem[]> {
    if (USE_MOCK_DATA) {
      return mockWishlistService.getWishlist(userId);
    }
    const response = await api.get<WishlistItem[]>(`/wishlist?user_id=${userId}`);
    return response.data;
  },

  async addToWishlist(userId: string, productId: string): Promise<void> {
    if (USE_MOCK_DATA) {
      return mockWishlistService.addToWishlist(userId, productId);
    }
    await api.post(`/wishlist?user_id=${userId}&product_id=${productId}`);
  },

  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    if (USE_MOCK_DATA) {
      return mockWishlistService.removeFromWishlist(userId, productId);
    }
    await api.delete(`/wishlist/${productId}?user_id=${userId}`);
  },
};

// Home service
export const homeService = {
  async getBanners(): Promise<Banner[]> {
    if (USE_MOCK_DATA) {
      return mockHomeService.getBanners();
    }
    const response = await api.get<Banner[]>('/home/banners');
    return response.data;
  },

  async getCollections(): Promise<Collection[]> {
    if (USE_MOCK_DATA) {
      return mockHomeService.getCollections();
    }
    const response = await api.get<Collection[]>('/home/collections');
    return response.data;
  },
};

export default api;
