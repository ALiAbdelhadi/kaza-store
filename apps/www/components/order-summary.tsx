import { Cart } from '@/types';
import { cn } from '@/lib/utils';

interface OrderSummaryProps {
    cart: Cart;
    className?: string;
}

export function OrderSummary({ cart, className }: OrderSummaryProps) {
    return (
        <div className={cn('space-y-3 text-sm', className)}>
            <h3 className="font-medium tracking-wide text-base mb-4">Order Summary</h3>
            <div className="flex justify-between text-neutral-600">
                <span>Subtotal ({cart.items_count} {cart.items_count === 1 ? 'item' : 'items'})</span>
                <span>EGP {cart.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span>{cart.shipping === 0 ? 'Free' : `EGP ${cart.shipping.toLocaleString()}`}</span>
            </div>
            {cart.tax > 0 && (
                <div className="flex justify-between text-neutral-600">
                    <span>Tax (14%)</span>
                    <span>EGP {cart.tax.toLocaleString()}</span>
                </div>
            )}
            <div className="border-t border-neutral-200 pt-3 flex justify-between font-medium text-base">
                <span>Total</span>
                <span>EGP {cart.total.toLocaleString()}</span>
            </div>
        </div>
    );
}

export function OrderSummarySkeleton({ className }: { className?: string }) {
    return (
        <div className={cn('space-y-3 animate-pulse', className)}>
            <div className="h-4 bg-neutral-200 rounded w-1/3 mb-4" />
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between">
                    <div className="h-3 bg-neutral-200 rounded w-1/3" />
                    <div className="h-3 bg-neutral-200 rounded w-1/6" />
                </div>
            ))}
            <div className="border-t border-neutral-200 pt-3 flex justify-between">
                <div className="h-4 bg-neutral-200 rounded w-1/4" />
                <div className="h-4 bg-neutral-200 rounded w-1/5" />
            </div>
        </div>
    );
}