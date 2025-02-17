import { FC } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/view/components/ui/tooltip"
import { AllImage } from "@/constants/image.constant"

interface ComponentProps {
    content: string
    children: React.ReactNode
}

const MyTooltip: FC<ComponentProps> = ({ content, children }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent className="bg-white shadow-lg font-normal px-4 py-2 rounded-md">
                    <p className="flex items-center gap-1 text-gray-700">
                        <img src={AllImage.INFO} className="w-4 h-4" /> {content}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default MyTooltip
