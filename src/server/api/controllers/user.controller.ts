import { type User } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { observable } from "@trpc/server/observable"
import ApiError from "../../exeptions"
import { userOnConnectInput } from "../schemas/user.schema"
import { authProcedure, publicProcedure } from "../trpc"

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

  connect() {
    return authProcedure.query(async (opts) => {
      await opts.ctx.pub.publish("users", JSON.stringify(opts.ctx.user))

      return opts.ctx.user
    })
  }

  onConnect() {
    return publicProcedure
      .input(userOnConnectInput)
      .subscription(async (opts) => {
        const { userId } = opts.input

        if (!userId) throw ApiError.Unauthorized()

        await opts.ctx.db.user.update({
          where: {
            id: userId,
          },
          data: {
            online: true,
            lastOnline: new Date(),
          },
        })

        return observable<User>((emit) => {
          const onConnect = (channel: string, message: string) => {
            if (channel === "users") {
              const user = JSON.parse(message) as User

              emit.next(user)
            }
          }

          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          opts.ctx.sub.subscribe("users", (err) => {
            if (err) throw new Error(err.message)
          })

          opts.ctx.sub.on("message", onConnect)

          return () => {
            opts.ctx.sub.off("message", onConnect)

            opts.ctx.db.user
              .update({
                where: {
                  id: userId,
                },
                data: {
                  online: false,
                  lastOnline: new Date(),
                },
              })
              .then((data) =>
                opts.ctx.pub.publish("users", JSON.stringify(data))
              )
              .catch((err) => {
                if (err instanceof PrismaClientKnownRequestError)
                  throw ApiError.PrismaError(err.message)

                throw ApiError.BadRequest()
              })
          }
        })
      })
  }
}

const userController = new UserController()

export default userController
