import { z } from "zod"

export const authSignInInput = z.object({
  login: z.string(),
  password: z.string().min(4, "Пароль не менее 4 символов!"),
  rememberMe: z.boolean(),
})

export type AuthSignInInput = z.TypeOf<typeof authSignInInput>
