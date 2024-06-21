"use server";

import { z } from "zod";
import { createServerAction } from "zsa";
import { db } from "../db";
import crypto from "crypto";
import { transporter } from "../nodemailer";

export const restorePassword = createServerAction()
  .input(z.object({ login: z.string() }))
  .handler(async (opts) => {
    const user = await db.user.findUnique({
      where: {
        login: opts.input.login,
      },
    });

    if (!user) throw new Error("Такого пользователя не существует!");
    if (!user.email) throw new Error("Email не привязан!");

    const code = crypto.randomBytes(3).toString("hex");

    await transporter.sendMail({
      from: "АГУ Платформа",
      to: user.email,
      subject: "Смена пароля",
      text: "Ваш код подтверждения смены пароля: " + code,
    });

    return {
      code,
      login: user.login,
      id: user.id,
    };
  });
