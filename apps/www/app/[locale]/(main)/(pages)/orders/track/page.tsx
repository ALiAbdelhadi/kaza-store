'use client';

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle2, MapPin, Package, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, type FormEvent } from 'react';

type OrderStatus = 'processing' | 'shipped' | 'inTransit' | 'outForDelivery' | 'delivered';

interface OrderInfo {
    orderNumber: string;
    orderDate: string;
    status: OrderStatus;
    estimatedDelivery: string;
    trackingNumber: string;
    shippingAddress: string;
}

export default function TrackPage() {
    const t = useTranslations('track');
    const [orderNumber, setOrderNumber] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
    const [notFound, setNotFound] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!orderNumber.trim() || !email.trim()) return;

        setIsLoading(true);
        setNotFound(false);
        setOrderInfo(null);

        try {
            // TODO: Replace with actual API call
            await new Promise((res) => setTimeout(res, 1000));
            
            // Mock data - replace with actual API response
            const mockOrder: OrderInfo = {
                orderNumber: orderNumber.trim(),
                orderDate: new Date().toLocaleDateString(),
                status: 'inTransit',
                estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                trackingNumber: 'TRK123456789',
                shippingAddress: '123 Main Street, Cairo, Egypt',
            };
            
            setOrderInfo(mockOrder);
        } catch (err) {
            setNotFound(true);
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
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="mb-12">
                        <div className="bg-muted/50 border border-border rounded-sm p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                                    {t('form.orderNumber')}
                                </label>
                                <input
                                    type="text"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                    placeholder={t('form.placeholder')}
                                    required
                                    disabled={isLoading}
                                    className={cn(
                                        'w-full border px-4 py-3 text-sm   rounded-sm bg-background',
                                        'focus:outline-none transition-colors placeholder:text-muted-foreground',
                                        'dark:bg-input/30 dark:border-input',
                                        'border-border focus:border-ring'
                                    )}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                                    {t('form.email')}
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('form.emailPlaceholder')}
                                    required
                                    disabled={isLoading}
                                    className={cn(
                                        'w-full border px-4 py-3 text-sm   rounded-sm bg-background',
                                        'focus:outline-none transition-colors placeholder:text-muted-foreground',
                                        'dark:bg-input/30 dark:border-input',
                                        'border-border focus:border-ring'
                                    )}
                                />
                            </div>
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
                                        {t('form.tracking')}
                                    </>
                                ) : (
                                    <>
                                        <Search className="w-4 h-4" />
                                        {t('form.track')}
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                    {notFound && (
                        <div className="bg-muted/50 border border-border rounded-sm p-8 text-center">
                            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl   tracking-wide mb-2">
                                {t('notFound.title')}
                            </h3>
                            <p className="text-sm text-muted-foreground  ">
                                {t('notFound.description')}
                            </p>
                        </div>
                    )}
                    {orderInfo && (
                        <div className="space-y-6">
                            <div className="bg-muted/50 border border-border rounded-sm p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <Package className="w-6 h-6 text-foreground" />
                                    <h2 className="text-xl   tracking-wide">
                                        {t('info.orderNumber')}: {orderInfo.orderNumber}
                                    </h2>
                                </div>
                                <div className="space-y-4">
                                    <InfoRow
                                        label={t('info.orderDate')}
                                        value={orderInfo.orderDate}
                                    />
                                    <InfoRow
                                        label={t('info.status')}
                                        value={
                                            <StatusBadge status={orderInfo.status} />
                                        }
                                    />
                                    <InfoRow
                                        label={t('info.estimatedDelivery')}
                                        value={orderInfo.estimatedDelivery}
                                    />
                                    <InfoRow
                                        label={t('info.trackingNumber')}
                                        value={orderInfo.trackingNumber}
                                    />
                                    <div className="pt-4 border-t border-border">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-1">
                                                    {t('info.shippingAddress')}
                                                </p>
                                                <p className="text-sm text-foreground  ">
                                                    {orderInfo.shippingAddress}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-muted/50 border border-border rounded-sm p-6">
                                <h3 className="text-lg   tracking-wide mb-6">
                                    {t('info.orderStatus')}
                                </h3>
                                <StatusTimeline currentStatus={orderInfo.status} />
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </main>
    );
}

function InfoRow({ label, value }: { label: string; value: string | React.ReactNode }) {
    return (
        <div className="flex justify-between items-start">
            <span className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                {label}
            </span>
            <span className="text-sm text-foreground   text-right">
                {value}
            </span>
        </div>
    );
}

function StatusBadge({ status }: { status: OrderStatus }) {
    const t = useTranslations('track.status');
    const statusLabels: Record<OrderStatus, string> = {
        processing: t('processing'),
        shipped: t('shipped'),
        inTransit: t('inTransit'),
        outForDelivery: t('outForDelivery'),
        delivered: t('delivered'),
    };

    return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs   bg-muted border border-border">
            {statusLabels[status]}
        </span>
    );
}

function StatusTimeline({ currentStatus }: { currentStatus: OrderStatus }) {
    const t = useTranslations('track.status');
    const statuses: OrderStatus[] = ['processing', 'shipped', 'inTransit', 'outForDelivery', 'delivered'];
    const statusLabels: Record<OrderStatus, string> = {
        processing: t('processing'),
        shipped: t('shipped'),
        inTransit: t('inTransit'),
        outForDelivery: t('outForDelivery'),
        delivered: t('delivered'),
    };

    const currentIndex = statuses.indexOf(currentStatus);

    return (
        <div className="space-y-4">
            {statuses.map((status, index) => {
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;

                return (
                    <div key={status} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                            {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-foreground shrink-0" />
                            ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-border shrink-0" />
                            )}
                            {index < statuses.length - 1 && (
                                <div
                                    className={cn(
                                        'w-px h-8 mt-2',
                                        isCompleted ? 'bg-foreground' : 'bg-border'
                                    )}
                                />
                            )}
                        </div>
                        <div className="flex-1 pb-4">
                            <p
                                className={cn(
                                    'text-sm  ',
                                    isCurrent
                                        ? 'text-foreground'
                                        : isCompleted
                                        ? 'text-muted-foreground'
                                        : 'text-muted-foreground/50'
                                )}
                            >
                                {statusLabels[status]}
                            </p>
                        </div>
                    </div>
                );
            })}
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
