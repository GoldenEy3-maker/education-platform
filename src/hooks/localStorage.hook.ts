import { useState } from "react"
import { type LocalStorageKeyMap } from "~/utils/enums"

export const useLocalStorage = <T>(
  key: LocalStorageKeyMap,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, _setState] = useState<T>(() => {
    const storage = localStorage.getItem(key)
    if (!storage) return initialValue

    try {
      return JSON.parse(storage) as T
    } catch (err) {
      if (err instanceof Error) console.error(err.message)

      return initialValue
    }
  })

  const isCb = (
    value: React.SetStateAction<T>
  ): value is (prevState: T) => T => {
    return typeof value === "function"
  }

  const setState: React.Dispatch<React.SetStateAction<T>> = (value) => {
    localStorage.setItem(
      key,
      JSON.stringify(isCb(value) ? value(state) : value)
    )
    _setState(value)
  }

  return [state, setState]
}
