"use server";

import { createServerAction } from "zsa";
import { db } from "../db";

export const getCourses = createServerAction().handler(async () => {
  return await db.course.findMany();
});
