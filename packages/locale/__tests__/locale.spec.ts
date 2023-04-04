import { describe, expect, it, vi } from 'vitest'

import { en_US, zh_CN, zh_TW } from '../src/locales'
import { LocaleManager } from '../src/manager'

describe('LocaleManager', () => {
  it('should be able initialize locale manager', () => {
    const localeManager = new LocaleManager()
    expect(localeManager).toBeDefined()
    /**
     * default locale is en_US
     */
    expect(localeManager.currentLang).toBe('en_US')
    expect(localeManager.currentLocale).toBe(en_US)
  })

  it('initialize locale manager with locales', () => {
    const localeManager = new LocaleManager([zh_CN, zh_TW])
    /**
     * will auto set the current locale to the first locale passed by the user
     */
    expect(localeManager.currentLang).toBe('zh_CN')
    expect(localeManager.currentLocale).toBe(zh_CN)
  })

  it('should be able to change the current locale', () => {
    const localeManager = new LocaleManager([zh_CN, zh_TW])

    // manually modify
    localeManager.currentLang = zh_TW.name
    expect(localeManager.currentLang).toBe('zh_TW')
    expect(localeManager.currentLocale).toBe(zh_TW)

    localeManager.currentLang = 'en_US'
    expect(localeManager.currentLang).toBe(en_US.name)
    expect(localeManager.currentLocale).toBe(en_US)
  })

  it(`will get a warning if you pass in a 'name' that doesn't exist`, () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => void 0)

    const localeManager = new LocaleManager([zh_CN, zh_TW])
    expect(localeManager.currentLang).toBe('zh_CN')

    // wrong name
    localeManager.currentLang = 'zhtW'
    // will get a warning
    expect(warn).toBeCalled()
    // will not change the current locale
    expect(localeManager.currentLang).toBe('zh_CN')
    expect(localeManager.currentLocale).toBe(zh_CN)

    warn.mockRestore()
  })

  it('should be able to get correct translation result', () => {
    const localeManager = new LocaleManager([zh_CN, zh_TW])
    expect(localeManager.$t('200')).toBe(zh_CN.content['200'])

    localeManager.currentLang = 'en_US'
    expect(localeManager.$t('200')).toBe(en_US.content['200'])
  })

  it('should be able to get the translation result for the specified locale', () => {
    const localeManager = new LocaleManager([zh_CN, zh_TW])
    expect(localeManager.$t('200')).toBe(zh_CN.content['200'])
    expect(localeManager.$t('200', 'zh_TW')).toBe(zh_TW.content['200'])
  })

  it('when no translation result is found in the locale, the translation result of the default locale will be returned', () => {
    const localeManager = new LocaleManager([zh_CN])
    expect(localeManager.$t('TEST_ONLY')).toBe(en_US.content['TEST_ONLY'])
  })

  it('a warning will be issued if no translation result is found', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => void 0)

    const localeManager = new LocaleManager([zh_CN])
    expect(localeManager.$t('NOT_FOUND_KEY')).toBeUndefined()

    warn.mockRestore()
  })
})
