import { cls } from "~/utils/func"
import { Body } from "./Body"
import { Close } from "./Close"
import { Container } from "./Container"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Title } from "./Title"
import styles from "./styles.module.sass"

type ModalProps = {
  isOpen: boolean
  asDrawer?: boolean
  position?: "left" | "center" | "right"
  wrapperClassName?: string
} & Omit<React.ComponentProps<"div">, "aria-hidden">

const Modal = ({
  isOpen,
  asDrawer,
  position,
  wrapperClassName,
  ...props
}: ModalProps) => {
  return (
    <div
      {...props}
      className={cls(
        styles.root,
        {
          [styles._drawer ?? ""]: !!asDrawer,
          [styles._leftPos ?? ""]: !!asDrawer && position === "left",
        },
        props.className
      )}
      aria-hidden={!isOpen}
    >
      <div
        data-modal-root
        className={cls(styles.rootWrapper, wrapperClassName)}
      >
        {props.children}
      </div>
    </div>
  )
}

Modal.Close = Close
Modal.Container = Container
Modal.Body = Body
Modal.Footer = Footer
Modal.Title = Title
Modal.Header = Header

export default Modal
