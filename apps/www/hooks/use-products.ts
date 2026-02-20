import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { productsService } from '@/services/products.service';
import { PaginatedResponse, ProductFilters, ProductListItem } from '@/types';

export function useProducts(filters?: ProductFilters) {
    return useQuery<PaginatedResponse<ProductListItem>, Error>({
        queryKey: queryKeys.products.list(filters),
        queryFn: () => productsService.getProducts(filters),
        staleTime: 1000 * 60 * 5,
    });
}