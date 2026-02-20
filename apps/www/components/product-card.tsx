'use client';

import { Link } from '@/i18n/navigation';
import { ProductListItem } from '@/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ProductCardProps {
    product: ProductListItem;
    className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
    const hasDiscount = product.discount_price !== null && product.discount_price > 0;
    const savings = hasDiscount ? product.price - product.final_price : 0;

    return (
        <Link
            href={`/products/${product.slug}`}
            className={cn('group block', className)}
        >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-neutral-100">
                {product.thumbnail ? (
                    <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
                        <span className="text-neutral-300 text-xs tracking-wider">No Image</span>
                    </div>
                )}
                {hasDiscount && (
                    <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 tracking-wider">
                        SALE
                    </div>
                )}
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <span className="text-neutral-600 text-xs tracking-widest font-medium uppercase">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>
            <div className="mt-3 space-y-1">
                {product.brand && (
                    <p className="text-xs tracking-widest text-neutral-400 uppercase">
                        {product.brand.name}
                    </p>
                )}
                <h3 className="text-sm font-light tracking-wide text-neutral-900 line-clamp-2">
                    {product.name}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-light">
                        EGP {product.final_price.toLocaleString()}
                    </span>
                    {hasDiscount && (
                        <span className="text-xs text-neutral-400 line-through">
                            EGP {product.price.toLocaleString()}
                        </span>
                    )}
                </div>
                {hasDiscount && savings > 0 && (
                    <p className="text-xs text-neutral-500">Save EGP {savings.toLocaleString()}</p>
                )}
            </div>
        </Link>
    );
}