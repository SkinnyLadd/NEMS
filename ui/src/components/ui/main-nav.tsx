import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Calendar, Home, ShoppingBag, Users } from "lucide-react"

export function MainNav() {
    const { pathname } = useLocation()

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "Ticketing", href: "/ticketing", icon: ShoppingBag },
        { name: "Calendar", href: "/calendar", icon: Calendar },
        { name: "Users", href: "/users", icon: Users },
    ]

    return (
        <nav className="flex items-center space-x-6 border-b p-4">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                        "flex items-center text-sm font-medium transition-colors hover:text-primary",
                        pathname === item.href ? "text-primary" : "text-muted-foreground"
                    )}
                >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                </Link>
            ))}
        </nav>
    )
}
