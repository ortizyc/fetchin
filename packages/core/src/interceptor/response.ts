import type { AxiosInstance } from 'axios'
import type {
  FetchinInterceptorOptions,
  FetchinInterceptorRejected,
  FetchinResponse,
  FetchinResponseInterceptorFulfilled,
  ResponseBodyEntity,
} from '../types'

export function useResponseInterceptor(
  axios: AxiosInstance,
  onFulfilled?: FetchinResponseInterceptorFulfilled,
  onRejected?: FetchinInterceptorRejected,
  options?: FetchinInterceptorOptions,
): number {
  return axios.interceptors.response.use(onFulfilled as any, onRejected, options)
}

export function ejectResponseInterceptor(axios: AxiosInstance, id: number): void {
  axios.interceptors.response.eject(id)
}

const validateResponseDataStructure = (data: ResponseBodyEntity) => {
  return ['code', 'message', 'data'].every((i) => hasOwnProperty(data, i))
}

export const dataResponseInterceptor: FetchinResponseInterceptorFulfilled = (
  response: FetchinResponse<ResponseBodyEntity<any>>,
) => {
  const {
    status,
    data,
    config: { meta },
  } = response

  if (data == null || !validateResponseDataStructure(data)) {
    throw new Error(
      '[Fetchin dataResponseInterceptor Error]: Unavailable data type, please check the response body structure and transform data',
    )
  }

  // if message is '' or null, use default message
  response.data.message = data.message || meta.localeManager.$t(status.toString())
  return response
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
