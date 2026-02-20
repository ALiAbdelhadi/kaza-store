'use client';

import { Container } from '@/components/container';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Facebook, Instagram, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, type FormEvent } from 'react';

const SOCIAL_LINKS = [
    { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter / X' },
    { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
] as const;

export function Footer() {
    const t = useTranslations('footer');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim() || status === 'loading') return;

        setStatus('loading');
        await new Promise((res) => setTimeout(res, 900));
        setStatus('success');
        setEmail('');
    };

    const year = new Date().getFullYear();

    return (
        <footer className="bg-background">
            <Container>
                <div className="pt-16 sm:pt-20 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-8">
                    <div className="space-y-8">
                        <Link href="/" className="inline-flex items-baseline text-2xl tracking-wider text-blue-400 font-semibold">
                            Kaza.
                            <span className="text-muted-foreground">Store</span>
                        </Link>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-xs">
                            {t('tagline')}
                        </p>
                        <div>
                            <p className="text-[10px] tracking-[0.25em] text-foreground uppercase mb-3">
                                {t('newsletter.label')}
                            </p>
                            {status === 'success' ? (
                                <p className="text-sm text-muted-foreground font-light">
                                    ✓ You&apos;re subscribed. Welcome to the loop.
                                </p>
                            ) : (
                                <form onSubmit={handleSubscribe} className="flex items-stretch gap-0 max-w-xs">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t('newsletter.placeholder')}
                                        required
                                        disabled={status === 'loading'}
                                        className="flex-1 min-w-0 bg-muted border border-border border-e-0 rounded-s-sm px-4 py-2.5 text-sm font-light text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring transition-colors disabled:opacity-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        aria-label={t('newsletter.cta')}
                                        className="bg-muted hover:bg-accent border border-border rounded-e-sm px-3.5 flex items-center justify-center transition-colors disabled:opacity-50 group"
                                    >
                                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors group-hover:translate-x-0.5" />
                                    </button>
                                </form>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <FooterColumn title={t('shop.title')}>
                        <FooterLink href="/new-arrivals">{t('shop.newArrivals')}</FooterLink>
                        <FooterLink href="/shop">{t('shop.allProducts')}</FooterLink>
                        <FooterLink href="/brands">{t('shop.brands')}</FooterLink>
                        <FooterLink href="/sale">{t('shop.sale')}</FooterLink>
                    </FooterColumn>
                    <FooterColumn title={t('company.title')}>
                        <FooterLink href="/about">{t('company.about')}</FooterLink>
                        <FooterLink href="/careers">{t('company.careers')}</FooterLink>
                        <FooterLink href="/press">{t('company.press')}</FooterLink>
                        <FooterLink href="/stories">{t('company.stories')}</FooterLink>
                    </FooterColumn>
                    <FooterColumn title={t('support.title')}>
                        <FooterLink href="/orders/track">{t('support.track')}</FooterLink>
                        <FooterLink href="/returns">{t('support.returns')}</FooterLink>
                        <FooterLink href="/faq">{t('support.faq')}</FooterLink>
                        <FooterLink href="/contact">{t('support.contact')}</FooterLink>
                    </FooterColumn>
                </div>
                <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-muted-foreground/60 tracking-wide order-last sm:order-first">
                        © {year} Kaza.Store. {t('legal.rights')}
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy"
                            className="text-[11px] text-muted-foreground hover:text-foreground tracking-wide transition-colors"
                        >
                            {t('legal.privacy')}
                        </Link>
                        <Link
                            href="/terms"
                            className="text-[11px] text-muted-foreground hover:text-foreground tracking-wide transition-colors"
                        >
                            {t('legal.terms')}
                        </Link>
                        <LanguageSwitcher
                            variant="text"
                            className="[&_button]:text-muted-foreground [&_button:hover]:text-foreground [&_span]:text-border"
                        />
                    </div>
                </div>
            </Container>
        </footer>
    );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <p className="text-[10px] tracking-[0.25em] text-muted-foreground/70 uppercase">{title}</p>
            <ul className="space-y-3">{children}</ul>
        </div>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="text-sm text-muted-foreground hover:text-foreground font-light transition-colors duration-200"
            >
                {children}
            </Link>
        </li>
    );
}