import { applyWSSHandler } from "@trpc/server/adapters/ws"
import next from "next"
import { createServer } from "node:http"
import { parse } from "node:url"
import { WebSocketServer } from "ws"
import { appRouter } from "./api/root"
import { createTRPCContext } from "./api/trpc"

const port = parseInt(process.env.NEXT_PUBLIC_PORT ?? "3000", 10)
const hostname = process.env.NEXT_PUBLIC_APP_HOSTNAME ?? "127.0.0.1"
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev, port, hostname, dir: process.cwd() })
const handle = app.getRequestHandler()

void app.prepare().then(() => {
  const server = createServer((req, res) => {
    if (!req.url) return
    const parsedUrl = parse(req.url, true)
    void handle(req, res, parsedUrl)
  })

  const wss = new WebSocketServer({
    server,
  })

  const handler = applyWSSHandler({
    wss,
    router: appRouter,
    createContext: createTRPCContext,
  })

  process.on("SIGTERM", () => {
    console.log("SIGTERM")
    handler.broadcastReconnectNotification()
  })

  server.once("error", (err) => {
    console.error(err)
    process.exit(1)
  })

  server.on("upgrade", (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req)
    })
  })

  server.listen(port, () => {
    console.log(
      `> Server listening http(s)/ws(s) requests at ${hostname}:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    )
  })
})
