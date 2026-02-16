'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Product } from '@/types';
import { MapPin, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import ProductVariants from './product-variants';
import { Button } from './ui/button';

interface ProductInfoProps {
    product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const handleAddToBag = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        console.log('Adding to bag:', {
            productId: product.id,
            variantId: selectedVariant,
            sizeId: selectedSize,
            quantity,
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="md:text-4xl text-3xl font-normal tracking-wide mb-2">
                    {product.name}
                </h1>
                <p className="text-2xl font-light font-serif">
                    {product.currency}{product.price}
                </p>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground font-normal">
                {product.description}
            </p>
            <ProductVariants
                variants={product.variants}
                sizes={product.sizes}
                onVariantChange={setSelectedVariant}
                onSizeChange={setSelectedSize}
                onQuantityChange={setQuantity}
            />
            <Button
                variant={"default"}
                size={"icon-lg"}
                onClick={handleAddToBag}
                className="w-full text-sm tracking-widest flex items-center justify-center gap-2"
            >
                Add to Bag
                <ShoppingBag />
            </Button>
            <Button variant={"outline"} size={"lg"} className="w-full text-sm tracking-wide flex items-center justify-center  gap-2">
                <MapPin className="w-4 h-4" />
                <span>Check In-Store Availability</span>
            </Button>
            <Accordion type="single" collapsible className="border-t border-neutral-200 pt-6">
                {product.details.fit && (
                    <AccordionItem value="fit">
                        <AccordionTrigger>Fit Details</AccordionTrigger>
                        <AccordionContent>
                            {product.details.fit}
                        </AccordionContent>
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
                        <AccordionContent>
                            {product.details.shipping}
                        </AccordionContent>
                    </AccordionItem>
                )}
            </Accordion>
        </div>
    );
}