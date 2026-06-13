import type { Product, Category, Banner, Collection, WishlistItem, Cart, CartItemCreate } from '../types';

// Категории
export const mockCategories: Category[] = [
  { id: 1, name: 'Смартфоны', slug: 'smartphones', parent_id: null },
  { id: 2, name: 'Ноутбуки', slug: 'laptops', parent_id: null },
  { id: 3, name: 'Наушники', slug: 'headphones', parent_id: null },
  { id: 4, name: 'Умные часы', slug: 'smartwatches', parent_id: null },
  { id: 5, name: 'Камеры', slug: 'cameras', parent_id: null },
  { id: 6, name: 'Игровые консоли', slug: 'gaming', parent_id: null },
];

// Товары
export const mockProducts: Product[] = [
  {
    product_id: 'PROD001',
    title: 'iPhone 15 Pro Max',
    description: 'Флагманский смартфон Apple с процессором A17 Pro, камерой 48 МП и титановым корпусом. Идеальный выбор для профессионалов и энтузиастов.',
    main_image_url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
      'https://images.unsplash.com/photo-1696446702082-1f3ca5a946b7?w=500',
      'https://images.unsplash.com/photo-1695048054207-f376d5ea702c?w=500',
    ],
    min_price: 129990,
    is_available: true,
    characteristics: {
      'Экран': '6.7" Super Retina XDR',
      'Процессор': 'A17 Pro',
      'Память': '256 ГБ',
      'Камера': '48+12+12 МП',
      'Батарея': '4422 мАч',
      'ОС': 'iOS 17',
    },
    skus: [
      {
        sku_id: 'SKU001',
        sku_code: 'IP15PM-256-NAT',
        name: 'iPhone 15 Pro Max 256GB Natural Titanium',
        price: 129990,
        active_quantity: 15,
        blocked_quantity: 0,
        active: true,
        characteristics: [{ name: 'Цвет', value: 'Natural Titanium' }, { name: 'Память', value: '256 ГБ' }],
      },
    ],
  },
  {
    product_id: 'PROD002',
    title: 'Samsung Galaxy S24 Ultra',
    description: 'Премиальный смартфон Samsung с AI-функциями, стилусом S Pen и лучшей в классе камерой 200 МП.',
    main_image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff70?w=500',
    ],
    min_price: 119990,
    is_available: true,
    characteristics: {
      'Экран': '6.8" Dynamic AMOLED 2X',
      'Процессор': 'Snapdragon 8 Gen 3',
      'Память': '512 ГБ',
      'Камера': '200+12+10+10 МП',
      'Батарея': '5000 мАч',
      'ОС': 'Android 14',
    },
    skus: [
      {
        sku_id: 'SKU002',
        sku_code: 'S24U-512-TIT',
        name: 'Galaxy S24 Ultra 512GB Titanium Gray',
        price: 119990,
        active_quantity: 20,
        blocked_quantity: 0,
        active: true,
        characteristics: [{ name: 'Цвет', value: 'Titanium Gray' }, { name: 'Память', value: '512 ГБ' }],
      },
    ],
  },
  {
    product_id: 'PROD003',
    title: 'MacBook Pro 16 M3 Max',
    description: 'Мощнейший ноутбук Apple с чипом M3 Max для профессионалов. Идеален для видеомонтажа, 3D-рендеринга и разработки.',
    main_image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      'https://images.unsplash.com/photo-1531297425935-9d8ac7a41b29?w=500',
    ],
    min_price: 349990,
    is_available: true,
    characteristics: {
      'Экран': '16.2" Liquid Retina XDR',
      'Процессор': 'Apple M3 Max (16-core)',
      'Оперативная память': '36 ГБ',
      'Накопитель': '1TB SSD',
      'Графика': '40-core GPU',
      'Вес': '2.16 кг',
    },
    skus: [
      {
        sku_id: 'SKU003',
        sku_code: 'MBP16-M3MAX-36-1TB',
        name: 'MacBook Pro 16 M3 Max 36GB 1TB',
        price: 349990,
        active_quantity: 5,
        blocked_quantity: 0,
        active: true,
        characteristics: [{ name: 'Память', value: '36 ГБ' }, { name: 'Накопитель', value: '1TB' }],
      },
    ],
  },
  {
    product_id: 'PROD004',
    title: 'Sony WH-1000XM5',
    description: 'Лучшие в классе беспроводные наушники с шумоподавлением. 30 часов работы, премиальное качество звука.',
    main_image_url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
      'https://images.unsplash.com/photo-1620025121848-29b90bedc856?w=500',
    ],
    min_price: 39990,
    is_available: true,
    characteristics: {
      'Тип': 'Полноразмерные',
      'Шумоподавление': 'Активное (ANC)',
      'Время работы': '30 часов',
      'Подключение': 'Bluetooth 5.2',
      'Вес': '250 г',
      'Зарядка': 'USB-C, быстрая',
    },
    skus: [
      {
        sku_id: 'SKU004',
        sku_code: 'WH1000XM5-BLK',
        name: 'WH-1000XM5 Black',
        price: 39990,
        active_quantity: 50,
        blocked_quantity: 0,
        active: true,
        characteristics: [{ name: 'Цвет', value: 'Black' }],
      },
      {
        sku_id: 'SKU004-SLV',
        sku_code: 'WH1000XM5-SLV',
        name: 'WH-1000XM5 Silver',
        price: 39990,
        active_quantity: 30,
        blocked_quantity: 0,
        active: true,
        characteristics: [{ name: 'Цвет', value: 'Silver' }],
      },
    ],
  },
  {
    product_id: 'PROD005',
    title: 'Apple Watch Ultra 2',
    description: 'Самые прочные и функциональные Apple Watch. Для экстремальных видов спорта и активного образа жизни.',
    main_image_url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
    images: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
      'https://images.unsplash.com/photo-1551817958-c4b4e8980a88?w=500',
    ],
    min_price: 89990,
    is_available: true,
    characteristics: {
      'Экран': '49 мм Always-On Retina',
      'Корпус': 'Титан',
      'Водонепроницаемость': '100 м',
      'Батарея': 'До 36 часов',
      'Датчики': 'GPS, пульсометр, SpO2',
      'ОС': 'watchOS 10',
    },
    skus: [
      {
        sku_id: 'SKU005',
        sku_code: 'AWU2-49-TIT',
        name: 'Apple Watch Ultra 2 49mm Titanium',
        price: 89990,
        active_quantity: 12,
        blocked_quantity: 0,
        active: true,
        characteristics: [{ name: 'Размер', value: '49 мм' }, { name: 'Материал', value: 'Титан' }],
      },
    ],
  },
  {
    product_id: 'PROD006',
    title: 'PlayStation 5 Pro',
    description: 'Игровая консоль нового поколения с трассировкой лучей, 8K выводом и SSD 2TB.',
    main_image_url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500',
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500',
    ],
    min_price: 79990,
    is_available: true,
    characteristics: {
      'Процессор': 'AMD Zen 2 (8 ядер)',
      'Графика': 'AMD RDNA 3 (16.7 TFLOPS)',
      'Память': '16 ГБ GDDR6',
      'Накопитель': '2TB SSD',
      'Вывод': 'до 8K 60fps, 4K 120fps',
      'ОС': 'PlayStation OS',
    },
    skus: [
      {
        sku_id: 'SKU006',
        sku_code: 'PS5PRO-2TB',
        name: 'PlayStation 5 Pro 2TB',
        price: 79990,
        active_quantity: 8,
        blocked_quantity: 0,
        active: true,
        characteristics: [{ name: 'Память', value: '2TB' }],
      },
    ],
  },
  {
    product_id: 'PROD007',
    title: 'Canon EOS R5',
    description: 'Профессиональная беззеркальная камера с матрицей 45 МП и записью видео 8K RAW.',
    main_image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500',
    ],
    min_price: 449990,
    is_available: false,
    characteristics: {
      'Матрица': '45 МП Full-Frame CMOS',
      'Видео': '8K RAW 30fps, 4K 120fps',
      'Стабилизация': '5-осевая IBIS',
      'Автофокус': 'Dual Pixel CMOS AF II',
      'Экран': '3.2" вариоугольный',
      'Вес': '738 г',
    },
    skus: [
      {
        sku_id: 'SKU007',
        sku_code: 'EOSR5-BODY',
        name: 'Canon EOS R5 Body Only',
        price: 449990,
        active_quantity: 0,
        blocked_quantity: 0,
        active: false,
        characteristics: [{ name: 'Тип', value: 'Только корпус' }],
      },
    ],
  },
  {
    product_id: 'PROD008',
    title: 'iPad Pro 12.9 M2',
    description: 'Мощнейший планшет Apple с чипом M2, дисплеем Liquid Retina XDR и поддержкой Apple Pencil Pro.',
    main_image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
      'https://images.unsplash.com/photo-1531297425935-9d8ac7a41b29?w=500',
    ],
    min_price: 109990,
    is_available: true,
    characteristics: {
      'Экран': '12.9" Liquid Retina XDR',
      'Процессор': 'Apple M2',
      'Память': '256 ГБ',
      'Оперативная память': '8 ГБ',
      'Батарея': 'До 10 часов',
      'ОС': 'iPadOS 17',
    },
    skus: [
      {
        sku_id: 'SKU008',
        sku_code: 'IPADPRO129-M2-256',
        name: 'iPad Pro 12.9 M2 256GB WiFi',
        price: 109990,
        active_quantity: 25,
        blocked_quantity: 0,
        active: true,
        characteristics: [{ name: 'Память', value: '256 ГБ' }, { name: 'Связь', value: 'WiFi' }],
      },
    ],
  },
];

// Баннеры
export const mockBanners: Banner[] = [
  {
    id: 'BANNER001',
    title: 'Летняя распродажа - до 50%',
    image_url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
    link_url: '/catalog?sale=true',
    is_active: true,
  },
  {
    id: 'BANNER002',
    title: 'Новинки Apple - предзаказ',
    image_url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200',
    link_url: '/catalog?category=1',
    is_active: true,
  },
  {
    id: 'BANNER003',
    title: 'Геймерская коллекция',
    image_url: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1200',
    link_url: '/catalog?category=6',
    is_active: true,
  },
];

// Коллекции
export const mockCollections: Collection[] = [
  {
    id: 'COLL001',
    title: 'Топ продаж',
    product_ids: ['PROD001', 'PROD002', 'PROD004'],
  },
  {
    id: 'COLL002',
    title: 'Для работы',
    product_ids: ['PROD003', 'PROD008'],
  },
  {
    id: 'COLL003',
    title: 'Геймерский набор',
    product_ids: ['PROD006', 'PROD004'],
  },
];

// Моковая корзина
let mockCart: Cart = {
  user_id: 'user123',
  items: [],
  total_items: 0,
  total_amount: 0,
};

// Моковые избранное
let mockWishlist: WishlistItem[] = [];

// Хелперы для моковых данных
export const mockCatalogService = {
  getCategories: async (): Promise<Category[]> => {
    return mockCategories;
  },

  getProducts: async (
    categoryId?: string,
    search?: string,
    minPrice?: number,
    maxPrice?: number,
    page = 1,
    pageSize = 20
  ): Promise<{ products: Product[]; total: number; page: number; pageSize: number }> => {
    let products = [...mockProducts];

    if (categoryId) {
      // Упрощённая фильтрация по категории
      const categoryIds = [parseInt(categoryId)];
      products = products.filter(() => true); // В реальности нужно мапить товары на категории
    }

    if (search) {
      const query = search.toLowerCase();
      products = products.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    if (minPrice !== undefined) {
      products = products.filter(p => p.min_price >= minPrice);
    }

    if (maxPrice !== undefined) {
      products = products.filter(p => p.min_price <= maxPrice);
    }

    const total = products.length;
    const start = (page - 1) * pageSize;
    const paginatedProducts = products.slice(start, start + pageSize);

    return {
      products: paginatedProducts,
      total,
      page,
      pageSize,
    };
  },

  getProduct: async (productId: string): Promise<Product> => {
    const product = mockProducts.find(p => p.product_id === productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },

  getFilters: async (categoryId: string): Promise<any> => {
    return {
      category_id: categoryId,
      filters: [
        {
          name: 'brand',
          label: 'Бренд',
          values: [
            { value: 'apple', label: 'Apple', count: 3 },
            { value: 'samsung', label: 'Samsung', count: 2 },
            { value: 'sony', label: 'Sony', count: 1 },
          ],
        },
        {
          name: 'price_range',
          label: 'Цена',
          values: [
            { value: '0-50000', label: 'До 50 000 ₽', count: 2 },
            { value: '50000-100000', label: '50 000 - 100 000 ₽', count: 3 },
            { value: '100000+', label: 'От 100 000 ₽', count: 3 },
          ],
        },
      ],
    };
  },
};

export const mockCartService = {
  getCart: async (userId: string): Promise<Cart> => {
    return mockCart;
  },

  addToCart: async (userId: string, item: CartItemCreate): Promise<Cart> => {
    const product = mockProducts.find(p =>
      p.skus.some(s => s.sku_id === item.sku_id)
    );

    if (!product) {
      throw new Error('Product not found');
    }

    const existingItem = mockCart.items.find(i => i.sku_id === item.sku_id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.subtotal = existingItem.quantity * existingItem.sku_info.price;
    } else {
      const sku = product.skus.find(s => s.sku_id === item.sku_id);
      if (!sku?.active) {
        throw new Error('Product is not available');
      }

      mockCart.items.push({
        cart_item_id: mockCart.items.length + 1,
        sku_id: item.sku_id,
        product_id: product.product_id,
        product_title: product.title,
        sku_info: {
          sku_id: sku.sku_id,
          price: sku.price,
          quantity_available: sku.active_quantity,
          is_active: sku.active,
        },
        quantity: item.quantity,
        subtotal: item.quantity * sku.price,
      });
    }

    mockCart.total_items = mockCart.items.reduce((sum, i) => sum + i.quantity, 0);
    mockCart.total_amount = mockCart.items.reduce((sum, i) => sum + i.subtotal, 0);

    return { ...mockCart };
  },

  updateCartItem: async (userId: string, cartItemId: number, quantity: number): Promise<Cart> => {
    const item = mockCart.items.find(i => i.cart_item_id === cartItemId);
    if (!item) {
      throw new Error('Cart item not found');
    }

    if (quantity <= 0) {
      return mockCartService.removeFromCart(userId, cartItemId);
    }

    item.quantity = quantity;
    item.subtotal = quantity * item.sku_info.price;

    mockCart.total_items = mockCart.items.reduce((sum, i) => sum + i.quantity, 0);
    mockCart.total_amount = mockCart.items.reduce((sum, i) => sum + i.subtotal, 0);

    return { ...mockCart };
  },

  removeFromCart: async (userId: string, cartItemId: number): Promise<Cart> => {
    mockCart.items = mockCart.items.filter(i => i.cart_item_id !== cartItemId);
    mockCart.total_items = mockCart.items.reduce((sum, i) => sum + i.quantity, 0);
    mockCart.total_amount = mockCart.items.reduce((sum, i) => sum + i.subtotal, 0);

    // Пересоздать cart_item_id
    mockCart.items = mockCart.items.map((item, index) => ({
      ...item,
      cart_item_id: index + 1,
    }));

    return { ...mockCart };
  },

  clearCart: async (userId: string): Promise<Cart> => {
    mockCart = {
      user_id: userId,
      items: [],
      total_items: 0,
      total_amount: 0,
    };
    return { ...mockCart };
  },
};

export const mockWishlistService = {
  getWishlist: async (userId: string): Promise<WishlistItem[]> => {
    return mockWishlist;
  },

  addToWishlist: async (userId: string, productId: string): Promise<void> => {
    const product = mockProducts.find(p => p.product_id === productId);
    if (!product) {
      throw new Error('Product not found');
    }

    if (!mockWishlist.some(w => w.product_id === productId)) {
      mockWishlist.push({
        product_id: product.product_id,
        title: product.title,
        main_image_url: product.main_image_url,
        min_price: product.min_price,
        is_available: product.is_available,
      });
    }
  },

  removeFromWishlist: async (userId: string, productId: string): Promise<void> => {
    mockWishlist = mockWishlist.filter(w => w.product_id !== productId);
  },
};

export const mockHomeService = {
  getBanners: async (): Promise<Banner[]> => {
    return mockBanners;
  },

  getCollections: async (): Promise<Collection[]> => {
    return mockCollections;
  },
};

// Моковые заказы
let mockOrders: any[] = [
  {
    order_id: 'ORD001',
    user_id: 'user123',
    items: [
      {
        product_id: 'PROD001',
        product_title: 'iPhone 15 Pro Max',
        sku_id: 'SKU001',
        quantity: 1,
        price: 129990,
      },
    ],
    total_amount: 129990,
    status: 'delivered',
    created_at: '2026-06-01T10:00:00Z',
    delivery_method: 'standard',
    delivery_address: {
      full_address: 'Россия, Москва, ул. Примерная, д. 10, кв. 5',
    },
    payment_method: 'card',
  },
  {
    order_id: 'ORD002',
    user_id: 'user123',
    items: [
      {
        product_id: 'PROD004',
        product_title: 'Sony WH-1000XM5',
        sku_id: 'SKU004',
        quantity: 1,
        price: 39990,
      },
    ],
    total_amount: 39990,
    status: 'processing',
    created_at: '2026-06-10T14:30:00Z',
    delivery_method: 'express',
    delivery_address: {
      full_address: 'Россия, Москва, ул. Примерная, д. 10, кв. 5',
    },
    payment_method: 'card',
  },
];

let orderCounter = 3;

export const mockOrderService = {
  createOrder: async (userId: string, items: any[]): Promise<any> => {
    const order = {
      order_id: `ORD${String(orderCounter++).padStart(3, '0')}`,
      user_id: userId,
      items,
      total_amount: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'pending' as const,
      created_at: new Date().toISOString(),
      delivery_method: 'standard',
      delivery_address: {},
      payment_method: 'card',
    };
    mockOrders.unshift(order);
    return order;
  },

  getOrders: async (userId: string): Promise<any[]> => {
    return mockOrders.filter(o => o.user_id === userId);
  },

  getOrder: async (userId: string, orderId: string): Promise<any> => {
    const order = mockOrders.find(o => o.order_id === orderId && o.user_id === userId);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  },

  cancelOrder: async (userId: string, orderId: string): Promise<any> => {
    const order = mockOrders.find(o => o.order_id === orderId && o.user_id === userId);
    if (!order) {
      throw new Error('Order not found');
    }
    if (order.status !== 'pending') {
      throw new Error('Can only cancel pending orders');
    }
    order.status = 'cancelled';
    return order;
  },
};
