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
    name: string;
    price: number;
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
    sku: string;
}

export interface CartItem {
    productId: string;
    variantId: string;
    sizeId: string;
    quantity: number;
}