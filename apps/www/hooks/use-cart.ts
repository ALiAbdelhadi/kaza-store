import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { cartService } from '@/services/cart.service';
import { AddToCartPayload, Cart, UpdateCartItemPayload } from '@/types';

export function useCart() {
    return useQuery<Cart, Error>({
        queryKey: queryKeys.cart.detail(),
        queryFn: () => cartService.getCart(),
        staleTime: 1000 * 60 * 2,
    });
}

export function useAddToCart() {
    const queryClient = useQueryClient();
    return useMutation<Cart, Error, AddToCartPayload>({
        mutationFn: (payload) => cartService.addItem(payload),
        onSuccess: (data) => {
            queryClient.setQueryData(queryKeys.cart.detail(), data);
        },
    });
}

export function useUpdateCartItem() {
    const queryClient = useQueryClient();
    return useMutation<Cart, Error, { itemId: string; payload: UpdateCartItemPayload }>({
        mutationFn: ({ itemId, payload }) => cartService.updateItem(itemId, payload),
        onSuccess: (data) => {
            queryClient.setQueryData(queryKeys.cart.detail(), data);
        },
    });
}

export function useRemoveCartItem() {
    const queryClient = useQueryClient();
    return useMutation<Cart, Error, string>({
        mutationFn: (itemId) => cartService.removeItem(itemId),
        onSuccess: (data) => {
            queryClient.setQueryData(queryKeys.cart.detail(), data);
        },
    });
}

export function useClearCart() {
    const queryClient = useQueryClient();
    return useMutation<void, Error, void>({
        mutationFn: () => cartService.clearCart(),
        onSuccess: () => {
            queryClient.setQueryData(queryKeys.cart.detail(), null);
        },
    });
}