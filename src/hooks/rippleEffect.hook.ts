export const useRippleEffect = () => {
  const animationDuration = 400
  const minAnimationDuration = 200

  const rippleEffectEvent: React.PointerEventHandler<HTMLElement> = (event) => {
    const target = event.currentTarget
    const nestedInteractionNodes = target.querySelectorAll("button, input, a")

    if ((target as HTMLButtonElement | HTMLInputElement).disabled) return

    if (nestedInteractionNodes.length) {
      const isClickedOnNestedInteractionNode = Array.from(
        nestedInteractionNodes
      ).some((node) => (event.target as HTMLElement).closest(node.tagName))

      if (isClickedOnNestedInteractionNode) return
    }

    const targetWidth = target.getBoundingClientRect().width
    const targetHeight = target.getBoundingClientRect().height

    const diameter = Math.max(targetWidth, targetHeight)
    const radius = diameter / 2

    const x = event.clientX - target.getBoundingClientRect().left - radius
    const y = event.clientY - target.getBoundingClientRect().top - radius

    const ripple = document.createElement("span")

    ripple.style.animationDuration = `${animationDuration}ms`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.width = ripple.style.height = `${diameter}px`

    ripple.classList.add("ripple-element")
    ripple.dataset.rippleElement = "true"

    target.insertBefore(ripple, target.firstChild)

    const animationStart = Date.now()

    const handleFadeOutRipple = () => {
      const animationInterrupt = Date.now()
      let remainingTime =
        animationDuration - (animationInterrupt - animationStart)

      if (remainingTime < minAnimationDuration)
        remainingTime = minAnimationDuration
      ripple.style.opacity = "0"
      ripple.style.transition = `opacity ${remainingTime}ms linear`

      setTimeout(() => {
        ripple.remove()
      }, remainingTime)

      target.removeEventListener("pointerup", handleFadeOutRipple)
      target.removeEventListener("pointercancel", handleFadeOutRipple)
      target.removeEventListener("pointerleave", handleFadeOutRipple)
    }

    target.addEventListener("pointerup", handleFadeOutRipple)
    target.addEventListener("pointercancel", handleFadeOutRipple)
    target.addEventListener("pointerleave", handleFadeOutRipple)
  }

  return rippleEffectEvent
}
