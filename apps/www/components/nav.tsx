'use client';

import { Link } from '@/i18n/navigation';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Container } from './container';
import { LanguageSwitcher } from './language-switcher';

export default function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const t = useTranslations('nav');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? 'bg-white/98 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
                        : 'bg-white/95 backdrop-blur-md border-b border-neutral-200'
                    }`}
            >
                <Container>
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="text-2xl tracking-wider text-blue-500 flex items-center font-semibold shrink-0"
                        >
                            Kaza.
                            <span className="text-muted-foreground">Store</span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            {(['newArrivals', 'shop', 'stories', 'journal'] as const).map((key) => (
                                <Link
                                    key={key}
                                    href={`/${key === 'newArrivals' ? 'new-arrivals' : key}`}
                                    className="text-sm tracking-wide text-neutral-700 hover:text-neutral-900 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-neutral-900 after:transition-all hover:after:w-full"
                                >
                                    {t(key)}
                                </Link>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            {/* Language Switcher — hidden on smallest screens */}
                            <div className="hidden sm:block mr-1">
                                <LanguageSwitcher variant="pill" />
                            </div>

                            <button
                                className="w-9 h-9 flex items-center justify-center text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
                                aria-label="Search"
                            >
                                <Search className="w-[18px] h-[18px]" />
                            </button>
                            <button
                                className="w-9 h-9 flex items-center justify-center text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
                                aria-label="Account"
                            >
                                <User className="w-[18px] h-[18px]" />
                            </button>
                            <Link
                                href="/cart"
                                className="w-9 h-9 flex items-center justify-center text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors relative"
                                aria-label="Shopping bag"
                            >
                                <ShoppingBag className="w-[18px] h-[18px]" />
                                <span className="absolute top-1 right-1 w-[14px] h-[14px] bg-neutral-900 text-white text-[9px] font-medium rounded-full flex items-center justify-center leading-none">
                                    0
                                </span>
                            </Link>
                            <button
                                className="md:hidden w-9 h-9 flex items-center justify-center text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={mobileMenuOpen}
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-[18px] h-[18px]" />
                                ) : (
                                    <Menu className="w-[18px] h-[18px]" />
                                )}
                            </button>
                        </div>
                    </div>
                </Container>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-hidden
                    />
                    {/* Panel */}
                    <div className="absolute top-16 left-0 right-0 bg-white border-b border-neutral-200 shadow-lg">
                        <Container>
                            <div className="py-6 space-y-1">
                                {(
                                    [
                                        { key: 'newArrivals', href: '/new-arrivals' },
                                        { key: 'shop', href: '/shop' },
                                        { key: 'stories', href: '/stories' },
                                        { key: 'journal', href: '/journal' },
                                    ] as const
                                ).map(({ key, href }) => (
                                    <Link
                                        key={key}
                                        href={href}
                                        className="block py-3 text-base font-light tracking-wide text-neutral-800 hover:text-neutral-900 border-b border-neutral-100 last:border-0 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t(key)}
                                    </Link>
                                ))}
                                <div className="pt-4 pb-2">
                                    <LanguageSwitcher variant="text" />
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            )}
        </>
    );
}