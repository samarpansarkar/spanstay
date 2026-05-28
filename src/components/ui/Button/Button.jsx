import { forwardRef } from "react";

import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-primary text-white hover:bg-indigo-700",

  secondary: "bg-white border border-slate-200 hover:bg-slate-100",

  ghost: "hover:bg-slate-100",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6",
  lg: "h-14 px-8 text-lg",
};

const Button = forwardRef(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
