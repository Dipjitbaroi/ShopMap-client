import { useLanguage } from "@/store/language.store"
import { useUserStore } from "@/store/user.store"
import { useLoginController } from "@/view/page/login/login.controller"
import { Languages, Loader2, LogOut } from "lucide-react"
import MyButton from "./form/my-button"

export const UserHeader = () => {
    const { language, setLanguage } = useLanguage()
    const user = useUserStore((state) => state.user)
    const { logoutOnSubmit, isLogoutLoading } = useLoginController()
    return (
        <div className="absolute top-5 right-5 flex gap-3 items-center justify-end w-full">
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
            {user && ( // Render this block only if user exists
                <div className="flex gap-2 items-center">
                    <p className="text-sm font-medium text-gray-100 md:text-[#1E3D5B]">{user.Email}</p>
                    <div>
                        {isLogoutLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <LogOut onClick={logoutOnSubmit} size={20} className="hover:cursor-pointer" />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
