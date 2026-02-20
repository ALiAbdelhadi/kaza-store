'use client';

import { useState, type FormEvent } from 'react';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

type FormErrors = Partial<Record<'name' | 'email' | 'subject' | 'message' | 'root', string>>;

function validate(values: { name: string; email: string; subject: string; message: string }): FormErrors {
    const errors: FormErrors = {};
    if (!values.name.trim()) errors.name = 'Name is required.';
    if (!values.email.trim()) {
        errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Enter a valid email address.';
    }
    if (!values.subject.trim()) errors.subject = 'Subject is required.';
    if (!values.message.trim()) errors.message = 'Message is required.';
    return errors;
}

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <label className="block text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                {label}
            </label>
            {children}
            {error && (
                <p className="text-[11px] text-red-500 leading-tight">{error}</p>
            )}
        </div>
    );
}

function inputCls(hasError: boolean) {
    return cn(
        'w-full border px-4 py-3 text-sm   rounded-sm bg-background',
        'focus:outline-none transition-colors placeholder:text-muted-foreground',
        'dark:bg-input/30 dark:border-input',
        hasError
            ? 'border-red-300 focus:border-red-500 dark:border-red-500'
            : 'border-border focus:border-ring'
    );
}

export default function ContactPage() {
    const t = useTranslations('contact');
    const [values, setValues] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const update = <K extends keyof typeof values>(k: K, v: typeof values[K]) => {
        const next = { ...values, [k]: v };
        setValues(next);
        if (touched.has(k)) {
            setErrors((prev) => ({ ...prev, [k]: validate(next)[k] }));
        }
    };

    const blur = (k: string) => {
        setTouched((s) => new Set(s).add(k));
        setErrors((prev) => ({ ...prev, [k]: validate(values)[k as keyof typeof values] }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const errs = validate(values);
        setErrors(errs);
        setTouched(new Set(Object.keys(values)));
        if (Object.keys(errs).length > 0) return;

        setIsLoading(true);
        setErrors({});
        setStatus('idle');

        try {
            // TODO: Replace with actual API call
            await new Promise((res) => setTimeout(res, 1000));
            setStatus('success');
            setValues({ name: '', email: '', subject: '', message: '' });
            setTouched(new Set());
        } catch (err) {
            setStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background pt-20">
            <Container className="py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl   tracking-wide mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-lg text-muted-foreground  ">
                        {t('subtitle')}
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div>
                        <form onSubmit={handleSubmit} noValidate className="space-y-5">
                            {status === 'success' && (
                                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-sm px-4 py-3">
                                    <p className="text-sm text-green-600 dark:text-green-400  ">
                                        {t('form.success')}
                                    </p>
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-sm px-4 py-3">
                                    <p className="text-sm text-red-600 dark:text-red-400  ">
                                        {t('form.error')}
                                    </p>
                                </div>
                            )}
                            <Field label={t('form.name')} error={errors.name}>
                                <input
                                    type="text"
                                    value={values.name}
                                    onChange={(e) => update('name', e.target.value)}
                                    onBlur={() => blur('name')}
                                    placeholder="Ahmed Hassan"
                                    autoComplete="name"
                                    disabled={isLoading}
                                    className={inputCls(!!errors.name)}
                                />
                            </Field>
                            <Field label={t('form.email')} error={errors.email}>
                                <input
                                    type="email"
                                    value={values.email}
                                    onChange={(e) => update('email', e.target.value)}
                                    onBlur={() => blur('email')}
                                    placeholder="ahmed@example.com"
                                    autoComplete="email"
                                    disabled={isLoading}
                                    className={inputCls(!!errors.email)}
                                />
                            </Field>
                            <Field label={t('form.subject')} error={errors.subject}>
                                <input
                                    type="text"
                                    value={values.subject}
                                    onChange={(e) => update('subject', e.target.value)}
                                    onBlur={() => blur('subject')}
                                    placeholder="How can we help?"
                                    disabled={isLoading}
                                    className={inputCls(!!errors.subject)}
                                />
                            </Field>
                            <Field label={t('form.message')} error={errors.message}>
                                <textarea
                                    value={values.message}
                                    onChange={(e) => update('message', e.target.value)}
                                    onBlur={() => blur('message')}
                                    placeholder="Your message..."
                                    rows={6}
                                    disabled={isLoading}
                                    className={inputCls(!!errors.message)}
                                />
                            </Field>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className={cn(
                                    'w-full flex items-center justify-center gap-2',
                                    'h-11 rounded-sm text-sm tracking-widest uppercase',
                                    'disabled:opacity-50 disabled:cursor-not-allowed'
                                )}
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner />
                                        {t('form.sending')}
                                    </>
                                ) : (
                                    <>
                                        {t('form.submit')}
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl   tracking-wide mb-6">
                                {t('info.title')}
                            </h2>
                            <div className="space-y-6">
                                <ContactInfoItem
                                    icon={Mail}
                                    label={t('info.email')}
                                    value={t('info.emailValue')}
                                    href="mailto:hello@kaza.store"
                                />
                                <ContactInfoItem
                                    icon={Phone}
                                    label={t('info.phone')}
                                    value={t('info.phoneValue')}
                                    href="tel:+201234567890"
                                />
                                <ContactInfoItem
                                    icon={MapPin}
                                    label={t('info.address')}
                                    value={t('info.addressValue')}
                                />
                                <ContactInfoItem
                                    icon={Clock}
                                    label={t('info.hours')}
                                    value={t('info.hoursValue')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}

function ContactInfoItem({
    icon: Icon,
    label,
    value,
    href,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    href?: string;
}) {
    const content = (
        <div className="flex items-start gap-4">
            <div className="mt-0.5">
                <Icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
                <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-1">
                    {label}
                </p>
                <p className="text-sm text-foreground  ">{value}</p>
            </div>
        </div>
    );

    if (href) {
        return (
            <a
                href={href}
                className="block hover:opacity-70 transition-opacity"
            >
                {content}
            </a>
        );
    }

    return <div>{content}</div>;
}

function Spinner() {
    return (
        <svg
            className="animate-spin w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden
        >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a8 8 0 00-8 8h4z" />
        </svg>
    );
}
