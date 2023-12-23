import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

type FieldsetProps = {
  legend?: string
} & React.ComponentProps<"fieldset">

export const Fieldset: React.FC<FieldsetProps> = ({ legend, ...props }) => {
  return (
    <fieldset {...props} className={cls(styles.fieldset, props.className)}>
      {legend ? <legend>{legend}</legend> : null}
      {props.children}
    </fieldset>
  )
}
