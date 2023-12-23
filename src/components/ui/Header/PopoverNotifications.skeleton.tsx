import Skeleton from "react-loading-skeleton"
import { cls } from "~/utils/func"
import styles from "./PopoverNotifications.module.sass"

const LoadingSkeleton: React.FC = () => {
  return (
    <ul className={cls(styles.list, styles._loadingSkeleton)}>
      <li className={styles.item}>
        <Skeleton
          width={50}
          height={50}
          circle
          containerClassName={styles.avatar}
        />
        <Skeleton height="1rem" containerClassName={styles.text} />
        <Skeleton height="1rem" containerClassName={styles.extraInfo} />
      </li>
      <li className={styles.item}>
        <Skeleton
          width={50}
          height={50}
          circle
          containerClassName={styles.avatar}
        />
        <Skeleton height="1rem" containerClassName={styles.text} />
        <Skeleton height="1rem" containerClassName={styles.extraInfo} />
      </li>
      <li className={styles.item}>
        <Skeleton
          width={50}
          height={50}
          circle
          containerClassName={styles.avatar}
        />
        <Skeleton height="1rem" containerClassName={styles.text} />
        <Skeleton height="1rem" containerClassName={styles.extraInfo} />
      </li>
    </ul>
  )
}

export default LoadingSkeleton
