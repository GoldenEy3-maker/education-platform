import Skeleton from "react-loading-skeleton"

const LoadingSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton width={45} height={45} circle />
      <Skeleton width={45} height={45} circle />
      <Skeleton width={45} height={45} circle />
    </>
  )
}

export default LoadingSkeleton
