import { observable } from "@trpc/server/observable"
import { ZodError } from "zod"
import { RedisKeyMap } from "../../../utils/enums"
import ApiError from "../../exeptions"
import { pub, sub } from "../../redis"
import {
  notificationModel,
  notificationOnSendInput,
  notificationReadInput,
  notificationSendInput,
  type NotificationModel,
} from "../schemas/notification.schema"
import { authProcedure, publicProcedure } from "../trpc"

class NotificationController {
  _setNotification(key: string, notification: NotificationModel) {
    return pub.set(
      `${RedisKeyMap.Notification}:${key}`,
      JSON.stringify(notification)
    )
  }

  async _getUserNotifications(recipientId: string) {
    try {
      let cursor: null | string = null
      const keys: string[] = []

      while (cursor !== "0") {
        const result: [cursor: string, elements: string[]] = await pub.scan(
          cursor ?? "0",
          "MATCH",
          RedisKeyMap.Notification + ":*"
        )

        cursor = result[0]

        for (const key of result[1]) {
          keys.push(key)
        }
      }

      const notifications: NotificationModel[] = []

      for (const key of keys) {
        const result = await pub.get(key)

        if (!result) continue

        const notification = notificationModel.parse(JSON.parse(result))

        if (recipientId && recipientId !== notification.recipientId) continue

        notifications.push(notification)
      }

      return notifications
    } catch (err: unknown) {
      if (err instanceof ZodError) throw ApiError.ZodError()

      throw ApiError.BadRequest()
    }
  }

  async _clearUserNotifications(recipientId: string) {
    const notifications = await this._getUserNotifications(recipientId)

    for (const notification of notifications) {
      await pub.del(`${RedisKeyMap.Notification}:${notification.id}`)
    }

    return true
  }

  async _getNotification(id: string) {
    try {
      const result = await pub.get(`${RedisKeyMap.Notification}:${id}`)

      if (!result)
        throw ApiError.BadRequest("Такого уведомления не существует!")

      return notificationModel.parse(JSON.parse(result))
    } catch (err: unknown) {
      if (err instanceof ZodError) throw ApiError.ZodError()

      throw ApiError.BadRequest()
    }
  }

  async _readNotification(id: string) {
    const notification = await this._getNotification(id)
    const newNotification: NotificationModel = { ...notification, isRead: true }
    await this._setNotification(id, newNotification)
    return newNotification
  }

  async _readUserNotifications(recipientId: string) {
    const notifications = await this._getUserNotifications(recipientId)

    return await Promise.all(
      notifications.map(async (notification) => {
        const newNotification: NotificationModel = {
          ...notification,
          isRead: true,
        }
        await this._setNotification(notification.id, newNotification)
        return newNotification
      })
    )
  }

  _subscribeToUserNotification(userId: string) {
    return sub.subscribe(`user-notification-${userId}`, (err) => {
      if (err) throw new Error(err.message)
    })
  }

  _publishUserNotification(userId: string, notification: NotificationModel) {
    return pub.publish(
      `user-notification-${userId}`,
      JSON.stringify(notification)
    )
  }

  getBySession() {
    return authProcedure.query(
      async (opts) => await this._getUserNotifications(opts.ctx.user.id)
    )
  }

  clear() {
    return authProcedure.mutation(
      async (opts) => await this._clearUserNotifications(opts.ctx.user.id)
    )
  }

  onSend() {
    return publicProcedure
      .input(notificationOnSendInput)
      .subscription(async (opts) => {
        const userId = opts.input.userId

        if (!userId) throw ApiError.Unauthorized()

        return observable<NotificationModel>((emit) => {
          const onSend = (channel: string, message: string) => {
            if (channel.includes("user-notification")) {
              const notification = notificationModel.parse(JSON.parse(message))
              emit.next(notification)
            }
          }

          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this._subscribeToUserNotification(userId)

          opts.ctx.sub.on("message", onSend)

          return () => {
            opts.ctx.sub.off("message", onSend)
          }
        })
      })
  }

  read() {
    return authProcedure.input(notificationReadInput).mutation(async (opts) => {
      if (opts.input) {
        return await this._readNotification(opts.input.id)
      }

      return await this._readUserNotifications(opts.ctx.user.id)
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

      await this._setNotification(key, notification)

      await this._publishUserNotification(opts.input.recipientId, notification)

      return notification
    })
  }
}

const notificationController = new NotificationController()

export default notificationController
