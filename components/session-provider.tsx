"use client";

import { useServerActionQuery } from "@/hook/use-server-action";
import { RoutesMap } from "@/lib/enums";
import { auth } from "@/server/actions/auth";
import { Prisma } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

type SessionContext = {
  session:
    | {
        user: Prisma.UserGetPayload<{
          select: {
            id: true;
            surname: true;
            name: true;
            fathername: true;
            email: true;
            bgImage: true;
            image: true;
            role: true;
            status: true;
            group: {
              select: {
                id: true;
                name: true;
              };
            };
          };
        }>;
        expires: Date;
      }
    | undefined;
  isSessionLoading: boolean;
};

const SessionContext = createContext<SessionContext | null>(null);

export function SessionProvider({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();

  const getSessionQuery = useServerActionQuery(auth, {
    input: undefined,
    queryKey: ["getSession"],
  });

  useEffect(() => {
    if (getSessionQuery.isError) {
      router.push(`${RoutesMap.Login}?callbackUrl=${pathname}`);
    }
  }, [router, pathname, getSessionQuery.isError]);

  return (
    <SessionContext.Provider
      value={{
        session: getSessionQuery.data,
        isSessionLoading: getSessionQuery.isLoading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);

  if (!ctx) throw new Error("SessinProvider is missing!");

  return ctx;
}
