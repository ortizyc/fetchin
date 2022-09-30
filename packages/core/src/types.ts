import type { Locale, LocaleManager } from '@ortizyc/fetchin-locale'
import type { AxiosInterceptorOptions, AxiosRequestConfig, AxiosResponse } from 'axios'

export type FetchExtraConfig = {
  /**
   * get jwt bearer token, will enable `bearerAuthInterceptor`
   */
  getBearerToken?: () => string | Promise<string>

  /**
   * interceptors
   */
  requestInterceptors?: FetchinInterceptor<FetchinRequestInterceptorFulfilled>[]
  responseInterceptors?: FetchinInterceptor<FetchinInterceptorRejected>[]

  /**
   * locale config
   */
  locales?: Locale[]
}

export type FetchinMeta = {
  localeManager: LocaleManager
}

export type FetchinMetaConfig<M = false> = M extends true
  ? {
      /**
       * fetchin meta, will be injected at initialization
       */
      meta: FetchinMeta
    }
  : unknown

/**
 * Fetchin configuration
 */
export type FetchinConfig<D = any, M = false> = AxiosRequestConfig<D> &
  FetchExtraConfig &
  FetchinMetaConfig<M>

/**
 * Fetchin response
 */
export interface FetchinResponse<T = any, D = any> extends AxiosResponse<T, D> {
  /**
   * this config includes `meta` field
   */
  config: FetchinConfig<D, true>
}

export type FetchinRequestInterceptorFulfilled = (
  config: FetchinConfig<any, true>,
) => FetchinConfig | Promise<FetchinConfig>

export type FetchinResponseInterceptorFulfilled = (
  response: FetchinResponse<any, true>,
) => FetchinResponse | Promise<FetchinResponse>

export type FetchinInterceptorRejected = (error: any) => any

export type FetchinInterceptorOptions = AxiosInterceptorOptions

export type FetchinInterceptor<
  T extends FetchinRequestInterceptorFulfilled | FetchinResponseInterceptorFulfilled,
> = {
  onFulfilled: T
  onRejected?: FetchinInterceptorRejected
  options?: FetchinInterceptorOptions
}

export interface ResponseBodyEntity<T = any> {
  code: number | string
  data: T
  message: string
}
