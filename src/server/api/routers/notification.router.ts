import notificationController from "../controllers/notification.controller"
import { createTRPCRouter } from "../trpc"

export const notificationRouter = createTRPCRouter({
  getBySession: notificationController.getBySession(),
  onSend: notificationController.onSend(),
  send: notificationController.send(),
  clear: notificationController.clear(),
  read: notificationController.read(),
})
