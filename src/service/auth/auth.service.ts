import { IResponse } from "../_common/common.dto"
import { ApiService } from "../api.service"
import { ICurrentUser, ILoginWithEmailDto, ITokens, IUser } from "./auth.dto"

export const AuthService = {
    // api call with axios
    loginWithEmail: async (dto: ILoginWithEmailDto) => {
        const { data } = await ApiService.post<IUser>("/api/Account/Login", dto)
        return data
    },
    logOut: async () => {
        const { data } = await ApiService.post<IResponse<ICurrentUser>>("/api/Account/Logout")
        return data.response
    },
    SignupWithEmail: async (dto: ILoginWithEmailDto) => {
        const { data } = await ApiService.post<IUser>("/api/Account/CreateUser", dto)
        return data
    },
    ExternalLogin: async (provider: string) => {
        const { data } = await ApiService.get<IResponse<ICurrentUser>>(
            `/api/Account/PerformExternalLogin?provider=${provider}`
        )
        return data.response
    },
    refreshToken: async () => {
        const result = await ApiService.post<IResponse<ITokens>>("/v1/auth/token")
        return result.data.response
    },
    getUserProfile: async () => {
        const { data } = await ApiService.get<IResponse<ICurrentUser>>("/api/Account/GetProfile")
        return data.response
    },
}
