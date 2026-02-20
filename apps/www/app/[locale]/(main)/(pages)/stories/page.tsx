'use client';

import { Container } from '@/components/container';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

interface Story {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    publishedDate: string;
    readTime: number;
    slug: string;
}

const mockStories: Story[] = [
    {
        id: '1',
        title: 'The Art of Sustainable Fashion',
        excerpt: 'Discover how we\'re redefining luxury through sustainable practices and ethical sourcing.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=85&auto=format&fit=crop',
        category: 'sustainability',
        publishedDate: '2024-01-15',
        readTime: 5,
        slug: 'art-of-sustainable-fashion',
    },
    {
        id: '2',
        title: 'Behind the Scenes: Our Spring Collection',
        excerpt: 'Take a journey through the inspiration and craftsmanship behind our latest collection.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85&auto=format&fit=crop',
        category: 'fashion',
        publishedDate: '2024-01-10',
        readTime: 7,
        slug: 'behind-scenes-spring-collection',
    },
    {
        id: '3',
        title: 'Meet Our Brand Partners',
        excerpt: 'Learn about the talented designers and brands we collaborate with to bring you unique pieces.',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=85&auto=format&fit=crop',
        category: 'brands',
        publishedDate: '2024-01-05',
        readTime: 6,
        slug: 'meet-our-brand-partners',
    },
    {
        id: '4',
        title: 'Fashion Tips for the Modern Woman',
        excerpt: 'Expert styling advice to help you build a wardrobe that reflects your personal style.',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=85&auto=format&fit=crop',
        category: 'lifestyle',
        publishedDate: '2023-12-28',
        readTime: 4,
        slug: 'fashion-tips-modern-woman',
    },
];

export default function StoriesPage() {
    const t = useTranslations('stories');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = [
        { key: 'all', label: t('categories.all') },
        { key: 'fashion', label: t('categories.fashion') },
        { key: 'lifestyle', label: t('categories.lifestyle') },
        { key: 'brands', label: t('categories.brands') },
        { key: 'sustainability', label: t('categories.sustainability') },
    ];

    const filteredStories = selectedCategory === 'all'
        ? mockStories
        : mockStories.filter(story => story.category === selectedCategory);

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
                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.key}
                            onClick={() => setSelectedCategory(category.key)}
                            className={cn(
                                'px-4 py-2 text-sm   tracking-wide rounded-sm border transition-colors',
                                selectedCategory === category.key
                                    ? 'bg-foreground text-background border-foreground'
                                    : 'bg-background text-foreground border-border hover:border-foreground/50'
                            )}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
                {filteredStories.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground  ">
                            {t('noStories')}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredStories.map((story) => (
                            <StoryCard key={story.id} story={story} />
                        ))}
                    </div>
                )}
            </Container>
        </main>
    );
}

function StoryCard({ story }: { story: Story }) {
    const t = useTranslations('stories');

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Link href={`/stories/${story.slug}`} className="group">
            <article className="h-full flex flex-col bg-background border border-border rounded-sm overflow-hidden hover:border-foreground/30 transition-colors">
                <div className="relative aspect-4/3 overflow-hidden bg-muted">
                    <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className="flex-1 p-6 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(story.publishedDate)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{story.readTime} {t('readTime')}</span>
                        </div>
                    </div>
                    <h2 className="text-xl   tracking-wide mb-3 group-hover:text-foreground/80 transition-colors">
                        {story.title}
                    </h2>
                    <p className="text-sm text-muted-foreground   leading-relaxed mb-4 flex-1">
                        {story.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm   text-foreground group-hover:gap-3 transition-all">
                        <span>{t('readMore')}</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </article>
        </Link>
    );
}
