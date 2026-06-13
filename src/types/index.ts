// Product types
export interface Product {
  product_id: string;
  title: string;
  description: string;
  main_image_url: string;
  images: string[];
  min_price: number;
  is_available: boolean;
  characteristics: Record<string, string>;
  skus: SKU[];
}

export interface SKU {
  sku_id: string;
  sku_code: string;
  name: string;
  price: number;
  active_quantity: number;
  blocked_quantity: number;
  active: boolean;
  characteristics: Array<{ name: string; value: string }>;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  children?: Category[];
}

export interface FilterOption {
  name: string;
  label: string;
  values: Array<{ value: string; label: string; count: number }>;
}

export interface ProductFilters {
  category_id: string;
  filters: FilterOption[];
}

// Cart types
export interface CartItem {
  cart_item_id: number;
  sku_id: string;
  product_id: string;
  product_title: string;
  sku_info: {
    sku_id: string;
    price: number;
    quantity_available: number;
    is_active: boolean;
  };
  quantity: number;
  subtotal: number;
}

export interface Cart {
  user_id: string;
  items: CartItem[];
  total_items: number;
  total_amount: number;
}

export interface CartItemCreate {
  sku_id: string;
  quantity: number;
}

// Order types
export interface Order {
  order_id: string;
  user_id: string;
  items: OrderItem[];
  total_amount: number;
  status: OrderStatus;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  product_title: string;
  sku_id: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Wishlist types
export interface WishlistItem {
  product_id: string;
  title: string;
  main_image_url: string;
  min_price: number;
  is_available: boolean;
}

// Banner and Collection types
export interface Banner {
  id: string;
  title: string;
  image_url: string;
  link_url?: string;
  is_active: boolean;
}

export interface Collection {
  id: string;
  title: string;
  product_ids: string[];
}
