import { KeyConstant } from "@/constants/key.constant"
import { auth } from "@/firebase"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithCustomToken } from "firebase/auth"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useLocalStorage } from "usehooks-ts"
import { ILoginWithEmailDto, LoginWithEmailDto } from "../../../service/auth/auth.dto"
import { AuthService } from "../../../service/auth/auth.service"
import { useUserStore } from "../../../store/user.store"
import { ErrorUtil } from "../../../utils/error.util"
import { useNavigate } from "react-router-dom"
import { RouteUrl } from "@/view/router/url"

export const useSignupController = () => {
    const navigate = useNavigate()
    const setCurrentUser = useUserStore((state) => state.setCurrentUser)
    // const [, setTokenLS] = useLocalStorage<string | null>(KeyConstant.LS_TOKEN, null)
    const [, setTokenTemp] = useLocalStorage<string | null>(KeyConstant.TEMP_TOKEN, null)

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        setValue,
    } = useForm<ILoginWithEmailDto>({
        resolver: zodResolver(LoginWithEmailDto),
        defaultValues: {
            Email: "",
            Password: "",
        },
    })

    const onSubmit = async (input: ILoginWithEmailDto) => {
        try {
            const userResponse = await AuthService.SignupWithEmail(input)
            const customToken = userResponse.CustomToken
            const credential = await signInWithCustomToken(auth, customToken)
            const accessToken = await credential.user.getIdToken()
            setCurrentUser({ Email: credential.user.email, UserId: credential.user.uid })
            // setTokenLS(accessToken)
            setTokenTemp(accessToken)
            navigate(RouteUrl.SUCCESSFUL)
        } catch (error) {
            console.error("signup with email:onSubmit:->", error)
            const message = ErrorUtil.getErrorMessage(error as Error).message
            toast(message)
        }
    }

    return { control, handleSubmit: handleSubmit(onSubmit), isSubmitting, setValue }
}
