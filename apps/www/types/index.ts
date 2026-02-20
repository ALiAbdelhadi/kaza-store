export interface ProductVariant {
    id: string;
    name: string;
    color: string;
    colorHex: string;
    available: boolean;
}

export interface ProductSize {
    id: string;
    label: string;
    available: boolean;
}

export interface ProductImage {
    id: string;
    url: string;
    alt: string;
    variantId?: string;
}

export interface Product {
    id: string;
    slug: string;
    name: string;
    price: number;
    discount_price: number | null;
    final_price: number;
    currency: string;
    description: string;
    images: ProductImage[];
    variants: ProductVariant[];
    sizes: ProductSize[];
    details: {
        fit?: string;
        fabrication?: string;
        care?: string;
        shipping?: string;
    };
    inStock: boolean;
    stock: number;
    is_active: boolean;
    sku: string;
    category: {
        id: string;
        name: string;
        slug: string;
    };
    brand?: {
        id: string;
        name: string;
        slug: string;
    } | null;
    created_at: string;
}

export interface ProductListItem {
    id: string;
    slug: string;
    name: string;
    price: number;
    discount_price: number | null;
    final_price: number;
    currency: string;
    stock: number;
    is_active: boolean;
    category: {
        id: string;
        name: string;
        slug: string;
        images: string[];
    };
    brand?: {
        id: string;
        name: string;
    } | null;
    image: string | null;
    thumbnail: string | null;
    created_at: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export interface CartItem {
    id: string;
    product_id: string;
    product: ProductListItem;
    variant_id: string;
    size_id: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
}

export interface Cart {
    id: string;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    items_count: number;
}

export interface AddToCartPayload {
    product_id: string;
    variant_id: string;
    size_id: string;
    quantity: number;
}

export interface UpdateCartItemPayload {
    quantity: number;
}

export interface ShippingAddress {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    governorate: string;
    postal_code?: string;
}

export interface CheckoutPayload {
    shipping_address: ShippingAddress;
    payment_method: 'cod' | 'card' | 'wallet';
    notes?: string;
}

export interface Order {
    id: string;
    order_number: string;
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: CartItem[];
    shipping_address: ShippingAddress;
    payment_method: string;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    notes?: string;
    created_at: string;
}

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    status: number;
}

export interface ProductFilters {
    category?: string;
    brand?: string;
    min_price?: number;
    max_price?: number;
    sort?: 'newest' | 'price_asc' | 'price_desc' | 'popular';
    page?: number;
    per_page?: number;
    search?: string;
}