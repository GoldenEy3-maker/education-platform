import { cls } from "~/utils/func"
import { Actions } from "./Actions"
import { Fieldset } from "./Fieldset"
import styles from "./styles.module.sass"

const Form = (props: React.ComponentProps<"form">) => {
  return (
    <form {...props} className={cls(styles.root, props.className)}>
      {props.children}
    </form>
  )
}

Form.Actions = Actions
Form.Fieldset = Fieldset

export default Form
