import { apiClient } from '@/lib/api';
import { AddToCartPayload, Cart, UpdateCartItemPayload } from '@/types';

export const cartService = {
    async getCart(): Promise<Cart> {
        return apiClient.get<Cart>('/cart');
    },

    async addItem(payload: AddToCartPayload): Promise<Cart> {
        return apiClient.post<Cart, AddToCartPayload>('/cart', payload);
    },

    async updateItem(itemId: string, payload: UpdateCartItemPayload): Promise<Cart> {
        return apiClient.patch<Cart, UpdateCartItemPayload>(`/cart/${itemId}`, payload);
    },

    async removeItem(itemId: string): Promise<Cart> {
        return apiClient.delete<Cart>(`/cart/${itemId}`);
    },

    async clearCart(): Promise<void> {
        return apiClient.delete<void>('/cart');
    },
};