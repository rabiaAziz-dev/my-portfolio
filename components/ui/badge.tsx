import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-all duration-200 select-none focus:outline-none',
  {
    variants: {
      variant: {
        default:
          'neu-pill',
        secondary:
          'bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.03)] border border-slate-300/40 dark:border-slate-700/40',
        destructive:
          'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 shadow-[3px_3px_8px_rgba(244,63,94,0.25)]',
        outline:
          'border border-slate-300 dark:border-slate-700 bg-transparent text-foreground shadow-[2px_2px_6px_rgba(0,0,0,0.06),-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
