import { describe, it, expect, vi } from 'vitest'
import { LocaleManager } from './locale'
import { enUS, zhTW, zhCN } from '../../locale'
import { HttpStatus } from './http-status'

describe('LocaleManager', () => {
  it('initialize locale manager', () => {
    const localeManager = new LocaleManager()
    expect(localeManager).toBeDefined()
  })

  it('initialize locale manager with default lang', () => {
    const localeManager = new LocaleManager()
    expect(localeManager.currentLang).toBe(enUS.name)
  })

  it('initialize locale manager with locales', () => {
    const localeManager = new LocaleManager([zhTW, zhCN])
    expect(localeManager.currentLang).toBe(enUS.name)
    localeManager.changeLocale(zhCN.name)
    expect(localeManager.currentLang).toBe(zhCN.name)
  })

  it('can get correct locale when input lang', () => {
    const localeManager = new LocaleManager([zhTW, zhCN])
    expect(localeManager.currentLocale).toBe(enUS.locale)
    localeManager.changeLocale(zhCN.name)
    expect(localeManager.currentLocale).toBe(zhCN.locale)
  })

  it('can get correct locale when input error lang', () => {
    const localeManager = new LocaleManager([zhTW, zhCN])
    expect(localeManager.currentLocale).toBe(enUS.locale)
    localeManager.changeLocale('zhcN')
    expect(localeManager.currentLocale).toBe(enUS.locale)
  })

  it('should be correct text when input http status', () => {
    const localeManager = new LocaleManager([zhTW, zhCN])
    expect(localeManager.$t(HttpStatus.OK)).toBe(enUS.locale[HttpStatus.OK])
  })

  it('should be correct text when input http status in zhCN', () => {
    const localeManager = new LocaleManager([zhTW, zhCN])
    localeManager.changeLocale(zhCN.name)
    expect(localeManager.$t(HttpStatus.OK)).toBe(zhCN.locale[HttpStatus.OK])
  })

  it('output a warning when the specified key value is not found', () => {
    const localeManager = new LocaleManager([zhTW, zhCN])
    const logSpy = vi.spyOn(console, 'warn').mockImplementationOnce(() => void 0)
    expect(localeManager.$t(900 as HttpStatus)).toBeUndefined()
    expect(logSpy).toHaveBeenCalled()
  })
})
