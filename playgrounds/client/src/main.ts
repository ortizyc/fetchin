import {
  Fetchin,
  FetchinResponseBody,
  createMatchResponseBodyCodeInterceptor,
  createRequestTransformer,
} from '@ortizyc-fetchin/core'

import './style.css'

const matchRules = {
  200: () => true,
  401: () => {
    console.warn('Unauthorized, you may need to login again.')
    return false
  },
}

// 服务端返回标准 responseBody(code, message, data)，fetchin 默认启用的 verifyResponseBodyInterceptor 会验证 responseBody 的结构
const standardFetchin = new Fetchin({
  baseURL: 'http://localhost:9999',
  responseInterceptors: [createMatchResponseBodyCodeInterceptor({ matchRules })],
})

// 会进入 verifyResponseBodyInterceptor 校验 responseBody 的结构
// 之后进入 matchResponseBodyCodeInterceptor，匹配对应 code 的处理函数并执行
standardFetchin.get<FetchinResponseBody<string>>('/standard/greet').then((response) => {
  const { data: resBody } = response
  console.log(resBody)
})
// 服务端返回了 code->401，对应的 matchHandler 返回 false，会进入 catch
standardFetchin
  .get<FetchinResponseBody<string>>('/standard/requiredLogin')
  .then((response) => {
    console.log('不会打印')
  })
  .catch((err) => {
    console.error(err)
  })
// responseType !== 'json'，会跳过 verifyResponseBodyInterceptor 和 matchResponseBodyCodeInterceptor
standardFetchin.get('/image', { responseType: 'blob' }).then((response) => {
  console.log('图片', response.data)
})

// 由于 /nonstandard/greet 没有返回标准 responseBody(code, message, data)，所以 fetchin 默认启用的 verifyResponseBodyInterceptor 会报错提示
standardFetchin
  .get<FetchinResponseBody<string>>('/nonstandard/greet')
  .then((response) => {
    const { data: resBody } = response
    console.log(resBody)
  })
  .catch((err) => {
    console.error(err)
  })

// 服务端返回非标准 responseBody(status, msg, result)，需要自定义 response 转换器，将 data 转为标准 responseBody(code, message, data)
const nonstandardFetchin = new Fetchin({
  baseURL: 'http://localhost:9999',
  // 这里使用 createResponseTransformer 创建一个包装转换器，它将额外传入 config 参数
  responseTransformers: [
    createRequestTransformer((data, headers, config) => {
      if (config.responseType !== 'json') return data
      return {
        code: data.status,
        message: data.msg,
        data: data.result,
      }
    }),
  ],
  responseInterceptors: [createMatchResponseBodyCodeInterceptor({ matchRules })],
})

// 在进入拦截器之前，会先进入自定义转换器，确保 responseBody 的结构是标准的
nonstandardFetchin.get<FetchinResponseBody<string>>('/nonstandard/greet').then((response) => {
  const { data: resBody } = response
  console.log(resBody)
})
nonstandardFetchin
  .get<FetchinResponseBody<string>>('/nonstandard/requiredLogin')
  .then((response) => {
    console.log('不会打印')
  })
  .catch((err) => {
    console.error(err)
  })
