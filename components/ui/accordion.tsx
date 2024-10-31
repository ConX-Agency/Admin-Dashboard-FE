"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { InfoIcon } from "lucide-react"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b bg-neutral-800 rounded-md", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        `flex flex-1 flex-wrap items-center justify-between py-4 text-sm font-medium transition-all bg-neutral-400 dark:bg-neutral-950 
          [&[data-state=open]>svg]:rotate-180 rounded-md rounded-b-none px-4`,
        className
      )}
      {...props}
    >
      {children}
      <div className="flex flex-row gap-4 items-center xxxs:w-full xs:w-max justify-end">
        <Button variant="ghost" className="group bg-neutral-400 dark:bg-neutral-950 
          hover:bg-neutral-400 dark:hover:bg-neutral-950 p-0 outline-none focus-visible:outline-none">
          <InfoIcon className="transition-all duration-300 text-black dark:text-white
            group-hover:text-neutral-200 dark:group-hover:text-neutral-500 h-4 w-4 shrink-0 " />
        </Button>
        <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
