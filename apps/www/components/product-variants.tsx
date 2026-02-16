'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { ProductSize, ProductVariant } from '@/types';

interface ProductVariantsProps {
    variants: ProductVariant[];
    sizes: ProductSize[];
    onVariantChange: (variantId: string) => void;
    onSizeChange: (sizeId: string) => void;
    onQuantityChange: (quantity: number) => void;
}

export default function ProductVariants({
    variants,
    sizes,
    onVariantChange,
    onSizeChange,
    onQuantityChange,
}: ProductVariantsProps) {
    const [selectedVariant, setSelectedVariant] = useState<string>(variants[0]?.id || '');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);

    const handleVariantSelect = (variantId: string) => {
        setSelectedVariant(variantId);
        onVariantChange(variantId);
    };

    const handleSizeSelect = (sizeId: string) => {
        setSelectedSize(sizeId);
        onSizeChange(sizeId);
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };

    const selectedVariantData = variants.find(v => v.id === selectedVariant);

    return (
        <div className="space-y-8">
            {/* Color Selector */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium tracking-wide">
                        Product Color: <span className="font-light">{selectedVariantData?.name || 'Select'}</span>
                    </label>
                </div>
                <div className="flex items-center space-x-3">
                    {variants.map((variant) => (
                        <button
                            key={variant.id}
                            onClick={() => handleVariantSelect(variant.id)}
                            disabled={!variant.available}
                            className={`
                w-10 h-10 rounded-full border-2 transition-all relative
                ${selectedVariant === variant.id
                                    ? 'border-neutral-900 scale-110'
                                    : 'border-transparent hover:border-neutral-300'
                                }
                ${!variant.available ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
              `}
                            style={{ backgroundColor: variant.colorHex }}
                            aria-label={`Select ${variant.name} color`}
                        >
                            {selectedVariant === variant.id && (
                                <span className="absolute inset-0 rounded-full border-2 border-white" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Size Selector */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium tracking-wide">
                        Product Size
                    </label>
                    <button className="text-xs tracking-wide text-neutral-600 hover:text-neutral-900 underline underline-offset-2">
                        Size Chart
                    </button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                    {sizes.map((size) => (
                        <button
                            key={size.id}
                            onClick={() => handleSizeSelect(size.id)}
                            disabled={!size.available}
                            className={`
                py-3 text-sm font-light tracking-wider border transition-all
                ${selectedSize === size.id
                                    ? 'border-neutral-900 bg-neutral-900 text-white'
                                    : 'border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900'
                                }
                ${!size.available ? 'opacity-30 cursor-not-allowed line-through' : 'cursor-pointer'}
              `}
                        >
                            {size.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantity Selector */}
            <div>
                <label className="text-sm font-medium tracking-wide mb-4 block">
                    Quantity
                </label>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="w-10 h-10 border border-neutral-300 rounded flex items-center justify-center hover:border-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        aria-label="Decrease quantity"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-light w-8 text-center">{quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= 10}
                        className="w-10 h-10 border border-neutral-300 rounded flex items-center justify-center hover:border-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        aria-label="Increase quantity"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}