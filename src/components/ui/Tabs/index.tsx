import { useState } from "react"
import { cls } from "~/utils/func"
import { Item } from "./Item"
import { Track } from "./Track"
import { TabsContext } from "./context"
import styles from "./styles.module.sass"

const Tabs = (props: React.ComponentProps<"div">) => {
  const [offset, setOffset] = useState(0)
  const [cursorOffset, setCursorOffset] = useState(0)
  const [activeItemWidth, setActiveItemWidth] = useState(0)

  return (
    <TabsContext.Provider
      value={{
        offset,
        cursorOffset,
        activeItemWidth,
        setOffset,
        setActiveItemWidth,
        setCursorOffset,
      }}
    >
      <div {...props} className={cls(styles.root, props.className)} data-tabs>
        {props.children}
      </div>
    </TabsContext.Provider>
  )
}

Tabs.Track = Track
Tabs.Item = Item

export default Tabs
