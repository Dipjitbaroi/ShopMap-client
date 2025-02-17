import { cn } from "@/utils/style.util"
import React, { ReactNode } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { RuleType } from "../../../../@types/form.type"

type TypeInputAndTextArea = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface IMyInput extends TypeInputAndTextArea {
    error?: string
    myRef?: React.LegacyRef<any>
    isTextArea?: boolean
    className?: string
    hideLabel?: boolean // Add the hideLabel prop
    textAreaRows?: number
    startIcon?: ReactNode
    endIcon?: ReactNode
}

export default function MyInput({
    myRef,
    error,
    isTextArea = false,
    hideLabel = false,
    textAreaRows = 3,
    className,
    startIcon,
    endIcon,
    ...others
}: IMyInput) {
    return (
        <>
            <div className="flex flex-col text-gray-600 dark:text-gray-400 w-full">
                {!hideLabel &&
                    others.placeholder && ( // Conditionally render the label
                        <label
                            htmlFor={others.name}
                            className="cursor-pointer pl-1.5 mb-1 text-sm text-gray-600 dark:text-gray-400"
                        >
                            {others.placeholder}
                        </label>
                    )}
                {isTextArea ? (
                    <textarea
                        id={others.name}
                        rows={textAreaRows}
                        ref={myRef}
                        {...(others as any)}
                        className={cn(
                            `bg-gray-300 dark:bg-gray-700 py-2.5 px-4 rounded-xl focus:outline-none ${
                                error ? "ring-2 ring-danger" : ""
                            }`,
                            className
                        )}
                    ></textarea>
                ) : (
                    <div className="bg-white flex items-center rounded-full w-full">
                        {startIcon && startIcon}

                        <input
                            id={others.name}
                            ref={myRef}
                            {...others}
                            className={cn(
                                `bg-white dark:bg-gray-700 py-2.5 px-2 rounded-xl focus:outline-none w-full' ${
                                    error ? "ring-2 ring-danger" : ""
                                }`,
                                className
                            )}
                        />
                        {endIcon && endIcon}
                    </div>
                )}
            </div>
        </>
    )
}

interface IMyInputWithRHF<T extends FieldValues> extends Omit<IMyInput, "myRef"> {
    name: Path<T>
    control: Control<T>
    rules?: RuleType
}

export function MyInputWithRHF<T extends FieldValues>({
    name,
    control,
    rules,
    startIcon,
    endIcon,
    hideLabel = false, // Add the hideLabel prop
    className,
    ...others
}: IMyInputWithRHF<T>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => {
                let updatedValue = value ? value + "".toString() : ""
                if (others.type === "number") {
                    updatedValue = value ? (value as number).toString() : ""
                } else if (others.type === "date") {
                    updatedValue = value ? (value as Date).toISOString().split("T")[0] : ""
                }

                return (
                    <div className="w-full">
                        <MyInput
                            // className="bg-transparent ring-0 border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1 w-full md:w-72"
                            name={name}
                            myRef={ref}
                            value={updatedValue}
                            onChange={(e) => {
                                if (others.type === "number") {
                                    onChange(e.target.valueAsNumber)
                                } else if (others.type === "date") {
                                    onChange(e.target.valueAsDate)
                                } else {
                                    onChange(e)
                                }
                            }}
                            onBlur={onBlur}
                            error={error?.message}
                            hideLabel={hideLabel} // Pass hideLabel to MyInput
                            className={className}
                            startIcon={startIcon}
                            endIcon={endIcon}
                            {...others}
                        />

                        {error?.message ? (
                            <div className="flex items-center mt-1 mx-2">
                                <svg
                                    className="mr-1 w-4 h-4 text-danger/80"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx={12} cy={12} r={10} />
                                    <line x1={12} y1={16} x2={12} y2={12} />
                                    <line x1={12} y1={8} x2="12.01" y2={8} />
                                </svg>
                                <p className="text-danger/80 mr-2">
                                    {error?.message || "This field is required!"}
                                </p>
                            </div>
                        ) : null}
                    </div>
                )
            }}
        />
    )
}
