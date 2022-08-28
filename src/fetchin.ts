import type { AxiosInstance } from 'axios'
import { LocaleManager } from './core'
import type { LocaleConfig } from './locale/types'

export interface FetchinOptions {
  instance?: AxiosInstance
  locales?: LocaleConfig[]
}

export class Fetchin {
  private _instance?: AxiosInstance

  private _locale: LocaleManager

  constructor(options: FetchinOptions = {}) {
    this._instance = options.instance
    this._locale = new LocaleManager(options.locales)
    this.initAdapter()
  }

  initAdapter() {
    if (this._instance) return
    /**
     * TODO: 用于初始化fetch版本的adapter
     */
  }

  changeLocale(localeName: string): void {
    this._locale.changeLocale(localeName)
  }
}
