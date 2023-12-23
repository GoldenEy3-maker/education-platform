import { applyWSSHandler } from "@trpc/server/adapters/ws"
import { WebSocketServer } from "ws"
import { appRouter } from "./api/root"
import { createTRPCContext } from "./api/trpc"

const port = parseInt(process.env.NEXT_PUBLIC_PORT ?? "3001")
const host = process.env.NEXT_PUBLIC_APP_HOSTNAME ?? "127.0.0.1"

const wss = new WebSocketServer({
  port,
  host,
})

const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext: createTRPCContext,
})

wss.on("connection", (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`)
  ws.once("close", () => {
    console.log(`➖➖ Connection (${wss.clients.size})`)
  })
})

console.log(`✅ WebSocket Server listening on ws://${host}:${port}`)

process.on("SIGTERM", () => {
  console.log("SIGTERM")
  handler.broadcastReconnectNotification()
  wss.close()
})
