import Image from "next/image"
import { IconUser } from "../Icons"

type UserAvatarProp = {
  src?: string | null
  alt?: string
}

const UserAvatar: React.FC<UserAvatarProp> = (props) => {
  if (!props.src) return <IconUser />

  return (
    <Image
      src={props.src}
      alt={props.alt ?? ""}
      fill
      style={{ objectFit: "cover" }}
    />
  )
}

export default UserAvatar
