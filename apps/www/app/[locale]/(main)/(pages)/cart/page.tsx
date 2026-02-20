'use client';

import { useCart } from '@/hooks/use-cart';
import { Container } from '@/components/container';
import { CartItemRow, CartItemRowSkeleton } from '@/components/cart-item-row';
import { OrderSummary, OrderSummarySkeleton } from '@/components/order-summary';
import { EmptyState } from '@/components/empty-state';
import { ErrorMessage } from '@/components/error-message';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { ShoppingBag } from 'lucide-react';

export default function CartPage() {
    const { data: cart, isLoading, isError, error, refetch } = useCart();

    return (
        <main className="min-h-screen bg-white pt-20">
            <Container className="py-12">
                <div className="flex items-center gap-3 mb-10">
                    <ShoppingBag className="w-5 h-5" />
                    <h1 className="text-3xl font-light tracking-wide">Your Bag</h1>
                </div>

                {isLoading ? (
                    <CartLoadingSkeleton />
                ) : isError ? (
                    <ErrorMessage message={error?.message} onRetry={() => refetch()} />
                ) : !cart || cart.items.length === 0 ? (
                    <EmptyState
                        title="Your bag is empty"
                        description="Looks like you haven't added anything to your bag yet. Explore our collection and find something you love."
                        action={{ label: 'Continue Shopping', href: '/shop' }}
                    />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-3">
                            <div className="divide-y-0">
                                {cart.items.map((item) => (
                                    <CartItemRow key={item.id} item={item} />
                                ))}
                            </div>
                            <div className="mt-6">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/shop" className="text-sm tracking-wide text-neutral-500 hover:text-neutral-900">
                                        ← Continue Shopping
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-2">
                            <div className="sticky top-24 space-y-6">
                                <div className="border border-neutral-200 rounded-sm p-6">
                                    <OrderSummary cart={cart} />
                                </div>
                                <Button variant="default" size="lg" className="w-full text-sm tracking-widest" asChild>
                                    <Link href="/checkout">
                                        Proceed to Checkout
                                    </Link>
                                </Button>
                                <p className="text-xs text-center text-neutral-400">
                                    Free shipping on orders over EGP 500
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </main>
    );
}

function CartLoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
                {[1, 2, 3].map((i) => (
                    <CartItemRowSkeleton key={i} />
                ))}
            </div>
            <div className="lg:col-span-2">
                <div className="border border-neutral-200 rounded-sm p-6">
                    <OrderSummarySkeleton />
                </div>
            </div>
        </div>
    );
}