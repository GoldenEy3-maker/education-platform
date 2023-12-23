import { forwardRef } from "react"
import { BiCheck, BiMinus } from "react-icons/bi"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/func"
import Button from "../Button"
import styles from "./styles.module.sass"

export type ExtendedCheckboxValue = "on" | "off" | undefined

export type ExtendedCheckboxType = {
  value: ExtendedCheckboxValue
  checked: boolean
}

type CheckboxHTMLAttributes = Omit<
  React.ComponentProps<"input">,
  "type" | "value" | "onChange"
>

type CheckboxBaseProps = {
  label: string
  controllerPosition?: "right" | "left"
  leadingIcon?: React.ReactNode
} & CheckboxHTMLAttributes

type CheckboxProps =
  | ({
      type: "check"
      onChange: (checked: boolean) => void
    } & CheckboxBaseProps)
  | ({
      type: "extended-check"
      value: ExtendedCheckboxValue
      onChange: (value: ExtendedCheckboxValue, checked: boolean) => void
    } & CheckboxBaseProps)
  | ({
      type: "switch"
      onChange: (checked: boolean) => void
    } & CheckboxBaseProps)

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, leadingIcon, controllerPosition, ...props }, ref) => {
    const rippleEffectEvent = useRippleEffect()

    const renderCheckboxIcon = () => {
      if (props.type === "check") {
        return props.checked ? <BiCheck /> : null
      }

      if (props.type === "extended-check") {
        if (props.value === "on") return <BiCheck />
        if (props.value === "off") return <BiMinus />
      }

      return null
    }

    const changeHandler = () => {
      if (props.type === "check" || props.type === "switch") {
        props.onChange(!props.checked)
        return
      }

      let value: ExtendedCheckboxValue = undefined
      let checked = !!props.checked

      switch (props.value) {
        case "on":
          value = "off"
          checked = true
        case "off":
          value = undefined
          checked = false
        default:
          value = "on"
          checked = true
      }

      props.onChange(value, checked)
    }

    return (
      <div
        className={cls(styles.root, props.className, {
          [styles._controllerRight ?? ""]: controllerPosition === "right",
          [styles._switchController ?? ""]: props.type === "switch",
        })}
      >
        <input {...props} type="checkbox" onChange={changeHandler} ref={ref} />
        <div
          className={styles.wrapper}
          onPointerDown={!props.disabled ? rippleEffectEvent : undefined}
        >
          <label htmlFor={props.id}>
            {leadingIcon ? (
              <span className={styles.leadingIcon}>{leadingIcon}</span>
            ) : null}
            <span>{label}</span>
          </label>
          <Button
            type="button"
            asIcon
            className={styles.controller}
            onClick={changeHandler}
            tabIndex={-1}
            disabled={props.disabled}
          >
            {props.type !== "switch" ? (
              <span className={styles.checkboxIcon}>
                {renderCheckboxIcon()}
              </span>
            ) : (
              <div className={styles.switchIcon}>
                <span></span>
              </div>
            )}
          </Button>
        </div>
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"

export default Checkbox
