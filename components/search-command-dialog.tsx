"use client";

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useIsApple } from "@/hook/use-is-apple";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import Link from "next/link";
import { RoutesMap } from "@/lib/enums";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { Icons } from "./Icons";

function useCtrlKeyKBind(callback: () => void) {
  useEffect(() => {
    const handleKeyBindEvent = (event: KeyboardEvent) => {
      if (event.code === "KeyK" && event.ctrlKey) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyBindEvent);
    return () => document.removeEventListener("keydown", handleKeyBindEvent);
  }, [callback]);
}

export function SearchCommandDialog({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const isApple = useIsApple();
  const [isOpen, setIsOpen] = useState(false);

  // const getAllCoursesQuery = api.course.getAll.useQuery(undefined, {
  //   refetchOnMount: false,
  // });

  useCtrlKeyKBind(() => setIsOpen(true));

  useEffect(() => {
    if (router) setIsOpen(false);
  }, [router]);

  return (
    <div className={cn(className)} {...props}>
      <Button
        variant="outline"
        type="button"
        className="group w-10 max-w-64 gap-3 max-xs:border-none max-xs:bg-transparent max-xs:shadow-none xs:w-full"
        onClick={() => setIsOpen(true)}
      >
        <BiSearch className="shrink-0 text-xl" />
        <p className="flex-grow text-left max-xs:hidden">Поиск</p>
        <span className="rounded-md border bg-secondary px-2 py-1 text-xs tracking-widest text-muted-foreground group-hover:bg-background max-xs:hidden">
          {isApple ? "Cmd" : "Ctrl"} K
        </span>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Что ищите..." />
        <CommandList>
          <CommandEmpty>Ничего не найдено.</CommandEmpty>
          <CommandGroup heading="Страницы">
            <CommandItem asChild>
              <Link href={RoutesMap.Home}>
                <Icons.Home className="mr-2" />
                <span>Главная</span>
              </Link>
            </CommandItem>
            <CommandItem asChild>
              <Link href={RoutesMap.Course}>
                <Icons.Notebook className="mr-2" />
                <span>Курсы</span>
              </Link>
            </CommandItem>
            <CommandItem asChild>
              <Link href={RoutesMap.Schedule}>
                <Icons.CalendarTime className="mr-2" />
                <span>Расписание</span>
              </Link>
            </CommandItem>
            <CommandItem asChild>
              <Link href={RoutesMap.Chat}>
                <Icons.Message className="mr-2" />
                <span>Сообщения</span>
              </Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          {/* {!getAllCoursesQuery.isLoading ? (
            getAllCoursesQuery.data?.length ? (
              <CommandGroup heading="Курсы">
                {getAllCoursesQuery.data.map((course) => (
                  <CommandItem key={course.id} asChild>
                    <Link href={RoutesMap.Course + course.id}>
                      <span>{course.fullTitle}</span>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null
          ) : (
            <CommandGroup heading="Курсы">
              <div className="space-y-1">
                <Skeleton className="h-11 rounded-sm" />
                <Skeleton className="h-11 rounded-sm" />
                <Skeleton className="h-11 rounded-sm" />
                <Skeleton className="h-11 rounded-sm" />
              </div>
            </CommandGroup>
          )} */}
          <CommandSeparator />
          <CommandGroup heading="Настройки">
            <CommandItem asChild>
              <Link href={RoutesMap.Settings + "?tab=Profile"}>
                <Icons.User className="mr-2" />
                <span>Профиль</span>
              </Link>
            </CommandItem>
            <CommandItem asChild>
              <Link href={RoutesMap.Settings + "?tab=Password"}>
                <Icons.Lock className="mr-2" />
                <span>Пароль</span>
              </Link>
            </CommandItem>
            <CommandItem asChild>
              <Link href={RoutesMap.Settings + "?tab=Email"}>
                <Icons.Mail className="mr-2" />
                <span>Email</span>
              </Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
