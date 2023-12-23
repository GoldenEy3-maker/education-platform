import { z } from "zod"
import { NotificationTypeMap } from "../../../utils/enums"

export const notificationSendInput = z.object({
  link: z.string(),
  subject: z.string(),
  recipientId: z.string(),
  target: z.string(),
  type: z.nativeEnum(NotificationTypeMap),
})

export const notificationOnSendInput = z.object({
  userId: z.string().nullable(),
})

export const notificationReadInput = z
  .object({
    id: z.string(),
  })
  .optional()

export const notificationModel = z.object({
  id: z.string(),
  recipientId: z.string(),
  subject: z.string(),
  link: z.string(),
  isRead: z.boolean(),
  createdAt: z.string(),
  target: z.string(),
  type: z.nativeEnum(NotificationTypeMap),
  sender: z.object({
    id: z.string(),
    avatar: z.string().nullable(),
    name: z.string(),
  }),
})

export type NotificationSendInput = z.TypeOf<typeof notificationSendInput>
export type NotificationOnSendInput = z.TypeOf<typeof notificationOnSendInput>
export type NotificationReadInput = z.TypeOf<typeof notificationReadInput>
export type NotificationModel = z.TypeOf<typeof notificationModel>
