import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

export const Group: React.FC<React.ComponentProps<"div">> = (props) => {
  return (
    <div {...props} className={cls(styles.group, props.className)}>
      {props.children}
    </div>
  )
}
