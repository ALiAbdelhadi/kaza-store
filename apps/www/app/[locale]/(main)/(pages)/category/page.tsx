import { Container } from '@/components/container';
import ProductImageGallery from '@/components/product-image-gallery';
import ProductInfo from '@/components/product-info';
import { Product } from '@/types';

const mockProduct: Product = {
    id: 'alpaca-wool-crewneck-beige',
    name: 'Alpaca Wool Crewneck Sweater',
    price: 248,
    currency: 'EGP',
    description:
        'A contemporary and feminine interpretation of the classic crewneck sweater, crafted in an airy knit plush-cotton blend using a hand-twisted blend of baby alpaca and virgin wool.',
    images: [
        {
            id: '1',
            url: '/images/sweater-beige-front.jpg',
            alt: 'Alpaca Wool Crewneck Sweater in Beige - Front View',
        },
        {
            id: '2',
            url: '/images/sweater-beige-back.jpg',
            alt: 'Alpaca Wool Crewneck Sweater in Beige - Back View',
        },
        {
            id: '3',
            url: '/images/sweater-beige-detail.jpg',
            alt: 'Alpaca Wool Crewneck Sweater in Beige - Detail View',
        },
        {
            id: '4',
            url: '/images/sweater-beige-styled.jpg',
            alt: 'Alpaca Wool Crewneck Sweater in Beige - Styled',
        },
    ],
    variants: [
        {
            id: 'beige',
            name: 'Beige',
            color: 'Beige',
            colorHex: '#E5D4C1',
            available: true,
        },
        {
            id: 'black',
            name: 'Black',
            color: 'Black',
            colorHex: '#1A1A1A',
            available: true,
        },
        {
            id: 'blue',
            name: 'Sky Blue',
            color: 'Sky Blue',
            colorHex: '#87CEEB',
            available: true,
        },
    ],
    sizes: [
        { id: 'xs', label: 'XS', available: true },
        { id: 's', label: 'S', available: true },
        { id: 'm', label: 'M', available: true },
        { id: 'l', label: 'L', available: true },
        { id: 'xl', label: 'XL', available: false },
    ],
    details: {
        fit: 'Relaxed fit with dropped shoulders. Model is 5\'9" and wearing size S. True to size.',
        fabrication:
            '70% Baby Alpaca, 30% Virgin Wool. Knitted in Peru using traditional techniques.',
        care: 'Dry clean only. Do not tumble dry. Lay flat to dry. Iron on low heat if needed.',
        shipping:
            'Free standard shipping on orders over $100. Express shipping available. Returns accepted within 30 days of purchase.',
    },
    inStock: true,
    sku: 'CEIN-AWC-BG-001',
};

export default function ProductPage() {
    return (
        <>
            <main className="min-h-screen bg-white pt-20">
                <Container className="py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        <div className="lg:sticky lg:top-24 h-fit">
                            <ProductImageGallery
                                images={mockProduct.images}
                                productName={mockProduct.name}
                            />
                        </div>
                        <div>
                            <ProductInfo product={mockProduct} />
                        </div>
                    </div>
                    <div className="mt-24 border-t border-neutral-200 pt-12">
                        <h2 className="text-2xl font-light tracking-wide mb-8">
                            You May Also Like
                        </h2>
                    </div>
                </Container>
            </main>
        </>
    );
}