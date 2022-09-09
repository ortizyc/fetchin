import type { AxiosInstance } from 'axios'
import type {
  FetchinInterceptorOptions,
  FetchinInterceptorRejected,
  FetchinResponseInterceptorFulfilled,
} from '../types'

export function useResponseInterceptor(
  axios: AxiosInstance,
  onFulfilled?: FetchinResponseInterceptorFulfilled,
  onRejected?: FetchinInterceptorRejected,
  options?: FetchinInterceptorOptions,
): number {
  return axios.interceptors.response.use(onFulfilled, onRejected, options)
}

export function ejectResponseInterceptor(axios: AxiosInstance, id: number): void {
  axios.interceptors.response.eject(id)
}
