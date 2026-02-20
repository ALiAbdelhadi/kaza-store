'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { Link, useRouter } from '@/i18n/navigation';
import { Eye, EyeOff, ArrowRight, Check, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import type { SignupPayload } from '@/types/auth';
import { Button } from '@/components/ui/button';

interface StrengthResult {
    score: number;
    label: string;
    color: string;
}

function getStrength(password: string): StrengthResult {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    score = Math.min(score, 4);

    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['', 'bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-emerald-400'];
    return { score, label: labels[score] ?? '', color: colors[score] ?? '' };
}

type FormErrors = Partial<Record<keyof SignupPayload | 'root', string>>;

function validate(v: SignupPayload): FormErrors {
    const e: FormErrors = {};
    if (!v.first_name.trim()) e.first_name = 'First name is required.';
    if (!v.last_name.trim()) e.last_name = 'Last name is required.';
    if (!v.email.trim())
        e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
        e.email = 'Enter a valid email address.';
    if (!v.password)
        e.password = 'Password is required.';
    else if (v.password.length < 8)
        e.password = 'Password must be at least 8 characters.';
    if (v.password_confirmation !== v.password)
        e.password_confirmation = 'Passwords do not match.';
    if (v.phone && !/^(\+20|0)?1[0125][0-9]{8}$/.test(v.phone.replace(/\s/g, '')))
        e.phone = 'Enter a valid Egyptian phone number.';
    return e;
}

function Field({
    label,
    error,
    optional,
    children,
}: {
    label: string;
    error?: string;
    optional?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-neutral-500">
                {label}
                {optional && (
                    <span className="normal-case tracking-normal text-[10px] text-neutral-300">
                        (optional)
                    </span>
                )}
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
        'w-full border px-4 py-3 text-sm font-light rounded-sm bg-white',
        'focus:outline-none transition-colors placeholder:text-neutral-300',
        hasError
            ? 'border-red-300 focus:border-red-500'
            : 'border-neutral-200 focus:border-neutral-800'
    );
}

function Spinner() {
    return (
        <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a8 8 0 00-8 8h4z" />
        </svg>
    );
}

const INITIAL: SignupPayload = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
};

export default function SignupPage() {
    const { setSession } = useAuth();
    const router = useRouter();

    const [values, setValues] = useState<SignupPayload>(INITIAL);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Set<string>>(new Set());
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [agreedError, setAgreedError] = useState(false);

    const strength = getStrength(values.password);

    const update = <K extends keyof SignupPayload>(k: K, v: SignupPayload[K]) => {
        const next = { ...values, [k]: v };
        setValues(next);
        if (touched.has(k)) {
            setErrors((prev) => ({ ...prev, [k]: validate(next)[k] }));
        }
    };

    const blur = (k: string) => {
        setTouched((s) => new Set(s).add(k));
        setErrors((prev) => ({ ...prev, [k]: validate(values)[k as keyof SignupPayload] }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const errs = validate(values);
        setErrors(errs);
        setTouched(new Set(Object.keys(values)));

        if (!agreed) { setAgreedError(true); return; }
        setAgreedError(false);
        if (Object.keys(errs).length > 0) return;

        setIsLoading(true);
        setErrors({});

        try {
            /**
             * ─── 🔌 BACKEND INTEGRATION POINT ────────────────────────────
             * Replace the block below with your real API call:
             *
             *   const res = await apiClient.post<AuthResponse, SignupPayload>('/auth/register', values);
             *   setSession(res.user, res.token);
             *   router.push('/');
             *
             * ─────────────────────────────────────────────────────────────
             */
            await new Promise((res) => setTimeout(res, 800));
            throw new Error('REPLACE_ME');

        } catch (err) {
            const message = err instanceof Error && err.message !== 'REPLACE_ME'
                ? err.message
                : 'Something went wrong. Please try again.';
            setErrors({ root: message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-row-reverse">
            <div className="hidden lg:block lg:w-[44%] xl:w-[50%] relative overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=85&auto=format&fit=crop"
                    alt="Kaza.Store — fashion boutique interior"
                    fill
                    priority
                    sizes="50vw"
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-l from-black/40 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-12">
                    <div />
                    <div className="space-y-6">
                        <div className="flex gap-2 flex-wrap">
                            {['Free Returns', 'Next-day Delivery', 'Exclusive Brands'].map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1.5 text-xs text-white/70 border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm"
                                >
                                    <Check className="w-3 h-3 text-white/50" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <p className="text-2xl font-light text-white/80 leading-snug max-w-xs">
                            Join thousands of customers who shop smarter with Kaza Store.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex items-start justify-center px-6 py-12 bg-neutral-50 overflow-y-auto">
                <div className="w-full max-w-[420px] space-y-7">
                    <Link href="/" className='flex'>
                        <span className='flex items-center justify-center gap-4'>
                            <ArrowLeft className='rtl:rotate-180 w-4 h-4' />
                            Back to home
                        </span>
                    </Link>
                    <Link
                        href="/"
                        className="lg:hidden block text-xl tracking-wider text-blue-500 font-semibold"
                    >
                        Kaza.<span className="text-neutral-400">Store</span>
                    </Link>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-light tracking-tight text-neutral-900">
                            Create account
                        </h1>
                        <p className="text-sm text-neutral-400 font-light">
                            Join Kaza.Store for exclusive access & faster checkout
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        {errors.root && (
                            <div className="bg-red-50 border border-red-200 rounded-sm px-4 py-3">
                                <p className="text-sm text-red-600 font-light">{errors.root}</p>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="First Name" error={errors.first_name}>
                                <input
                                    type="text"
                                    value={values.first_name}
                                    onChange={(e) => update('first_name', e.target.value)}
                                    onBlur={() => blur('first_name')}
                                    placeholder="Ahmed"
                                    autoComplete="given-name"
                                    disabled={isLoading}
                                    className={inputCls(!!errors.first_name)}
                                />
                            </Field>
                            <Field label="Last Name" error={errors.last_name}>
                                <input
                                    type="text"
                                    value={values.last_name}
                                    onChange={(e) => update('last_name', e.target.value)}
                                    onBlur={() => blur('last_name')}
                                    placeholder="Hassan"
                                    autoComplete="family-name"
                                    disabled={isLoading}
                                    className={inputCls(!!errors.last_name)}
                                />
                            </Field>
                        </div>
                        <Field label="Email" error={errors.email}>
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
                        <Field label="Phone" error={errors.phone} optional>
                            <input
                                type="tel"
                                value={values.phone ?? ''}
                                onChange={(e) => update('phone', e.target.value)}
                                onBlur={() => blur('phone')}
                                placeholder="01012345678"
                                autoComplete="tel"
                                disabled={isLoading}
                                className={inputCls(!!errors.phone)}
                            />
                        </Field>
                        <Field label="Password" error={errors.password}>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={(e) => update('password', e.target.value)}
                                    onBlur={() => blur('password')}
                                    placeholder="Min. 8 characters"
                                    autoComplete="new-password"
                                    disabled={isLoading}
                                    className={cn(inputCls(!!errors.password), 'pr-11')}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass((v) => !v)}
                                    aria-label={showPass ? 'Hide password' : 'Show password'}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                                >
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {values.password.length > 0 && (
                                <div className="mt-2 space-y-1">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map((bar) => (
                                            <div
                                                key={bar}
                                                className={cn(
                                                    'h-1 flex-1 rounded-full transition-colors duration-300',
                                                    bar <= strength.score
                                                        ? strength.color
                                                        : 'bg-neutral-200'
                                                )}
                                            />
                                        ))}
                                    </div>
                                    {strength.label && (
                                        <p className={cn(
                                            'text-[11px] font-light',
                                            strength.score <= 1 ? 'text-red-400'
                                                : strength.score === 2 ? 'text-amber-500'
                                                    : strength.score === 3 ? 'text-blue-500'
                                                        : 'text-emerald-500'
                                        )}>
                                            {strength.label} password
                                        </p>
                                    )}
                                </div>
                            )}
                        </Field>
                        <Field label="Confirm Password" error={errors.password_confirmation}>
                            <div className="relative">
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    value={values.password_confirmation}
                                    onChange={(e) => update('password_confirmation', e.target.value)}
                                    onBlur={() => blur('password_confirmation')}
                                    placeholder="Repeat your password"
                                    autoComplete="new-password"
                                    disabled={isLoading}
                                    className={cn(inputCls(!!errors.password_confirmation), 'pr-11')}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm((v) => !v)}
                                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                                >
                                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                {values.password_confirmation.length > 0 &&
                                    !errors.password_confirmation &&
                                    values.password === values.password_confirmation && (
                                        <Check className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                    )}
                            </div>
                        </Field>
                        <div className="space-y-1">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <span
                                    className={cn(
                                        'mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors',
                                        agreed
                                            ? 'bg-neutral-900 border-neutral-900'
                                            : agreedError
                                                ? 'border-red-400 bg-white'
                                                : 'border-neutral-300 bg-white group-hover:border-neutral-500'
                                    )}
                                    onClick={() => { setAgreed((v) => !v); setAgreedError(false); }}
                                    role="checkbox"
                                    aria-checked={agreed}
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === ' ' && setAgreed((v) => !v)}
                                >
                                    {agreed && <Check className="w-2.5 h-2.5 text-white" />}
                                </span>
                                <span className="text-xs text-neutral-500 font-light leading-relaxed">
                                    I agree to the{' '}
                                    <Link href="/terms" className="text-neutral-800 underline underline-offset-2 hover:text-neutral-600">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="/privacy" className="text-neutral-800 underline underline-offset-2 hover:text-neutral-600">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                            {agreedError && (
                                <p className="text-[11px] text-red-500 ps-7">
                                    You must agree to continue.
                                </p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={cn(
                                'w-full flex items-center justify-center gap-2',
                                'h-11 rounded-sm text-sm tracking-widest uppercase',
                                'disabled:opacity-50 disabled:cursor-not-allowed',
                                'group'
                            )}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                </>
                            )}
                        </Button>
                    </form>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-neutral-50 text-xs text-neutral-400 tracking-widest uppercase">
                                or
                            </span>
                        </div>
                    </div>
                    <p className="text-center text-sm text-neutral-500 font-light pb-4">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="text-neutral-900 font-medium hover:underline underline-offset-4"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}