import bcrypt from "bcrypt"
import tokenService from "../../../services/token.service"
import ApiError from "../../exeptions"
import { authSignInInput } from "../schemas/auth.schema"
import { authProcedure, publicProcedure } from "../trpc"

class AuthController {
  getSession() {
    return authProcedure.query((opts) => opts.ctx.user)
  }

  signIn() {
    return publicProcedure.input(authSignInInput).mutation(async (opts) => {
      const user = await opts.ctx.db.user.findUnique({
        where: {
          login: opts.input.login,
        },
      })

      if (!user) throw ApiError.BadRequest("Неверный логин или пароль!")

      const isPassowrdMatch = await bcrypt.compare(
        opts.input.password,
        user.password
      )

      if (!isPassowrdMatch)
        throw ApiError.BadRequest("Неверный логин или пароль!")

      const { accessToken, refreshToken } = tokenService.generateTokens(
        user,
        opts.input.rememberMe
      )

      // @ts-expect-error setRefreshToken method gets IncomingMessage Request instead of a NextApiRequest
      tokenService.setRefreshToken(refreshToken, opts.ctx.req, opts.ctx.res)

      return { accessToken, user }
    })
  }

  signOut() {
    return publicProcedure.mutation((opts) => {
      // @ts-expect-error removeRefreshToken method gets IncomingMessage Request instead of a NextApiRequest
      tokenService.removeRefreshToken(opts.ctx.req, opts.ctx.res)
    })
  }
}

const authController = new AuthController()

export default authController
