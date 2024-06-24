"use server";

import { db } from "@/server/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { CookiesMap, RoutesMap } from "@/lib/enums";
import { createServerAction, instanceofZodTypeArray } from "zsa";
import { redirect } from "next/navigation";
import { protectedProcedure } from "./procedures";
import { Prisma } from "@prisma/client";

export type SessionUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    surname: true;
    name: true;
    fathername: true;
    email: true;
    group: {
      select: {
        id: true;
        name: true;
      };
    };
    bgImage: true;
    image: true;
    role: true;
    status: true;
  };
}>;

export const signIn = createServerAction()
  .input(z.object({ login: z.string(), password: z.string() }))
  .handler(async (opts) => {
    try {
      const user = await db.user.findUnique({
        where: { login: opts.input.login },
        select: {
          id: true,
          surname: true,
          name: true,
          fathername: true,
          email: true,
          password: true,
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
      });

      if (!user) throw new Error("Неверный логин или пароль!");

      const isPasswordsMatch = await bcrypt.compare(
        opts.input.password,
        user.password,
      );

      if (!isPasswordsMatch) throw new Error("Неверный логин или пароль!");

      const token = crypto.randomUUID();

      cookies().set(CookiesMap.SessionToken, token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      await db.session.create({
        data: {
          userId: user.id,
          sessionToken: token,
          expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
        },
      });

      const { password, ...newUser } = user;

      return newUser;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Что-то пошло не так!");
    }
  });

export const signOut = createServerAction().handler(async () => {
  try {
    const token = cookies().get(CookiesMap.SessionToken);

    if (!token) return true;

    await db.session.delete({
      where: {
        sessionToken: token.value,
      },
    });

    cookies().delete(CookiesMap.SessionToken);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Что-то пошло не так!");
  }
});

export const auth = protectedProcedure.handler((opts) => opts.ctx.session);
