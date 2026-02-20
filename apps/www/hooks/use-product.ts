import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { productsService } from '@/services/products.service';
import { Product } from '@/types';

export function useProduct(slug: string) {
    return useQuery<Product, Error>({
        queryKey: queryKeys.products.detail(slug),
        queryFn: () => productsService.getProductBySlug(slug),
        enabled: Boolean(slug),
        staleTime: 1000 * 60 * 5,
    });
}