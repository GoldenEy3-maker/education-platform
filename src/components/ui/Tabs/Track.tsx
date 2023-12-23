import { useRef, useState } from "react"
import { cls } from "~/utils/func"
import { useTabsContext } from "./context"
import styles from "./styles.module.sass"

export const Track: React.FC<React.ComponentProps<"div">> = (props) => {
  const [isTransitionLock, setIsTransitionLock] = useState(false)

  const trackRef = useRef<HTMLDivElement>(null)

  const startOffsetRef = useRef(0)
  const currentOffsetRef = useRef(0)

  const ctx = useTabsContext()

  const getMaxOffset = (trackScrollWidth: number, trackOffsetWidth: number) =>
    -(trackScrollWidth - trackOffsetWidth)

  const wheelScrolling = (event: React.WheelEvent<HTMLDivElement>) => {
    if (props.onWheel) props.onWheel(event)

    if (!event.shiftKey) return

    const { currentTarget } = event
    const { deltaY } = event
    const isScrollDown = deltaY > 0

    const maxOffset = getMaxOffset(
      currentTarget.scrollWidth,
      currentTarget.offsetWidth
    )

    ctx.setOffset((prev) =>
      isScrollDown
        ? Math.max(prev - Math.abs(deltaY), maxOffset)
        : Math.min(prev + Math.abs(deltaY), 0)
    )
  }

  const lockTransition = () => setIsTransitionLock(true)
  const unlockTransition = () => setIsTransitionLock(false)

  const pointerMoveHandler = (event: PointerEvent) => {
    if (!trackRef.current) return

    const diff = startOffsetRef.current - event.clientX
    const newOffset = currentOffsetRef.current - diff

    const maxOffset = getMaxOffset(
      trackRef.current.scrollWidth,
      trackRef.current.offsetWidth
    )

    ctx.setOffset(Math.max(Math.min(newOffset, 0), maxOffset))
  }

  const pointerUpHandler = () => {
    unlockTransition()

    window.removeEventListener("pointermove", pointerMoveHandler)
    window.removeEventListener("pointerup", pointerUpHandler)
  }

  const pointerDownHandler = (event: React.PointerEvent<HTMLDivElement>) => {
    if (props.onPointerDown) props.onPointerDown(event)

    currentOffsetRef.current = ctx.offset
    startOffsetRef.current = event.clientX

    lockTransition()

    window.addEventListener("pointermove", pointerMoveHandler)
    window.addEventListener("pointerup", pointerUpHandler)
  }

  return (
    <div
      {...props}
      className={cls(styles.track, props.className)}
      style={{
        ...props.style,
        transform: `translate3d(${ctx.offset}px, 0, 0)`,
        transition: isTransitionLock ? "none" : undefined,
      }}
      onWheel={wheelScrolling}
      onPointerDown={pointerDownHandler}
      ref={trackRef}
    >
      <span
        className={styles.cursor}
        style={{
          width: ctx.activeItemWidth + "px",
          left: ctx.cursorOffset + "px",
        }}
      />
      {props.children}
    </div>
  )
}
