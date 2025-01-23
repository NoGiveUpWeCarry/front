import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 반환값이 true 면 null | undefined 임을 타입스크립트에게 명시
export function isNullish(value: any): value is null | undefined {
  return value === null || value === undefined;
}
