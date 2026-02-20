import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { checkoutService } from '@/services/checkout.service';
import { CheckoutPayload, Order } from '@/types';

export function useCheckout() {
    const queryClient = useQueryClient();

    return useMutation<Order, Error, CheckoutPayload>({
        mutationFn: (payload) => checkoutService.placeOrder(payload),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: queryKeys.cart.all });
        },
    });
}