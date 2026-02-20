'use client';

import { useState } from 'react';
import { Container } from '@/components/container';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

// Mock FAQ data - replace with actual API call
const faqData: FAQItem[] = [
    {
        question: 'How do I place an order?',
        answer: 'You can place an order by browsing our collection, selecting your desired items, and proceeding to checkout. We accept all major credit cards and cash on delivery.',
        category: 'orders',
    },
    {
        question: 'What is your shipping policy?',
        answer: 'We offer standard shipping (5-7 business days) and express shipping (2-3 business days). Free standard shipping is available on orders over EGP 500.',
        category: 'shipping',
    },
    {
        question: 'Can I return or exchange items?',
        answer: 'Yes, you can return items within 30 days of purchase, provided they are unworn, unwashed, and in their original packaging with tags attached.',
        category: 'returns',
    },
    {
        question: 'How do I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order on our Track Order page using your order number.',
        category: 'orders',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, debit cards, and cash on delivery for orders within Egypt.',
        category: 'payment',
    },
    {
        question: 'How do I know my size?',
        answer: 'Each product page includes detailed size charts and fit information. If you\'re unsure, our customer service team can help you find the perfect fit.',
        category: 'sizing',
    },
    {
        question: 'Are products authentic?',
        answer: 'Yes, all our products are 100% authentic. We work directly with authorized retailers and brands to ensure authenticity.',
        category: 'products',
    },
    {
        question: 'Do you ship internationally?',
        answer: 'Currently, we only ship within Egypt. We\'re working on expanding our shipping options to other countries.',
        category: 'shipping',
    },
];

export default function FAQPage() {
    const t = useTranslations('faq');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFAQs = searchQuery.trim()
        ? faqData.filter(
            (faq) =>
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : faqData;

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
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('searchPlaceholder')}
                            className={cn(
                                'w-full border px-4 py-3 pl-11 text-sm   rounded-sm bg-background',
                                'focus:outline-none transition-colors placeholder:text-muted-foreground',
                                'dark:bg-input/30 dark:border-input',
                                'border-border focus:border-ring'
                            )}
                        />
                    </div>
                </div>
                <div className="max-w-4xl mx-auto">
                    {filteredFAQs.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground   mb-6">
                                {t('noResults')}
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="text-sm text-foreground underline hover:no-underline"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>
                    ) : (
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {filteredFAQs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border border-border rounded-sm px-6"
                                >
                                    <AccordionTrigger className="text-left   py-6">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground   leading-relaxed pb-6">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </div>
                <div className="max-w-2xl mx-auto mt-16 text-center">
                    <div className="bg-muted/50 border border-border rounded-sm p-8">
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
                    </div>
                </div>
            </Container>
        </main>
    );
}
