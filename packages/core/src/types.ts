import type { AxiosInterceptorOptions, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * Fetcher configuration
 */
export interface FetchinConfig<D = any> extends AxiosRequestConfig<D> {
  /**
   * get jwt bearer token, will enable `bearerAuthInterceptor`
   */
  getBearerToken?: () => string | Promise<string>
  /**
   * interceptors
   */
  requestInterceptors?: FetchinInterceptor<FetchinRequestInterceptorFulfilled>[]
  responseInterceptors?: FetchinInterceptor<FetchinInterceptorRejected>[]
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FetchinResponse<T = any, D = any> extends AxiosResponse<T, D> {
  //
}

export type FetchinRequestInterceptorFulfilled = (
  config: FetchinConfig,
) => FetchinConfig | Promise<FetchinConfig>

export type FetchinResponseInterceptorFulfilled = (
  response: FetchinResponse,
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
