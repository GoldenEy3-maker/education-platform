import Skeleton from "react-loading-skeleton"

const LoadingSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton width={45} height={45} circle />
      <Skeleton width={45} height={45} circle />
      <Skeleton width={200} height={45} borderRadius="var(--large-shape)" />
    </>
  )
}

export default LoadingSkeleton
