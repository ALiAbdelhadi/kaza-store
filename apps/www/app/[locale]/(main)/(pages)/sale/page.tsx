'use client';

import { useState } from 'react';
import { Container } from '@/components/container';
import { useTranslations } from 'next-intl';
import { useProducts } from '@/hooks/use-products';
import { ProductGrid, ProductGridSkeleton } from '@/components/product-grid';
import { EmptyState } from '@/components/empty-state';
import { ErrorMessage } from '@/components/error-message';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export default function SalePage() {
    const t = useTranslations('sale');
    const [discountFilter, setDiscountFilter] = useState<string>('all');

    // Filter products by sale/discount - in real app, this would be an API filter
    const { data, isLoading, isError, error, refetch } = useProducts({
        sort: 'newest',
        page: 1,
        per_page: 12,
    });
    const saleProducts = data?.data.filter((product) => {
        const hasDiscount = parseInt(product.id.slice(-1)) % 2 === 0;
        return hasDiscount;
    }) || [];

    const filters = [
        { key: 'all', label: t('filter.all') },
        { key: 'upTo30', label: t('filter.upTo30') },
        { key: 'upTo50', label: t('filter.upTo50') },
        { key: 'upTo70', label: t('filter.upTo70') },
    ];

    return (
        <main className="min-h-screen bg-background pt-20">
            <Container className="py-16">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl   tracking-wide mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-lg text-muted-foreground  ">
                            {t('subtitle')}
                        </p>
                    </div>
                    <Link href="/shop">
                        <Button variant="outline">
                            {t('viewAll')}
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-12">
                    {filters.map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => setDiscountFilter(filter.key)}
                            className={cn(
                                'px-4 py-2 text-sm   tracking-wide rounded-sm border transition-colors',
                                discountFilter === filter.key
                                    ? 'bg-foreground text-background border-foreground'
                                    : 'bg-background text-foreground border-border hover:border-foreground/50'
                            )}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
                {isLoading ? (
                    <ProductGridSkeleton count={12} />
                ) : isError ? (
                    <ErrorMessage
                        message={error?.message}
                        onRetry={() => refetch()}
                    />
                ) : saleProducts.length === 0 ? (
                    <EmptyState
                        title={t('noProducts')}
                        description="Check back soon for amazing deals!"
                    />
                ) : (
                    <>
                        <div className="mb-6">
                            <p className="text-sm text-muted-foreground  ">
                                {saleProducts.length} {saleProducts.length === 1 ? 'item' : 'items'} on sale
                            </p>
                        </div>
                        <ProductGrid products={saleProducts} />
                    </>
                )}
            </Container>
        </main>
    );
}
