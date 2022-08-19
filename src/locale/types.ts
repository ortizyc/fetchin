import type { HttpStatus } from '../core'

export type Locale = Record<HttpStatus, string>

export interface LocaleConfig {
  name: string;
  ensign?: string;
  locale: Locale;
}