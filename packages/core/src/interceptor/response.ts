import type { AxiosInstance } from 'axios'

import type {
  FetchinResponse,
  FetchinResponseInterceptor,
  FetchinResponseBodyEntity,
} from '../types'
import { createErrorMessage } from '../utils'

export function useResponseInterceptor(
  axios: AxiosInstance,
  interceptor: FetchinResponseInterceptor,
): number {
  return axios.interceptors.response.use(
    interceptor.onFulfilled as any,
    interceptor.onRejected,
    interceptor.options,
  )
}

export function ejectResponseInterceptor(axios: AxiosInstance, id: number): void {
  axios.interceptors.response.eject(id)
}

const verifyResponseDataStructure = (data: FetchinResponseBodyEntity) => {
  const missing = ['code', 'message', 'data'].filter((i) => !hasOwnProperty(data, i))
  if (missing.length) {
    throw new Error(
      createErrorMessage(`Unavailable response body data, missing fields: ${missing.join(', ')}`),
    )
  }
}

export const dataResponseInterceptor: FetchinResponseInterceptor = {
  onFulfilled: (response: FetchinResponse<FetchinResponseBodyEntity<any>>) => {
    const {
      status,
      data,
      config: { meta },
    } = response

    verifyResponseDataStructure(data)

    // if message is '' or null, use default message
    response.data.message = data.message || meta.localeManager.$t(status.toString())
    return response
  },
}

/**
 * error handling
 *
 * FetchinError
 *    处理一些公共情况的异常，这里主要是400及以上的HttpStatus, 比如404
 *    此处可以使用locale内的消息提示定义
 */

/**
 * Business code handling
 *
 * 需要外部用户实现，此处主要是200的HttpStatus，其中判定code的业务逻辑
 */

const hasOwnProperty = (context: object, prop: string) =>
  Object.prototype.hasOwnProperty.call(context, prop)
