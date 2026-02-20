'use client';

import { Container } from '@/components/container';
import { ErrorMessage } from '@/components/error-message';
import ProductImageGallery from '@/components/product-image-gallery';
import ProductInfo from '@/components/product-info';
import { useAddToCart } from '@/hooks/use-cart';
import { useProduct } from '@/hooks/use-product';
import { AddToCartPayload } from '@/types';
import { use } from 'react';

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
    const { slug } = use(params);
    const { data: product, isLoading, isError, error, refetch } = useProduct(slug);
    const addToCart = useAddToCart();

    const handleAddToCart = (payload: AddToCartPayload) => {
        addToCart.mutate(payload);
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-white pt-20">
                <Container className="py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        <ProductDetailImageSkeleton />
                        <ProductDetailInfoSkeleton />
                    </div>
                </Container>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="min-h-screen bg-white pt-20">
                <Container className="py-12">
                    <ErrorMessage message={error?.message} onRetry={() => refetch()} />
                </Container>
            </main>
        );
    }

    if (!product) return null;

    const componentProduct = {
        id: product.id,
        name: product.name,
        price: product.final_price,
        currency: 'EGP',
        description: product.description,
        images: product.images,
        variants: product.variants,
        sizes: product.sizes,
        details: product.details,
        inStock: product.inStock,
        sku: product.sku,
    };

    return (
        <main className="min-h-screen bg-white pt-20">
            <Container className="py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <div className="lg:sticky lg:top-24 h-fit">
                        <ProductImageGallery
                            images={product.images}
                            productName={product.name}
                        />
                    </div>
                    <div>
                        <ProductInfo
                            product={componentProduct}
                            onAddToCart={handleAddToCart}
                            isAddingToCart={addToCart.isPending}
                        />
                    </div>
                </div>
            </Container>
        </main>
    );
}

function ProductDetailImageSkeleton() {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="aspect-3/4 bg-neutral-200 rounded-sm" />
            <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-neutral-200 rounded-sm" />
                ))}
            </div>
        </div>
    );
}

function ProductDetailInfoSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="space-y-2">
                <div className="h-8 bg-neutral-200 rounded w-3/4" />
                <div className="h-6 bg-neutral-200 rounded w-1/4" />
            </div>
            <div className="space-y-2">
                <div className="h-3 bg-neutral-200 rounded" />
                <div className="h-3 bg-neutral-200 rounded" />
                <div className="h-3 bg-neutral-200 rounded w-2/3" />
            </div>
            <div className="space-y-3">
                <div className="h-4 bg-neutral-200 rounded w-1/3" />
                <div className="flex gap-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-neutral-200" />
                    ))}
                </div>
            </div>
            <div className="space-y-3">
                <div className="h-4 bg-neutral-200 rounded w-1/3" />
                <div className="grid grid-cols-5 gap-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-12 bg-neutral-200 rounded" />
                    ))}
                </div>
            </div>
            <div className="h-10 bg-neutral-200 rounded" />
        </div>
    );
}