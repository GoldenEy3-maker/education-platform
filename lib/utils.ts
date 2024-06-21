import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export function getPersonInitials(
  surname: string,
  name: string,
  fathername?: string | null,
) {
  const main = surname + " " + name.at(0) + ".";
  return fathername ? main + " " + fathername?.at(0) + "." : main;
}

export function getFirstLettersUserCredentials(surname: string, name: string) {
  const surnameLetter = surname.at(0);
  const nameLetter = name.at(0);

  if (!surnameLetter && !nameLetter) return "";

  if (!surnameLetter) return nameLetter;
  if (!nameLetter) return surnameLetter;

  return surnameLetter + nameLetter;
}
export function prepareSearchMatching(str: string) {
  return str.toUpperCase().trim();
}
export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 B";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
