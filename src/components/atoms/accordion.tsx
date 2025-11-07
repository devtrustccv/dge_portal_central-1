"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import {ChevronDown} from "lucide-react"

import {cn} from "@/lib/utils"
import Icon from "./Icons"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
    display?: "custom" | "default"
}
>(({className, display = "default", children, ...props}, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn(display === "custom" ? "border-[.5px] rounded-[20px]" : "border-b", className)}
        {...props}
    >
        {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(
                    child as React.ReactElement<{ display?: "custom" | "default" }>,
                    {display}
                );
            }
            return child;
        })}
    </AccordionPrimitive.Item>
));


AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    display?: "custom" | "default",
    hasResponse: boolean /* Add this prop -- KJ */
}
>(({className, children, display = "default", hasResponse=true, ...props}, ref) => (
    <AccordionPrimitive.Header className="flex">
        {display === "custom" && !hasResponse ? (
            <div
                className={cn(
                    "flex flex-1 items-center gap-4 justify-between text-left text-[#334155] font-medium",
                    "py-1 pl-4 pr-1",
                    className
                )}
            >
                <div className="flex-1">{children}</div>
            </div>
        ) : (
            <AccordionPrimitive.Trigger
                ref={ref}
                className={cn(
                    "group flex flex-1 text-[#334155] items-center gap-4 justify-between transition-all text-left font-medium [&[data-state=open]>svg]:rotate-180",
                    display === "custom" ? "py-1 pl-4 pr-1 " : "flex-row-reverse py-4 hover:underline",
                    className
                )}
                {...props}
            >
                <div className="flex-1">{children}</div>
                <span
                    className={cn(
                        display === "custom"
                            ? "w-[30px] h-[30px] border rounded-full border-[#BFC4CD] flex items-center justify-center"
                            : ""
                    )}
                >
                    {display === "custom" ? (
                        <Icon
                            name="arrow-rigth-sm"
                            className="text-[#BFC4CD] transition-all ease-in-out duration-300 group-data-[state=open]:rotate-90"
                        />
                    ) : (
                        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"/>
                    )}
                </span>
            </AccordionPrimitive.Trigger>
        )}
    </AccordionPrimitive.Header>

))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
    display?: "custom" | "default"
}
>(({className, children, display = "default", ...props}, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={cn(
            "overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
            display === "custom" ? " px-4 pt-4 rounded-lg" : "",
            className
        )}
        {...props}
    >
        <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export {Accordion, AccordionItem, AccordionTrigger, AccordionContent}

