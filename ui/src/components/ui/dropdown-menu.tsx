import * as React from "react"

import {
    Content,
    DropdownMenu as DropdownMenuPrimitive,
    Item,
    Label as DropdownMenuLabel,
    Portal,
    Separator as DropdownMenuSeparator,
    Trigger,
} from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive

const DropdownMenuTrigger = Trigger

const DropdownMenuContent = React.forwardRef<
    React.ElementRef<typeof Content>,
    React.ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
    <Portal>
        <Content
            ref={ref}
            className={cn(
                "z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
                className
            )}
            {...props}
        />
    </Portal>
))
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<
    React.ElementRef<typeof Item>,
    React.ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, ref) => (
    <Item
        ref={ref}
        className={cn(
            "cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted",
            className
        )}
        {...props}
    />
))
DropdownMenuItem.displayName = "DropdownMenuItem"

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
}
