'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { Link, useRouter } from '@/i18n/navigation';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import type { LoginPayload } from '@/types/auth';
import { Button } from '@/components/ui/button';

type FormErrors = Partial<Record<keyof LoginPayload | 'root', string>>;

function validate(values: LoginPayload): FormErrors {
    const errors: FormErrors = {};
    if (!values.email.trim())
        errors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
        errors.email = 'Enter a valid email address.';
    if (!values.password)
        errors.password = 'Password is required.';
    else if (values.password.length < 8)
        errors.password = 'Password must be at least 8 characters.';
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
            <label className="block text-[11px] tracking-[0.18em] uppercase text-neutral-500">
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
        'w-full border px-4 py-3 text-sm font-light rounded-sm bg-white',
        'focus:outline-none transition-colors placeholder:text-neutral-300',
        hasError
            ? 'border-red-300 focus:border-red-500'
            : 'border-neutral-200 focus:border-neutral-800'
    );
}

// ─── Page ─────────────────────────────────────────────────────────
export default function LoginPage() {
    const { setSession } = useAuth();
    const router = useRouter();

    const [values, setValues]       = useState<LoginPayload>({ email: '', password: '' });
    const [errors, setErrors]       = useState<FormErrors>({});
    const [touched, setTouched]     = useState<Set<string>>(new Set());
    const [showPass, setShowPass]   = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const update = <K extends keyof LoginPayload>(k: K, v: LoginPayload[K]) => {
        const next = { ...values, [k]: v };
        setValues(next);
        if (touched.has(k)) {
            setErrors((prev) => ({ ...prev, [k]: validate(next)[k] }));
        }
    };

    const blur = (k: string) => {
        setTouched((s) => new Set(s).add(k));
        setErrors((prev) => ({ ...prev, [k]: validate(values)[k as keyof LoginPayload] }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const errs = validate(values);
        setErrors(errs);
        setTouched(new Set(Object.keys(values)));
        if (Object.keys(errs).length > 0) return;

        setIsLoading(true);
        setErrors({});

        try {
            /**
             * ─── 🔌 BACKEND INTEGRATION POINT ────────────────────────────
             * Replace the block below with your real API call:
             *
             *   const res = await apiClient.post<AuthResponse, LoginPayload>('/auth/login', values);
             *   setSession(res.user, res.token);
             *
             * The apiClient lives in @/lib/api.ts
             * ─────────────────────────────────────────────────────────────
             */
            await new Promise((res) => setTimeout(res, 800))
            throw new Error('REPLACE_ME'); 

        } catch (err) {
            const message = err instanceof Error && err.message !== 'REPLACE_ME'
                ? err.message
                : 'Invalid email or password. Please try again.';
            setErrors({ root: message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:block lg:w-[52%] xl:w-[58%] relative overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=85&auto=format&fit=crop"
                    alt="Kaza.Store — woman in editorial fashion setting"
                    fill
                    priority
                    sizes="58vw"
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/40 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-12">
                    <Link href="/" className="text-2xl tracking-wider text-white font-semibold">
                        Kaza.<span className="text-white/50">Store</span>
                    </Link>
                    <blockquote className="max-w-xs">
                        <p className="text-xl font-light text-white/80 leading-snug italic">
                            &quot;Style is a way to say who you are without having to speak.&quot;
                        </p>
                        <footer className="mt-3 text-xs tracking-widest text-white/40 uppercase">
                            Rachel Zoe
                        </footer>
                    </blockquote>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center px-6 py-16 bg-neutral-50">
                <div className="w-full max-w-[400px] space-y-8">
                    <Link
                        href="/"
                        className="lg:hidden block text-xl tracking-wider text-blue-500 font-semibold"
                    >
                        Kaza.<span className="text-neutral-400">Store</span>
                    </Link>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-light tracking-tight text-neutral-900">
                            Welcome back
                        </h1>
                        <p className="text-sm text-neutral-400 font-light">
                            Sign in to your account to continue
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        {errors.root && (
                            <div className="bg-red-50 border border-red-200 rounded-sm px-4 py-3">
                                <p className="text-sm text-red-600 font-light">{errors.root}</p>
                            </div>
                        )}
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
                        <Field label="Password" error={errors.password}>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={(e) => update('password', e.target.value)}
                                    onBlur={() => blur('password')}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    disabled={isLoading}
                                    className={cn(inputCls(!!errors.password), 'pr-11')}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass((v) => !v)}
                                    aria-label={showPass ? 'Hide password' : 'Show password'}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                                >
                                    {showPass ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </Field>
                        <div className="flex justify-end">
                            <Link
                                href="/auth/forgot-password"
                                className="text-xs text-neutral-400 hover:text-neutral-700 tracking-wide transition-colors border-b border-neutral-200 hover:border-neutral-600 pb-px"
                            >
                                Forgot password?
                            </Link>
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
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
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
                    <p className="text-center text-sm text-neutral-500 font-light">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/signup"
                            className="text-neutral-900 font-medium hover:underline underline-offset-4"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
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