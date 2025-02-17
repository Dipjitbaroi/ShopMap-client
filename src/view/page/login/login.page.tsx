import { EnvConfig } from "@/config/env.config"
import { AllImage } from "@/constants/image.constant"
import { KeyConstant } from "@/constants/key.constant"
import { auth } from "@/firebase"
import { useLanguage } from "@/store/language.store"
import { useUserStore } from "@/store/user.store"
import MyButton from "@/view/components/common/form/my-button"
import { MyInputWithRHF } from "@/view/components/common/form/my-input.comp"
import { UserHeader } from "@/view/components/common/user-header"
import { RouteUrl } from "@/view/router/url"
import { signInWithCustomToken } from "firebase/auth"
import { ChevronLeft, Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import MySpacer from "../../components/common/my-spacer"
import { useLoginController } from "./login.controller"

export default function LoginPage() {
    // const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [showPass, setShowPass] = useState(false)
    const { language } = useLanguage()
    const setCurrentUser = useUserStore((state) => state.setCurrentUser)
    const customTokenFromUrl = searchParams.get("CustomToken")

    const { control, handleSubmit, isSubmitting } = useLoginController()
    const handleRedirect = (provider: string) => {
        window.open(`${EnvConfig.API_URL}/api/Account/PerformExternalLogin?provider=${provider}`, "_blank")
    }

    useEffect(() => {
        const loginFromUrl = async (customToken: string) => {
            const credential = await signInWithCustomToken(auth, customToken)
            const accessToken = await credential.user.getIdToken()
            localStorage.setItem(KeyConstant.LS_TOKEN, accessToken)
            setCurrentUser({ Email: credential.user.email, UserId: credential.user.uid })
        }
        if (customTokenFromUrl) {
            loginFromUrl(customTokenFromUrl)
        }
    }, [customTokenFromUrl, setCurrentUser])
    return (
        // <FullSectionWrapper className="h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="md:h-screen">
            <div className="bg-gradient-to-b from-[#6AE7ED] to-[#054396] p-10 h-screen w-screen bg-cover bg-no-repeat bg-center overflow-hidden content-between">
                <UserHeader />

                <div className="w-full h-full flex flex-col justify-between">
                    <div>
                        <MySpacer className="h-8 md:h-0" />
                        <div className="w-full hidden md:block justify-center items-center mt-5 md:mt-10">
                            <div>
                                <img src={AllImage.LOGO_WHITE} alt="ShopMap Logo" className="w-40 mx-auto" />
                                <p className="font-semibold text-white text-sm text-center mt-2">
                                    {language === "english" && "The Compass of Business Success."}
                                    {language === "magyar" && "Az üzleti siker iránytűje."}
                                </p>
                            </div>
                        </div>
                        <div className=" flex items-center ">
                            <div className="w-full py-8 rounded-lg max-w-md mx-auto md:max-w-2xl">
                                <div className="w-full flex justify-start items-center">
                                    <MyButton
                                        variant={"outline"}
                                        loading={isSubmitting}
                                        // startIcon={<ChevronLeft size={18} />}
                                        onClick={async () => {
                                            navigate(-1)
                                        }}
                                        className="bg-transparent w-fit h-fit rounded-full p-0"
                                    >
                                        <ChevronLeft className="text-white w-fit"/>
                                    </MyButton>
                                </div>
                                <div>
                                    <h1 className="text-center text-white font-bold text-2xl md:text-4xl">
                                        {language === "english" && "Log in"}
                                        {language === "magyar" && "Bejelentkezés"}
                                    </h1>
                                    <p className="text-center text-white font-medium text-sm md:text-lg mt-2">
                                        {language === "english" && "Login to your account!"}
                                        {language === "magyar" && "Jelentkezz be fiókodba!"}
                                    </p>
                                </div>
                                <div className="flex flex-col md:flex-row justify-center gap-4 mb-4 mt-10">
                                    {/* Email Input */}
                                    <div className="flex flex-col w-full md:w-[400px]">
                                        <div className="relative flex items-center w-full">
                                            <MyInputWithRHF
                                                control={control}
                                                name="Email"
                                                type="email"
                                                startIcon={
                                                    <UserRound
                                                        className="absolute left-4 text-[#004AAD]"
                                                        size={20}
                                                    />
                                                }
                                                hideLabel
                                                placeholder={
                                                    language === "english"
                                                        ? "Enter your email address"
                                                        : "Add meg az e-mail címed"
                                                }
                                                className={`pl-12 pr-4 py-3 w-full bg-white md:rounded-full shadow-lg !text-gray-700 focus:outline-none rounded-[10px]`}
                                            />
                                        </div>

                                        <div className="md:flex items-center mt-2 text-white text-sm hidden">
                                            <input
                                                type="checkbox"
                                                id="rememberMe"
                                                className="h-4 w-4 rounded-full border-gray-300"
                                            />
                                            <label htmlFor="rememberMe" className="ml-2">
                                                {language === "english" && "Remember me"}
                                                {language === "magyar" && "Emlékezzen rám"}
                                            </label>
                                        </div>
                                    </div>

                                    {/* Password Input */}
                                    <div className="flex flex-col w-full md:w-[400px] mt-4 md:mt-0">
                                        <div className="relative flex items-center w-full">
                                            <MyInputWithRHF
                                                control={control}
                                                name="Password"
                                                type={showPass ? "text" : "password"}
                                                startIcon={
                                                    <LockKeyhole
                                                        className="absolute left-4 text-[#004AAD]"
                                                        size={20}
                                                    />
                                                }
                                                endIcon={
                                                    !showPass ? (
                                                        <Eye
                                                            className="absolute right-4 text-[#004AAD] cursor-pointer"
                                                            size={20}
                                                            onClick={() => setShowPass(!showPass)}
                                                        />
                                                    ) : (
                                                        <EyeOff
                                                            className="absolute right-4 text-[#004AAD] cursor-pointer"
                                                            size={20}
                                                            onClick={() => setShowPass(!showPass)}
                                                        />
                                                    )
                                                }
                                                hideLabel
                                                placeholder={
                                                    language === "english"
                                                        ? "Enter your email Password"
                                                        : "Add meg az e-mail címed"
                                                }
                                                className={`pl-12 pr-4 py-3 w-full bg-white md:rounded-full shadow-lg !text-gray-700 focus:outline-none rounded-[10px]`}
                                            />
                                        </div>
                                        <p className="text-right text-sm text-white mt-2 hidden md:block">
                                            <a href="#" className="hover:underline">
                                                {language === "english" && "Forgot password?"}
                                                {language === "magyar" && "Elfelejtetted a jelszavad?"}
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full flex justify-center items-center mb-4 mt-10">
                                    <MyButton
                                        loading={isSubmitting}
                                        onClick={async () => {
                                            handleSubmit()
                                        }}
                                        className="bg-white hover:bg-white text-blue-800 text-sm font-semibold w-full md:w-fit h-11 py-2 px-8 md:px-28 mr-2 rounded-3xl"
                                    >
                                        {language === "english" && "Log In"}
                                        {language === "magyar" && "Bejelentkezés"}
                                    </MyButton>
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex items-center mt-2 text-white text-sm sm:hidden ">
                                        <input
                                            type="checkbox"
                                            id="rememberMe"
                                            className="h-4 w-4 !rounded-full border-gray-300 "
                                        />
                                        <label htmlFor="rememberMe" className="ml-2">
                                            {language === "english" && "Remember me"}
                                            {language === "magyar" && "Emlékezzen rám"}
                                        </label>
                                    </div>
                                    <div className="text-right text-sm text-white mt-2 block sm:hidden">
                                        <a href="#" className="hover:underline">
                                            {language === "english" && "Forgot password?"}
                                            {language === "magyar" && "Elfelejtetted a jelszavad?"}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center my-6">
                                    <div className="w-full border-t-2"></div>
                                    <div className="w-full">
                                        <p className="text-white text-xs text-center">
                                            {language === "english" && "Or continue with"}
                                            {language === "magyar" && "Vagy folytasd a következővel"}
                                        </p>
                                    </div>
                                    <div className="w-full border-t-2"></div>
                                </div>
                                <div className="hidden md:flex flex-col md:flex-row justify-between gap-4">
                                    <MyButton
                                        // loading={isSubmitting}
                                        onClick={async () => {
                                            handleRedirect("Google")
                                        }}
                                        className="flex hover:bg-white text-black items-center justify-center text-xs bg-white border border-gray-300 font-medium h-10 py-1 px-4 rounded-2xl w-full md:w-auto"
                                    >
                                        <img src={AllImage.GOOGLE_ICON} alt="Google" className="w-8 h-8 mr-2" />
                                        {language === "english" && "Sign in with Google"}
                                        {language === "magyar" && "Belépés Google-el"}
                                    </MyButton>
                                    <MyButton
                                        // loading={isSubmitting}
                                        onClick={async () => {
                                            handleRedirect("Facebook")
                                        }}
                                        className="flex hover:bg-white text-black items-center justify-center text-xs bg-white border border-gray-300 font-medium h-10 py-1 px-4 rounded-2xl w-full md:w-auto"
                                    >
                                        <img src={AllImage.FB_ICON} alt="Facebook" className="w-3 h-5 mr-2" />
                                        {language === "english" && "Sign in with Facebook"}
                                        {language === "magyar" && "Belépés Facebook-al"}
                                    </MyButton>
                                    <MyButton
                                        // loading={isSubmitting}
                                        onClick={async () => {
                                            handleRedirect("Apple")
                                        }}
                                        className="flex hover:bg-white text-black items-center justify-center text-xs bg-white border border-gray-300 font-medium h-10 py-1 px-4 rounded-2xl w-full md:w-auto"
                                    >
                                        <img src={AllImage.APPLE_ICON} alt="Apple" className="w-5 h-5 mr-2" />
                                        {language === "english" && "Sign in with Apple"}
                                        {language === "magyar" && "Belépés Apple-el"}
                                    </MyButton>
                                </div>
                                <div className="flex md:hidden justify-center gap-4">
                                    <MyButton
                                        // loading={isSubmitting}
                                        onClick={async () => {
                                            handleRedirect("Google")
                                        }}
                                        className="flex hover:bg-white text-black items-center justify-center text-xs px-0 bg-white border border-gray-300 font-medium h-10 w-10 rounded-full shadow-md"
                                    >
                                        <img src={AllImage.GOOGLE_ICON} alt="Google" className="w-8 h-8" />
                                    </MyButton>
                                    <MyButton
                                        // loading={isSubmitting}
                                        onClick={async () => {
                                            handleRedirect("Facebook")
                                        }}
                                        className="flex hover:bg-white text-black items-center justify-center text-xs px-0 bg-white border border-gray-300 font-medium h-10 w-10 rounded-full shadow-md"
                                    >
                                        <img src={AllImage.FB_ICON} alt="Facebook" className="w-3 h-5" />
                                    </MyButton>
                                    <MyButton
                                        // loading={isSubmitting}
                                        onClick={async () => {
                                            handleRedirect("Apple")
                                        }}
                                        className="flex hover:bg-white text-black items-center justify-center text-xs px-0 bg-white border border-gray-300 font-medium h-10 w-10 rounded-full shadow-md"
                                    >
                                        <img src={AllImage.APPLE_ICON} alt="Apple" className="w-5 h-5" />
                                    </MyButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center mb-5">
                        <p className="text-center text-white text-xs">
                            {language === "english" && "Don’t have an account?"}
                            {language === "magyar" && "Nincs még fiókod?"}{" "}
                            <Link to={RouteUrl.SIGN_UP} className="underline">
                                {language === "english" && "Sign up!"}
                                {language === "magyar" && "Regisztrálj!"}
                            </Link>
                        </p>
                        <div className="border-t-2 border-white w-full max-w-xs mt-2"></div>
                        <div className="text-center text-white text-[10px]">
                            {language === "english" && "Privacy Policy Terms of Use"}
                            {language === "magyar" && "Adatvédelmi nyilatkozat elhasználási feltételek"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
