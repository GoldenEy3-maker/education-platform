"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { RoutesMap } from "@/lib/enums";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { Switch } from "./ui/switch";
import { SignOutAlertDrawer } from "./sign-out-alert-drawer";
import { useIsClient } from "usehooks-ts";
import { Icons } from "./Icons";

export function Sidebar({
  className,
  ...props
}: React.ComponentProps<"aside">) {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();

  return (
    <aside
      className={cn(
        "custom-scrollbar fixed left-0 top-0 hidden h-full max-h-svh w-[17rem] grid-rows-[auto_1fr] space-y-4 overflow-auto border border-r bg-[linear-gradient(45deg,hsla(333,35%,87%,.5)_0%,hsla(214,53%,92%,.5)_50%,transparent_100%)] p-4 dark:bg-[linear-gradient(45deg,hsla(270,70%,41%,.15)_0%,hsla(217,49%,42%,.15)_50%,transparent_100%)] md:grid",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className="block text-6xl">
          <Icons.Logo />
        </span>
        <p className="font-medium">Образовательный портал АГУ</p>
      </div>
      <nav className="flex flex-col gap-2">
        <Button
          asChild
          className="w-full justify-normal text-left"
          variant="ghost"
        >
          <Link href={RoutesMap.Home}>
            <Icons.Home className="mr-2 text-xl" /> <span>Главная</span>
          </Link>
        </Button>
        <Button
          asChild
          className="w-full justify-normal text-left"
          variant="ghost"
        >
          <Link href={RoutesMap.Courses}>
            <Icons.Notebook className="mr-2 text-xl" /> <span>Курсы</span>
          </Link>
        </Button>
        <Button
          asChild
          className="w-full justify-normal text-left"
          variant="ghost"
        >
          <Link href={RoutesMap.Schedule}>
            <Icons.CalendarTime className="mr-2 text-xl" />{" "}
            <span>Расписание</span>
          </Link>
        </Button>
        <Button
          asChild
          className="w-full justify-normal text-left"
          variant="ghost"
        >
          <Link href={RoutesMap.HomeChat}>
            <Icons.Message className="mr-2 text-xl" /> <span>Сообщения</span>
          </Link>
        </Button>
        <div className="relative mt-auto rounded-lg p-4">
          <div className="mb-2 flex items-center text-left">
            <Icons.HelpCircle className="mr-2 text-xl" />
            <span>Нужна помощь?</span>
          </div>
          <p className="text-sm">
            <Link href={"#"} className="text-primary">
              Свяжитесь
            </Link>{" "}
            с нашими экспертами или{" "}
            <Link
              href="https://www.youtube.com/watch?v=j70dL0JZXGI"
              target="_blank"
              className="text-primary"
            >
              посмотрите обучающий видеоролик
            </Link>
            .
          </p>
        </div>
        <div className="space-y-1">
          <span className="mb-1 block text-muted-foreground">Общее</span>
          {isClient ? (
            <Button
              asChild
              variant="ghost"
              className="w-full cursor-pointer justify-between text-left"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <div>
                <Label
                  htmlFor="dark-theme"
                  className="pointer-events-none flex items-center"
                >
                  <Icons.Moon className="mr-2 text-xl" />
                  <span>Темная тема</span>
                </Label>
                <Switch id="dark-theme" checked={theme === "dark"} />
              </div>
            </Button>
          ) : (
            <Skeleton className="h-12 w-full rounded-lg" />
          )}
          <Button
            asChild
            className="w-full justify-normal text-left"
            variant="ghost"
          >
            <Link href={RoutesMap.Settings}>
              <Icons.Settings className="mr-2 text-xl" /> <span>Настройки</span>
            </Link>
          </Button>
          <SignOutAlertDrawer>
            <Button className="w-full justify-normal text-left" variant="ghost">
              <Icons.LogOutCircle className="mr-2 text-xl" /> <span>Выход</span>
            </Button>
          </SignOutAlertDrawer>
        </div>
      </nav>
    </aside>
  );
}
