/**
 * Class name utility for shadcn-style components.
 * Combines clsx (conditional classes) with tailwind-merge (conflict resolution).
 *
 * Use when merging component base classes with user-provided class overrides.
 * Ensures Tailwind conflicts (e.g. p-4 vs p-6) resolve correctly.
 *
 * @example
 *   cn('rounded-md p-6', className)  // user's p-4 overrides p-6
 */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTitleFromFilename(filename: string) {
  const name = filename.split('/').pop()?.replace('.md', '') || '';
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
