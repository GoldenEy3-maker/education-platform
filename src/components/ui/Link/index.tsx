import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { useRouter } from "next/router"
import { forwardRef } from "react"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

export type LinkProps = {
  variant?: "elevated" | "filled" | "outlined"
  asIcon?: boolean
  activeClassName?: string
  size?: "sm" | "lg"
  children: React.ReactNode | ((isActive: boolean) => React.ReactNode)
  color?: "primary" | "on-primary" | "danger" | "success" | "default"
} & Omit<React.ComponentProps<"a">, "href" | "children"> &
  Omit<NextLinkProps, "as" | "passHref" | "children">

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      locale,
      shallow,
      scroll,
      replace,
      children,
      variant,
      activeClassName,
      asIcon,
      size,
      color,
      ...props
    },
    ref
  ) => {
    const router = useRouter()
    const rippleEffectEvent = useRippleEffect()

    const isActive =
      href !== "/"
        ? router.asPath.includes(String(href))
        : router.asPath === href

    return (
      <NextLink
        href={href}
        locale={locale}
        shallow={shallow}
        scroll={scroll}
        replace={replace}
        passHref
        legacyBehavior
      >
        <a
          {...props}
          className={cls(styles.link, props.className, {
            [styles._elevated ?? ""]: variant === "elevated",
            [styles._filled ?? ""]: variant === "filled",
            [styles._outlined ?? ""]: variant === "outlined",
            [styles._asIcon ?? ""]: asIcon!,
            [styles._sm ?? ""]: size === "sm",
            [styles._defaultClr ?? ""]: color === "default",
            [styles._dangerClr ?? ""]: color === "danger",
            [styles._onPrimaryClr ?? ""]: color === "on-primary",
            [styles._successClr ?? ""]: color === "success",
            [activeClassName ?? ""]: isActive,
          })}
          onPointerDown={rippleEffectEvent}
          ref={ref}
        >
          {typeof children === "function" ? children(isActive) : children}
        </a>
      </NextLink>
    )
  }
)

Link.displayName = "Link"

export default Link
