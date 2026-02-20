import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowRight, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CtaSection() {
    const t = useTranslations('cta');

    return (
        <section className="relative overflow-hidden bg-neutral-950">
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format&fit=crop"
                    alt="Delivery — woman with shopping bags in Cairo"
                    fill
                    className="object-cover object-center opacity-25"
                    sizes="100vw"
                    quality={70}
                />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                        backgroundSize: '200px 200px',
                    }}
                />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-32">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-2.5 mb-6">
                        <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center">
                            <Truck className="w-3.5 h-3.5 text-white/60" />
                        </div>
                        <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase">
                            {t('eyebrow')}
                        </p>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.08] tracking-tight mb-6">
                        {t('headline')}
                    </h2>
                    <div className="w-12 h-px bg-white/20 mb-6" />
                    <p className="text-sm sm:text-base text-white/50 font-light leading-relaxed max-w-lg mb-10">
                        {t('body')}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button
                            variant="default"
                            size="lg"
                            asChild
                            className="bg-white text-neutral-900 hover:bg-neutral-100 text-xs tracking-widest px-8"
                        >
                            <Link href="/shop" className="inline-flex items-center gap-2 group">
                                {t('primary')}
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            size="lg"
                            asChild
                            className="text-white/60 hover:text-white hover:bg-white/10 text-xs tracking-widest px-8 border border-white/15 hover:border-white/25"
                        >
                            <Link href="/orders/track">
                                {t('secondary')}
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="mt-16 sm:mt-20 pt-10 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
                    {[
                        { value: '27', label: 'Governorates', suffix: '' },
                        { value: '24', label: 'Hour Delivery', suffix: 'h' },
                        { value: '500+', label: 'Happy Brands', suffix: '' },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <p className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                                {stat.value}
                                <span className="text-white/40 text-lg">{stat.suffix}</span>
                            </p>
                            <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mt-1">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}