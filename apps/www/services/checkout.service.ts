import { apiClient } from '@/lib/api';
import { CheckoutPayload, Order } from '@/types';

export const checkoutService = {
    async placeOrder(payload: CheckoutPayload): Promise<Order> {
        return apiClient.post<Order, CheckoutPayload>('/checkout', payload);
    },
};