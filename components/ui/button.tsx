"use client";

import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useRippleEffect } from "@/hook/use-ripple-effect";
import { AnimatePresence, motion } from "framer-motion";
import { CircleProgress } from "../circle-progress";

const buttonVariants = cva(
  "relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "[--ripple-clr:theme('colors.primary.foreground')] bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "[--ripple-clr:theme('colors.background')] bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        "outline-destructive":
          "text-destructive border border-destructive/20 shadow-sm hover:border-destructive/15 hover:bg-destructive/15 [--ripple-clr:theme('colors.destructive.DEFAULT')] focus-visible:ring-destructive",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-10 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isSubmitting?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      onPointerDown,
      size,
      isSubmitting,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const rippleEffectEvent = useRippleEffect();

    function pointerDownHandler(event: React.PointerEvent<HTMLButtonElement>) {
      rippleEffectEvent(event);
      onPointerDown?.(event);
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onPointerDown={pointerDownHandler}
        {...props}
      >
        <AnimatePresence>
          {isSubmitting ? (
            <motion.div
              initial={{ width: 0, marginRight: 0, opacity: 0 }}
              animate={{
                width: "auto",
                marginRight: "0.5rem",
                opacity: 1,
              }}
              exit={{ width: 0, marginRight: 0, opacity: 0 }}
            >
              <CircleProgress
                variant="indeterminate"
                strokeWidth={5}
                className="text-lg"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
        <Slottable>{props.children}</Slottable>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
