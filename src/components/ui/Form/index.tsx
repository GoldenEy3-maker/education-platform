import { cls } from "~/utils/func"
import { Actions } from "./Actions"
import { Fieldset } from "./Fieldset"
import { Inputs } from "./Inputs"
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
Form.Inputs = Inputs

export default Form
