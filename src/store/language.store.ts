// logged in user global state with zustand store
import { KeyConstant } from "@/constants/key.constant"
import { useLocalStorage } from "usehooks-ts"

type ILanguage = "english" | "magyar"

export const useLanguage = () => {
    const [language, setLanguage] = useLocalStorage<ILanguage>(KeyConstant.LANGUAGE, "english")

    return {
        language,
        setLanguage,
    }
}
