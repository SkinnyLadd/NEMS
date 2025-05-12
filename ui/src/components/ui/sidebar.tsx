// src/components/ui/sidebar.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function Sidebar({ children, className }: React.PropsWithChildren<{ className?: string }>) {
    return (
        <aside className={cn("flex h-screen w-64 flex-col bg-muted text-muted-foreground", className)}>
            {children}
        </aside>
    )
}

export function SidebarHeader({ children, className }: React.PropsWithChildren<{ className?: string }>) {
    return <div className={cn("px-4 py-4 border-b", className)}>{children}</div>
}

export function SidebarContent({ children, className }: React.PropsWithChildren<{ className?: string }>) {
    return <div className={cn("flex-1 overflow-y-auto px-2 py-4", className)}>{children}</div>
}

export function SidebarFooter({ children, className }: React.PropsWithChildren<{ className?: string }>) {
    return <div className={cn("px-4 py-4 border-t", className)}>{children}</div>
}

export function SidebarGroup({ children, className }: React.PropsWithChildren<{ className?: string }>) {
    return <div className={cn("mb-4", className)}>{children}</div>
}

export function SidebarGroupLabel({ children, className }: React.PropsWithChildren<{ className?: string }>) {
    return <h4 className={cn("px-4 text-xs font-semibold text-muted-foreground uppercase mb-2", className)}>{children}</h4>
}

export function SidebarGroupContent({ children, className }: React.PropsWithChildren<{ className?: string }>) {
    return <div className={cn("space-y-1", className)}>{children}</div>
}

export function SidebarMenu({ children, className }: React.PropsWithChildren<{ className?: string }>) {
    return <nav className={cn("flex flex-col", className)}>{children}</nav>
}

export function SidebarMenuItem({ children, className }: React.PropsWithChildren<{ className?: string }>) {
    return <div className={cn("px-2", className)}>{children}</div>
}


export function SidebarMenuButton({
                                      children,
                                      className,
                                      isActive,
                                      size = "md",
                                      asChild = false,
                                  }: {
    children: React.ReactNode
    className?: string
    isActive?: boolean
    size?: "sm" | "md" | "lg"
    asChild?: boolean
}) {
    const base = "flex items-center gap-3 w-full text-left rounded-md px-3 py-2 transition-colors hover:bg-accent"
    const active = "bg-accent text-primary"
    const sizes = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
    }

    const finalClass = cn(base, sizes[size], isActive && active, className)

    // Ensure child is a valid ReactElement and assert its type
    if (asChild && React.isValidElement(children)) {
        const element = children as React.ReactElement<{ className?: string }>

        return React.cloneElement(element, {
            className: cn(element.props.className, finalClass),
        })
    }

    return <button className={finalClass}>{children}</button>
}



export function SidebarSeparator({ className }: { className?: string }) {
    return <hr className={cn("my-4 border-t border-border", className)} />
}

export function SidebarRail({ className }: { className?: string }) {
    return <div className={cn("hidden lg:block w-2 bg-muted", className)} />
}
