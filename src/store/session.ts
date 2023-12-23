import { User } from "@prisma/client"
import { create } from "zustand"
import { RouterOutputs } from "~/utils/api"

type SessionStore = {
  token: string | null
  user: RouterOutputs["auth"]["getSession"] | null
  setToken: (token: string) => void
  removeToken: () => void
  setUser: (data: User) => void
  clear: () => void
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  token: null,
  user: null,
  setToken(token) {
    set(() => ({ token }))
  },
  removeToken() {
    set(() => ({ token: null }))
  },
  setUser(data) {
    set(() => ({ user: data }))
  },
  clear() {
    set(() => ({ user: null, token: null }))
  },
}))
