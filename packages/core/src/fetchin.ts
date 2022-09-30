import merge from 'lodash.merge'
import axios, { AxiosInstance } from 'axios'

import { LocaleManager } from '@ortizyc/fetchin-locale'
import type {
  FetchinConfig,
  FetchinInterceptor,
  FetchinMeta,
  FetchinRequestInterceptorFulfilled,
  FetchinResponse,
  FetchinResponseInterceptorFulfilled,
} from './types'
import { responseTransformers } from './transformer/response'
import { requestTransformers } from './transformer/request'
import { bearerAuthInterceptor, useRequestInterceptor } from './interceptor/request'
import { dataResponseInterceptor, useResponseInterceptor } from './interceptor/response'

const DEFAULT_CONFIG: FetchinConfig = {
  transformRequest: requestTransformers,
  transformResponse: responseTransformers,
  requestInterceptors: [{ onFulfilled: bearerAuthInterceptor }],
  responseInterceptors: [{ onFulfilled: dataResponseInterceptor }],
}

export class Fetchin {
  private localeManager: LocaleManager
  private axiosInstance!: AxiosInstance
  private config: FetchinConfig<any, true>

  constructor(config: FetchinConfig = {}) {
    this.localeManager = new LocaleManager(config.locales)

    const meta: FetchinMeta = {
      localeManager: this.localeManager,
    }
    // merge config and inject meta
    this.config = merge({}, DEFAULT_CONFIG, config, { meta }) as FetchinConfig<any, true>

    this.createInstance()
  }

  private createInstance() {
    this.axiosInstance = axios.create(this.config)

    // bind interceptors
    const { requestInterceptors, responseInterceptors } = this.config
    if (requestInterceptors) {
      requestInterceptors.forEach(({ onFulfilled, onRejected, options }) => {
        useRequestInterceptor(this.axiosInstance, onFulfilled, onRejected, options)
      })
    }
    if (responseInterceptors) {
      responseInterceptors.forEach(({ onFulfilled, onRejected, options }) => {
        useResponseInterceptor(this.axiosInstance, onFulfilled, onRejected, options)
      })
    }
  }

  /**
   * get request
   */
  get<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    config?: FetchinConfig<D>,
  ): Promise<R> {
    return this.axiosInstance.get(url, config)
  }

  /**
   * post request
   */
  post<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: FetchinConfig<D>,
  ): Promise<R> {
    return this.axiosInstance.post(url, data, config)
  }

  /**
   * put request
   */
  put<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: FetchinConfig<D>,
  ): Promise<R> {
    return this.axiosInstance.put(url, data, config)
  }

  /**
   * delete request
   */
  delete<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    config?: FetchinConfig<D>,
  ): Promise<R> {
    return this.axiosInstance.delete(url, config)
  }

  /**
   * post form request
   */
  postForm<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: FetchinConfig<D>,
  ): Promise<R> {
    return this.axiosInstance.postForm(url, data, config)
  }

  /**
   * put form request
   */
  putForm<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: FetchinConfig<D>,
  ): Promise<R> {
    return this.axiosInstance.putForm(url, data, config)
  }

  request<T = any, R = FetchinResponse<T>, D = any>(config: FetchinConfig<D>): Promise<R> {
    return this.axiosInstance.request(config)
  }

  /**
   * get full request uri
   */
  getUri(config?: FetchinConfig): string {
    return this.axiosInstance.getUri(config)
  }

  /**
   * add request interceptor
   */
  useRequestInterceptor(interceptor: FetchinInterceptor<FetchinRequestInterceptorFulfilled>) {
    const { onFulfilled, onRejected, options } = interceptor
    return useRequestInterceptor(this.axiosInstance, onFulfilled, onRejected, options)
  }

  /**
   * add response interceptor
   */
  useResponseInterceptor(interceptor: FetchinInterceptor<FetchinResponseInterceptorFulfilled>) {
    const { onFulfilled, onRejected, options } = interceptor
    return useResponseInterceptor(this.axiosInstance, onFulfilled, onRejected, options)
  }
}
