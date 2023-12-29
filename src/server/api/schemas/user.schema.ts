import { z } from "zod"

export const userOnConnectInput = z.object({
  userId: z.string().nullable(),
})

export type UserOnConnectInput = z.TypeOf<typeof userOnConnectInput>
