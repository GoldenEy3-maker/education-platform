import {
  default as authController,
  default as userController,
} from "../controllers/auth.controller"
import { createTRPCRouter } from "../trpc"

export const authRouter = createTRPCRouter({
  getSession: authController.getSession(),
  signIn: authController.signIn(),
  signOut: userController.signOut(),
})
