import type { AxiosRequestTransformer } from 'axios'
import axios from 'axios'

export const originalRequestTransformers: AxiosRequestTransformer[] = [
  // keep the original transform
  ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
]
