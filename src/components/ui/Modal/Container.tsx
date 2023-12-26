import { useDocEventListener } from "~/hooks/docEvent.hook"
import { useModalStore } from "~/store/modal"
import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

export const Container: React.FC<
  Omit<React.ComponentProps<"div">, "aria-hidden">
> = (props) => {
  const modalStore = useModalStore()

  const isContainerOpen = modalStore.queue.length !== 0

  const clickOutsideHandler: React.PointerEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (
      !(event.target as HTMLElement).closest("[data-modal-root]") ||
      !event.currentTarget.contains(event.target as HTMLElement)
    )
      modalStore.close()

    if (props.onPointerDown) props.onPointerDown(event)
  }

  const blurOutsideHandler: React.FocusEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (
      event.relatedTarget !== null &&
      !event.relatedTarget.closest("[data-modal-root]") &&
      !event.currentTarget.contains(event.relatedTarget as HTMLElement)
    )
      modalStore.close()

    if (props.onBlur) props.onBlur(event)
  }

  const closeOnKeyPressHandler = (event: KeyboardEvent) => {
    if (!isContainerOpen) return

    if (event.code === "Escape") modalStore.close()
  }

  useDocEventListener("keyup", closeOnKeyPressHandler)

  return (
    <div
      {...props}
      className={cls(styles.container, props.className)}
      aria-hidden={!isContainerOpen}
      onPointerDown={clickOutsideHandler}
      onBlur={blurOutsideHandler}
    >
      <div className={styles.containerWrapper}>{props.children}</div>
    </div>
  )
}
