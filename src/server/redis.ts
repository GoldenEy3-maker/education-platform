import Redis from "ioredis"

export const sub = new Redis(process.env.REDIS_URL ?? "")
export const pub = new Redis(process.env.REDIS_URL ?? "")
