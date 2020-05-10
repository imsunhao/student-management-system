import { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import axios from 'src/utils/axios'
import { hostGlobal, isServer } from 'src/envs'

/**
 * Represents the completion of an asynchronous operation
 */
interface CustomPromise<T, E> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
  ): CustomPromise<TResult1 | TResult2, E>

  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?: ((reason: E) => TResult | PromiseLike<TResult>) | undefined | null,
  ): CustomPromise<T | TResult, E>

  finally(onfinally: () => void)
}

const encodeCookie = cookies => {
  let cookie = ''
  Object.keys(cookies).forEach(item => {
    cookie += `${item}=${cookies[item]};`
  })
  return cookie
}

export function handleErrorResponse(xhr: AxiosError) {
  const response = xhr
  const res: AxiosResponse<APIError> = response.response || ({} as any)

  const result = {
    statusCode: res.status,
    response,
    responseData: res.data,
  }
  return result
}
export type APIError = {
  messages: Array<{ code: number; code_description: string; message: string; field: string; field_key: string }>
  code: number
}
export type ErrorResponse = ReturnType<typeof handleErrorResponse>

export type RequesterOptions = AxiosRequestConfig & {
  cookies?: object
  /**
   * 默认 resolve 的是 response data, 如果需要原始的 AxiosResponse, 需要这个参数
   */
  returnOriginalResponse?: boolean
}

/**
 * 在 axios 的基础上添加简单的一些参数
 * - 提供对 cookies 的序列化
 */
export default class Requester {
  /**
   * 实际用于请求的 axios, 可以是具有不同配置的实例
   */
  static axios = axios

  static request<T = any, E = ErrorResponse>(opts: RequesterOptions = {}) {
    const requestOpts = this.prepareOptions(opts)
    const promise: CustomPromise<T, E> = new Promise<T>((resolve, reject) => {
      this.axios(requestOpts)
        .then(response => {
          if (opts.returnOriginalResponse) {
            resolve(response as any)
          } else {
            resolve(response.data)
          }
        })
        .catch(xhr => {
          return reject(handleErrorResponse(xhr))
        })
    }).catch(err => {
      throw err
    })

    return promise
  }

  static prepareOptions(opts: RequesterOptions) {
    opts.headers = opts.headers || {}
    if (opts.cookies) {
      opts.headers.cookie = encodeCookie(opts.cookies)
    }
    return opts
  }
}

if (!isServer) {
  hostGlobal.Requester = Requester
}
