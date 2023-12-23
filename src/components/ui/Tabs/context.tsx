import type React from "react"
import { createContext, useContext } from "react"

export type TabsContext = {
  offset: number
  cursorOffset: number
  activeItemWidth: number
  setOffset: React.Dispatch<React.SetStateAction<number>>
  setActiveItemWidth: React.Dispatch<React.SetStateAction<number>>
  setCursorOffset: React.Dispatch<React.SetStateAction<number>>
}

export const TabsContext = createContext<TabsContext | null>(null)

export const useTabsContext = () => {
  const ctx = useContext(TabsContext)

  if (!ctx)
    throw new Error(
      "useTabsContent should be used within the scope of a Tabs component"
    )

  return ctx
}
