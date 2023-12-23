import { observable } from "@trpc/server/observable"
import ApiError from "../../exeptions"
import {
  notificationModel,
  notificationOnSendInput,
  notificationReadInput,
  notificationSendInput,
  type NotificationModel,
} from "../schemas/notification.schema"
import { authProcedure, publicProcedure } from "../trpc"

class NotificationController {
  getBySession() {
    return authProcedure.query(
      async (opts) =>
        await opts.ctx.redis.getUserNotifications(opts.ctx.user.id)
    )
  }

  clear() {
    return authProcedure.mutation(
      async (opts) =>
        await opts.ctx.redis.clearUserNotifications(opts.ctx.user.id)
    )
  }

  onSend() {
    return publicProcedure
      .input(notificationOnSendInput)
      .subscription((opts) => {
        return observable<NotificationModel>((emit) => {
          if (!opts.input.userId) throw ApiError.Unauthorized()

          const onSend = (channel: string, message: string) => {
            const notification = notificationModel.parse(JSON.parse(message))
            emit.next(notification)
          }

          void opts.ctx.redis.subscribeToUserNotification(opts.input.userId)
          opts.ctx.redis.on("message", onSend)

          return () => {
            opts.ctx.redis.off("message", onSend)
          }
        })
      })
  }

  read() {
    return authProcedure.input(notificationReadInput).mutation(async (opts) => {
      if (opts.input) {
        return await opts.ctx.redis.readNotification(opts.input.id)
      }

      return await opts.ctx.redis.readUserNotifications(opts.ctx.user.id)
    })
  }

  send() {
    return authProcedure.input(notificationSendInput).mutation(async (opts) => {
      const key = crypto.randomUUID()
      const notification = notificationModel.parse({
        ...opts.input,
        id: key,
        isRead: false,
        sender: opts.ctx.user,
        createdAt: new Date().toISOString(),
      })

      await opts.ctx.redis.setNotification(key, notification)

      await opts.ctx.redis.publishUserNotification(
        opts.input.recipientId,
        notification
      )

      return notification
    })
  }
}

const notificationController = new NotificationController()

export default notificationController
