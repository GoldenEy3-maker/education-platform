import { useRouter } from "next/router"
import { useEffect } from "react"

export const useRouterChangeEvent = (callback: () => void) => {
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) callback()
  }, [router])
}
