import { z } from "zod"
import { ZodEmailString, ZodPasswordString } from "../../utils/zod.util"

// * Request object with zod
export const LoginWithEmailDto = z
    .object({
        Email: ZodEmailString,
        Password: ZodPasswordString,
    })
    .strict()

export type ILoginWithEmailDto = z.infer<typeof LoginWithEmailDto>

// * Response object
export interface IUser {
    Message: string
    UserId: string
    CustomToken: string
}
export interface ICurrentUser {
    UserId: string 
    Email: string | null
}


export interface ITokens {
    accessToken: string
    refreshToken: string
}
