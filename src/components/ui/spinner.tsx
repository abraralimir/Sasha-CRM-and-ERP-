import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva(
  "animate-spin rounded-full border-solid",
  {
    variants: {
      size: {
        small: "w-4 h-4 border-2",
        medium: "w-8 h-8 border-4",
        large: "w-12 h-12 border-4",
      },
      color: {
        primary: "border-primary border-t-transparent",
        white: "border-white border-t-transparent"
      }
    },
    defaultVariants: {
      size: "medium",
      color: "primary",
    },
  }
);

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export function Spinner({ className, size, color }: SpinnerProps) {
  return (
    <div
      className={cn(spinnerVariants({ size, color }), className)}
    />
  );
}
