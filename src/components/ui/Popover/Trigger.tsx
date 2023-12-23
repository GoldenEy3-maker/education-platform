import { forwardRef } from "react"
import { cls } from "~/utils/func"
import Button, { type ButtonProps } from "../Button"
import styles from "./styles.module.sass"

export const Trigger = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <Button
        {...props}
        ref={ref}
        className={cls(styles.trigger, props.className)}
      >
        {props.children}
      </Button>
    )
  }
)

Trigger.displayName = "Trigger"
