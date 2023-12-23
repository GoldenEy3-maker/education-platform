import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

type WrapperProps = {
  isOpen: boolean
} & React.ComponentProps<"div">

export const Wrapper: React.FC<WrapperProps> = ({ isOpen, ...props }) => {
  return (
    <div
      {...props}
      className={cls(styles.wrapper, props.className)}
      aria-hidden={!isOpen}
    >
      {props.children}
    </div>
  )
}
