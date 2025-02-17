import React, { useEffect, useState } from "react"
import { Progress } from "../../../components/ui/progress"
import { AllImage } from "@/constants/image.constant"
import CardDropdown from "@/view/page/dashboard/components/card-dropdown"
import MyTooltip from "../../../components/common/my-tooltip"
import { useLanguage } from "@/store/language.store"
import { tooltips } from "@/constants/tooltip.constant"

interface FinancialMetricsProps {
    sales: number
    salesChange: number
    roas: number
    adSpend: number
    grossProfit: number
    netProfit: number
    netProfitChange: number
    returns: number
    unit: number
    order: number
    date: string
    detailedMetrics: {
        sales: number
        units: number
        advertisingCost: number
        shippingCost: number
        transactionFee: number
        costOfGoodsSold: number
        vat: number
        grossProfit: number
        expenses: number
        netProfit: number
        averageOrderValue: number
        margin: number
        roi: number
    }
}

const FinancialMetricsCard: React.FC<FinancialMetricsProps> = ({
    sales,
    salesChange,
    roas,
    adSpend,
    grossProfit,
    netProfit,
    netProfitChange,
    returns,
    unit,
    order,
    date,
    detailedMetrics,
}) => {
    const [moneySign, setMoneySign] = useState<"$" | "Ft">("$")
    const { language } = useLanguage()

    useEffect(() => {
        if (language === "english") setMoneySign("$")
        else setMoneySign("Ft")
    }, [language])

    return (
        <div className="bg-gradient-to-r from-[#7DC7FE] to-[#55A0FE] rounded-2xl pb-2 w-full shadow-slate-950 shadow-lg font-semibold text-xs text-[#02294C]">
            <div className="flex py-2 px-8 justify-between ">
                <div>
                    <h2 className="flex items-center h-full">{language === "english" ? "Today" : "Ma"}</h2>
                </div>
                <div>
                    <h2 className="text-lg">{date}</h2>
                </div>
            </div>
            <div className="relative rounded-2xl p-4 w-full bg-white shadow-slate-950 shadow-md">
                <div className="grid grid-cols-2">
                    {/* Sales Section */}
                    <div className="grid">
                        <MyTooltip
                            content={language === "english" ? tooltips.SALES.english : tooltips.SALES.magyar}
                        >
                            <div className="font-semibold text-center">
                                {language === "english" ? "Sales" : "Értékesítés"}
                            </div>
                        </MyTooltip>

                        <div className="flex justify-center">
                            <div className="flex-col ">
                                <div className="flex text-lg font-extrabold">
                                    <div className="flex items-center mr-1">
                                        <img src={AllImage.UPWARD_ICON} className="h-4 w-4" />
                                    </div>
                                    <div>
                                        {sales} {moneySign}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-green-500 font-semibold text-xs">+{salesChange}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blended ROAS Section */}
                    <div className="grid text-center ">
                        <MyTooltip
                            content={
                                language === "english"
                                    ? tooltips.BLENDED_ROAS.english
                                    : tooltips.BLENDED_ROAS.magyar
                            }
                        >
                            <div className="min-w-max">
                                {language === "english" ? "Blended ROAS" : "Vegyes ROAS"}
                            </div>
                        </MyTooltip>
                        <div className="flex justify-center items-center">
                            <div className="flex items-center mr-1">
                                <img src={AllImage.DOWNWARD_ICON} className="h-3 w-3" />
                            </div>
                            <div className="text-base">{roas}</div>
                        </div>
                    </div>
                </div>

                {/* Spend, Profit - Progress bar */}
                <div className="py-2 grid grid-cols-[auto_1fr_auto] gap-y-[10px] items-center">
                    <div className="contents">
                        <MyTooltip
                            content={language === "english" ? tooltips.AD_SPEND.english : tooltips.AD_SPEND.magyar}
                        >
                            <div className="">
                                <h2>{language === "english" ? "Ad Spend" : "Hirdetési költség"}</h2>
                            </div>
                        </MyTooltip>
                        <div className="ml-7 mr-[7px]">
                            <Progress className="h-1 w-full bg-gray-200 [&>div]:bg-red-500" value={50} max={100} />
                        </div>
                        <MyTooltip
                            content={language === "english" ? tooltips.AD_SPEND.english : tooltips.AD_SPEND.magyar}
                        >
                            <div className="text-right text-red-500">
                                <span>
                                    {adSpend} {moneySign}
                                </span>
                            </div>
                        </MyTooltip>
                    </div>
                    <div className="contents">
                        <MyTooltip
                            content={
                                language === "english"
                                    ? tooltips.GROSS_PROFIT.english
                                    : tooltips.GROSS_PROFIT.magyar
                            }
                        >
                            <div className="">
                                <h2>{language === "english" ? "Gross Profit" : "Bruttó profit"}</h2>
                            </div>
                        </MyTooltip>
                        <div className="ml-7 mr-[7px]">
                            <Progress
                                className="h-1 w-full bg-gray-200 [&>div]:bg-blue-500"
                                value={50}
                                max={100}
                            />
                        </div>
                        <MyTooltip
                            content={
                                language === "english"
                                    ? tooltips.GROSS_PROFIT.english
                                    : tooltips.GROSS_PROFIT.magyar
                            }
                        >
                            <div className="text-right text-blue-500">
                                <span>
                                    {grossProfit} {moneySign}
                                </span>
                            </div>
                        </MyTooltip>
                    </div>
                    <div className="contents">
                        <MyTooltip
                            content={
                                language === "english" ? tooltips.NET_PROFIT.english : tooltips.NET_PROFIT.magyar
                            }
                        >
                            <div className="">
                                <h2>{language === "english" ? "Net Profit" : "Nettó nyereség"}</h2>
                            </div>
                        </MyTooltip>
                        <div className="ml-7 mr-[7px]">
                            <Progress
                                className="h-1 w-full bg-gray-200 [&>div]:bg-green-500"
                                value={50}
                                max={100}
                            />
                        </div>
                        <MyTooltip
                            content={
                                language === "english" ? tooltips.NET_PROFIT.english : tooltips.NET_PROFIT.magyar
                            }
                        >
                            <div className="relative text-right text-green-500">
                                <small className="absolute right-0 -translate-y-3 text-green-500">
                                    <p className="flex w-full justify-end text-xs">+{netProfitChange}%</p>
                                </small>
                                <span>
                                    {netProfit} {moneySign}
                                </span>
                            </div>
                        </MyTooltip>
                    </div>
                </div>

                <div className="grid grid-cols-3 w-full mb-5 text-center">
                    <MyTooltip
                        content={language === "english" ? tooltips.RETURNS.english : tooltips.RETURNS.magyar}
                    >
                        <div className="border-r-2">
                            <div>{language === "english" ? "Returns" : "Visszatérítés"}</div>
                            <div className="text-sm">
                                {returns} {language === "english" ? "pcs" : "db"}
                            </div>
                        </div>
                    </MyTooltip>
                    <MyTooltip content={language === "english" ? tooltips.UNIT.english : tooltips.UNIT.magyar}>
                        <div className="border-r-2">
                            <div>{language === "english" ? "Unit" : "Egység"}</div>
                            <div className="text-sm">
                                {unit} {language === "english" ? "pcs" : "db"}
                            </div>
                        </div>
                    </MyTooltip>
                    <MyTooltip content={language === "english" ? tooltips.ORDER.english : tooltips.ORDER.magyar}>
                        <div>
                            <div>{language === "english" ? "Order" : "Megrendelés"}</div>
                            <div className="text-sm">
                                {order} {language === "english" ? "pcs" : "db"}
                            </div>
                        </div>
                    </MyTooltip>
                </div>
                <CardDropdown
                    moneySign={moneySign}
                    language={language}
                    date={date}
                    detailedMetrics={detailedMetrics}
                />

                {/* <button onClick={() => setIsExpanded(!isExpanded)} className="mt-2 text-blue-600">
                    {isExpanded ? "Hide Details" : "Show Details"}
                </button> */}
            </div>
        </div>
    )
}

export default FinancialMetricsCard
