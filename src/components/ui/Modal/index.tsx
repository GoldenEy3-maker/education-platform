import { cls } from "~/utils/func"
import { Close } from "./Close"
import { Container } from "./Container"
import { Content } from "./Content"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Title } from "./Title"
import styles from "./styles.module.sass"

type ModalProps = {
  state: boolean
  asDrawer?: boolean
  position?: "left" | "center" | "right"
} & Omit<React.ComponentProps<"div">, "aria-hidden">

const Modal = ({ state, asDrawer, position, ...props }: ModalProps) => {
  return (
    <div
      {...props}
      className={cls(styles.root, props.className, {
        [styles._drawer ?? ""]: !!asDrawer,
        [styles._leftPos ?? ""]: !!asDrawer && position === "left",
      })}
      aria-hidden={!state}
    >
      <div data-modal-root="" className={styles.rootWrapper}>
        {props.children}
      </div>
    </div>
  )
}

Modal.Close = Close
Modal.Container = Container
Modal.Content = Content
Modal.Footer = Footer
Modal.Title = Title
Modal.Header = Header

export default Modal
