import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export function Logo({ className, size = 'large' }: { className?: string; size?: 'small' | 'large' }) {
  const dimensions = size === 'small' ? { width: 80, height: 40 } : { width: 120, height: 60 };

  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 font-headline text-2xl font-black tracking-tighter text-foreground transition-opacity hover:opacity-80',
        className
      )}
    >
      <Image src="/logo.png" alt="STR MIX Logo" width={dimensions.width} height={dimensions.height} priority />
      <span>
        STR<span className="font-medium text-primary">MIX</span>
      </span>
    </Link>
  );
}
