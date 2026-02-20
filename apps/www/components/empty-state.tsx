import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Link } from '@/i18n/navigation';

interface EmptyStateProps {
    title: string;
    description: string;
    action?: {
        label: string;
        href: string;
    };
    className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
    return (
        <div className={cn('flex flex-col items-center justify-center py-24 text-center', className)}>
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
                <span className="text-2xl text-neutral-300">✕</span>
            </div>
            <h3 className="text-lg   tracking-wide text-neutral-900 mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground/90 max-w-xs leading-relaxed mb-8">{description}</p>
            {action && (
                <Button variant="outline" size="lg" asChild>
                    <Link href={action.href}>{action.label}</Link>
                </Button>
            )}
        </div>
    );
}