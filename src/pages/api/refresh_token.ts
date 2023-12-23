import { type NextApiHandler } from "next"
import { db } from "~/server/db"
import ApiError from "~/server/exeptions"
import tokenService from "~/services/token.service"
import { CookieKeyMap } from "~/utils/enums"

const handler: NextApiHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies[CookieKeyMap.RefreshToken]

    if (!refreshToken) throw ApiError.Unauthorized()

    const refreshTokenPayload = tokenService.verifyRefreshToken(refreshToken)

    if (!refreshTokenPayload) throw ApiError.Unauthorized()

    const user = await db.user.findUnique({
      where: {
        login: refreshTokenPayload.login,
      },
    })

    if (!user) throw ApiError.Unauthorized()

    if (user.tokenVersion !== refreshTokenPayload.tokenVersion)
      throw ApiError.Unauthorized()

    const { accessToken, refreshToken: newRefreshToken } =
      tokenService.generateTokens(user)

    tokenService.setRefreshToken(newRefreshToken, req, res)

    return res.json({ accessToken, user })
  } catch (error: unknown) {
    if (error instanceof ApiError)
      return res.status(401).json({ message: error.message })

    return res.status(400).json({ message: "Неожиданная ошибка!" })
  }
}

export default handler
