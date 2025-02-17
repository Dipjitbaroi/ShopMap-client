import { SidebarProvider } from "../ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"

export const SideBarWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <SidebarProvider className="px-4 md:px-10">
                <DashboardSidebar />
                <div className="w-full min-h-screen">{children}</div>
            </SidebarProvider>
        </div>
    )
}
