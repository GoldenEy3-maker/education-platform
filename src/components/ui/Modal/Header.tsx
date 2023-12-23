import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

type HeaderProps = {
  isJustifyContentStart?: boolean
} & React.ComponentProps<"header">

export const Header: React.FC<HeaderProps> = ({
  isJustifyContentStart,
  ...props
}) => {
  return (
    <header
      {...props}
      className={cls(styles.header, props.className, {
        [styles._headerJustifyContentStart ?? ""]: !!isJustifyContentStart,
      })}
    >
      {props.children}
    </header>
  )
}
