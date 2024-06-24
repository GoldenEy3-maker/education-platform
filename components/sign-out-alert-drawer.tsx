"use client";

import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useServerActionMutation } from "@/hook/use-server-action";
import { signOut } from "@/server/actions/auth";
import { toast } from "sonner";
import { Separator } from "./ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { RoutesMap } from "@/lib/enums";

export function SignOutAlertDrawer({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const textContent =
    "Это действие нельзя отменить. Вы потеряете полный доступ ко всем ресурсам портала. Вам придется заново авторизоваться, чтобы продолжить работу.";

  const singOutMutation = useServerActionMutation(signOut, {
    onSuccess() {
      router.push(`${RoutesMap.Login}?callbackUrl=${pathname}`);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  if (isDesktop) {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[31.25rem]">
          <AlertDialogHeader>
            <AlertDialogTitle>Вы точно уверены?</AlertDialogTitle>
            <Separator />
            <AlertDialogDescription>{textContent}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline" disabled={singOutMutation.isPending}>
                Отменить
              </Button>
            </AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={singOutMutation.isPending}
              onClick={() => singOutMutation.mutate(undefined)}
              isSubmitting={singOutMutation.isPending}
            >
              Выйти
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-center">Вы точно уверены?</DrawerTitle>
          <DrawerDescription className="text-center">
            {textContent}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <Button
            variant="destructive"
            disabled={singOutMutation.isPending}
            onClick={() => singOutMutation.mutate(undefined)}
            isSubmitting={singOutMutation.isPending}
          >
            Выйти
          </Button>
          <DrawerClose asChild>
            <Button
              variant="outline"
              disabled={singOutMutation.isPending}
              className="w-full"
            >
              Отменить
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
