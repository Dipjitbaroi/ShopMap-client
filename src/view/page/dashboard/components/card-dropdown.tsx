import { AllImage } from "@/constants/image.constant"
import MyButton from "@/view/components/common/form/my-button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/view/components/ui/dropdown-menu"
import clsx from "clsx"
import { ChevronDown, ChevronUp } from "lucide-react"
import { FC, useState } from "react"

interface ComponentProps {
    language: "english" | "magyar"
    moneySign: "$" | "Ft"
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

const CardDropdown: FC<ComponentProps> = ({ language, moneySign, date, detailedMetrics }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleDropdownOpen = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="absolute z-40 bottom-0 right-1/2 translate-x-1/2 translate-y-1/2">
            <DropdownMenu onOpenChange={handleDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <MyButton
                        variant={"outline"}
                        onClick={() => {}}
                        className={clsx(
                            "bg-transparent w-[2.375rem] aspect-square rounded-full p-0 border-[#55A0FE] ring-0",
                            isExpanded ? "bg-gradient-to-r from-[#7DC7FE] to-[#55A0FE] border-none" : "bg-white"
                        )}
                    >
                        {isExpanded ? (
                            <ChevronUp size={38} className="w-[1.5rem] text-white" />
                        ) : (
                            <ChevronDown size={38} className="w-[1.5rem] text-[#55A0FE]" />
                        )}
                    </MyButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full md:w-[25rem] px-5 md:px-10 py-5">
                    <div className="flex py-4 justify-between">
                        <div className="flex flex-col">
                            <h2 className="font-semibold">{language === "english" ? "Today" : "Ma"}</h2>
                            <h2 className="text-sm">{date}</h2>
                        </div>
                        <div className="flex justify-end py-1">
                            <img src={AllImage.CHART_UP} className="w-4" />
                        </div>
                    </div>
                    <ul className="divide-y text-sm space-y-1">
                        <li className="flex items-center gap-2 justify-between font-semibold">
                            <span>{language === "english" ? "Sales" : "Eladás"}:</span>{" "}
                            <span>
                                {detailedMetrics.sales} {moneySign}
                            </span>
                        </li>
                        <div className="flex items-center gap-2 justify-between">
                            <span>{language === "english" ? "Units" : "Darabszám"}:</span>{" "}
                            <span>
                                {detailedMetrics.units} {language === "english" ? "pcs" : "db"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 justify-between">
                            <span>{language === "english" ? "Advertising Cost" : "Hirdetési költség"}:</span>{" "}
                            <span>
                                {detailedMetrics.advertisingCost} {moneySign}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 justify-between">
                            <span>{language === "english" ? "Shipping Cost" : "Szállítási költség"}:</span>{" "}
                            <span>
                                {detailedMetrics.shippingCost} {moneySign}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 justify-between">
                            <span>{language === "english" ? "Transaction Fee" : "Fizetési jutalékok"}:</span>{" "}
                            <span>
                                {detailedMetrics.transactionFee} {moneySign}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 justify-between">
                            <span>{language === "english" ? "Cost of Goods Sold" : "Bekerülési árak"}:</span>{" "}
                            <span>
                                {detailedMetrics.costOfGoodsSold} {moneySign}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 justify-between">
                            <span>{language === "english" ? "VAT" : "Áfa"}:</span>{" "}
                            <span>{detailedMetrics.vat} %</span>
                        </div>
                        <div className="flex items-center gap-2 justify-between">
                            <span>{language === "english" ? "Gross Profit" : "Bruttó profit"}:</span>{" "}
                            <span>
                                {detailedMetrics.grossProfit} {moneySign}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 justify-between font-semibold">
                            <span>{language === "english" ? "Expenses" : "Költségek"}:</span>{" "}
                            <span>
                                {detailedMetrics.expenses} {moneySign}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 justify-between font-semibold">
                            <span>{language === "english" ? "Net Profit" : "Nettó profit"}:</span>{" "}
                            <span>
                                {detailedMetrics.netProfit} {moneySign}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 justify-between font-semibold">
                            <span>{language === "english" ? "Average Order Value" : "Átlagos kosárérték"}:</span>{" "}
                            <span>
                                {detailedMetrics.averageOrderValue} {moneySign}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 justify-between">
                            <span>Margin:</span> <span>{detailedMetrics.margin} %</span>
                        </div>
                        <div className="flex items-center gap-2 justify-between">
                            <span>ROI:</span> <span>{detailedMetrics.roi} %</span>
                        </div>
                    </ul>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default CardDropdown
