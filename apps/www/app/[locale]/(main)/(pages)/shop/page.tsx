'use client';

import { useState, useCallback } from 'react';
import { useProducts } from '@/hooks/use-products';
import { ProductGrid, ProductGridSkeleton } from '@/components/product-grid';
import { EmptyState } from '@/components/empty-state';
import { ErrorMessage } from '@/components/error-message';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { ProductFilters } from '@/types';
import { Search, SlidersHorizontal, X } from 'lucide-react';

type SortOption = NonNullable<ProductFilters['sort']>;

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Popular' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
];

export default function ShopPage() {
    const [filters, setFilters] = useState<ProductFilters>({
        sort: 'newest',
        page: 1,
        per_page: 12,
    });
    const [searchInput, setSearchInput] = useState('');

    const { data, isLoading, isError, error, refetch } = useProducts(filters);

    const updateFilter = useCallback(<K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => {
        setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
    }, []);

    const handleSearch = () => {
        updateFilter('search', searchInput.trim() || undefined);
    };

    const clearSearch = () => {
        setSearchInput('');
        updateFilter('search', undefined);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    const canGoNext = data ? data.meta.current_page < data.meta.last_page : false;
    const canGoPrev = filters.page !== undefined && filters.page > 1;

    return (
        <main className="min-h-screen bg-background pt-20">
            <Container className="py-12">
                <div className="flex flex-col gap-6 mb-10">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl   tracking-wide">Shop</h1>
                            {data && (
                                <p className="text-sm text-muted-foreground/90 mt-1">
                                    {data.meta.total} products
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search products..."
                                className="w-full border border-neutral-300 pl-9 pr-9 py-2.5 text-sm   focus:outline-none focus:border-neutral-900 rounded-sm transition-colors"
                            />
                            {searchInput && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-neutral-900"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0" />
                            <select
                                value={filters.sort}
                                onChange={(e) => updateFilter('sort', e.target.value as SortOption)}
                                className="border border-neutral-300 px-3 py-2.5 text-sm   focus:outline-none focus:border-neutral-900 rounded-sm transition-colors bg-background cursor-pointer"
                            >
                                {SORT_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {filters.search && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground/90">
                                Results for &quot;{filters.search}&quot;
                            </span>
                            <button
                                onClick={clearSearch}
                                className="text-xs text-muted-foreground hover:text-neutral-900 underline"
                            >
                                Clear
                            </button>
                        </div>
                    )}
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
                        title="No products found"
                        description={
                            filters.search
                                ? `We couldn't find anything matching "${filters.search}". Try a different search term.`
                                : 'There are no products available at the moment. Please check back later.'
                        }
                        action={
                            filters.search
                                ? { label: 'Clear Search', href: '/shop' }
                                : undefined
                        }
                    />
                ) : (
                    <>
                        <ProductGrid products={data.data} />
                        {data.meta.last_page > 1 && (
                            <div className="flex items-center justify-center gap-4 mt-16">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateFilter('page', (filters.page ?? 1) - 1)}
                                    disabled={!canGoPrev}
                                >
                                    Previous
                                </Button>
                                <span className="text-sm text-muted-foreground/90">
                                    Page {data.meta.current_page} of {data.meta.last_page}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateFilter('page', (filters.page ?? 1) + 1)}
                                    disabled={!canGoNext}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </main>
    );
}