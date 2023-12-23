import { useEffect } from "react"

export const useDocEventListener = <T extends keyof DocumentEventMap>(
  key: T,
  listener: (event: DocumentEventMap[T]) => void
) => {
  useEffect(() => {
    document.addEventListener(key, listener)

    return () => document.removeEventListener(key, listener)
  }, [listener, key])
}
