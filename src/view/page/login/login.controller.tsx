import { KeyConstant } from "@/constants/key.constant"
import { auth } from "@/firebase"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithCustomToken } from "firebase/auth"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useLocalStorage } from "usehooks-ts"
import { ILoginWithEmailDto, LoginWithEmailDto } from "../../../service/auth/auth.dto"
import { AuthService } from "../../../service/auth/auth.service"
import { useUserStore } from "../../../store/user.store"
import { ErrorUtil } from "../../../utils/error.util"

export const useLoginController = () => {
    const [isLogoutLoading, setIsLogoutLoading] = useState(false)
    const setCurrentUser = useUserStore((state) => state.setCurrentUser)
    const { logout } = useUserStore()
    const [, setTokenLS] = useLocalStorage<string | null>(KeyConstant.LS_TOKEN, null)
    const [tempToken, setTokenTemp] = useLocalStorage<string | null>(KeyConstant.TEMP_TOKEN, null)

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ILoginWithEmailDto>({
        resolver: zodResolver(LoginWithEmailDto),
        defaultValues: {
            Email: "",
            Password: "",
        },
    })

    const logoutOnSubmit = async () => {
        setIsLogoutLoading(true)
        try {
            // await AuthService.logOut()
            auth.signOut()
            setTokenLS(null)
            logout() // Reset user state
            toast("Successfully logged out")
        } catch (error) {
            console.error("logOut:->", error)
            const message = ErrorUtil.getErrorMessage(error as Error).message
            toast(message)
        } finally {
            setIsLogoutLoading(false)
        }
    }

    const onSubmit = async (input: ILoginWithEmailDto) => {
        try {
            const userResponse = await AuthService.loginWithEmail(input)
            const customToken = userResponse.CustomToken
            const credential = await signInWithCustomToken(auth, customToken)
            const accessToken = await credential.user.getIdToken()
            setCurrentUser({ Email: credential.user.email, UserId: credential.user.uid })
            if (tempToken) {
                setTokenTemp(null)
            }
            setTokenLS(accessToken)
            // toast("Successfully logged in")
        } catch (error) {
            console.error("login with email:onSubmit:->", error)
            const message = ErrorUtil.getErrorMessage(error as Error).message
            toast(message)
        }
    }

    return { isLogoutLoading, control, handleSubmit: handleSubmit(onSubmit), isSubmitting, logoutOnSubmit }
}
