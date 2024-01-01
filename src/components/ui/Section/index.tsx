import { cls } from "~/utils/func"
import { Body } from "./Body"
import { Group } from "./Group"
import { Header } from "./Header"
import { Title } from "./Title"
import styles from "./styles.module.sass"

type SectionProps = {
  isSpanGridArea?: boolean
} & React.ComponentProps<"section">

const Section = ({ isSpanGridArea, ...props }: SectionProps) => {
  return (
    <section
      {...props}
      className={cls(styles.root, props.className, {
        [styles._spanGridArea ?? ""]: !!isSpanGridArea,
      })}
    >
      {props.children}
    </section>
  )
}

Section.Body = Body
Section.Group = Group
Section.Header = Header
Section.Title = Title

export default Section
