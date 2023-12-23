import { TRPCError } from "@trpc/server"
import { type TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc"

export default class ApiError extends TRPCError {
  constructor(code: TRPC_ERROR_CODE_KEY, message?: string) {
    super({ code, message })
  }

  static BadRequest(message?: string) {
    return new ApiError(
      "BAD_REQUEST",
      message ?? "Возникла неожиданная ошибка! Повторите попытку позже."
    )
  }

  static PrismaError(message?: string) {
    return new ApiError(
      "BAD_REQUEST",
      message ?? "Наблюдаются проблемы с базой данных! Повторите попытку позже."
    )
  }

  static ServerError(message?: string) {
    return new ApiError(
      "INTERNAL_SERVER_ERROR",
      message ?? "Произошла ошибка сервера! Повторите попытку позже."
    )
  }

  static Unauthorized(message?: string) {
    return new ApiError(
      "UNAUTHORIZED",
      message ?? "Неавторизованный пользователь!"
    )
  }

  static ZodError(message?: string) {
    return new ApiError(
      "BAD_REQUEST",
      message ?? "Данные не прошли проверку типов!"
    )
  }

  static EnvVarsNotFound() {
    return new ApiError("INTERNAL_SERVER_ERROR", "Переменные среди не найдены!")
  }
}
