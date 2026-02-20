'use client';

import { Container } from '@/components/container';
import { useTranslations } from 'next-intl';
import { useProducts } from '@/hooks/use-products';
import { ProductGrid, ProductGridSkeleton } from '@/components/product-grid';
import { EmptyState } from '@/components/empty-state';
import { ErrorMessage } from '@/components/error-message';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function NewArrivalsPage() {
    const t = useTranslations('newArrivals');
    const { data, isLoading, isError, error, refetch } = useProducts({
        sort: 'newest',
        page: 1,
        per_page: 12,
    });

    return (
        <main className="min-h-screen bg-background pt-20">
            <Container className="py-16">
                <div className="flex items-center justify-between mb-12">
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
                {isLoading ? (
                    <ProductGridSkeleton count={12} />
                ) : isError ? (
                    <ErrorMessage
                        message={error?.message}
                        onRetry={() => refetch()}
                    />
                ) : !data || data.data.length === 0 ? (
                    <EmptyState
                        title={t('noProducts')}
                        description={t('checkBackSoon')}
                    />
                ) : (
                    <ProductGrid products={data.data} />
                )}
            </Container>
        </main>
    );
}
