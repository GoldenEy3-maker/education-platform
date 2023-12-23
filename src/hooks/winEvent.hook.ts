import { useEffect } from "react"

export const useWinEventListener = <T extends keyof WindowEventMap>(
  key: T,
  listener: (event: WindowEventMap[T]) => void
) => {
  useEffect(() => {
    window.addEventListener(key, listener)

    return () => window.removeEventListener(key, listener)
  }, [listener, key])
}
