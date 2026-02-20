import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/container';
import Image from 'next/image';

interface Brand {
    id: string;
    name: string;
    slug: string;
    logo?: string;
}

const BRANDS: Brand[] = [
    { id: '1', name: 'OKHTEIN', slug: 'okhtein' },
    { id: '2', name: 'AZZA FAHMY', slug: 'azza-fahmy' },
    { id: '3', name: 'NILE HOUSE', slug: 'nile-house' },
    { id: '4', name: 'CAIRO ATELIER', slug: 'cairo-atelier' },
    { id: '5', name: 'LUXE BAZAAR', slug: 'luxe-bazaar' },
    { id: '6', name: 'WOVEN', slug: 'woven' },
    { id: '7', name: 'MAMLUK', slug: 'mamluk' },
    { id: '8', name: 'DELTA SILK', slug: 'delta-silk' },
];

// Duplicate for seamless infinite scroll
const BRANDS_DOUBLED = [...BRANDS, ...BRANDS];

interface BrandsSectionProps {
    brands?: Brand[];
}

export function BrandsSection({ brands }: BrandsSectionProps) {
    const t = useTranslations('brands');
    const displayBrands = brands ?? BRANDS;
    const doubled = [...displayBrands, ...displayBrands];

    return (
        <section className="py-16 sm:py-20 bg-background border-y border-neutral-100 overflow-hidden">
            <Container>
                <div className="text-center mb-10">
                    <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-2">
                        {t('eyebrow')}
                    </p>
                    <p className="text-sm   text-neutral-600 tracking-wide">
                        {t('headline')}
                    </p>
                </div>
            </Container>
            <div
                className="relative w-full overflow-hidden"
                aria-label="Brand logos"
            >
                <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />
                <div
                    className="flex items-center"
                    style={{ animation: 'brandMarquee 30s linear infinite' }}
                    aria-hidden
                >
                    {doubled.map((brand, i) => (
                        <BrandItem key={`${brand.id}-${i}`} brand={brand} />
                    ))}
                </div>
            </div>
            <div className="text-center mt-10">
                <Link
                    href="/brands"
                    className="text-xs tracking-[0.2em] text-muted-foreground uppercase hover:text-neutral-900 transition-colors duration-200 border-b border-neutral-200 hover:border-neutral-900 pb-0.5"
                >
                    View All Brands
                </Link>
            </div>
            <style>{`
                @keyframes brandMarquee {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .brandMarquee { animation: none; }
                }
            `}</style>
        </section>
    );
}

function BrandItem({ brand }: { brand: Brand }) {
    return (
        <Link
            href={`/brands/${brand.slug}`}
            className="shrink-0 mx-10 sm:mx-14 group"
            aria-label={brand.name}
            tabIndex={-1}
        >
            {brand.logo ? (
                <Image
                    width={24}
                    height={24}
                    src={brand.logo}
                    alt={brand.name}
                    className="h-6 w-auto object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400"
                />
            ) : (
                <span className="text-[11px] tracking-[0.25em] font-medium text-neutral-300 group-hover:text-neutral-600 transition-colors duration-300 whitespace-nowrap select-none uppercase">
                    {brand.name}
                </span>
            )}
        </Link>
    );
}