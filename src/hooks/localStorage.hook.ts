import { useState } from "react"
import { type LocalStorageKeyMap } from "~/utils/enums"

export const useLocalStorage = <T>(
  key: LocalStorageKeyMap,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    const storage = localStorage.getItem(key)
    if (!storage) return initialValue
    return JSON.parse(storage) as T
  })

  const set = (value: React.SetStateAction<T>) => {
    localStorage.setItem(key, JSON.stringify(value))
    setState(value)
  }

  return [state, set]
}
