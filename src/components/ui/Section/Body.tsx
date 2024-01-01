import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

export const Body: React.FC<React.ComponentProps<"div">> = (props) => {
  return (
    <div {...props} className={cls(styles.body, props.className)}>
      {props.children}
    </div>
  )
}
