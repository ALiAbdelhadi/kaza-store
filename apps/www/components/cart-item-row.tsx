'use client';

import { CartItem } from '@/types';
import { useRemoveCartItem, useUpdateCartItem } from '@/hooks/use-cart';
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';

interface CartItemRowProps {
    item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
    const updateItem = useUpdateCartItem();
    const removeItem = useRemoveCartItem();

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) return;
        if (newQuantity > 10) return;
        updateItem.mutate({ itemId: item.id, payload: { quantity: newQuantity } });
    };

    const handleRemove = () => {
        removeItem.mutate(item.id);
    };

    const isLoading = updateItem.isPending || removeItem.isPending;

    return (
        <div className={`flex gap-4 py-6 border-b border-neutral-200 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="relative w-20 h-28 shrink-0 bg-neutral-100 rounded-sm overflow-hidden">
                {item.product.thumbnail ? (
                    <Image
                        src={item.product.thumbnail}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                    />
                ) : (
                    <div className="w-full h-full bg-neutral-100" />
                )}
            </div>

            <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        {item.product.brand && (
                            <p className="text-xs tracking-widest text-neutral-400 uppercase mb-0.5">
                                {item.product.brand.name}
                            </p>
                        )}
                        <h3 className="text-sm font-light tracking-wide truncate">{item.product.name}</h3>
                        <div className="flex gap-3 mt-1">
                            {item.variant_id && (
                                <p className="text-xs text-neutral-500">Color: {item.variant_id}</p>
                            )}
                            {item.size_id && (
                                <p className="text-xs text-neutral-500">Size: {item.size_id.toUpperCase()}</p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleRemove}
                        disabled={isLoading}
                        className="text-neutral-400 hover:text-neutral-900 transition-colors shrink-0"
                        aria-label="Remove item"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handleQuantityChange(item.quantity - 1)}
                            disabled={item.quantity <= 1 || isLoading}
                            className="w-7 h-7 border border-neutral-300 flex items-center justify-center hover:border-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-light w-4 text-center">{item.quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(item.quantity + 1)}
                            disabled={item.quantity >= 10 || isLoading}
                            className="w-7 h-7 border border-neutral-300 flex items-center justify-center hover:border-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded"
                            aria-label="Increase quantity"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                    <p className="text-sm font-light">EGP {item.subtotal.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}

export function CartItemRowSkeleton() {
    return (
        <div className="flex gap-4 py-6 border-b border-neutral-200 animate-pulse">
            <div className="w-20 h-28 bg-neutral-200 rounded-sm shrink-0" />
            <div className="flex-1 space-y-3">
                <div className="h-3 bg-neutral-200 rounded w-1/4" />
                <div className="h-3 bg-neutral-200 rounded w-2/3" />
                <div className="h-3 bg-neutral-200 rounded w-1/3" />
            </div>
        </div>
    );
}