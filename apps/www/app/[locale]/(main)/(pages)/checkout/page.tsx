'use client';

import { useCart } from '@/hooks/use-cart';
import { Container } from '@/components/container';
import { CheckoutForm } from '@/components/checkout-form';
import { EmptyState } from '@/components/empty-state';
import { ErrorMessage } from '@/components/error-message';
import { Link } from '@/i18n/navigation';
import { ChevronLeft } from 'lucide-react';

export default function CheckoutPage() {
    const { data: cart, isLoading, isError, error, refetch } = useCart();

    return (
        <main className="min-h-screen bg-background pt-20">
            <Container className="py-12">
                <div className="mb-10">
                    <Link
                        href="/cart"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-neutral-900 transition-colors mb-4"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Bag
                    </Link>
                    <h1 className="text-3xl   tracking-wide">Checkout</h1>
                </div>

                {isLoading ? (
                    <CheckoutLoadingSkeleton />
                ) : isError ? (
                    <ErrorMessage message={error?.message} onRetry={() => refetch()} />
                ) : !cart || cart.items.length === 0 ? (
                    <EmptyState
                        title="Your bag is empty"
                        description="You need items in your bag before checking out."
                        action={{ label: 'Start Shopping', href: '/shop' }}
                    />
                ) : (
                    <CheckoutForm cart={cart} />
                )}
            </Container>
        </main>
    );
}

function CheckoutLoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 animate-pulse">
            <div className="lg:col-span-3 space-y-10">
                <div className="space-y-4">
                    <div className="h-5 bg-neutral-200 rounded w-1/4" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-12 bg-neutral-200 rounded-sm" />
                        <div className="h-12 bg-neutral-200 rounded-sm" />
                    </div>
                    <div className="h-12 bg-neutral-200 rounded-sm" />
                    <div className="h-12 bg-neutral-200 rounded-sm" />
                    <div className="h-12 bg-neutral-200 rounded-sm" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-12 bg-neutral-200 rounded-sm" />
                        <div className="h-12 bg-neutral-200 rounded-sm" />
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="h-5 bg-neutral-200 rounded w-1/4" />
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-14 bg-neutral-200 rounded-sm" />
                    ))}
                </div>
            </div>
            <div className="lg:col-span-2">
                <div className="border border-neutral-200 rounded-sm p-6 space-y-3">
                    <div className="h-5 bg-neutral-200 rounded w-1/3 mb-4" />
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between">
                            <div className="h-3 bg-neutral-200 rounded w-1/3" />
                            <div className="h-3 bg-neutral-200 rounded w-1/6" />
                        </div>
                    ))}
                    <div className="h-10 bg-neutral-200 rounded mt-4" />
                </div>
            </div>
        </div>
    );
}