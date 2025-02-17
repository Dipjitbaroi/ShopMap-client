import { AllImage } from "@/constants/image.constant"
import { useLanguage } from "@/store/language.store"
import { CommonUtil } from "@/utils/common.util"
import MyButton from "@/view/components/common/form/my-button"
import { MyDataTable } from "@/view/components/common/my-data-table"
import { Button } from "@/view/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/view/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, ChevronRight, ChevronsUpDown, Copy } from "lucide-react"

interface IOrderTableData {
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
    subRows?: {
        isChild: boolean
        orderNumber: string
        quantitySold: string
        product: string
        productID: string
        returns: number
        salesAmount: number
        netProfit: number
        tags: string
        coupon: string
    }[]
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
        subRows: [
            {
                isChild: true,
                orderNumber: "25487944634564987",
                quantitySold: "1",
                product: "Product 5",
                productID: "1234567",
                returns: 0,
                salesAmount: 10,
                netProfit: 2,
                tags: "Tag 1",
                coupon: "-1%",
            },
            {
                isChild: true,
                orderNumber: "25487944634564987",
                quantitySold: "2",
                product: "Product 15",
                productID: "12567",
                returns: 0,
                salesAmount: 110,
                netProfit: 2,
                tags: "Tag 1",
                coupon: "-15%",
            },
        ],
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
    },
]
export const DashboardOrderTable = () => {
    const { language } = useLanguage()
    const columns: ColumnDef<IOrderTableData>[] = [
        {
            accessorKey: "order",
            header: language === "english" ? "Order" : "Rendelés",
            cell: ({ row }) => {
                return (
                    !row.original.isChild && (
                        <div className="flex items-center justify-between">
                            <div className="grid">
                                <span className="font-medium flex items-center gap-2">
                                    {language === "english" ? "Order Number:" : "Rendelés azonosító:"}
                                    {row.original.orderNumber}
                                    <MyButton
                                        variant="ghost"
                                        onClick={() => CommonUtil.copyToClipboard(row.original.orderNumber)}
                                        className="p-0 h-fit w-fit"
                                    >
                                        <Copy size={16} className="hover:cursor-pointer hover:text-green-500" />
                                    </MyButton>
                                </span>
                                <span>
                                    {language === "english" ? "Date:" : "Dátum:"}
                                    {row.original.date}
                                </span>
                                <span>
                                    {language === "english" ? "Shipping Cost:" : "Szállítási költség:"}
                                    {row.original.shippingCost}
                                </span>
                            </div>
                            {row.original.subRows && (
                                <MyButton
                                    variant={"secondary"}
                                    onClick={() => row.toggleExpanded()}
                                    className="bg-primary-300 hover:bg-primary-400 text-white p-1 h-fit w-fit rounded-full"
                                >
                                    {row.getIsExpanded() ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </MyButton>
                            )}
                        </div>
                    )
                )
            },
        },
        {
            accessorKey: "product",
            header: language === "english" ? "Product" : "Termék ",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-between whitespace-nowrap gap-2">
                        <div className="w-10 h-10">
                            <img src={AllImage.LOGO_BLACK} className="w-10 h-10 object-cover" />
                        </div>
                        <div className="grid">
                            <span className="font-medium flex items-center gap-2">{row.original.product}</span>
                            <span>
                                {language === "english" ? "Price:" : "Ár:"}
                                {20}
                            </span>
                            <div className="text-primary-500 space-x-2">
                                <span>
                                    {language === "english" ? "Item Number:" : "Cikkszám:"}
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
                        </div>
                    </div>
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
                        {language === "english" ? "Quantity Sold" : "Eladott menny"}

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
                        {language === "english" ? "Sales Amount" : "Eladás értéke"}

                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <span>{row.original.salesAmount} Ft</span>
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
                return <span>{row.original.quantitySold} Ft</span>
            },
        },
        {
            accessorKey: "tags",
            header: language === "english" ? "Tags" : "Termék kattegória",
        },
        {
            accessorKey: "coupon",
            header: language === "english" ? "Coupon" : "Kupon",
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
                                <div className="mb-10">
                                    <p className="font-normal flex items-center gap-2">
                                        {language === "english" ? "Order Number:" : "Rendelés azonosító:"}

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
                                            <span>{language === "english" ? "Sales" : "Értékesítés"}</span>
                                            <span>350000 Ft</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between">
                                            <span>{language === "english" ? "Unit Sold" : "Eladott darabok"}</span>
                                            <span>82 db</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between">
                                            <span>
                                                {language === "english" ? "Shipping Cost" : "Szállítási költség"}
                                            </span>
                                            <span>120000 Ft</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between">
                                            <span>
                                                {language === "english" ? "Payment Fee" : "Fizetési jutalék"}
                                            </span>
                                            <span>320000 Ft</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between">
                                            <span>
                                                {language === "english" ? "Cost of Goods Sold" : "Bekerülési ár"}
                                            </span>
                                            <span>3000 Ft</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between">
                                            <span>{language === "english" ? "Vat" : "Adó"}</span>
                                            <span>23%</span>
                                        </li>
                                        <li className="flex items-center gap-2 justify-between">
                                            <span>
                                                {language === "english" ? "Gross Profit" : "Bruttó profit"}
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
                                        <li className="flex items-center gap-2 justify-between">
                                            <span>{language === "english" ? "Country" : "Ország"}</span>
                                            <span>Bangladesh</span>
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
