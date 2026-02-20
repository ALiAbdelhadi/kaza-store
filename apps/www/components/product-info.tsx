'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { AddToCartPayload, Product } from '@/types';
import { MapPin, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import ProductVariants from './product-variants';
import { Button } from './ui/button';

// Props accept a subset of the full Product type to maintain
// compatibility with both mock data and real API responses.
interface ProductInfoProduct {
    id: string;
    name: string;
    price: number;
    currency: string;
    description: string;
    variants: Product['variants'];
    sizes: Product['sizes'];
    details: Product['details'];
    inStock: boolean;
    sku: string;
}

interface ProductInfoProps {
    product: ProductInfoProduct;
    onAddToCart?: (payload: AddToCartPayload) => void;
    isAddingToCart?: boolean;
}

export default function ProductInfo({ product, onAddToCart, isAddingToCart }: ProductInfoProps) {
    const [selectedVariant, setSelectedVariant] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [sizeError, setSizeError] = useState(false);

    const handleAddToBag = () => {
        if (!selectedSize) {
            setSizeError(true);
            return;
        }
        setSizeError(false);

        if (onAddToCart) {
            onAddToCart({
                product_id: product.id,
                variant_id: selectedVariant,
                size_id: selectedSize,
                quantity,
            });
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="md:text-4xl text-3xl font-normal tracking-wide mb-2">
                    {product.name}
                </h1>
                <p className="text-2xl font-light font-serif">
                    {product.currency} {product.price.toLocaleString()}
                </p>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground font-normal">
                {product.description}
            </p>
            <ProductVariants
                variants={product.variants}
                sizes={product.sizes}
                onVariantChange={setSelectedVariant}
                onSizeChange={(id) => {
                    setSelectedSize(id);
                    if (sizeError) setSizeError(false);
                }}
                onQuantityChange={setQuantity}
            />
            {sizeError && (
                <p className="text-sm text-red-500 -mt-4">Please select a size to continue.</p>
            )}
            <Button
                variant="default"
                size="icon-lg"
                onClick={handleAddToBag}
                disabled={!product.inStock || isAddingToCart}
                className="w-full text-sm tracking-widest flex items-center justify-center gap-2"
            >
                {isAddingToCart ? 'Adding...' : product.inStock ? 'Add to Bag' : 'Out of Stock'}
                {!isAddingToCart && product.inStock && <ShoppingBag />}
            </Button>
            <Button
                variant="outline"
                size="lg"
                className="w-full text-sm tracking-wide flex items-center justify-center gap-2"
            >
                <MapPin className="w-4 h-4" />
                <span>Check In-Store Availability</span>
            </Button>
            <Accordion type="single" collapsible className="border-t border-neutral-200 pt-6">
                {product.details.fit && (
                    <AccordionItem value="fit">
                        <AccordionTrigger>Fit Details</AccordionTrigger>
                        <AccordionContent>{product.details.fit}</AccordionContent>
                    </AccordionItem>
                )}
                {product.details.fabrication && (
                    <AccordionItem value="fabrication">
                        <AccordionTrigger>Fabrication & Care</AccordionTrigger>
                        <AccordionContent>
                            <p className="mb-2">{product.details.fabrication}</p>
                            {product.details.care && <p>{product.details.care}</p>}
                        </AccordionContent>
                    </AccordionItem>
                )}
                {product.details.shipping && (
                    <AccordionItem value="shipping">
                        <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                        <AccordionContent>{product.details.shipping}</AccordionContent>
                    </AccordionItem>
                )}
            </Accordion>
        </div>
    );
}