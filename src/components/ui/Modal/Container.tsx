import { useRef } from "react"
import { useDocEventListener } from "~/hooks/docEvent.hook"
import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

type ContainerProps = {
  state: boolean
  closeHandler: () => void
} & Omit<React.ComponentProps<"div">, "aria-hidden">

export const Container: React.FC<ContainerProps> = ({
  state,
  closeHandler,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const clickOutsideHandler: React.PointerEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (
      !(event.target as HTMLElement).closest("[data-modal-root]") ||
      !containerRef.current?.contains(event.target as HTMLElement)
    )
      closeHandler()

    if (props.onPointerDown) props.onPointerDown(event)
  }

  const blurOutsideHandler: React.FocusEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (
      event.relatedTarget !== null &&
      !event.relatedTarget.closest("[data-modal-root]") &&
      !containerRef.current?.contains(event.relatedTarget as HTMLElement)
    )
      closeHandler()

    if (props.onBlur) props.onBlur(event)
  }

  const closeOnKeyPressHandler = (event: KeyboardEvent) => {
    if (!state) return

    if (event.code === "Escape") closeHandler()
  }

  useDocEventListener("keyup", closeOnKeyPressHandler)

  return (
    <div
      {...props}
      className={cls(styles.container, props.className)}
      aria-hidden={!state}
      ref={containerRef}
      onPointerDown={clickOutsideHandler}
      onBlur={blurOutsideHandler}
    >
      <div className={styles.containerWrapper}>{props.children}</div>
    </div>
  )
}
