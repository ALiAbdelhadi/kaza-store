'use client';

import { Container } from '@/components/container';
import { Award, Heart, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
    const t = useTranslations('about');

    return (
        <main className="min-h-screen bg-background pt-20">
            <Container className="py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl   tracking-wide mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-lg text-muted-foreground   max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>
                <section className="mb-20">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl   tracking-wide mb-6">
                            {t('mission.title')}
                        </h2>
                        <p className="text-base text-muted-foreground   leading-relaxed">
                            {t('mission.description')}
                        </p>
                    </div>
                </section>
                <section className="mb-20">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl   tracking-wide mb-6">
                            {t('vision.title')}
                        </h2>
                        <p className="text-base text-muted-foreground   leading-relaxed">
                            {t('vision.description')}
                        </p>
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl   tracking-wide mb-12 text-center">
                        {t('values.title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <ValueCard
                            icon={Award}
                            title={t('values.quality.title')}
                            description={t('values.quality.description')}
                        />
                        <ValueCard
                            icon={Sparkles}
                            title={t('values.authenticity.title')}
                            description={t('values.authenticity.description')}
                        />
                        <ValueCard
                            icon={Heart}
                            title={t('values.service.title')}
                            description={t('values.service.description')}
                        />
                    </div>
                </section>
            </Container>
        </main>
    );
}

function ValueCard({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}) {
    return (
        <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted border border-border">
                <Icon className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-lg   tracking-wide">{title}</h3>
            <p className="text-sm text-muted-foreground   leading-relaxed">
                {description}
            </p>
        </div>
    );
}
