"use client";

import { useServerActionQuery } from "@/hook/use-server-action";
import { auth } from "@/server/actions/auth";
import { Prisma } from "@prisma/client";
import { createContext, useContext } from "react";

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
  const getSessionQuery = useServerActionQuery(auth, {
    input: undefined,
    queryKey: ["getSession"],
  });

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
