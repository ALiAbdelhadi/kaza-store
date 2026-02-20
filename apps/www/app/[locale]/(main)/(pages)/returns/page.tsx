'use client';

import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { CheckCircle2, CreditCard, Package, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ReturnsPage() {
    const t = useTranslations('returns');

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
                <div className="max-w-4xl mx-auto space-y-16">
                    <section>
                        <h2 className="text-2xl   tracking-wide mb-6">
                            {t('policy.title')}
                        </h2>
                        <p className="text-base text-muted-foreground   leading-relaxed mb-6">
                            {t('policy.description')}
                        </p>
                        <div className="bg-muted/50 border border-border rounded-sm p-6">
                            <h3 className="text-lg   tracking-wide mb-4">
                                {t('policy.conditions.title')}
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
                                    <span className="text-sm text-muted-foreground  ">
                                        {t('policy.conditions.item1')}
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
                                    <span className="text-sm text-muted-foreground  ">
                                        {t('policy.conditions.item2')}
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
                                    <span className="text-sm text-muted-foreground  ">
                                        {t('policy.conditions.item3')}
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
                                    <span className="text-sm text-muted-foreground  ">
                                        {t('policy.conditions.item4')}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl   tracking-wide mb-8">
                            {t('process.title')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ProcessStep
                                step={1}
                                icon={Package}
                                title={t('process.step1.title')}
                                description={t('process.step1.description')}
                            />
                            <ProcessStep
                                step={2}
                                icon={Truck}
                                title={t('process.step2.title')}
                                description={t('process.step2.description')}
                            />
                            <ProcessStep
                                step={3}
                                icon={Package}
                                title={t('process.step3.title')}
                                description={t('process.step3.description')}
                            />
                            <ProcessStep
                                step={4}
                                icon={CreditCard}
                                title={t('process.step4.title')}
                                description={t('process.step4.description')}
                            />
                        </div>
                    </section>
                    <section>
                        <div className="bg-muted/50 border border-border rounded-sm p-8">
                            <h2 className="text-2xl   tracking-wide mb-4">
                                {t('exchanges.title')}
                            </h2>
                            <p className="text-base text-muted-foreground   leading-relaxed">
                                {t('exchanges.description')}
                            </p>
                        </div>
                    </section>
                    <section className="text-center">
                        <h2 className="text-2xl   tracking-wide mb-4">
                            {t('contact.title')}
                        </h2>
                        <p className="text-base text-muted-foreground   mb-6">
                            {t('contact.description')}
                        </p>
                        <Link href="/contact">
                            <Button variant="outline">
                                {t('contact.button')}
                            </Button>
                        </Link>
                    </section>
                </div>
            </Container>
        </main>
    );
}

function ProcessStep({
    step,
    icon: Icon,
    title,
    description,
}: {
    step: number;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
                    <span className="text-sm   text-foreground">{step}</span>
                </div>
                <div className="w-px h-full bg-border mt-2" />
            </div>
            <div className="flex-1 pb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-foreground" />
                    <h3 className="text-lg   tracking-wide">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground   leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}
