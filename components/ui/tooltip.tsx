"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                "z-50 overflow-hidden rounded-md border bg-popover px-3 ml-2 py-1.5 text-sm text-popover-foreground shadow-md",
                className
            )}
            {...props}
        >
            <motion.div
                initial={{ opacity: 0, x: -10 }}  // Start position off to the left with opacity 0
                animate={{ opacity: 1, x: 0 }}     // End position at its original place with opacity 1
                exit={{ opacity: 0, x: -10 }}       // Exit position to the left with opacity 0
                transition={{ duration: 0.2, ease: 'easeInOut' }}       // Adjust the duration of the animation as needed
            >
                {props.children}  {/* Render the tooltip content */}
            </motion.div>
        </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
