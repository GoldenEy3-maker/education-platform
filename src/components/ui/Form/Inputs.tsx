import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

export const Inputs: React.FC<React.ComponentProps<"div">> = (props) => {
  return (
    <div {...props} className={cls(styles.inputs, props.className)}>
      {props.children}
    </div>
  )
}
