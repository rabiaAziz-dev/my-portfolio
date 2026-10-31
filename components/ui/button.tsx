import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'neu-button-primary',
        secondary:
          'neu-button',
        outline:
          'rounded-2xl border border-slate-300/80 dark:border-slate-700/80 bg-slate-100/80 dark:bg-slate-900/80 shadow-[4px_4px_10px_rgba(163,177,198,0.35),-4px_-4px_10px_rgba(255,255,255,0.85)] dark:shadow-[5px_5px_12px_rgba(0,0,0,0.5),-3px_-3px_8px_rgba(255,255,255,0.03)] hover:shadow-[6px_6px_14px_rgba(163,177,198,0.5),-6px_-6px_14px_rgba(255,255,255,1)] active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.15)] text-foreground',
        destructive:
          'bg-rose-500 text-white rounded-2xl shadow-[5px_5px_14px_rgba(244,63,94,0.4),-4px_-4px_12px_rgba(255,255,255,0.8)] hover:bg-rose-600 active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.3)]',
        ghost:
          'rounded-2xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-5 py-2.5',
        sm: 'h-9 rounded-xl px-3.5 text-xs',
        lg: 'h-12 rounded-2xl px-8 text-base',
        icon: 'h-11 w-11 rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
