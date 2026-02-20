import { ProductFilters } from '@/types';

export const queryKeys = {
    products: {
        all: ['products'] as const,
        lists: () => [...queryKeys.products.all, 'list'] as const,
        list: (filters?: ProductFilters) => [...queryKeys.products.lists(), filters] as const,
        details: () => [...queryKeys.products.all, 'detail'] as const,
        detail: (slug: string) => [...queryKeys.products.details(), slug] as const,
    },
    cart: {
        all: ['cart'] as const,
        detail: () => [...queryKeys.cart.all, 'detail'] as const,
    },
} as const;