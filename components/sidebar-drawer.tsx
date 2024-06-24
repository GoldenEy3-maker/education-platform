"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RoutesMap, RoleContentMap } from "@/lib/enums";
import { getFirstLettersUserCredentials } from "@/lib/utils";
import { Avatar } from "./avatar";
import { SignOutAlertDrawer } from "./sign-out-alert-drawer";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import { Switch } from "./ui/switch";
import { Icons } from "./Icons";

export function SidebarDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (router) setIsOpen(false);
  }, [router]);

  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size="icon" variant="ghost" type="button" className="md:hidden">
          <Icons.Menu className="text-xl" />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className="inset-y-0 left-0 mt-0 grid max-h-dvh grid-rows-[auto_auto_1fr] p-4"
        isNotchDisabled
      >
        <header className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] items-center gap-x-4 pr-6">
          {/* {session?.user ? (
            <>
              <Avatar
                fallback={getFirstLettersUserCredentials(
                  session.user.surname,
                  session.user.name,
                )}
                src={session.user.image}
                className="row-span-2 h-14 w-14"
              />
              <p className="mt-auto font-medium">
                {session.user.surname} {session.user.name}{" "}
                {session.user.fathername}
              </p>
              <span className="leading-none text-muted-foreground">
                {RoleContentMap[session.user.role]}
              </span>
            </>
          ) : (
            <>
              <Skeleton className="row-span-2 h-14 w-14 rounded-full" />
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-4 w-28" />
            </>
          )} */}
        </header>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={() => setIsOpen(false)}
        >
          <Icons.X className="text-lg" />
        </Button>
        <Separator className="my-4" />
        <nav className="flex flex-col gap-2 overflow-auto">
          <Button
            asChild
            className="w-full shrink-0 justify-normal text-left"
            variant="ghost"
          >
            <Link href={RoutesMap.Home}>
              <Icons.Home className="mr-2 text-xl" /> <span>Главная</span>
            </Link>
          </Button>
          <Button
            asChild
            className="w-full shrink-0 justify-normal text-left"
            variant="ghost"
          >
            <Link href={RoutesMap.Courses}>
              <Icons.Notebook className="mr-2 text-xl" /> <span>Курсы</span>
            </Link>
          </Button>
          <Button
            asChild
            className="w-full shrink-0 justify-normal text-left"
            variant="ghost"
          >
            <Link href={RoutesMap.Schedule}>
              <Icons.CalendarTime className="mr-2 text-xl" />{" "}
              <span>Расписание</span>
            </Link>
          </Button>
          <Button
            asChild
            className="w-full shrink-0 justify-normal text-left"
            variant="ghost"
          >
            <Link href={RoutesMap.HomeChat}>
              <Icons.Message className="mr-2 text-xl" /> <span>Сообщения</span>
            </Link>
          </Button>
          <div className="relative mt-auto rounded-lg p-4">
            <div className="mb-2 flex items-center text-left">
              <Icons.HelpCircle className="mr-2 text-xl" />{" "}
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
            <Button
              asChild
              variant="ghost"
              className="w-full justify-between text-left"
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
            <Button
              asChild
              className="w-full shrink-0 justify-normal text-left"
              variant="ghost"
            >
              <Link href={RoutesMap.Settings}>
                <Icons.Settings className="mr-2 text-xl" />{" "}
                <span>Настройки</span>
              </Link>
            </Button>
            <SignOutAlertDrawer>
              <Button
                className="w-full shrink-0 justify-normal text-left"
                variant="ghost"
              >
                <Icons.LogOutCircle className="mr-2 text-xl" />{" "}
                <span>Выход</span>
              </Button>
            </SignOutAlertDrawer>
          </div>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
