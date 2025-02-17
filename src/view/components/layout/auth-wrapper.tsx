import { auth } from "@/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { PropsWithChildren, useEffect, useState } from "react"
import { useUserStore } from "../../../store/user.store"
import MyLoading from "../common/my-loading"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "usehooks-ts"
import { KeyConstant } from "@/constants/key.constant"
import { RouteUrl } from "@/view/router/url"

export default function AuthWrapper({ children }: PropsWithChildren) {
    const { setCurrentUser } = useUserStore()
    const [isLoading, setIsLoading] = useState(true)
    const [tempToken,] = useLocalStorage<string | null>(KeyConstant.TEMP_TOKEN, null)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                if (tempToken) {
                    navigate(RouteUrl.SUCCESSFUL)
                }
                setCurrentUser({ Email: currentUser.email, UserId: currentUser.uid }) // Update your global state
            } else {
                setCurrentUser(null)
            }
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [setCurrentUser])

    if (isLoading) {
        return <MyLoading />
    }

    return <>{children}</>
}
