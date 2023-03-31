import type { Locale, LocaleManager } from '@ortizyc/fetchin-locale'
import type { AxiosInterceptorOptions, AxiosRequestConfig, AxiosResponse } from 'axios'

export type FetchExtraConfig = {
  /**
   * function to obtain the JWT bearer token.
   * if not passed, but bearerAuthInterceptor is set, the interceptor will be skipped.
   */
  getBearerToken?: () => string | Promise<string>

  /**
   * request interceptors
   */
  requestInterceptors?: FetchinInterceptor<FetchinRequestInterceptorFulfilled>[]
  /**
   * response interceptors
   */
  responseInterceptors?: FetchinInterceptor<FetchinResponseInterceptorFulfilled>[]
  /**
   * whether to keep the default interceptors
   * - `true`: 传入的 `requestInterceptors` 和 `responseInterceptors` 将会追加到默认的拦截器列表之后
   * - `false`: 传入的 `requestInterceptors` 和 `responseInterceptors` 将会覆盖默认的拦截器列表
   * @default true
   */
  keepDefaultInterceptors?: boolean

  requestTransformers?: AxiosRequestConfig['transformRequest']
  /**
   * whether to keep the default transformers
   * - `true`: 传入的 `requestTransformers` 和 `responseTransformers` 将会追加到默认的转换器列表之后
   */
  keepDefaultTransformers?: boolean

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

// --------------------------------------------------------------------------------------------------------------------

export type FetchinRequestInterceptorFulfilled = (
  config: FetchinConfig<any, true>,
) => FetchinConfig | Promise<FetchinConfig>

export type FetchinResponseInterceptorFulfilled = (
  response: FetchinResponse<any, true>,
) => FetchinResponse | Promise<FetchinResponse>

export type FetchinInterceptorRejected = (error: any) => any

export type FetchinInterceptorOptions = AxiosInterceptorOptions

/**
 * An interface representing a Fetchin interceptor.
 *
 * @typedef T - Type of the interceptor's onFulfilled callback function.
 */
export type FetchinInterceptor<
  T extends FetchinRequestInterceptorFulfilled | FetchinResponseInterceptorFulfilled,
> = {
  /**
   * A callback function that will be called if the interceptor fulfills successfully.
   */
  onFulfilled: T
  /**
   * An optional callback function that will be called if the interceptor rejects.
   */
  onRejected?: FetchinInterceptorRejected
  /**
   * An optional object representing the interceptor's options.
   */
  options?: FetchinInterceptorOptions
}

export type FetchinRequestInterceptor = FetchinInterceptor<FetchinRequestInterceptorFulfilled>
export type FetchinResponseInterceptor = FetchinInterceptor<FetchinResponseInterceptorFulfilled>

/**
 * Fetchin response body entity
 * This is a fixed structure of the response body, used to constrain the structure of the response body.
 * If the response body returned by your backend is not in this structure, you can use `responseTransformer` to convert it.
 */
export interface FetchinResponseBodyEntity<T = any> {
  /**
   * the status code of the response
   */
  code: number | string
  /**
   * the data of the response
   */
  data: T
  /**
   * the message of the response
   */
  message: string
}
