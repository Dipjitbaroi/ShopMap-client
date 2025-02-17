import { RuleType } from "@/@types/form.type"
import { ReactNode } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group"
import MyErrorInfo from "../my-error-info"
import MySpacer from "../my-spacer"

interface IMyRadioChipPickerWithRHF<T extends FieldValues> {
    placeholder?: string
    name: Path<T>
    control: Control<T>
    rules?: RuleType
    options: { label: string; value: string; secondaryLabel?: ReactNode }[]
}

export function MyRadioChipPickerWithRHF<T extends FieldValues>({
    placeholder,
    name,
    options,
    control,
    rules,
}: IMyRadioChipPickerWithRHF<T>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
                return (
                    <>
                        <label
                            htmlFor={name}
                            className="cursor-pointer mb-1 text-sm text-slate-600 dark:text-slate-400"
                        >
                            {placeholder}
                        </label>
                        <MySpacer />
                        <div className="">
                            <RadioGroup
                                ref={ref}
                                onValueChange={onChange}
                                value={value}
                                className="md:flex md:flex-wrap gap-4"
                            >
                                {options.map((item) => {
                                    return (
                                        <div key={item.value} className="flex flex-row gap-4 items-center">
                                            <RadioGroupItem
                                                id={item.value}
                                                value={item.value}
                                                className="sr-only"
                                            />
                                            <label
                                                htmlFor={item.value}
                                                className={
                                                    value === item.value
                                                        ? "text-primary-500 px-8 py-4 border-2 border-primary-500 rounded-md cursor-pointer select-none"
                                                        : "px-8 py-4 border border-slate-300 rounded-md cursor-pointer select-none"
                                                }
                                            >
                                                <p className="font-semibold text-lg">{item.label}</p>
                                                {typeof item.secondaryLabel === "string" ? (
                                                    <p className="text-black">{item?.secondaryLabel}</p>
                                                ) : (
                                                    item.secondaryLabel
                                                )}
                                            </label>
                                        </div>
                                    )
                                })}
                            </RadioGroup>
                        </div>
                        {error && <MyErrorInfo message={error.message} />}
                    </>
                )
            }}
        />
    )
}
