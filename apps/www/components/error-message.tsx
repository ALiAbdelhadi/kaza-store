import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface ErrorMessageProps {
    message?: string;
    onRetry?: () => void;
    className?: string;
}

export function ErrorMessage({
    message = 'Something went wrong. Please try again.',
    onRetry,
    className,
}: ErrorMessageProps) {
    return (
        <div className={cn('flex flex-col items-center justify-center py-24 text-center', className)}>
            <p className="text-sm text-neutral-500 mb-4">{message}</p>
            {onRetry && (
                <Button variant="outline" size="sm" onClick={onRetry}>
                    Try Again
                </Button>
            )}
        </div>
    );
}