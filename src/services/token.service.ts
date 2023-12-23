import { setCookie } from "cookies-next"
import jwt from "jsonwebtoken"
import { type NextApiRequest, type NextApiResponse } from "next"
import { z } from "zod"
import ApiError from "../server/exeptions"
import { CookieKeyMap } from "../utils/enums"

const accessTokenPayloadSchema = z.object({
  login: z.string(),
})

const refreshTokenPayloadSchema = z.object({
  login: z.string(),
  tokenVersion: z.number(),
})

type AccessTokenPayload = z.TypeOf<typeof accessTokenPayloadSchema>
type RefreshTokenPayload = z.TypeOf<typeof refreshTokenPayloadSchema>

class TokenService {
  generateTokens(
    payload: AccessTokenPayload & RefreshTokenPayload,
    rememberMe?: boolean
  ) {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET)
      throw ApiError.EnvVarsNotFound()

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    })

    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: rememberMe ? "7d" : "24h",
    })

    return { accessToken, refreshToken }
  }

  verifyAccessToken(token: string) {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

    if (!ACCESS_TOKEN_SECRET) throw ApiError.EnvVarsNotFound()

    try {
      const payload = accessTokenPayloadSchema.parse(
        jwt.verify(token, ACCESS_TOKEN_SECRET)
      )
      return payload
    } catch (err) {
      return null
    }
  }

  verifyRefreshToken(token: string) {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

    if (!REFRESH_TOKEN_SECRET) throw ApiError.EnvVarsNotFound()

    try {
      const payload = refreshTokenPayloadSchema.parse(
        jwt.verify(token, REFRESH_TOKEN_SECRET)
      )

      return payload
    } catch (err) {
      return null
    }
  }

  setRefreshToken(payload: string, req: NextApiRequest, res: NextApiResponse) {
    setCookie(CookieKeyMap.RefreshToken, payload, {
      req,
      res,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  removeRefreshToken(req: NextApiRequest, res: NextApiResponse) {
    setCookie(CookieKeyMap.RefreshToken, 1, {
      req,
      res,
      maxAge: -1,
    })
  }
}

const tokenService = new TokenService()

export default tokenService
