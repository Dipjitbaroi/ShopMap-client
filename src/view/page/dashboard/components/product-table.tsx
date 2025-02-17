import { AllImage } from "@/constants/image.constant"
import { useLanguage } from "@/store/language.store"
import { CommonUtil } from "@/utils/common.util"
import MyButton from "@/view/components/common/form/my-button"
import { MyDataTable } from "@/view/components/common/my-data-table"
import { Button } from "@/view/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/view/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronRight, ChevronsUpDown, Copy } from "lucide-react"

interface IProductTableData {
    isChild: boolean
    orderNumber: string
    date: string
    shippingCost: string
    quantitySold: string
    product: string
    productID: string
    returns: number
    salesAmount: number
    netProfit: number
    tags: string
    coupon: string
    inventory: number
    ads: number
    grossProfit: number
    margin: number
    roi: number
}
const tableData = [
    {
        isChild: false,
        orderNumber: "25487944634564987",
        date: "2024.01.09",
        shippingCost: "2 550 Ft",
        quantitySold: "10",
        product: "Product 1",
        productID: "123456789",
        returns: 0,
        salesAmount: 10,
        netProfit: 2,
        tags: "Tag 1",
        coupon: "-10%",
        inventory: 3,
        ads: 2,
        grossProfit: 2,
        margin: 2,
        roi: 2,
    },
    {
        isChild: false,
        orderNumber: "2548794463456",
        date: "2024.01.09",
        shippingCost: "2 550 Ft",
        quantitySold: "10",
        product: "Product 1",
        productID: "123456789",
        returns: 0,
        salesAmount: 10,
        netProfit: 2,
        tags: "Tag 1",
        coupon: "-10%",
        inventory: 3,
        ads: 2,
        grossProfit: 2,
        margin: 2,
        roi: 2,
    },
]
export const DashboardProductTable = () => {
    const { language } = useLanguage()

    const columns: ColumnDef<IProductTableData>[] = [
        {
            accessorKey: "product",
            header: language === "english" ? "Products" : "Termék",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-between whitespace-nowrap gap-2">
                        <div className="w-10 h-10">
                            <img src={AllImage.LOGO_BLACK} className="w-10 h-10 object-cover" />
                        </div>
                        <div className="grid">
                            <span className="font-medium flex items-center gap-2">{row.original.product}</span>
                            <div className="text-primary-500 space-x-2">
                                <span>
                                    {language === "english" ? "Item Number: " : "Cikkszám: "}
                                    {"adf3432"}
                                </span>
                                <MyButton
                                    variant="ghost"
                                    onClick={() => CommonUtil.copyToClipboard("itemID")}
                                    className="p-0 h-fit w-fit"
                                >
                                    <Copy size={14} className="hover:cursor-pointer hover:text-green-500" />
                                </MyButton>
                            </div>
                            <p className="space-x-3">
                                <span>
                                    {language === "english" ? "Selling Price: " : "Eladási ár: "} {20} Ft
                                </span>
                                <span>
                                    {language === "english" ? "Cogs: " : "Beszerár: "}
                                    {40} Ft
                                </span>
                            </p>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "inventory",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-0 capitalize font-semibold"
                    >
                        {language === "english" ? "Inventory" : "Készlet"}
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <span>
                        {row.original.inventory} {language === "english" ? "pcs" : "db"}
                    </span>
                )
            },
        },
        {
            accessorKey: "quantitySold",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-0 capitalize font-semibold"
                    >
                        {language === "english" ? "Quantity Sold" : "Eladott menny."}
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <span>
                        {row.original.quantitySold} {language === "english" ? "pcs" : "db"}
                    </span>
                )
            },
        },
        {
            accessorKey: "returns",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-0 capitalize font-semibold"
                    >
                        {language === "english" ? "Returns" : "Visszaáru"}

                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <span>
                        {row.original.returns} {language === "english" ? "pcs" : "db"}
                    </span>
                )
            },
        },
        {
            accessorKey: "salesAmount",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-0 capitalize font-semibold"
                    >
                        {language === "english" ? "Sales Amount" : "Eladás összeg"}
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <span>{row.original.salesAmount} Ft</span>
            },
        },
        {
            accessorKey: "ads",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-0 capitalize font-semibold"
                    >
                        {language === "english" ? "Ads" : "Hirdetés"}
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <span>{row.original.grossProfit} Ft</span>
            },
        },
        {
            accessorKey: "grossProfit",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-0 capitalize font-semibold"
                    >
                        {language === "english" ? "Gross Profit" : "Bruttó profit"}
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <span>{row.original.grossProfit} Ft</span>
            },
        },
        {
            accessorKey: "netProfit",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-0 capitalize font-semibold"
                    >
                        {language === "english" ? "Net Profit" : "Nettó profit"}
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <span>{row.original.netProfit} Ft</span>
            },
        },
        {
            accessorKey: "margin",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-0 capitalize font-semibold"
                    >
                        Margin
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <span>{row.original.margin}%</span>
            },
        },
        {
            accessorKey: "roi",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-0 capitalize font-semibold"
                    >
                        ROI
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <span>{row.original.roi}%</span>
            },
        },

        {
            id: "info",
            header: "Info",
            cell: ({ row }) => {
                return (
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="ring-0 focus-visible:ring-0">
                                <MyButton
                                    variant="ghost"
                                    type="button"
                                    onClick={() => {}}
                                    className="text-primary-300"
                                >
                                    {language === "english" ? "Extra" : "Több"}
                                    <ChevronRight size={16} />
                                </MyButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full md:w-[600px] px-5 md:px-10 py-5">
                                <div className="mb-8">
                                    <p className="font-semibold text-lg">Product 1</p>
                                    <p className="font-normal flex items-center gap-2">
                                        {language === "english" ? "Item Number" : "Cikkszám"}:
                                        <span className="font-medium text-primary-500">
                                            {row.original.orderNumber}
                                        </span>
                                        <MyButton
                                            variant="ghost"
                                            onClick={() => CommonUtil.copyToClipboard(row.original.orderNumber)}
                                            className="p-0 h-fit w-fit"
                                        >
                                            <Copy
                                                size={16}
                                                className="hover:cursor-pointer hover:text-green-500"
                                            />
                                        </MyButton>
                                    </p>
                                    <div className="flex justify-end py-1">
                                        <img src={AllImage.CHART_UP} />
                                    </div>
                                </div>
                                <div>
                                    <ul className="divide-y text-sm space-y-1">
                                        <li className="flex items-center gap-2 justify-between font-semibold">
                                            <span>{language === "english" ? "Sales" : "Eladás"}</span>
                                            <span>350000 Ft</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between">
                                            <span>{language === "english" ? "Units" : "Darabszám"}</span>
                                            <span>82 {language === "english" ? "pcs" : "db"}</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between">
                                            <span>
                                                {language === "english" ? "Advertising Cost" : "Hirdetési költség"}
                                            </span>
                                            <span>120000 Ft</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between">
                                            <span>
                                                {language === "english"
                                                    ? "   Shipping Cost"
                                                    : "Szállítási költség"}
                                            </span>
                                            <span>120000 Ft</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between">
                                            <span>
                                                {language === "english" ? "Transaction Fee" : "Fizetési jutalékok"}
                                            </span>
                                            <span>120000 Ft</span>
                                        </li>

                                        <li className="flex items-center gap-2 justify-between">
                                            <span>{language === "english" ? "VAT" : "Áfa"}</span>
                                            <span>23%</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between">
                                            <span>
                                                {language === "english" ? "Gross Profit" : "Bruttó profit"}
                                            </span>
                                            <span>350000 Ft</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between font-semibold">
                                            <span>{language === "english" ? "Expenses" : "Költségek"}</span>
                                            <span>350000 Ft</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between font-semibold">
                                            <span>{language === "english" ? "Net Profit" : "Nettó profit"}</span>
                                            <span>350000 Ft</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between font-semibold">
                                            <span>
                                                {language === "english"
                                                    ? "Average Order Value"
                                                    : "Általánosrendelési összeg"}
                                            </span>
                                            <span>350000 Ft</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between">
                                            <span>Margin</span>
                                            <span>43%</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between">
                                            <span>ROI</span>
                                            <span>300%</span>
                                        </li>
                                    </ul>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ]
    return (
        <div>
            <MyDataTable columns={columns} data={tableData || []} dataLength={tableData.length} hidePagination />
        </div>
    )
}
