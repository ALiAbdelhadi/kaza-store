'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/container';
import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '@/components/product-card';
import { ErrorMessage } from '@/components/error-message';

const DISPLAY_COUNT = 4;

export function MostPopularProducts() {
    const t = useTranslations('popularProducts');
    const { data, isLoading, isError, error, refetch } = useProducts({
        sort: 'popular',
        per_page: DISPLAY_COUNT,
        page: 1,
    });

    return (
        <section className="py-16 sm:py-24 bg-background">
            <Container>
                <div className="flex items-end justify-between mb-10 sm:mb-14">
                    <div>
                        <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-2">
                            {t('eyebrow')}
                        </p>
                        <h2 className="text-3xl sm:text-4xl   tracking-tight text-neutral-900">
                            {t('headline')}
                        </h2>
                    </div>
                    <Link
                        href="/shop"
                        className="hidden sm:inline-flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground/90 uppercase hover:text-neutral-900 transition-colors group"
                    >
                        {t('viewAll')}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
                {isError ? (
                    <ErrorMessage
                        message={error?.message}
                        onRetry={() => refetch()}
                    />
                ) : isLoading ? (
                    <PopularProductsSkeleton />
                ) : !data || data.data.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-sm text-muted-foreground">No products available.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
                        {data.data.slice(0, DISPLAY_COUNT).map((product, i) => (
                            <div
                                key={product.id}
                                className="opacity-0"
                                style={{
                                    animation: `fadeUpIn 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms forwards`,
                                }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-10 text-center sm:hidden">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground/90 uppercase hover:text-neutral-900 transition-colors group"
                    >
                        {t('viewAll')}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </Container>

            <style>{`
                @keyframes fadeUpIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}

function PopularProductsSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
            {Array.from({ length: DISPLAY_COUNT }).map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="aspect-3/4 bg-neutral-100 rounded-sm" />
                    <div className="mt-3 space-y-2">
                        <div className="h-2.5 bg-neutral-100 rounded w-1/3" />
                        <div className="h-3 bg-neutral-100 rounded w-3/4" />
                        <div className="h-2.5 bg-neutral-100 rounded w-1/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}