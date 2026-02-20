import { apiClient } from '@/lib/api';
import { PaginatedResponse, Product, ProductFilters, ProductListItem } from '@/types';

export const productsService = {
    async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<ProductListItem>> {
        return apiClient.get<PaginatedResponse<ProductListItem>>('/products', {
            category: filters?.category,
            brand: filters?.brand,
            min_price: filters?.min_price,
            max_price: filters?.max_price,
            sort: filters?.sort,
            page: filters?.page,
            per_page: filters?.per_page ?? 12,
            search: filters?.search,
        });
    },

    async getProductBySlug(slug: string): Promise<Product> {
        return apiClient.get<Product>(`/products/${slug}`);
    },
};