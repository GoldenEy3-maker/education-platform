"use client";

import { RoleContentMap } from "@/lib/enums";
import { cn, getFirstLettersUserCredentials } from "@/lib/utils";
import { Avatar } from "./avatar";
import { NotificationPopover } from "./notification-popover";
import { SearchCommandDialog } from "./search-command-dialog";
import { SidebarDrawer } from "./sidebar-drawer";
import { Skeleton } from "./ui/skeleton";
import { useSession } from "./session-provider";
import React from "react";

export function Header({
  className,
  ...props
}: React.ComponentProps<"header">) {
  const { session } = useSession();

  return (
    <header
      className={cn(
        "container-grid sticky inset-y-0 top-0 z-50 border-b bg-background/95 py-1 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <SidebarDrawer />
        <SearchCommandDialog className="flex flex-grow max-xs:justify-end" />
        {session?.user ? (
          <>
            <NotificationPopover />
            <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] justify-normal px-2 py-1 text-left text-sm sm:gap-x-3">
              <Avatar
                className="row-span-2 h-10 w-10"
                fallback={getFirstLettersUserCredentials(
                  session.user.surname,
                  session.user.name,
                )}
                src={session.user.image}
              />
              <p className="font-medium max-sm:hidden">
                {session.user.surname} {session.user.name}
              </p>
              <span className="text-xs text-muted-foreground max-sm:hidden">
                {RoleContentMap[session.user.role]}
              </span>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] items-center px-2 py-1 sm:gap-x-3">
            <Skeleton className="row-span-2 h-10 w-10 rounded-full" />
            <Skeleton className="h-3 w-32 rounded-lg max-sm:hidden" />
            <Skeleton className="h-3 w-20 rounded-lg max-sm:hidden" />
          </div>
        )}
      </div>
    </header>
  );
}
