import { enUS } from '../locale'
import type { Locale, LocaleConfig } from "../locale/types";
import type { HttpStatus } from './http-status';

export class LocaleManager {

  private _currentLang: string = enUS.name;

  private _map: Map<string, Locale> = new Map();

  constructor(locales?: LocaleConfig[]) {
    this._init(locales);
  }

  private _init(locales: LocaleConfig[] = []) {
    /**
     * default locale
     */
     this.changeLocale(enUS.name)
     this._map.set(enUS.name, enUS.locale)
     /**
      * set user locales config
      */
     locales.forEach(({ name, locale }) => {
       this._map.set(name, locale)
     })
  }

  get currentLang(): string {
    return this._currentLang
  }

  get currentLocale(): Locale {
    return this._map.get(this.currentLang) ?? this.defaultLocale
  }

  get defaultLocale(): Locale {
    return enUS.locale;
  }

  changeLocale(localeName: string) {
    this._currentLang = localeName;
  }

  $t(key: HttpStatus): string {
    const translateText = this.currentLocale[key] ?? this.defaultLocale[key]
    if (!translateText) {
      console.warn(`can not found key text in current locale: ${key}]`)
    }
    return translateText;
  }
}