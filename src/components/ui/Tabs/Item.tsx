import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/func"
import { useTabsContext } from "./context"
import styles from "./styles.module.sass"

type ItemProps = {
  id: string
  label: string
  isActive: boolean
  name: string
} & React.ComponentProps<"input">

export const Item: React.FC<ItemProps> = ({
  className,
  id,
  label,
  isActive,
  ...props
}) => {
  const rippleEffectEvent = useRippleEffect()

  const ctx = useTabsContext()

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.parentElement

    if (!target) throw new Error("Tabs.Item should be within a div wrapper")

    const track = target.parentElement

    if (!track)
      throw new Error("Tabs.Item should be within a Tabs.Track component")

    const trackScrollWidth = track.scrollWidth
    const trackOffsetWidth = track.offsetWidth
    const targetOffsetWidth = target.offsetWidth

    const maxOffset = -(trackScrollWidth - trackOffsetWidth)

    ctx.setActiveItemWidth(targetOffsetWidth / 2)
    ctx.setCursorOffset(target.offsetLeft + targetOffsetWidth / 4)

    const newOffset = -(
      target.offsetLeft -
      (trackOffsetWidth / 2 - targetOffsetWidth / 2)
    )

    ctx.setOffset(Math.max(Math.min(newOffset, 0), maxOffset))

    if (props.onChange) props.onChange(event)
  }

  const initializeActiveItem = (node: HTMLDivElement | null) => {
    if (node && isActive) {
      const width = node.offsetWidth

      ctx.setActiveItemWidth(width / 2)
      ctx.setCursorOffset(node.offsetLeft + width / 4)
    }
  }

  return (
    <div className={cls(styles.item, className)} ref={initializeActiveItem}>
      <input {...props} type="radio" id={id} onChange={changeHandler} />
      <label onPointerDown={rippleEffectEvent} htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
