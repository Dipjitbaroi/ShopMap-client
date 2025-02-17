import { EnvConfig } from "@/config/env.config"
import { AllImage } from "@/constants/image.constant"
import { useLanguage } from "@/store/language.store"
import MyButton from "@/view/components/common/form/my-button"
import { MyInputWithRHF } from "@/view/components/common/form/my-input.comp"
import { UserHeader } from "@/view/components/common/user-header"
import { RouteUrl } from "@/view/router/url"
import { ChevronLeft, Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import MySpacer from "../../components/common/my-spacer"
import { useSignupController } from "./sign-up.controller"

const handleRedirect = (provider: string) => {
    window.open(`${EnvConfig.API_URL}/api/Account/PerformExternalLogin?provider=${provider}`, "_blank")
}
export default function SignUpPage() {
    // const [rememberMe, setRememberMe] = useState(false)
    const navigate = useNavigate()
    const { language } = useLanguage()
    const [showPass, setShowPass] = useState(false)
    const [password, setPassword] = useState("")

    const { control, handleSubmit, isSubmitting, setValue } = useSignupController()

    useEffect(() => {
        setValue("Password", password)
    }, [password, setValue])
    const checkStrength = (pass: string) => {
        const requirements = [
            { regex: /.{8,}/, text: "At least 8 characters" },
            { regex: /[0-9]/, text: "At least 1 number" },
            { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
            {
                regex: /[^A-Za-z0-9]/,
                text: "At least 1 special character",
                tolltip: "'&@#$%^<>|_~*()[]{}+-=?/`'",
            },
        ]

        return requirements
            .map((req) => ({
                met: req.regex.test(pass),
                text: req.text,
                tolltip: req?.tolltip,
            }))
            .sort((a, b) => (a.met === b.met ? 0 : a.met ? -1 : 1))
    }
    const strength = checkStrength(password)

    const metCondition = strength?.filter((item) => item?.met)

    return (
        // <FullSectionWrapper className="h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="md:h-screen">
            <div className="bg-gradient-to-b from-[#6AE7ED] to-[#054396] p-10 h-screen w-full bg-cover bg-no-repeat bg-center content-between">
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
                        <div className="w-full flex items-center">
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
                                        <ChevronLeft className="text-white w-fit" />
                                    </MyButton>
                                </div>
                                <div>
                                    <h1 className="text-center text-white font-bold text-2xl md:text-4xl">
                                        {language === "english" && "Sign up"}
                                        {language === "magyar" && "Regisztráció"}
                                    </h1>
                                    <p className="text-center text-white font-medium text-sm md:text-lg mt-2">
                                        {language === "english" && "You need to signup to proceed!"}
                                        {language === "magyar" && "A továbblépéshez regisztrálnod kell!"}
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
                                    </div>

                                    {/* Password Input */}
                                    <div className="flex flex-col w-full md:w-[400px] mt-4 md:mt-0">
                                        <div className="relative flex items-center w-full">
                                            <MyInputWithRHF
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
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
                                        {/* <div className="relative w-full h-1 bg-gray-200 rounded-full mt-2">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
                                                style={{ width: "20%" }}
                                            ></div>
                                        </div> */}
                                        <div className="hidden md:block">
                                            <div className="grid grid-cols-4 gap-2 mt-2">
                                                {strength?.map((info, i) => (
                                                    <div
                                                        key={i}
                                                        className={`border-t-4 rounded-full ${
                                                            info?.met
                                                                ? metCondition?.length === 1
                                                                    ? "border-red-400"
                                                                    : metCondition?.length === 2
                                                                    ? "border-yellow-400"
                                                                    : metCondition?.length === 3
                                                                    ? "border-blue-400"
                                                                    : metCondition?.length === 4
                                                                    ? "border-green-400"
                                                                    : "border-white"
                                                                : "border-white"
                                                        }`}
                                                    ></div>
                                                ))}
                                            </div>
                                            <div className="w-full flex mt-2 justify-end">
                                                <span
                                                    className={`w-fit rounded-2xl text-xs py-1 px-2 text-[10px] font-semibold ${
                                                        metCondition?.length === 1
                                                            ? "text-red-500 bg-white"
                                                            : metCondition?.length === 2
                                                            ? "text-yellow-500 bg-white"
                                                            : metCondition?.length === 3
                                                            ? "text-blue-500 bg-white"
                                                            : metCondition?.length === 4
                                                            ? "text-green-500 bg-white"
                                                            : "text-gray-500 bg-white"
                                                    }`}
                                                >
                                                    {metCondition?.length === 0
                                                        ? "Too short"
                                                        : metCondition?.length === 1
                                                        ? "Weak"
                                                        : metCondition?.length === 2 || metCondition?.length === 3
                                                        ? "Good"
                                                        : "Strong"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex justify-center items-center mb-4 mt-10">
                                    <MyButton
                                        loading={isSubmitting}
                                        onClick={async () => {
                                            handleSubmit()
                                        }}
                                        className="bg-white hover:bg-white text-blue-800 text-sm font-semibold w-full md:w-fit h-11 py-2 px-8 md:px-28 rounded-3xl"
                                    >
                                        {language === "english" && "Sign up"}
                                        {language === "magyar" && "Regisztráció"}
                                    </MyButton>
                                </div>

                                <div className=" md:hidden">
                                    <div className="grid grid-cols-4 gap-2 mt-2">
                                        {strength?.map((info, i) => (
                                            <div
                                                key={i}
                                                className={`border-t-4 rounded-full ${
                                                    info?.met
                                                        ? metCondition?.length === 1
                                                            ? "border-red-400"
                                                            : metCondition?.length === 2
                                                            ? "border-yellow-400"
                                                            : metCondition?.length === 3
                                                            ? "border-blue-400"
                                                            : metCondition?.length === 4
                                                            ? "border-green-400"
                                                            : "border-white"
                                                        : "border-white"
                                                }`}
                                            ></div>
                                        ))}
                                    </div>
                                    <div className="w-full flex mt-2 justify-end">
                                        <span
                                            className={`w-fit rounded-2xl text-xs py-1 px-2 text-[10px] font-semibold ${
                                                metCondition?.length === 1
                                                    ? "text-red-500 bg-white"
                                                    : metCondition?.length === 2
                                                    ? "text-yellow-500 bg-white"
                                                    : metCondition?.length === 3
                                                    ? "text-blue-500 bg-white"
                                                    : metCondition?.length === 4
                                                    ? "text-green-500 bg-white"
                                                    : "text-gray-500 bg-white"
                                            }`}
                                        >
                                            {metCondition?.length === 0
                                                ? "Too short"
                                                : metCondition?.length === 1
                                                ? "Weak"
                                                : metCondition?.length === 2 || metCondition?.length === 3
                                                ? "Good"
                                                : "Strong"}
                                        </span>
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
                            {language === "english" && "Already have an account?"}
                            {language === "magyar" && "Már van fiókja?"}{" "}
                            <Link to={RouteUrl.LOGIN} className="underline">
                                {language === "english" && "Login!"}
                                {language === "magyar" && "Bejelentkezés!"}
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
