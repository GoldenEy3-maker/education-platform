import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as typeof global & {
  prisma: PrismaClient | undefined
}

export const db: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
