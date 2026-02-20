'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
    className?: string;
    variant?: 'pill' | 'text';
}

const LOCALES = [
    { code: 'en', label: 'EN', nativeLabel: 'English' },
    { code: 'ar', label: 'عربي', nativeLabel: 'العربية' },
] as const;

type LocaleCode = (typeof LOCALES)[number]['code'];

export function LanguageSwitcher({ className, variant = 'pill' }: LanguageSwitcherProps) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const handleSwitch = (nextLocale: LocaleCode) => {
        if (nextLocale === locale) return;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    if (variant === 'text') {
        return (
            <div className={cn('flex items-center gap-3', className)}>
                {LOCALES.map((l, i) => (
                    <span key={l.code} className="flex items-center gap-3">
                        <button
                            onClick={() => handleSwitch(l.code)}
                            disabled={isPending}
                            aria-label={`Switch to ${l.nativeLabel}`}
                            className={cn(
                                'text-xs tracking-widest transition-colors duration-200',
                                locale === l.code
                                    ? 'text-neutral-900 font-medium'
                                    : 'text-muted-foreground hover:text-neutral-600'
                            )}
                        >
                            {l.label}
                        </button>
                        {i < LOCALES.length - 1 && (
                            <span className="text-neutral-300 text-xs" aria-hidden>
                                /
                            </span>
                        )}
                    </span>
                ))}
            </div>
        );
    }

    return (
        <div
            className={cn(
                'relative flex items-center h-7 rounded-full border border-neutral-200 bg-neutral-50 p-0.5 gap-0 overflow-hidden',
                isPending && 'opacity-60 pointer-events-none',
                className
            )}
            role="group"
            aria-label="Language selector"
        >
            <span
                aria-hidden
                className={cn(
                    'absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-neutral-900 transition-transform duration-300 ease-in-out cursor-pointer',
                    locale === 'ar' ? 'translate-x-[calc(100%+2px)]' : 'translate-x-0.5'
                )}
            />

            {LOCALES.map((l) => (
                <button
                    key={l.code}
                    onClick={() => handleSwitch(l.code)}
                    disabled={isPending || locale === l.code}
                    aria-pressed={locale === l.code}
                    aria-label={`Switch to ${l.nativeLabel}`}
                    className={cn(
                        'relative z-10 w-8 h-6 flex items-center justify-center text-[10px] font-medium tracking-wider rounded-full transition-colors duration-300 cursor-pointer',
                        locale === l.code
                            ? 'text-white cursor-default'
                            : 'text-muted-foreground/90 hover:text-neutral-800 cursor-pointer'
                    )}
                >
                    {l.label}
                </button>
            ))}
        </div>
    );
}