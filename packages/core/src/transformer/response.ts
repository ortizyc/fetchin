import type { AxiosResponseTransformer } from 'axios'
import axios from 'axios'

export const responseTransformers: AxiosResponseTransformer[] = [
  // keep the original transform
  ...(axios.defaults.transformResponse as AxiosResponseTransformer[]),
]
