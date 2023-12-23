import { forwardRef } from "react"
import { IconX } from "~/components/ui/Icons"
import Button, { type ButtonProps } from "../Button"
import styles from "./styles.module.sass"

export const Close = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "asIcon" | "type" | "color">
>((props, ref) => {
  return (
    <div className={styles.close}>
      <Button {...props} ref={ref} asIcon type="button" color="default">
        <IconX />
      </Button>
    </div>
  )
})

Close.displayName = "Close"
