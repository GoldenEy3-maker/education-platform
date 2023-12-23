import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

export const Actions: React.FC<React.ComponentProps<"div">> = (props) => {
  return (
    <div {...props} className={cls(styles.actions, props.className)}>
      {props.children}
    </div>
  )
}
