import { EnvConfig } from "@/config/env.config"
import { AllImage } from "@/constants/image.constant"
import { useLanguage } from "@/store/language.store"
import MyButton from "@/view/components/common/form/my-button"
import MySpacer from "@/view/components/common/my-spacer"
import { UserHeader } from "@/view/components/common/user-header"
import { useState } from "react"

export default function StarterPage() {
    const { language } = useLanguage()
    const [selectedPlatform, setSelectedPlatform] = useState<"unas" | "woocommerce">()

    const handleRedirect = (selectedPlatform: string | undefined) => {
        window.open(`${EnvConfig.API_URL}/api/Store/keys?storeProvider=${selectedPlatform}`, "_blank") // Opens the URL in a new tab
    }
    return (
        <div className="min-h-screen">
            <div className="md:flex gap-5">
                <div className="md:h-screen">
                    <div className="bg-[url(/map-bg.png)] h-52 md:h-screen w-full md:w-[550px] bg-cover bg-no-repeat bg-center place-content-center i ">
                        <MySpacer className="h-8 md:h-0" />
                        <img src={AllImage.LOGO_WHITE} alt="" className="w-40 mx-auto" />
                        <p className="font-semibold text-white text-sm text-center">
                            {language === "english" && "The Compass of Business Success."}
                            {language === "magyar" && "Az üzleti siker iránytűje."}
                        </p>
                    </div>
                </div>

                <div className="w-full">
                    <UserHeader />

                    {language === "english" && (
                        <div className="flex h-[calc(100vh-208px)] md:h-full items-center justify-center md:w-3/5 mx-auto px-6">
                            <div>
                                <div className="text-center">
                                    <img src={AllImage.LINK_ICON} alt="" className="w-8 mx-auto" />
                                    <MySpacer className="h-6" />
                                    <h3 className="text-primary-500 text-xl md:text-4xl font-semibold">
                                        Connect Shopmap's software <br /> with your e-commerce platform.
                                    </h3>

                                    <MySpacer className="h-4" />
                                    <p className="text-primary-500 text-sm md:text-base font-semibold">
                                        Select the e-commerce platform you want to connect:
                                    </p>
                                    <MySpacer />
                                </div>

                                <div className="py-10 text-center space-y-4 md:space-y-8">
                                    <div className="flex gap-4 md:gap-8 items-center justify-center">
                                        <MyButton
                                            variant={"outline"}
                                            onClick={() => setSelectedPlatform("unas")}
                                            className={`rounded-full w-full ${
                                                selectedPlatform === "unas"
                                                    ? "bg-gradient-to-r from-[#7DC7FE] to-[#55A0FE] text-white"
                                                    : "border-[#55A0FE] text-[#55A0FE]"
                                            } `}
                                        >
                                            Shoprenter
                                        </MyButton>
                                        <MyButton
                                            onClick={() => setSelectedPlatform("woocommerce")}
                                            variant={"outline"}
                                            className={`rounded-full w-full ${
                                                selectedPlatform === "woocommerce"
                                                    ? "bg-gradient-to-r from-[#7DC7FE] to-[#55A0FE] text-white"
                                                    : "border-[#55A0FE] text-[#55A0FE]"
                                            }`}
                                        >
                                            WooCommerce
                                        </MyButton>
                                    </div>
                                    <MyButton
                                        onClick={async () => {
                                            handleRedirect(selectedPlatform)
                                        }}
                                        className="rounded-full w-fit px-20 bg-primary-500"
                                    >
                                        Connection
                                    </MyButton>
                                </div>
                            </div>
                        </div>
                    )}
                    {language === "magyar" && (
                        <div className="flex h-[calc(100vh-208px)] md:h-full items-center justify-center md:w-3/5 mx-auto px-6">
                            <div>
                                <div className="text-center">
                                    <img src={AllImage.LINK_ICON} alt="" className="w-8 mx-auto" />
                                    <MySpacer className="h-6" />
                                    <h3 className="text-primary-500 text-lg md:text-4xl font-semibold">
                                        Kösd össze a Shopmap szoftverét <br /> a webáruház motoroddal.
                                    </h3>

                                    <MySpacer className="h-4" />
                                    <p className="text-primary-500 text-xs md:text-base font-semibold">
                                        Válaszd ki a webáruház motort amit össze szeretnél kötni:
                                    </p>
                                    <MySpacer />
                                </div>

                                <div className="py-10 text-center space-y-4 md:space-y-8">
                                    <div className="flex gap-4 md:gap-8 items-center justify-center">
                                        <MyButton
                                            variant={"outline"}
                                            onClick={() => setSelectedPlatform("unas")}
                                            className={`rounded-full w-full ${
                                                selectedPlatform === "unas"
                                                    ? "bg-gradient-to-r from-[#7DC7FE] to-[#55A0FE] text-white"
                                                    : "border-[#55A0FE] text-[#55A0FE]"
                                            } `}
                                        >
                                            Shoprenter
                                        </MyButton>
                                        <MyButton
                                            onClick={() => setSelectedPlatform("woocommerce")}
                                            variant={"outline"}
                                            className={`rounded-full w-full ${
                                                selectedPlatform === "woocommerce"
                                                    ? "bg-gradient-to-r from-[#7DC7FE] to-[#55A0FE] text-white"
                                                    : "border-[#55A0FE] text-[#55A0FE]"
                                            }`}
                                        >
                                            WooCommerce
                                        </MyButton>
                                    </div>
                                    <MyButton
                                        onClick={async () => {
                                            handleRedirect(selectedPlatform)
                                        }}
                                        // onClick={async () => {
                                        //     handleRedirect("Apple")
                                        // }}
                                        className="rounded-full w-fit px-20 bg-primary-500"
                                    >
                                        Összekötés
                                    </MyButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
