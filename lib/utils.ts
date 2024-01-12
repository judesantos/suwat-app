import { type ClassValue, clsx } from "clsx"
import { SHA256 } from "crypto-js";
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const hashString = (clearText: string) => {
  return SHA256(clearText).toString();
}
