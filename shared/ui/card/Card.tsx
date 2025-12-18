import { ComponentProps, forwardRef } from 'react';
import { clsx } from 'clsx';

type CardProps = ComponentProps<'div'>;

export const Card = forwardRef<HTMLDivElement, CardProps>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('border-dark-300 bg-dark-500 rounded-xs border', className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
