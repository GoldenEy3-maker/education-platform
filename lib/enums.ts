import { Role, TaskType } from "@prisma/client";
import { ValueOf } from "./types";

export const RoutesMap = {
  Home: "/",
  Login: "/login",
  Courses: "/courses",
  Course: "/courses/",
  HomeChat: "/chat",
  Chat: "/chat/",
  Profile: "/profile/",
  Schedule: "/schedule",
  RestorePassword: "/restore-password",
  Settings: "/settings",
  CreateCourse: "/courses/create",
  EditCourse: "/courses/edit/",
  CreateLec: "/tasks/lec/create",
  CreateQuiz: "/tasks/quiz/create",
  CreatePract: "/tasks/pract/create",
} as const;

export const CookiesMap = {
  SessionToken: "_d",
} as const;

export const RoleContentMap: Record<Role, string> = {
  Student: "Студент",
  Admin: "Админ",
  Teacher: "Преподаватель",
} as const;

export const StatusCourseMap = {
  Published: "Published",
  Archived: "Archived",
} as const;

export const StatusCourseContentMap: Record<StatusCourseMap, string> = {
  Archived: "Архивирован",
  Published: "Опубликован",
};

export const TaskTypeContentMap: Record<TaskType, string> = {
  Lec: "Лекция",
  Quiz: "Тест",
  Pract: "Практическая",
};

export type CookiesMap = ValueOf<typeof CookiesMap>;
export type RoutesMap = ValueOf<typeof RoutesMap>;
export type RoleContentMap = ValueOf<typeof RoleContentMap>;
export type StatusCourseMap = ValueOf<typeof StatusCourseMap>;
