'use client';

import { Link } from '@/i18n/navigation';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Container } from './container';
import { LanguageSwitcher } from './language-switcher';


function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
    return (
        <div className="w-5 h-4 flex flex-col justify-between cursor-pointer" aria-hidden>
            <span
                className="block h-px bg-neutral-700 origin-center transition-all duration-300 ease-in-out"
                style={{
                    transform: isOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                }}
            />
            <span
                className="block h-px bg-neutral-700 transition-all duration-200 ease-in-out"
                style={{
                    opacity: isOpen ? 0 : 1,
                    transform: isOpen ? 'scaleX(0)' : 'scaleX(1)',
                }}
            />
            <span
                className="block h-px bg-neutral-700 origin-center transition-all duration-300 ease-in-out"
                style={{
                    transform: isOpen ? 'translateY(-9px) rotate(-45deg)' : 'none',
                }}
            />
        </div>
    );
}

export default function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const t = useTranslations('nav');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const navLinks = [
        { key: 'newArrivals' as const, href: '/new-arrivals' },
        { key: 'shop' as const, href: '/shop' },
        { key: 'stories' as const, href: '/stories' },
        { key: 'journal' as const, href: '/journal' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-background/98 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
                        : 'bg-background/95 backdrop-blur-md border-b border-neutral-200'
                }`}
            >
                <Container>
                    <div className="flex items-center justify-between h-16">
                        <Link
                            href="/"
                            className="text-2xl tracking-wider text-blue-500 flex items-center font-semibold shrink-0"
                        >
                            Kaza.
                            <span className="text-muted-foreground">Store</span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map(({ key, href }) => (
                                <Link
                                    key={key}
                                    href={href}
                                    className="text-sm tracking-wide text-neutral-700 hover:text-neutral-900 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-neutral-900 after:transition-all hover:after:w-full"
                                >
                                    {t(key)}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
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
                                className="md:hidden w-9 h-9 flex items-center justify-center hover:bg-neutral-100 rounded-full transition-colors"
                                onClick={() => setMobileMenuOpen((prev) => !prev)}
                                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={mobileMenuOpen}
                            >
                                <HamburgerIcon isOpen={mobileMenuOpen} />
                            </button>
                        </div>
                    </div>
                </Container>
            </nav>
            <div
                className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden
                />
                <div
                    className={`absolute top-16 left-0 right-0 bg-background border-b border-neutral-200 shadow-lg
                        transition-all duration-300 ease-out
                        ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'}
                    `}
                >
                    <Container>
                        <div className="py-6 space-y-1">
                            {navLinks.map(({ key, href }, index) => (
                                <Link
                                    key={key}
                                    href={href}
                                    className="block py-3 text-base tracking-wide text-neutral-800 hover:text-neutral-900 border-b border-neutral-100 last:border-0 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                    style={{
                                        transitionDelay: mobileMenuOpen
                                            ? `${index * 50}ms`
                                            : '0ms',
                                        opacity: mobileMenuOpen ? 1 : 0,
                                        transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-6px)',
                                        transition: `opacity 250ms ease ${index * 50}ms, transform 250ms ease ${index * 50}ms`,
                                    }}
                                >
                                    {t(key)}
                                </Link>
                            ))}
                            <div
                                className="pt-4 pb-2"
                                style={{
                                    transitionDelay: mobileMenuOpen ? `${navLinks.length * 50}ms` : '0ms',
                                    opacity: mobileMenuOpen ? 1 : 0,
                                    transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-6px)',
                                    transition: `opacity 250ms ease ${navLinks.length * 50}ms, transform 250ms ease ${navLinks.length * 50}ms`,
                                }}
                            >
                                <LanguageSwitcher variant="text" />
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
}