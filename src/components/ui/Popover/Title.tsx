import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

export const Title: React.FC<React.ComponentProps<"h3">> = (props) => {
  return (
    <h3 {...props} className={cls(styles.title, props.className)}>
      {props.children}
    </h3>
  )
}
