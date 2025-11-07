import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex flex-nowrap items-center w-fit justify-center gap-4 whitespace-nowrap rounded-md text-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:text-[#4d4f56] disabled:bg-[#EFF2F5] disabled:opacity-50 [&_svg]:pointer-events-none  [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary rounded-full text-white shadow hover:bg-primary/90  w-auto",
        gradient:
          "bg-gradient-to-r from-[#61C3A8] to-[#2470B8] rounded-full text-white shadow hover:bg-primary/90  w-auto",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-white text-primary shadow-sm hover:bg-white/80 rounded-full font-semibold",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[54px] px-10 py-2  hover:py-3",
        sm: "h-[44px] rounded-full px-6 text-xs hover:px-6 hover:py-2",
        lg: "h-10 px-4 py-2  hover:py-3 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isSimulador?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isSimulador,
      asChild = false,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={`${cn(buttonVariants({ variant, size, className }))} ${
          isSimulador ? "show-simulador" : ""
        }`}
        ref={ref}
        {...props}
      >
        <span> {iconLeft && iconLeft}</span>
        <span>{children}</span>
        <span>{iconRight && iconRight}</span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

