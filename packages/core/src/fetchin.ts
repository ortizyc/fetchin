import merge from 'lodash.merge'
import axios, { AxiosInstance } from 'axios'

import { LocaleManager } from '@ortizyc/fetchin-locale'

import type {
  FetchinConfig,
  FetchinMeta,
  FetchinRequestInterceptor,
  FetchinResponse,
  FetchinResponseInterceptor,
} from './types'
import { responseTransformers, requestTransformers } from './transformer'
import {
  bearerAuthInterceptor,
  ejectRequestInterceptor,
  useRequestInterceptor,
  dataResponseInterceptor,
  ejectResponseInterceptor,
  useResponseInterceptor,
} from './interceptor'

const DEFAULT_CONFIG: FetchinConfig = {
  transformRequest: requestTransformers,
  transformResponse: responseTransformers,
  requestInterceptors: [bearerAuthInterceptor],
  responseInterceptors: [dataResponseInterceptor],
}

export class Fetchin {
  private localeManager: LocaleManager

  private _inst!: AxiosInstance

  get inst(): AxiosInstance {
    return this._inst
  }

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
    this._inst = axios.create(this.config)

    // bind interceptors
    const { requestInterceptors, responseInterceptors } = this.config
    if (requestInterceptors)
      requestInterceptors.forEach((interceptor) => this.addRequestInterceptor(interceptor))
    if (responseInterceptors)
      responseInterceptors.forEach((interceptor) => this.addResponseInterceptor(interceptor))
  }

  /**
   * get request
   */
  get<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    config?: FetchinConfig<D>,
  ): Promise<R> {
    return this._inst.get(url, config)
  }

  /**
   * post request
   */
  post<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: FetchinConfig<D>,
  ): Promise<R> {
    return this._inst.post(url, data, config)
  }

  /**
   * put request
   */
  put<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: FetchinConfig<D>,
  ): Promise<R> {
    return this._inst.put(url, data, config)
  }

  /**
   * delete request
   */
  delete<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    config?: FetchinConfig<D>,
  ): Promise<R> {
    return this._inst.delete(url, config)
  }

  /**
   * post form request
   */
  postForm<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: FetchinConfig<D>,
  ): Promise<R> {
    return this._inst.postForm(url, data, config)
  }

  /**
   * put form request
   */
  putForm<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: FetchinConfig<D>,
  ): Promise<R> {
    return this._inst.putForm(url, data, config)
  }

  request<T = any, R = FetchinResponse<T>, D = any>(config: FetchinConfig<D>): Promise<R> {
    return this._inst.request(config)
  }

  /**
   * get full request uri
   */
  getUri(config?: FetchinConfig): string {
    return this._inst.getUri(config)
  }

  /**
   * add request interceptor
   */
  addRequestInterceptor(interceptor: FetchinRequestInterceptor) {
    return useRequestInterceptor(this._inst, interceptor)
  }

  /**
   * add response interceptor
   */
  addResponseInterceptor(interceptor: FetchinResponseInterceptor) {
    return useResponseInterceptor(this._inst, interceptor)
  }

  /**
   * remove request interceptor
   */
  removeRequestInterceptor(id: number) {
    ejectRequestInterceptor(this._inst, id)
  }

  /**
   * remove response interceptor
   */
  removeResponseInterceptor(id: number) {
    ejectResponseInterceptor(this._inst, id)
  }
}

export function createFetchin(config?: FetchinConfig) {
  return new Fetchin(config)
}
