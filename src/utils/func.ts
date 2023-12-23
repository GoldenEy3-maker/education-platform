export const cls = (
  ...classes: (string | undefined | Record<string, boolean>)[]
) => {
  const result: string[] = []
  const filteredCls = classes.filter((c) => c !== undefined)

  for (const item of filteredCls) {
    if (typeof item === "string") result.push(item)
    else if (typeof item === "object") {
      for (const keyCls of Object.keys(item)) {
        if (item[keyCls]) result.push(keyCls)
      }
    }
  }

  return result.join(" ")
}

export const toUpperCaseInitialLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""

  if (process.env.NEXT_PUBLIC_APP_HOSTHAME)
    return `https://${process.env.NEXT_PUBLIC_APP_HOSTHAME}`

  return `http://localhost:${process.env.NEXT_PUBLIC_PORT ?? 3000}`
}

export const getBaseWsUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_HOSTNAME)
    return `wss://${process.env.NEXT_PUBLIC_APP_HOSTNAME}`

  return `ws://127.0.0.1:${
    process.env.NEXT_PUBLIC_PORT ?? process.env.NODE_ENV === "development"
      ? 3001
      : 3000
  }`
}
