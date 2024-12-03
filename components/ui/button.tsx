import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from "@/lib/utils";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

interface AnimatedIconButtonProps {
  isActive: boolean;
  onClick?: () => void;
  IconActive: React.ComponentType<{ className?: string }>;
  IconInactive: React.ComponentType<{ className?: string }>;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  className?: string;
}

const AnimatedIconButton: React.FC<AnimatedIconButtonProps> = ({
  isActive,
  onClick,
  IconActive, // Icon to show when `isActive` is true
  IconInactive, // Icon to show when `isActive` is false
  variant = 'outline',
  className = 'h-full max-h-[40px] p-2 flex justify-center items-center cursor-pointer px-3',
}) => (
  <AnimatePresence>
    <Button
      variant={variant}
      className={className}
      onClick={onClick}
    >
      {isActive ? (
        <motion.div
          key="active"
          initial={{ translateX: -20, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          exit={{ translateX: 20, opacity: 0 }}
        >
          <IconActive className="h-5 w-5" />
        </motion.div>
      ) : (
        <motion.div
          key="inactive"
          initial={{ translateX: -20, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          exit={{ translateX: 20, opacity: 0 }}
        >
          <IconInactive className="h-5 w-5" />
        </motion.div>
      )}
    </Button>
  </AnimatePresence>
);

interface ActionButtonProps {
  onClick: () => void;
  icon: "trash" | "pencil" | "plus",
  label: string
  textBtn?: string;
  className?: string;
}

const ActionButton = ({ onClick, icon, label, textBtn, className }: ActionButtonProps) => {
  let iconComponent;

  if (icon === "trash") {
    iconComponent = <IconTrash className="h-4 w-4 group-hover:text-neutral-100 duration-100 transition-all" />;
  } else if (icon === "pencil") {
    iconComponent = <IconPencil className="h-4 w-4" />;
  } else if (icon === "plus") {
    iconComponent = <IconPlus className="h-4 w-4" />;
  }

  return (
    <Button
      variant="outline"
      className={`h-[40px] px-3 py-0 duration-500 transition-all group ${icon === "trash" ? "hover:bg-red-600" : ""} ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      {textBtn && (
        <span className="mr-2">
          {textBtn}
        </span>
      )}
      {iconComponent}
    </Button>
  );
};

export { Button, buttonVariants, AnimatedIconButton, ActionButton };