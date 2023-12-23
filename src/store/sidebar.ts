import { create } from "zustand"

type SidebarStore = {
  isExpanded: boolean
  toggle: () => void
  shrink: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isExpanded: true,
  shrink() {
    set(() => ({ isExpanded: false }))
  },
  toggle() {
    set((state) => ({ isExpanded: !state.isExpanded }))
  },
}))
