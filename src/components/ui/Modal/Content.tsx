import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

export const Content: React.FC<React.ComponentProps<"div">> = (props) => {
  return (
    <div {...props} className={cls(styles.content, props.className)}>
      {props.children}
    </div>
  )
}
