'use client';

import { useState } from 'react';
import { ProductImage } from '@/types';
import Image from 'next/image';

interface ProductImageGalleryProps {
    images: ProductImage[];
    productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <div className="space-y-4">
            <div className="relative aspect-3/4 bg-neutral-100 overflow-hidden rounded-sm">
                <Image
                    src={images[currentImage].url}
                    alt={images[currentImage].alt}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                    {images.map((image, index) => (
                        <button
                            key={image.id}
                            onClick={() => setCurrentImage(index)}
                            className={`
                relative aspect-square bg-neutral-100 overflow-hidden rounded-sm
                transition-all cursor-pointer
                ${currentImage === index
                                    ? 'ring-2 ring-neutral-900 ring-offset-2'
                                    : 'hover:opacity-75'
                                }
              `}
                        >
                            <Image
                                src={image.url}
                                alt={image.alt}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
            <div className="text-center">
                <span className="text-xs tracking-wider text-muted-foreground/90">
                    {currentImage + 1} / {images.length}
                </span>
            </div>
        </div>
    );
}