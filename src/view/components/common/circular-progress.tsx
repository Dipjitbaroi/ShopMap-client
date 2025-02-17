import { AllImage } from "@/constants/image.constant"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { ChevronDown } from "lucide-react"
import React from "react"

interface CircularProgressProps {
    progress: number // Progress in percentage (0-100)
    progressText?: string
    subtitle?: string
    size?: number
    strokeWidth?: number
    primaryColor?: string
    icon: React.ReactNode
    tooltip?: string
}

const CircularProgress: React.FC<CircularProgressProps> = ({
    progress,
    progressText,
    subtitle,
    size = 100,
    strokeWidth = 8,
    primaryColor = "#000000",
    icon,
    tooltip,
}) => {
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
        <div className="relative flex items-center justify-center">
            <div className="relative w-fit">
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
                    {/* Background Circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="gray"
                        strokeWidth={strokeWidth}
                        fill="none"
                        className="opacity-20"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={primaryColor}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-300"
                    />
                </svg>
                <span className="absolute top-0 -right-6 text-sm font-bold" style={{ color: primaryColor }}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>+{progress}%</TooltipTrigger>
                            {tooltip && (
                                <TooltipContent className="bg-white shadow-lg font-normal px-4 py-2 rounded-md">
                                    <p className="flex items-center gap-1 text-gray-700">
                                        <img src={AllImage.INFO} className="w-4 h-4" /> {tooltip}
                                    </p>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                </span>
            </div>
            {/* Percentage Text */}
            <div className="absolute text-center" style={{ color: primaryColor }}>
                <span className="flex justify-center">{icon}</span>

                <span className="text-sm font-medium">{progressText}</span>

                <p className="text-xs font-bold">{subtitle}</p>
                <ChevronDown size={18} className="mx-auto" />
            </div>
        </div>
    )
}

export default CircularProgress
