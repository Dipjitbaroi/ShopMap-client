import { AllImage } from "@/constants/image.constant"
import { useLanguage } from "@/store/language.store"
import MyButton from "@/view/components/common/form/my-button"
import MySpacer from "@/view/components/common/my-spacer"
import { UserHeader } from "@/view/components/common/user-header"
import { RouteUrl } from "@/view/router/url"
import { useNavigate } from "react-router-dom"
// import { useLoginController } from "./login.controller";

export default function AuthPage() {
    const { language } = useLanguage()
    const navigate = useNavigate()
    // const { control, handleSubmit, loading } = useLoginController();
    return (
        <div className="bg-gradient-to-b from-[#6AE7ED] to-[#054396]">
            <div className="bg-[url(/Pc-login-01.png)] h-screen w-full bg-cover bg-no-repeat p-10 bg-left md:bg-center content-between">
                <UserHeader />
                <div className="w-full h-full flex flex-col justify-between">
                    <div className="h-full flex flex-col justify-between">
                        <MySpacer className="h-8 md:h-0" />
                        <div className="w-full flex justify-center items-center mt-20 md:mt-10">
                            <div>
                                <img src={AllImage.LOGO_WHITE} alt="ShopMap Logo" className="w-40 mx-auto" />
                                <p className="font-semibold text-white text-sm text-center mt-2">
                                    {language === "english" && "The Compass of Business Success."}
                                    {language === "magyar" && "Az üzleti siker iránytűje."}
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center mb-16 md:mb-24">
                            <div className="w-full py-8 rounded-lg max-w-md md:max-w-2xl mx-auto">
                                <div className="flex flex-col justify-center items-center md:flex-row gap-5 mb-4">
                                    <MyButton
                                        // loading={isSubmitting}
                                        onClick={async () => {
                                            navigate(RouteUrl.LOGIN)
                                        }}
                                        className="w-full bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 text-white shadow-black text-sm font-semibold md:w-fit h-11 py-2 px-8 md:px-28 mr-2 rounded-3xl"
                                    >
                                        {language === "english" && "Log In"}
                                        {language === "magyar" && "Bejelentkezés"}
                                    </MyButton>
                                    <MyButton
                                        // loading={isSubmitting}
                                        onClick={async () => {
                                            navigate(RouteUrl.SIGN_UP)
                                        }}
                                        className="w-full bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 text-white shadow-black text-sm font-semibold md:w-fit h-11 py-2 px-8 md:px-28 mr-2 rounded-3xl"
                                    >
                                        {language === "english" && "Sign up"}
                                        {language === "magyar" && "Regisztráció"}
                                    </MyButton>
                                </div>
                                <div className="hidden md:flex justify-center items-center my-6">
                                    <div className="w-full border-t-2"></div>
                                    <div className="w-full">
                                        <p className="text-white text-xs text-center">
                                            {language === "english" && "Or continue with"}
                                            {language === "magyar" && "Vagy folytasd a következővel"}
                                        </p>
                                    </div>
                                    <div className="w-full border-t-2"></div>
                                </div>
                                <div className="hidden md:flex justify-between">
                                    <button className="flex items-center text-xs bg-white border border-gray-300 font-medium h-10 py-1 px-4 rounded-2xl">
                                        <img
                                            src="https://img.icons8.com/color/48/000000/google-logo.png"
                                            alt="Google"
                                            className="w-6 h-6 mr-2"
                                        />
                                        {language === "english" && "Sign in with Google"}
                                        {language === "magyar" && "Belépés Google-el"}
                                    </button>
                                    <button className="flex items-center text-xs bg-white border border-gray-300 font-medium h-10 py-1 px-4 rounded-2xl">
                                        <img
                                            src="https://img.icons8.com/color/48/000000/facebook-new.png"
                                            alt="Facebook"
                                            className="w-6 h-6 mr-2"
                                        />
                                        {language === "english" && "Sign in with Facebook"}
                                        {language === "magyar" && "Belépés Facebook-al"}
                                    </button>
                                    <button className="flex items-center text-xs bg-white border border-gray-300 font-medium h-10 py-1 px-4 rounded-2xl">
                                        <img
                                            src="https://img.icons8.com/ios-filled/50/000000/mac-os.png"
                                            alt="Apple"
                                            className="w-6 h-6 mr-2"
                                        />
                                        {language === "english" && "Sign in with Apple"}
                                        {language === "magyar" && "Belépés Apple-el"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center mb-10">
                        <p className="text-center text-white text-xs md:text-sm">
                            {language === "english" && "By signing up, you agree to the "}
                            {language === "magyar" && "A regisztrációval elfogadja a "}{" "}
                            <a href="#" className="underline">
                                {language === "english" && "Terms of Service "}
                                {language === "magyar" && "Felhasználói irányelvek "}
                            </a>{" "}
                            <br />
                            {language === "english" && "and the "}
                            {language === "magyar" && "és az "}{" "}
                            <a href="#" className="underline">
                                {language === "english" && "Privacy Policy"}
                                {language === "magyar" && "Adatvédelmi szabályzat "}
                            </a>
                            {language === "english" && "."}
                            {language === "magyar" && "feltételeit."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
