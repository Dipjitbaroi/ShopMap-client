import CalendarIcon from "@/assets/icon/calendar.svg"
import { Calendar } from "@/view/components/ui/calendar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/view/components/ui/dropdown-menu"
import { Label } from "@/view/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/view/components/ui/radio-group"
import { format, subDays } from "date-fns"
import { ChevronDown } from "lucide-react"
import { FC, useEffect, useState } from "react"
import { DateRange } from "react-day-picker"

const dateCals = [
    {
        english: "Today / Yesterday / This Month / Last Month",
        magyar: "Ma / Tegnap / Ez a hónap / Előző hónap",
    },
    {
        english: "This Week / Last Week / 2 weeks ago / 3 weeks ago",
        magyar: "Ez a hét / Múlt hét / 2 hete / 3 hete",
    },
    {
        english: "This Month / Last Month / 2 months ago / 3 months ago",
        magyar: "Ez a hónap / Múlt hónap / 2 hónapja / 3 hónapja",
    },
]

interface ComponentProps {
    language: "english" | "magyar"
}

const DateCalendar: FC<ComponentProps> = ({ language }) => {
    const [stringDateRange, setStringDateRange] = useState("")
    const [selectedDate, setSelectedDate] = useState<DateRange | undefined>({
        from: subDays(new Date(), 20),
        to: new Date(),
    })
    const [chosenDateCal, setChosenDateCal] = useState(
        language === "english" ? dateCals[0].english : dateCals[0].magyar
    )

    useEffect(() => {
        const str = selectedDate?.from
            ? selectedDate?.to
                ? `${format(selectedDate.from, "LLL dd, y")} - ${format(selectedDate.to, "LLL dd, y")}`
                : `${format(selectedDate?.from, "LLL dd, y")}`
            : `${subDays(new Date(), 20)} - ${new Date()}`

        setStringDateRange(str)
    }, [stringDateRange, selectedDate])

    useEffect(() => {
        const dateCalIndex = dateCals.findIndex(
            (dc) => dc.english === chosenDateCal || dc.magyar === chosenDateCal
        )

        setChosenDateCal((prev) =>
            dateCalIndex === -1
                ? prev
                : language === "english"
                ? dateCals[dateCalIndex].english
                : dateCals[dateCalIndex].magyar
        )
    }, [language])

    return (
        <div className="flex items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="focus-visible:ring-0 flex items-center">
                        <img src={CalendarIcon} alt="" className="w-[1.375rem] mr-2 inline-block" />
                        <span className="inline-block text-xs font-semibold mr-1">{chosenDateCal}</span>
                        <span className="inline-block w-[0.7rem]">
                            <ChevronDown className="w-full" />
                        </span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent asChild>
                    <div className="">
                        <DropdownMenuLabel className="text-end flex items-center justify-end px-4 py-2">
                            <img src={CalendarIcon} alt="" className="w-[1.375rem] mr-2 inline-block" />
                            <div>{chosenDateCal}</div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <RadioGroup
                            onValueChange={setChosenDateCal}
                            value={chosenDateCal}
                            className="space-y-2 px-4 py-2"
                        >
                            {dateCals.map((label, index) => (
                                <div key={index} className="flex items-center justify-end space-x-2">
                                    <Label htmlFor={"r" + index}>
                                        {language === "english" ? label.english : label.magyar}
                                    </Label>
                                    <RadioGroupItem
                                        id={"r" + index}
                                        value={language === "english" ? label.english : label.magyar}
                                    />
                                </div>
                            ))}

                            <div key={"customRadio"} className="flex items-center justify-end space-x-2">
                                <Label htmlFor="customDate">
                                    {language === "english" ? "Custom time period" : "Egyéni időszak"}
                                </Label>
                                <RadioGroupItem id="customDate" value={stringDateRange} />
                            </div>

                            {/* {chosenDateCal === stringDateRange && ( */}
                            <div>
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={selectedDate?.from}
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    numberOfMonths={2}
                                />

                                <div className="float-right mr-2">{stringDateRange}</div>
                            </div>
                            {/* )} */}
                        </RadioGroup>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default DateCalendar
