import { AllImage } from "@/constants/image.constant"
import { useLanguage } from "@/store/language.store"
import { useIsMobile } from "@/store/use-mobile"
import { useUserStore } from "@/store/user.store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/view/components/ui/dropdown-menu"
import { ChatHead } from "@/view/page/dashboard/components/chat"
import { useDashboardController } from "@/view/page/dashboard/dashboard.controller"
import { useLoginController } from "@/view/page/login/login.controller"
import { BellRing, ChevronRight, Languages, Loader2, LogOut } from "lucide-react"
import { ReactNode } from "react"
import MyButton from "../common/form/my-button"
import { SidebarTrigger } from "../ui/sidebar"

export const DashboardHeader = ({ pageTitle, pageIcon }: { pageTitle?: string; pageIcon?: ReactNode }) => {
    const { language, setLanguage } = useLanguage()
    const user = useUserStore((state) => state.user)
    const { logoutOnSubmit, isLogoutLoading } = useLoginController()
    const { isChatOpen, setChatOpen } = useDashboardController()
    const isMobile = useIsMobile()

    return (
        <div>
            <div className="flex items-center gap-6 py-6">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 justify-between w-full">
                        <img src={AllImage.LOGO_ICON} className="w-10 mr-2 md:hidden" />
                        <div className="flex items-center gap-2">
                            {pageIcon}
                            <h3 className="text-lg md:text-2xl font-semibold text-primary-500">{pageTitle}</h3>
                        </div>
                        {isMobile && <SidebarTrigger />}
                    </div>

                    <div className="md:flex items-center gap-2 hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="ring-0 focus-visible:ring-0">
                                <MyButton
                                    variant="ghost"
                                    type="button"
                                    onClick={() => {}}
                                    className="bg-gradient-to-r from-[#7DC7FE] to-[#55A0FE] text-white hover:text-gray-100 px-8"
                                >
                                    <img src={AllImage.MSG_WHITE} className="w-6 h-6 mr-2" />
                                    <span>Chat - Írj nekünk!</span>
                                    <span className="ml-12">
                                        <ChevronRight size={20} />
                                    </span>
                                </MyButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[400px] p-0 rounded-xl">
                                <div>
                                    <ChatHead isChatOpen />
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="ring-0 focus-visible:ring-0">
                                <MyButton
                                    variant="ghost"
                                    type="button"
                                    onClick={() => {}}
                                    className="bg-gradient-to-r from-[#7DC7FE] to-[#55A0FE] text-white hover:text-gray-100 pr-0 rounded-e-full"
                                >
                                    Notification
                                    <span className="bg-gradient-to-r from-[#7DC7FE] to-[#55A0FE] text-white ml-20 p-2 rounded-full border-2 border-white">
                                        <BellRing size={24} />
                                    </span>
                                </MyButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[400px] p-3">
                                <div>
                                    <div className="px-1">
                                        <ul className="divide-y max-h-[350px] overflow-y-auto scrollbar-hide">
                                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                                <li className="flex gap-3 items-center px-2 py-4">
                                                    <div className="h-2 w-2 rounded-full bg-primary-300"> </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">Notification 1</p>
                                                        <p className="text-primary-500 text-xs">
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                                            elit. Voluptas, nisi!
                                                        </p>
                                                        <p className="text-xs text-gray-500">2024 Dec 09</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="flex gap-3 items-center justify-end">
                            <MyButton
                                variant={"outline"}
                                onClick={() => {
                                    setLanguage(language === "english" ? "magyar" : "english")
                                }}
                                startIcon={<Languages size={18} />}
                                className="capitalize text-xs bg-transparent border-gray-300 md:border-primary-500 text-gray-100 md:text-primary-500"
                            >
                                {language === "english" ? "magyar" : "english"}
                            </MyButton>
                            {user && (
                                <div className="flex gap-2 items-center">
                                    <p className="text-sm font-medium text-gray-100 md:text-[#1E3D5B]">
                                        {user.Email}
                                    </p>
                                    <div>
                                        {isLogoutLoading ? (
                                            <Loader2 className="animate-spin" />
                                        ) : (
                                            <LogOut
                                                onClick={logoutOnSubmit}
                                                size={20}
                                                className="hover:cursor-pointer"
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isChatOpen && (
                <div className="relative z-40">
                    <div className="fixed bottom-32 right-4 z-40 w-[90%]">
                        <div className="flex items-center gap-2 px-4 py-3 rounded-md bg-gradient-to-r from-[#7DC7FE] to-[#55A0FE] text-white hover:text-gray-100">
                            <img src={AllImage.MSG_WHITE} className="w-6 h-6 mr-2" />
                            Chat - Írj nekünk!
                        </div>
                        <ChatHead isChatOpen={isChatOpen} />
                    </div>
                </div>
            )}
            <div className="fixed md:hidden bottom-10 right-8 z-40">
                <div
                    className="bg-gradient-to-r from-[#7DC7FE] to-[#55A0FE] p-4 rounded-full hover:cursor-pointer shadow-lg"
                    onClick={() => setChatOpen((prev) => !prev)}
                >
                    <img src={AllImage.MSG_WHITE} className="w-6 h-6" />
                </div>
            </div>
        </div>
    )
}
