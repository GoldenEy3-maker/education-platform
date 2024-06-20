import { createServerActionProcedure } from "zsa";
import { cookies } from "next/headers";
import { CookiesMap } from "@/lib/enums";
import { db } from "../db";

export const protectedProcedure = createServerActionProcedure().handler(
  async () => {
    try {
      const token = cookies().get(CookiesMap.SessionToken);

      if (!token) throw new Error("Неавторизованный доступ!");

      const session = await db.session.findUnique({
        where: {
          sessionToken: token.value,
        },
        include: {
          user: {
            select: {
              id: true,
              surname: true,
              name: true,
              fathername: true,
              email: true,
              group: {
                select: {
                  id: true,
                  name: true,
                },
              },
              bgImage: true,
              image: true,
              role: true,
              status: true,
            },
          },
        },
      });

      if (!session) throw new Error("Неавторизованный доступ!");

      return {
        session: {
          user: session.user,
          expires: session.expires,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Что-то пошло не так!");
    }
  },
);
