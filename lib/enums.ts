import { ValueOf } from "./types";

export const RoutesMap = {
  Home: "/",
  Login: "/login",
} as const;

export const CookiesMap = {
  SessionToken: "_d",
} as const;

export type CookiesMap = ValueOf<typeof CookiesMap>;
export type RoutesMap = ValueOf<typeof RoutesMap>;
