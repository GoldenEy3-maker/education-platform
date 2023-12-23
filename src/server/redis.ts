import Redis from "ioredis"
import { ZodError } from "zod"
import { RedisKeyMap } from "../utils/enums"
import {
  notificationModel,
  type NotificationModel,
} from "./api/schemas/notification.schema"
import ApiError from "./exeptions"

class CustomRedis extends Redis {
  constructor(path: string) {
    super(path)
  }

  setNotification(key: string, notification: NotificationModel) {
    return this.set(
      `${RedisKeyMap.Notification}:${key}`,
      JSON.stringify(notification)
    )
  }

  async getUserNotifications(recipientId: string) {
    try {
      let cursor: null | string = null
      const keys: string[] = []

      while (cursor !== "0") {
        const result: [cursor: string, elements: string[]] = await this.scan(
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
        const result = await this.get(key)

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

  async clearUserNotifications(recipientId: string) {
    const notifications = await this.getUserNotifications(recipientId)

    for (const notification of notifications) {
      await this.del(`${RedisKeyMap.Notification}:${notification.id}`)
    }

    return true
  }

  async getNotification(id: string) {
    try {
      const result = await this.get(`${RedisKeyMap.Notification}:${id}`)

      if (!result)
        throw ApiError.BadRequest("Такого уведомления не существует!")

      return notificationModel.parse(JSON.parse(result))
    } catch (err: unknown) {
      if (err instanceof ZodError) throw ApiError.ZodError()

      throw ApiError.BadRequest()
    }
  }

  async readNotification(id: string) {
    const notification = await this.getNotification(id)
    const newNotification: NotificationModel = { ...notification, isRead: true }
    await this.setNotification(id, newNotification)
    return newNotification
  }

  async readUserNotifications(recipientId: string) {
    const notifications = await this.getUserNotifications(recipientId)

    return await Promise.all(
      notifications.map(async (notification) => {
        const newNotification: NotificationModel = {
          ...notification,
          isRead: true,
        }
        await this.setNotification(notification.id, newNotification)
        return newNotification
      })
    )
  }

  subscribeToUserNotification(userId: string) {
    return this.subscribe(`user-notification-${userId}`)
  }

  publishUserNotification(userId: string, notification: NotificationModel) {
    return this.publish(
      `user-notification-${userId}`,
      JSON.stringify(notification)
    )
  }
}

export const redis = new CustomRedis(process.env.REDIS_URL ?? "")
