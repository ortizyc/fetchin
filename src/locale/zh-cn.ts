import { HttpStatus } from '../core'
import type { Locale, LocaleConfig } from "./types";

const locale: Locale = {
  [HttpStatus.CONTINUE]: "",
  [HttpStatus.SWITCHING_PROTOCOLS]: "",
  [HttpStatus.PROCESSING]: "",
  [HttpStatus.EARLYHINTS]: "",
  [HttpStatus.OK]: "服务器成功返回请求的数据。",
  [HttpStatus.CREATED]: '新建或修改数据成功。',
  [HttpStatus.ACCEPTED]: "一个请求已经进入后台排队（异步任务）。",
  [HttpStatus.NON_AUTHORITATIVE_INFORMATION]: "",
  [HttpStatus.NO_CONTENT]: "删除数据成功。",
  [HttpStatus.RESET_CONTENT]: "",
  [HttpStatus.PARTIAL_CONTENT]: "",
  [HttpStatus.AMBIGUOUS]: "",
  [HttpStatus.MOVED_PERMANENTLY]: "",
  [HttpStatus.FOUND]: "",
  [HttpStatus.SEE_OTHER]: "",
  [HttpStatus.NOT_MODIFIED]: "",
  [HttpStatus.TEMPORARY_REDIRECT]: "",
  [HttpStatus.PERMANENT_REDIRECT]: "",
  [HttpStatus.BAD_REQUEST]: "",
  [HttpStatus.UNAUTHORIZED]: "",
  [HttpStatus.PAYMENT_REQUIRED]: "",
  [HttpStatus.FORBIDDEN]: "",
  [HttpStatus.NOT_FOUND]: "",
  [HttpStatus.METHOD_NOT_ALLOWED]: "",
  [HttpStatus.NOT_ACCEPTABLE]: "",
  [HttpStatus.PROXY_AUTHENTICATION_REQUIRED]: "",
  [HttpStatus.REQUEST_TIMEOUT]: "",
  [HttpStatus.CONFLICT]: "",
  [HttpStatus.GONE]: "",
  [HttpStatus.LENGTH_REQUIRED]: "",
  [HttpStatus.PRECONDITION_FAILED]: "",
  [HttpStatus.PAYLOAD_TOO_LARGE]: "",
  [HttpStatus.URI_TOO_LONG]: "",
  [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: "",
  [HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE]: "",
  [HttpStatus.EXPECTATION_FAILED]: "",
  [HttpStatus.I_AM_A_TEAPOT]: "",
  [HttpStatus.MISDIRECTED]: "",
  [HttpStatus.UNPROCESSABLE_ENTITY]: "",
  [HttpStatus.FAILED_DEPENDENCY]: "",
  [HttpStatus.TOO_MANY_REQUESTS]: "",
  [HttpStatus.INTERNAL_SERVER_ERROR]: "",
  [HttpStatus.NOT_IMPLEMENTED]: "",
  [HttpStatus.BAD_GATEWAY]: "",
  [HttpStatus.SERVICE_UNAVAILABLE]: "",
  [HttpStatus.GATEWAY_TIMEOUT]: "",
  [HttpStatus.HTTP_VERSION_NOT_SUPPORTED]: ""
}

export default {
  name: 'zh_CN',
  ensign: '🇨🇳',
  locale
} as LocaleConfig