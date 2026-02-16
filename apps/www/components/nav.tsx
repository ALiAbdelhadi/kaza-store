'use client';

import { Link } from '@/i18n/navigation';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Container } from './container';

export default function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const t = useTranslations("nav")
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
            <Container>
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl tracking-wider text-blue-500 flex items-center font-semibold">
                            Kaza.
                            <span className='text-muted-foreground'>Store</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/new-arrivals" className="text-sm tracking-wide hover:text-neutral-600 transition-colors">
                            {t("newArrivals")}
                        </Link>
                        <Link href="/shop" className="text-sm tracking-wide hover:text-neutral-600 transition-colors">
                            {t("shop")}
                        </Link>
                        <Link href="/stories" className="text-sm tracking-wide hover:text-neutral-600 transition-colors">
                            {t("stories")}
                        </Link>
                        <Link href="/journal" className="text-sm tracking-wide hover:text-neutral-600 transition-colors">
                            {t("journal")}
                        </Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        <button
                            className="text-neutral-700 hover:text-neutral-900 transition-colors"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <button
                            className="text-neutral-700 hover:text-neutral-900 transition-colors"
                            aria-label="Account"
                        >
                            <User className="w-5 h-5" />
                        </button>
                        <button
                            className="text-neutral-700 hover:text-neutral-900 transition-colors relative"
                            aria-label="Shopping bag"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                                0
                            </span>
                        </button>
                        <button
                            className="md:hidden text-neutral-700 hover:text-neutral-900"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </Container>
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-neutral-200 bg-white">
                    <div className="px-4 py-4 space-y-3">
                        <Link href="/new-arrivals" className="text-sm tracking-wide hover:text-neutral-600 transition-colors">
                            {t("newArrivals")}
                        </Link>
                        <Link href="/shop" className="text-sm tracking-wide hover:text-neutral-600 transition-colors">
                            {t("shop")}
                        </Link>
                        <Link href="/stories" className="text-sm tracking-wide hover:text-neutral-600 transition-colors">
                            {t("stories")}
                        </Link>
                        <Link href="/journal" className="text-sm tracking-wide hover:text-neutral-600 transition-colors">
                            {t("journal")}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}