import { create } from "zustand"
import { GlobalDatasetKeyMap, ModalKeyMap } from "~/utils/enums"

type ModalProps = Record<ModalKeyMap, unknown>

type OpenModalStoreActionArgs<T extends ModalKeyMap> =
  T extends keyof ModalProps
    ? { key: T; target?: HTMLElement; props?: ModalProps[T] }
    : { key: T; target?: HTMLElement }

type ModalStore = {
  queue: ModalKeyMap[]
  props: Partial<ModalProps> | null
  target: HTMLElement | null
  open: <T extends ModalKeyMap>(args: OpenModalStoreActionArgs<T>) => void
  close: (key?: ModalKeyMap) => void
  setProps: <T extends keyof ModalProps>(key: T, props: ModalProps[T]) => void
}

export const useModalStore = create<ModalStore>((set, get) => ({
  queue: [],
  props: null,
  target: null,
  open(args) {
    const storedQueue = get().queue

    if (storedQueue.at(-1) === args.key) return

    if (storedQueue.length === 0)
      document.body.style.setProperty(
        "--scrollbar-offset",
        window.innerWidth - document.body.offsetWidth + "px"
      )
    document.body.setAttribute(GlobalDatasetKeyMap.LockByModal, "true")

    if (args.target) set(() => ({ target: args.target }))

    if (storedQueue.includes(args.key)) {
      set((state) => ({
        queue: [...state.queue.filter((q) => q !== args.key), args.key],
      }))
    } else {
      set((store) => ({
        queue: [...store.queue, args.key],
      }))
    }

    if (args.props) {
      set((store) => ({ props: { ...store.props, [args.key]: args.props } }))
    }
  },
  close(key) {
    const newQueue = get().queue.filter((q, _, self) =>
      key ? q !== key : q !== self.at(-1)
    )

    if (newQueue.length === 0) {
      setTimeout(() => document.body.removeAttribute(GlobalDatasetKeyMap.LockByModal), 200)

      const target = get().target

      if (target) {
        target.focus()
        set(() => ({ target: null }))
      }
    }

    set(() => ({ queue: newQueue }))
  },
  setProps(key, props) {
    set((store) => ({ props: { ...store.props, [key]: props } }))
  },
}))
