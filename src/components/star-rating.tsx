'use client';

import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ControllerRenderProps } from 'react-hook-form';

interface StarRatingProps {
  field: ControllerRenderProps<any, 'rating'>;
}

export function StarRating({ field }: StarRatingProps) {
  const [hover, setHover] = React.useState(0);
  const rating = field.value || 0;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => field.onChange(ratingValue)}
              className="sr-only"
            />
            <Star
              className={cn(
                'h-8 w-8 cursor-pointer transition-colors',
                ratingValue <= (hover || rating)
                  ? 'text-primary fill-primary'
                  : 'text-muted-foreground/50'
              )}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
}
