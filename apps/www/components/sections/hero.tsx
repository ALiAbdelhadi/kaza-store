'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Slide {
    id: number;
    image: string;
    imageAlt: string;
    accentColor: string;
    eyebrowKey: `slide${1 | 2 | 3}.eyebrow`;
    headlineKey: `slide${1 | 2 | 3}.headline`;
    ctaKey: `slide${1 | 2 | 3}.cta`;
    ctaHref: string;
}

const SLIDES: Slide[] = [
    {
        id: 0,
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=85&auto=format&fit=crop',
        imageAlt: 'SS 2026 Collection — Woman in elegant cream coat',
        accentColor: '#E5D4C1',
        eyebrowKey: 'slide1.eyebrow',
        headlineKey: 'slide1.headline',
        ctaKey: 'slide1.cta',
        ctaHref: '/shop',
    },
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=85&auto=format&fit=crop',
        imageAlt: 'Exclusive brands — Woman in handcrafted dress',
        accentColor: '#C8D4C1',
        eyebrowKey: 'slide2.eyebrow',
        headlineKey: 'slide2.headline',
        ctaKey: 'slide2.cta',
        ctaHref: '/brands',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=85&auto=format&fit=crop',
        imageAlt: 'Limited drops — Woman in luxury minimal outfit',
        accentColor: '#C1C8D4',
        eyebrowKey: 'slide3.eyebrow',
        headlineKey: 'slide3.headline',
        ctaKey: 'slide3.cta',
        ctaHref: '/new-arrivals',
    },
];

const AUTOPLAY_INTERVAL = 6000;

export function HeroSection() {
    const t = useTranslations('hero');
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [progressKey, setProgressKey] = useState(0);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const goTo = useCallback((index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrent(index);
            setIsTransitioning(false);
            setProgressKey((k) => k + 1);
        }, 400);
    }, [isTransitioning]);

    const next = useCallback(() => {
        goTo((current + 1) % SLIDES.length);
    }, [current, goTo]);

    const prev = useCallback(() => {
        goTo((current - 1 + SLIDES.length) % SLIDES.length);
    }, [current, goTo]);

    // Autoplay
    useEffect(() => {
        if (isPaused) return;
        timerRef.current = setTimeout(next, AUTOPLAY_INTERVAL);
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [current, isPaused, next]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [next, prev]);

    const slide = SLIDES[current];
    // headline supports \n for line breaks
    const headlineLines = t(slide.headlineKey).split('\n');

    return (
        <section
            className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-neutral-100"
            aria-label="Featured collection carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* ─── Images ─────────────────────────────────────────────── */}
            {SLIDES.map((s, i) => (
                <div
                    key={s.id}
                    aria-hidden={i !== current}
                    className={cn(
                        'absolute inset-0 transition-opacity duration-700 ease-in-out',
                        i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    )}
                >
                    <Image
                        src={s.image}
                        alt={s.imageAlt}
                        fill
                        priority={i === 0}
                        sizes="100vw"
                        className="object-cover object-center"
                        quality={85}
                    />
                    {/* Gradient overlay — bottom-to-top dark vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                    {/* Left vertical gradient for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
                </div>
            ))}

            {/* ─── Content ─────────────────────────────────────────────── */}
            <div className="relative z-20 h-full flex flex-col justify-end pb-16 sm:pb-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
                <div
                    key={current}
                    className="max-w-xl"
                    style={{ animation: 'heroContentIn 0.6s cubic-bezier(0.22,1,0.36,1) both' }}
                >
                    {/* Eyebrow */}
                    <p className="text-xs tracking-[0.25em] text-white/70 uppercase mb-4  ">
                        {t(slide.eyebrowKey)}
                    </p>

                    {/* Headline */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl   text-white leading-[1.05] tracking-tight mb-8">
                        {headlineLines.map((line, i) => (
                            <span key={i} className="block">
                                {line}
                            </span>
                        ))}
                    </h1>

                    {/* CTA */}
                    <Link
                        href={slide.ctaHref}
                        className="group inline-flex items-center gap-3 text-sm tracking-widest text-white uppercase border-b border-white/40 pb-1 hover:border-white transition-colors duration-300"
                    >
                        {t(slide.ctaKey)}
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* ─── Slide Indicators ─────────────────────────────────── */}
                <div className="flex items-center gap-4 mt-12">
                    {SLIDES.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            aria-current={i === current}
                            className="group relative h-[2px] overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full"
                            style={{ width: i === current ? '40px' : '16px', transition: 'width 0.3s ease' }}
                        >
                            <span className="absolute inset-0 bg-background/30" />
                            {i === current && (
                                <span
                                    key={progressKey}
                                    className="absolute inset-y-0 left-0 bg-background origin-left"
                                    style={{
                                        animation: isPaused
                                            ? 'none'
                                            : `slideProgress ${AUTOPLAY_INTERVAL}ms linear forwards`,
                                    }}
                                />
                            )}
                        </button>
                    ))}

                    {/* Slide counter */}
                    <span className="ms-2 text-xs text-white/50 tabular-nums  ">
                        {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                    </span>
                </div>
            </div>

            {/* ─── Arrow Navigation ──────────────────────────────────── */}
            <button
                onClick={prev}
                disabled={isTransitioning}
                aria-label="Previous slide"
                className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/30 bg-background/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-background/20 transition-colors disabled:opacity-0"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                onClick={next}
                disabled={isTransitioning}
                aria-label="Next slide"
                className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/30 bg-background/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-background/20 transition-colors disabled:opacity-0"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* ─── CSS Keyframes (injected once) ─────────────────────── */}
            <style>{`
                @keyframes heroContentIn {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideProgress {
                    from { width: 0%; }
                    to   { width: 100%; }
                }
            `}</style>
        </section>
    );
}