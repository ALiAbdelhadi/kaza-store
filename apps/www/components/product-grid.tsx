import { ProductListItem } from '@/types';
import { ProductCard } from './product-card';
import { cn } from '@/lib/utils';

interface ProductGridProps {
    products: ProductListItem[];
    className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
    return (
        <div
            className={cn(
                'grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
                className
            )}
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="aspect-3/4 bg-neutral-200 rounded-sm" />
                    <div className="mt-3 space-y-2">
                        <div className="h-3 bg-neutral-200 rounded w-1/3" />
                        <div className="h-3 bg-neutral-200 rounded w-3/4" />
                        <div className="h-3 bg-neutral-200 rounded w-1/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}