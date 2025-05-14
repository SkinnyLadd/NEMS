import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/components/ui/app-sidebar"

export const Layout = () => {
    return (
        <div className="flex h-screen">
            <AppSidebar />
            <div className="flex flex-col flex-1">
                <main className="flex-1 p-4 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
