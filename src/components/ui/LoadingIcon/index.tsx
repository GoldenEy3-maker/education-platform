import styles from "./styles.module.sass"

const LoadingIcon: React.FC = () => {
  return (
    <svg
      className={styles.spinner}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={styles.circle}
        fill="none"
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
        cx="12"
        cy="12"
        r="10"
      ></circle>
    </svg>
  )
}

export default LoadingIcon
