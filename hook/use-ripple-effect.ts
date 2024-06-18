export function useRippleEffect() {
  const animationDuration = 500;
  const minAnimationDuration = 200;

  const rippleEffectEvent = (event: React.PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;

    if (target.ariaDisabled) return;

    const targetWidth = target.getBoundingClientRect().width;
    const targetHeight = target.getBoundingClientRect().height;

    const diameter = Math.max(targetWidth, targetHeight);
    const radius = diameter / 2;

    const x = event.clientX - target.getBoundingClientRect().left - radius;
    const y = event.clientY - target.getBoundingClientRect().top - radius;

    const ripple = document.createElement("span");

    ripple.className =
      "absolute z-10 select-none pointer-events-none block rounded-full bg-[var(--ripple-clr,theme('colors.primary.DEFAULT'))] opacity-20 animate-ripple";

    ripple.style.animationDuration = `${animationDuration}ms`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = ripple.style.height = `${diameter}px`;

    target.insertBefore(ripple, target.firstChild);

    const animationStart = Date.now();

    const handleFadeOutRipple = () => {
      const animationInterrupt = Date.now();
      let remainingTime =
        animationDuration - (animationInterrupt - animationStart);

      if (remainingTime < minAnimationDuration)
        remainingTime = minAnimationDuration;
      ripple.style.opacity = "0";
      ripple.style.transition = `opacity ${remainingTime}ms linear`;

      setTimeout(() => {
        ripple.remove();
      }, remainingTime);

      target.removeEventListener("pointerup", handleFadeOutRipple);
      target.removeEventListener("pointercancel", handleFadeOutRipple);
      target.removeEventListener("pointerleave", handleFadeOutRipple);
    };

    target.addEventListener("pointerup", handleFadeOutRipple);
    target.addEventListener("pointercancel", handleFadeOutRipple);
    target.addEventListener("pointerleave", handleFadeOutRipple);
  };

  return rippleEffectEvent;
}
