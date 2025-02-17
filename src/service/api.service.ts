import { KeyConstant } from "@/constants/key.constant"
import axios from "axios"
import { MessageConstant } from "../config/constant/message.constant"
import { EnvConfig } from "../config/env.config"

export const ApiService = axios.create({
    baseURL: EnvConfig.API_URL,
    withCredentials: true,
    timeout: 20000,
    timeoutErrorMessage: MessageConstant.SLOW_INTERNET,
})

ApiService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(KeyConstant.LS_TOKEN) as string // Replace with your actual token

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
// generate new tokens interceptor
// ApiService.interceptors.response.use(
//     (result) => result,
//     async (error: AxiosError) => {
//         let isRefreshing = false
//         try {
//             const originalRequest = error.config as { sent: true } & AxiosRequestConfig
//             const response = error.response as AxiosResponse<IErrorResponse, unknown>
//             if (response.status === 401 && response.data.errorCode === "TOKEN_EXPIRED" && !originalRequest.sent) {
//                 originalRequest.sent = true
//                 if (!isRefreshing) {
//                     isRefreshing = true
//                     await AuthService.refreshToken()
//                 }
//                 // refresh done now do the request again
//                 return ApiService(originalRequest)
//             }
//             throw error
//         } catch (error) {
//             //  todo: handle logout here
//             console.log("HANDLE LOGOUT: => :: ", error)
//             throw error
//         } finally {
//             isRefreshing = false
//         }
//     }
// )
