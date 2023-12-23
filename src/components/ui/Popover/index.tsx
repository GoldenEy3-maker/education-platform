import { useRef } from "react"
import { useDocEventListener } from "~/hooks/docEvent.hook"
import { GlobalDatasetKeyMap } from "~/utils/enums"
import { cls } from "~/utils/func"
import { Actions } from "./Actions"
import { Content } from "./Content"
import { Header } from "./Header"
import { Title } from "./Title"
import { Trigger } from "./Trigger"
import { Wrapper } from "./Wrapper"
import styles from "./styles.module.sass"

type PopoverProps = {
  closeHandler: () => void
  isUseTabs?: boolean
} & React.ComponentProps<"div">

const Popover = ({ closeHandler, isUseTabs, ...props }: PopoverProps) => {
  const rootRef = useRef<HTMLDivElement>(null)

  const blurHandler: React.FocusEventHandler<HTMLDivElement> = (event) => {
    if (
      !document.body.hasAttribute(GlobalDatasetKeyMap.LockByModal) &&
      event.relatedTarget &&
      !rootRef.current?.contains(event.relatedTarget)
    )
      closeHandler()

    if (props.onBlur) props.onBlur(event)
  }

  const clickOutsideHandler = (event: MouseEvent) => {
    if (
      !document.body.hasAttribute(GlobalDatasetKeyMap.LockByModal) &&
      !rootRef.current?.contains(event.target as Element)
    ) {
      closeHandler()
    }
  }

  useDocEventListener("pointerdown", clickOutsideHandler)

  return (
    <div
      {...props}
      ref={rootRef}
      onBlur={blurHandler}
      className={cls(
        styles.root,
        {
          [styles._tabs ?? ""]: !!isUseTabs,
        },
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

Popover.Actions = Actions
Popover.Content = Content
Popover.Header = Header
Popover.Title = Title
Popover.Trigger = Trigger
Popover.Wrapper = Wrapper

export default Popover
