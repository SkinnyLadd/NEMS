import * as React from "react"
import {
    Dialog as DialogPrimitive,
    DialogContent as DialogContentPrimitive,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogContentPrimitive>,
    React.ComponentPropsWithoutRef<typeof DialogContentPrimitive>
>(({ className, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogContentPrimitive
            ref={ref}
            className={cn(
                "fixed z-50 left-1/2 top-1/2 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded-md shadow-lg",
                className
            )}
            {...props}
        />
    </DialogPortal>
))
DialogContent.displayName = "DialogContent"

// ✅ Add DialogHeader
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

// ✅ Add DialogFooter
const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
DialogFooter.displayName = "DialogFooter"

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader,  // ✅ Now exported
    DialogFooter,  // ✅ Now exported
}
