import { AllImage } from "@/constants/image.constant"
import { useLanguage } from "@/store/language.store"
import MySpacer from "../../components/common/my-spacer"
import MyButton from "@/view/components/common/form/my-button"
import { useNavigate } from "react-router-dom"
import { RouteUrl } from "@/view/router/url"
import { useLocalStorage } from "usehooks-ts"
import { KeyConstant } from "@/constants/key.constant"
import { UserHeader } from "@/view/components/common/user-header"
import { useEffect } from "react"

export default function SuccessfulPage() {
    const { language } = useLanguage()
    const navigate = useNavigate()
    const [, setTokenLS] = useLocalStorage<string | null>(KeyConstant.LS_TOKEN, null)
    const [tempToken, setTokenTemp] = useLocalStorage<string | null>(KeyConstant.TEMP_TOKEN, null)

    useEffect(() => {
        if (!tempToken) {
            navigate(-1) // Navigate to previous route
        }
    }, [tempToken, navigate])

    return (
        <div className="md:h-screen">
            <div className="bg-gradient-to-b from-[#6AE7ED] to-[#054396] p-10 h-screen w-full bg-cover bg-no-repeat bg-center content-between">
                <UserHeader/>
                <div className="w-full h-full flex flex-col justify-between">
                    <div>
                        <MySpacer className="h-8 md:h-0" />
                        <div className="w-full flex justify-center items-center mt-10">
                            <div>
                                <img src={AllImage.LOGO_WHITE} alt="" className="w-40 mx-auto" />
                                <p className="font-semibold text-white text-sm text-center">
                                    {language === "english" && "The Compass of Business Success."}
                                    {language === "magyar" && "Az üzleti siker iránytűje."}
                                </p>
                            </div>
                        </div>
                        <div className="w-full h-full flex items-center mt-10">
                            <div className="w-full py-8 rounded-lg max-w-2xl mx-auto">
                                <div className="flex justify-center">
                                    <img src={AllImage.STAR_ICON} alt="" className="w-20" />
                                </div>
                                <div className="text-center mt-6">
                                    <p className="text-white text-xl font-bold">
                                        {language === "english" && "Registration successful!"}
                                        {language === "magyar" && "Sikeres regisztráció!"}
                                        <br />
                                    </p>
                                    <p className="text-white text-xs font-medium">
                                        {language === "english" &&
                                            "You will soon receive a confirmation email, and then you can register your own webshop!"}
                                        {language === "magyar" &&
                                            "Hamarosan kapni fogsz egy megerősítő e-mailt, ezután már be is regisztrálhatod saját webshopod!"}
                                    </p>
                                </div>
                                <div className="w-full flex justify-center items-center mb-4 mt-10">
                                    <MyButton
                                        onClick={async () => {
                                            if (tempToken) {
                                                setTokenLS(tempToken)
                                                setTokenTemp(null)
                                            }
                                            navigate(RouteUrl.STARTER)
                                        }}
                                        className="w-full bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 text-white shadow-black text-sm font-semibold md:w-fit h-11 py-2 px-8 md:px-28 rounded-3xl"
                                    >
                                        {language === "english" && "Log In"}
                                        {language === "magyar" && "Bejelentkezés"}
                                    </MyButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
