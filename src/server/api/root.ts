import { authRouter } from "./routers/auth.router"
import { notificationRouter } from "./routers/notification.router"
import { userRouter } from "./routers/user.router"
import { createTRPCRouter, publicProcedure } from "./trpc"

export const appRouter = createTRPCRouter({
  healthCheck: publicProcedure.query(() => "healthCheck trpc!"),
  auth: authRouter,
  notification: notificationRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
