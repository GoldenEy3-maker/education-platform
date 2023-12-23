import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import ApiError from "../../exeptions"
import { authProcedure } from "../trpc"

class UserController {
  getAll() {
    return authProcedure.query(async (opts) => {
      try {
        const users = await opts.ctx.db.user.findMany({
          where: {
            id: {
              not: opts.ctx.user.id,
            },
          },
        })

        return users
      } catch (err: unknown) {
        if (err instanceof PrismaClientKnownRequestError)
          throw ApiError.PrismaError()

        throw ApiError.BadRequest()
      }
    })
  }
}

const userController = new UserController()

export default userController
