"use client";

import dayjs from "@/lib/extended-dayjs";
import Link from "next/link";
import { TbBell, TbBellZFilled, TbChecks, TbSettings2 } from "react-icons/tb";
import { type ValueOf } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Skeleton } from "./ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useSession } from "./session-provider";
import { SessionUser } from "@/server/actions/auth";

const TabsMap = {
  Inbox: "inbox",
  General: "general",
};

type TabsMap = ValueOf<typeof TabsMap>;

type NotificationItemProps = {
  sender: SessionUser;
  title: string;
  date: Date;
  theme: string;
  isInbox: boolean;
};

function NotificationItem({
  sender,
  title,
  date,
  theme,
  isInbox,
}: NotificationItemProps) {
  return (
    <Button
      asChild
      variant="ghost"
      type="button"
      className={cn(
        "grid h-auto grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] justify-start gap-x-3 text-base",
        {
          "grid-cols-[auto_1fr]": !isInbox,
        },
      )}
    >
      <Link href="#">
        <Avatar
          fallback={sender.name?.at(0)}
          src={sender.image}
          isOnline
          className="row-span-2"
        />
        <p className="truncate text-muted-foreground">
          <span className="font-medium text-foreground">{title}</span> отправил
          уведомление
        </p>
        <p className="col-start-2 row-start-2 truncate text-sm text-muted-foreground">
          <span>{dayjs(date).fromNow()}</span>
          &nbsp; &#9679; &nbsp;
          <span>{theme}</span>
        </p>
        {isInbox ? (
          <div className="row-span-2 flex items-center justify-center">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
          </div>
        ) : null}
      </Link>
    </Button>
  );
}

function NotificationItemSkeleton() {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] items-center gap-x-3 px-4 py-2">
      <Skeleton className="row-span-2 h-12 w-12 rounded-full" />
      <Skeleton className="h-3 w-40 rounded-lg" />
      <Skeleton className="col-start-2 row-start-2 h-3 w-20 rounded-lg" />
    </div>
  );
}

function NotificationsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <TbBellZFilled className="text-7xl text-muted-foreground" />
      <p className="mt-2 text-center [text-wrap:balance]">
        Мы дадим знать, когда у нас будет что-то новое для вас.
      </p>
    </div>
  );
}

export function NotificationPopover() {
  const { session } = useSession();

  const isLoading = false;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          size="icon"
          className="data-[state=open]:bg-accent"
        >
          <TbBell className="text-xl" />
          <Badge className="absolute right-0 top-0 flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1 py-0 text-xs">
            10
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen overflow-hidden xs:w-[26rem]">
        <header className="flex items-center justify-between gap-2">
          <p className="text-lg font-semibold">Уведомления</p>
          <Button
            size="sm"
            variant="ghost"
            className="gap-2 text-muted-foreground"
            disabled={isLoading}
          >
            <span>Прочитать все</span>
            <TbChecks className="text-base" />
          </Button>
        </header>
        {session?.user ? (
          <Tabs defaultValue={TabsMap.Inbox}>
            <div className="mb-2 mt-3 flex items-center justify-between gap-2 border-b">
              <TabsList className="h-auto bg-transparent p-0">
                <TabsTrigger
                  className="group h-auto gap-2 rounded-none border-b border-primary/0 py-3 data-[state='active']:border-primary data-[state='active']:!bg-background/0 data-[state='active']:!shadow-none data-[state='active']:hover:!bg-accent"
                  value={TabsMap.Inbox}
                  asChild
                  disabled={isLoading}
                >
                  <Button type="button" variant="ghost">
                    Входящие
                    {!isLoading ? (
                      <div className="px-.1.5 flex h-6 min-w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs group-data-[state='active']:bg-primary group-data-[state='active']:text-primary-foreground">
                        1
                      </div>
                    ) : (
                      <Skeleton className="h-6 w-6 rounded-full" />
                    )}
                  </Button>
                </TabsTrigger>
                <TabsTrigger
                  className="group h-auto gap-2 rounded-none border-b border-primary/0 py-3 data-[state='active']:border-primary data-[state='active']:!bg-background/0 data-[state='active']:!shadow-none data-[state='active']:hover:!bg-accent"
                  value={TabsMap.General}
                  asChild
                  disabled={isLoading}
                >
                  <Button type="button" variant="ghost">
                    Общие
                    {!isLoading ? (
                      <div className="flex h-6 min-w-6 flex-shrink-0 items-center justify-center rounded-full border px-1.5 text-xs group-data-[state='active']:bg-primary group-data-[state='active']:text-primary-foreground">
                        99
                      </div>
                    ) : (
                      <Skeleton className="h-6 w-6 rounded-full" />
                    )}
                  </Button>
                </TabsTrigger>
              </TabsList>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={isLoading}
                className="rounded-full"
              >
                <TbSettings2 className="text-lg" />
              </Button>
            </div>
            <TabsContent
              value={TabsMap.Inbox}
              className="custom-scrollbar max-h-[min(calc(100vh-12.5rem),20rem)] space-y-1 overflow-auto"
            >
              {!isLoading ? (
                <>
                  <NotificationItem
                    sender={session.user}
                    date={new Date()}
                    theme="Test"
                    title="Danil"
                    isInbox={true}
                  />
                  <NotificationItem
                    sender={session.user}
                    date={new Date()}
                    theme="Test"
                    title="Danil"
                    isInbox={false}
                  />
                  <NotificationItem
                    sender={session.user}
                    date={new Date()}
                    theme="Test"
                    title="Danil"
                    isInbox={false}
                  />
                  <NotificationItem
                    sender={session.user}
                    date={new Date()}
                    theme="Test"
                    title="Danil"
                    isInbox={false}
                  />
                </>
              ) : (
                <>
                  <NotificationItemSkeleton />
                  <NotificationItemSkeleton />
                  <NotificationItemSkeleton />
                  <NotificationItemSkeleton />
                </>
              )}
            </TabsContent>
            <TabsContent
              value={TabsMap.General}
              className="custom-scrollbar max-h-[min(calc(100vh-12.5rem),20rem)] space-y-1 overflow-auto"
            >
              <NotificationsEmpty />
            </TabsContent>
          </Tabs>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
