"use server";

import { z } from "zod";
import { createServerAction } from "zsa";
import { db } from "../db";
import bcrypt from "bcrypt";

export const restorePassword = createServerAction()
  .input(z.object({ password: z.string(), id: z.string() }))
  .handler(async (opts) => {
    const updatedUser = await db.user.update({
      where: {
        id: opts.input.id,
      },
      data: {
        password: await bcrypt.hash(opts.input.password, 10),
      },
    });

    await db.session.deleteMany({
      where: {
        userId: updatedUser.id,
      },
    });

    return updatedUser;
  });
