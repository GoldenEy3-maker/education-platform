import { forwardRef } from "react"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/func"
import LoadingIcon from "../LoadingIcon"
import styles from "./styles.module.sass"

export type ButtonProps = {
  variant?: "elevated" | "filled" | "outlined"
  asIcon?: boolean
  color?: "danger" | "primary" | "success" | "default"
  textAlign?: "center" | "left" | "right"
  size?: "sm"
  loading?: boolean
  isActive?: boolean
  counter?: number
} & React.ComponentProps<"button">

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      asIcon,
      color = "primary",
      textAlign,
      size,
      loading,
      isActive,
      counter,
      ...props
    },
    ref
  ) => {
    const rippleEffectEvent = useRippleEffect()

    const isLoading = loading ?? (props.type === "submit" && props.disabled)

    return (
      <button
        {...props}
        className={cls(styles.btn, props.className, {
          [styles._filled ?? ""]: variant === "filled",
          [styles._elevated ?? ""]: variant === "elevated",
          [styles._outlined ?? ""]: variant === "outlined",
          [styles._asIcon ?? ""]: asIcon!,
          [styles._dangerClr ?? ""]: color === "danger",
          [styles._successClr ?? ""]: color === "success",
          [styles._defaultClr ?? ""]: color === "default",
          [styles._textAlignCenter ?? ""]: textAlign === "center",
          [styles._textAlignRight ?? ""]: textAlign === "right",
          [styles._sm ?? ""]: size === "sm",
          [styles._isActive ?? ""]: !!isActive,
          [styles._loading ?? ""]: !!isLoading,
        })}
        onPointerDown={rippleEffectEvent}
        ref={ref}
        disabled={isLoading ?? props.disabled}
      >
        {counter ? (
          <span className={styles.counter}>{Math.min(counter ?? 0, 99)}</span>
        ) : null}
        {isLoading ? <LoadingIcon /> : null}
        {isLoading && asIcon ? null : props.children}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
