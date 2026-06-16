import { cn } from '@/lib/cn';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const variants = {
  primary: 'bg-primary text-on-surface hover:bg-indigo-700',

  secondary: 'border border-slate-200 bg-white hover:bg-slate-100',

  ghost: 'hover:bg-slate-100',
};

const sizes = {
  sm: 'h-9 px-4 text-sm',

  md: 'h-11 px-6',

  lg: 'h-14 px-8 text-lg',
};

const Button = forwardRef(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      disabled,

      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        type="button"
        ref={ref}
        disabled={disabled}
        whileTap={{
          scale: 0.96,
        }}
        whileHover={{
          scale: 1.02,
        }}
        transition={{
          duration: 0.15,
        }}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50',

          variants[variant],

          sizes[size],

          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
