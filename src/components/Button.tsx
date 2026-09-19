import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "icon";
};

const styles = {
  primary:
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
  outline:
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-border bg-background/70 px-6 text-sm font-semibold text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
  ghost:
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-sm px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  icon:
    "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition-all duration-300 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
};

export function Button({ asChild, className = "", variant = "primary", ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={`${styles[variant]} ${className}`} {...props} />;
}