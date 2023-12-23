import { type ValueOf } from "./types"

export const GlobalDatasetKeyMap = {
  LockByModal: "data-lock-by-modal",
} as const

export const PagePathMap = {
  HomePage: "/",
  NotificationsPage: "/notifications",
  ChatPage: "/chat",
  CoursesPage: "/courses",
  UsersPage: "/users",
  SchedulerPage: "/scheduler",
  SupportPage: "/support",
  SettingsPage: "/settings",
} as const

export const ModalKeyMap = {
  SignIn: "sign-in",
  SignOut: "sign-out",
  Sidebar: "sidebar",
  Chat: "chat",
  DeleteNotifications: "delete-notifications",
} as const

export const CookieKeyMap = {
  RefreshToken: "_v",
} as const

export const LocalStorageKeyMap = {
  isDarkTheme: "_d",
} as const

export const RedisKeyMap = {
  Notification: "notification",
} as const

export const NotificationTypeMap = {
  Review: "review",
  NewCourseElement: "new-course-Element",
  OpenCourseElement: "open-curse-element",
  CoursePublish: "course-publish",
} as const

export type GlobalDatasetKeyMap = ValueOf<typeof GlobalDatasetKeyMap>
export type PagePathMap = ValueOf<typeof PagePathMap>
export type ModalKeyMap = ValueOf<typeof ModalKeyMap>
export type CookieKeyMap = ValueOf<typeof CookieKeyMap>
export type LocalStorageKeyMap = ValueOf<typeof LocalStorageKeyMap>
export type RedisKeyMap = ValueOf<typeof RedisKeyMap>
export type NotificationTypeMap = ValueOf<typeof NotificationTypeMap>
