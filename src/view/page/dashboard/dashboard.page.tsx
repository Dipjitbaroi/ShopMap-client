import DownloadIcon from "@/assets/icon/download.svg"
import { AllImage } from "@/constants/image.constant"
import { KeyConstant } from "@/constants/key.constant"
import { useLanguage } from "@/store/language.store"
import MyButton from "@/view/components/common/form/my-button"
import MyInput from "@/view/components/common/form/my-input.comp"
import MySpacer from "@/view/components/common/my-spacer"
import { DashboardHeader } from "@/view/components/layout/dashobard-header"
import FinancialMetricsCard from "@/view/page/dashboard/components/card"
import { Search } from "lucide-react"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import DateCalendar from "./components/date-calendar"
import { DashboardOrderTable } from "./components/order-table"
import { DashboardProductTable } from "./components/product-table"

const DashboardPage = () => {
    const { language } = useLanguage()
    const [searchParams, setSearchParams] = useSearchParams()
    const tab = searchParams.get(KeyConstant.TAB) as "orders" | "products"

    const metrics = {
        sales: 350000,
        salesChange: 5,
        roas: 7.0,
        adSpend: 2000,
        grossProfit: 7000,
        netProfit: 5000,
        netProfitChange: 4,
        returns: 10,
        unit: 100,
        order: 95,
        date: "2025-02-03",
        detailedMetrics: {
            sales: 10000,
            units: 100,
            advertisingCost: 2000,
            shippingCost: 300,
            transactionFee: 150,
            costOfGoodsSold: 3000,
            vat: 20,
            grossProfit: 7000,
            expenses: 2000,
            netProfit: 5000,
            averageOrderValue: 105.26,
            margin: 50,
            roi: 3.5,
        },
    }

    useEffect(() => {
        if (!tab) {
            setSearchParams({ [KeyConstant.TAB]: "products" })
        }
    }, [])
    return (
        <div>
            <DashboardHeader
                pageTitle="Dashboard"
                pageIcon={<img src={AllImage.LAYOUT_BLACK} className="h-5 md:h-6 w-5 md:w-6" />}
            />
            <div>
                <div className="grid grid-cols-[1fr_auto] gap-5 mb-6">
                    <div className="px-4 bg-white rounded-md">
                        <MyInput
                            startIcon={<Search />}
                            placeholder="Name, Product ID, Tags"
                            hideLabel
                            className="w-full"
                        />
                    </div>
                    <div className="grid grid-cols-[auto_auto_auto] gap-3 items-center">
                        <div className="bg-white w-fit h-fit rounded-2xl flex items-center gap-2 shadow-md border">
                            <MyButton
                                variant={"link"}
                                onClick={() => {
                                    setSearchParams({ [KeyConstant.TAB]: "products" })
                                }}
                                startIcon={
                                    <img
                                        src={tab === "products" ? AllImage.BOX_WHITE : AllImage.BOX_BLACK}
                                        className="w-5 h-5"
                                    />
                                }
                                className={`${
                                    tab === "products" ? "bg-primary-500 text-white" : "pr-10"
                                } rounded-2xl hover:no-underline`}
                            >
                                Products
                            </MyButton>
                            <MyButton
                                variant={"link"}
                                onClick={() => {
                                    setSearchParams({ [KeyConstant.TAB]: "orders" })
                                }}
                                endIcon={
                                    <img
                                        src={tab === "orders" ? AllImage.CART_WHITE : AllImage.CART_BLACK}
                                        className="w-5 h-5"
                                    />
                                }
                                className={`${
                                    tab === "orders" ? "bg-primary-500 text-white" : "pl-10"
                                } rounded-2xl hover:no-underline`}
                            >
                                Orders
                            </MyButton>
                        </div>
                        <MyButton
                            onClick={() => {}}
                            className="w-fit shadow-md border text-primary-500 bg-white rounded-3xl hover:bg-inherit"
                        >
                            {language === "english" ? "Download" : "Letöltés"}
                            <img src={DownloadIcon} className="w-5 h-5 inline-block ml-1" />
                        </MyButton>

                        <DateCalendar language={language} />
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2 w-full">
                    <div>
                        <FinancialMetricsCard {...metrics} />
                    </div>
                    <div>
                        <FinancialMetricsCard {...metrics} />
                    </div>
                    <div>
                        <FinancialMetricsCard {...metrics} />
                    </div>
                    <div>
                        <FinancialMetricsCard {...metrics} />
                    </div>
                </div>

                <MySpacer className="h-10" />
                {tab === "products" && (
                    <>
                        {language === "english" ? (
                            <h3 className="text-primary-500 font-semibold">Today/Products sold</h3>
                        ) : (
                            <h3 className="text-primary-500 font-semibold">Mai nap /Eladott termékek</h3>
                        )}
                        <DashboardProductTable />
                    </>
                )}
                {tab === "orders" && (
                    <>
                        {language === "english" ? (
                            <h3 className="text-primary-500 font-semibold">Today/Orders</h3>
                        ) : (
                            <h3 className="text-primary-500 font-semibold">Mai nap /Megrendelések</h3>
                        )}
                        <DashboardOrderTable />
                    </>
                )}
            </div>
        </div>
    )
}

export default DashboardPage
