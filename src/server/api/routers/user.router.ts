import userController from "../controllers/user.controller"
import { createTRPCRouter } from "../trpc"

export const userRouter = createTRPCRouter({
  getAll: userController.getAll(),
})
