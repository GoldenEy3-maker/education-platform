import { applyWSSHandler } from "@trpc/server/adapters/ws"
import { WebSocketServer } from "ws"
import { appRouter } from "./api/root"
import { createTRPCContext } from "./api/trpc"

const port = parseInt(process.env.PORT ?? "3001")

const wss = new WebSocketServer({
  port,
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

console.log(`✅ WebSocket Server listening on ws://127.0.0.1:${port}`)

process.on("SIGTERM", () => {
  console.log("SIGTERM")
  handler.broadcastReconnectNotification()
  wss.close()
})
