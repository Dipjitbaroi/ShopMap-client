import { AllImage } from "@/constants/image.constant"
import { useLanguage } from "@/store/language.store"
import { RouteUrl } from "@/view/router/url"
import { BarChart2, TrendingDown, TrendingUp } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import CircularProgress from "../common/circular-progress"
import MyButton from "../common/form/my-button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar"

export function DashboardSidebar() {
    const location = useLocation()
    const { language } = useLanguage()

    // Menu items.
    const items = [
        {
            title: language === "english" ? "Dashboard" : "Irányítópult",
            url: RouteUrl.HOME,
            icon:
                location.pathname === "/" ? (
                    <img src={AllImage.LAYOUT_WHITE} className="w-6 h-6" />
                ) : (
                    <img src={AllImage.LAYOUT_BLACK} className="w-6 h-6" />
                ),
        },
        {
            title: language === "english" ? "Products" : "Termékek",
            url: RouteUrl.PRODUCTS,
            icon: <img src={AllImage.BOX_BLACK} className="w-6 h-6" />,
        },
        {
            title: language === "english" ? "Marketing" : "Marketing",
            url: "#",
            icon: <img src={AllImage.BAR_CHART_BLACK} className="w-6 h-6" />,
        },
        {
            title: language === "english" ? "Inc. & Exp. Report " : "Mérleg",
            url: "#",
            icon: <img src={AllImage.REPORT_BLACK} className="w-6 h-6" />,
        },
        {
            title: language === "english" ? "Shipping Profile" : "Szállítási profil",
            url: "#",
            icon: <img src={AllImage.SHIPPING_BLACK} className="w-6 h-6" />,
        },
        {
            title: language === "english" ? "Fees" : "Díjak",
            url: "#",
            icon: <img src={AllImage.FEES_BLACK} className="w-6 h-6" />,
        },
        {
            title: language === "english" ? "Expenses" : "Kiadások",
            url: "#",
            icon: <img src={AllImage.EXPENSES_BLACK} className="w-6 h-6" />,
        },
        {
            title: language === "english" ? "Integrations" : "Integrációk",
            url: "#",
            icon: <img src={AllImage.INTEGRATIONS_BLACK} className="w-6 h-6" />,
        },
        {
            title: language === "english" ? "Settings" : "Beállítások",
            url: "#",
            icon: <img src={AllImage.SETTINGS_BLACK} className="w-6 h-6" />,
        },
        {
            title: language === "english" ? "Tutorial" : "Hogyan működik?",
            url: "#",
            icon: <img src={AllImage.TUTORIAL_BLACK} className="w-6 h-6" />,
        },
    ]
    return (
        <div>
            <Sidebar className="border-none shadow-lg m-6 rounded-lg bg-gray-50 border py-2">
                <SidebarHeader>
                    <img src={AllImage.LOGO_BLACK} className="w-10/12 mx-auto p-6" />
                </SidebarHeader>
                <SidebarContent className=" border-none bg-transparent scrollbar-hide">
                    <SidebarGroup className="bg-transparent">
                        {/* <MySpacer className="h-2" /> */}
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => {
                                    const isActive = item.url === location.pathname
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                className={`${
                                                    isActive
                                                        ? "bg-[#054396] text-white shadow-md hover:bg-[#054396] hover:text-white"
                                                        : ""
                                                }`}
                                            >
                                                <Link to={item.url} className="py-5">
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarFooter className="border-t mt-10 text-red-500">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <MyButton
                                variant={"secondary"}
                                onClick={() => console.log("clicked")}
                                className="w-fit p-0 h-fit"
                            >
                                <img src={AllImage.CALENDAR} className="w-6 h-6" />
                            </MyButton>

                            <MyButton
                                variant={"secondary"}
                                onClick={() => console.log("clicked")}
                                className="w-fit p-0 h-fit"
                            >
                                <img src={AllImage.LIST2} className="w-6 h-6" />
                            </MyButton>
                        </div>
                        <div className="space-y-4">
                            <CircularProgress
                                progress={50}
                                size={120}
                                progressText="150e Ft"
                                subtitle="Net Profit"
                                icon={<TrendingUp size={18} />}
                                primaryColor="#22c55e"
                                tooltip="Az előző időszakhoz képest ennyivel több %."
                            />
                            <CircularProgress
                                progress={50}
                                size={120}
                                progressText="93 pcs"
                                subtitle="Unit"
                                icon={<BarChart2 size={18} />}
                            />
                            <CircularProgress
                                progress={25}
                                size={120}
                                progressText="150e Ft"
                                subtitle="Ad Spend"
                                icon={<TrendingDown size={18} />}
                                primaryColor="#ef4444"
                            />
                        </div>
                    </SidebarFooter>
                </SidebarContent>
            </Sidebar>
        </div>
    )
}
