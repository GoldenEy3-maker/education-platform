import Image from "next/image"
import { cls } from "~/utils/func"
import { IconUser } from "../Icons"
import styles from "./styles.module.sass"

type UserAvatarProp = {
  src?: string | null
  alt?: string
} & React.ComponentProps<"span">

const UserAvatar: React.FC<UserAvatarProp> = ({ src, alt, ...props }) => {
  return (
    <span {...props} className={cls(styles.icon, props.className)}>
      {src ? (
        <Image src={src} alt={alt ?? ""} fill style={{ objectFit: "cover" }} />
      ) : (
        <IconUser />
      )}
    </span>
  )
}

export default UserAvatar
