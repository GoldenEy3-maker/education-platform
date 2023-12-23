export type ValueOf<T> = T[keyof T]

export type ExtendedChildren<F = undefined> = F extends undefined
  ? React.ReactNode | React.ReactNode[]
  : React.ReactNode | F | (React.ReactNode | F)[]
