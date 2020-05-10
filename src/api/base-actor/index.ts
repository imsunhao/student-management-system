import { hostGlobal } from 'src/envs'
import Requester, { RequesterOptions } from './request'
import { safeAssign } from 'src/utils/lodash'

/**
 * 请求带有分页的接口时，response data 中关于分页(page_info)的一些信息
 */
export interface PagingInfo {
  totalPage: number
  total: number
  page: number
}

type ActorRequestOptions = RequesterOptions & {
  url?: string
  uri?: string
  id?: string | number
  action?: string
}

/**
 * 用于业务请求的类, url 形式基于 REST 惯例, 使用时需要实例化
 */
export default class ApiActor<D> {
  apiPrefix = '/api'

  /**
   * 实例必须指定的 uri, 一般来说是 REST 中资源的名字, 拼 url 的时候会用到
   */
  uri = ''

  constructor(uri: string) {
    this.uri = uri
  }

  requestApi<T = D>(opts: ActorRequestOptions) {
    const url = this.getUrl(opts)
    return Requester.request<T>({
      ...opts,
      url,
    })
  }

  /**
   * 对带有查询条件和分页结果的请求抽象, 其他的几个方法默认推断的返回类型data都是单个的 entity,
   * 此方法能推断出 ListResponseData<T>
   */
  queryList<P extends Partial<PagingRequestParams>>(params: P, opts?: ActorRequestOptions) {
    opts = opts || {}
    const reqOpts: ActorRequestOptions = {
      method: 'get',
      ...opts,
      params: safeAssign<P>(opts.params, params || {}),
    }
    return this.requestApi<ListResponseData<D>>(reqOpts)
  }

  getUrl(opts: ActorRequestOptions) {
    let url = opts.url
    if (!opts.url) {
      const id = opts.id
      const baseUri = opts.uri || this.uri
      url = baseUri ? `${this.apiPrefix}/${baseUri}` : this.apiPrefix
      if (id) {
        url = `${url}/${id}`
      }
      if (opts.action) {
        url = `${url}/${opts.action}`
      }
      if (process.env.VUE_ENV === 'server') {
        url = `${hostGlobal.__INJECT_CONTEXT__.SERVER_HOST}${url}`
      }
    }
    return url
  }

  post<T = D>(opts: ActorRequestOptions) {
    return this.requestApi<T>({ ...opts, method: 'post' })
  }

  get<T = D>(opts?: ActorRequestOptions) {
    return this.requestApi<T>({ ...opts, method: 'get' })
  }

  put<T = D>(opts: ActorRequestOptions) {
    return this.requestApi<T>({ ...opts, method: 'put' })
  }

  delete(opts: ActorRequestOptions) {
    return this.requestApi({ ...opts, method: 'delete' })
  }
}

export class BaseFEActor<D> extends ApiActor<D> {
  apiPrefix = '/private'
}

export type ListResponseData<T> = {
  page_info: PagingInfo
  data: T[]
}

export type PagingRequestParams = {
  page: number
  per_page: number
}
