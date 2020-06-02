import { Router as R, RequestHandler } from 'express'
import { AxiosStatic as X, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export enum SERVER_ROUTER_METHOD {
  '*',
  GET,
  POST,
  PUT,
  DELETE,
}

type PromisePlus<T, E> = {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
  ): PromisePlus<TResult1 | TResult2, E>

  catch<TResult = never>(onrejected?: ((reason: E) => TResult | PromiseLike<TResult>) | undefined | null): PromisePlus<T | TResult, E>

  finally(onfinally: () => void)
}

type AxiosPromisePlus<T, E> = PromisePlus<AxiosResponse<T>, AxiosError<E>>

export type TRouterConformation = {
  /**
   * 默认值: `/${key}`
   */
  path?: string
  /**
   * 请求方法
   * - 默认值 '*' // 将会使用 use 方法
   */
  method?: SERVER_ROUTER_METHOD
  children?: Record<string, TRouterConformation>
}

export type TActorContext = {
  url: string
  method: string
}

export function statementHelperWarrper<
  RC extends Record<string, TRouterConformation>,
  P1 extends keyof RC,
  P2 extends keyof RC[P1]['children'],
  P3 extends keyof RC[P1]['children'][P2]['children'],
  P4 extends keyof RC[P1]['children'][P2]['children'][P3]['children']
>(serverRouterConformation: RC) {
  type POST<T> = RequestHandler<any, any, T, any>
  type HRType<T, P> = <K extends T & keyof P>(key: K, handler: POST<P[K]>) => void

  type RCP1<P1 extends keyof RC> = RC[P1]['children']
  type RCP2<P1 extends keyof RC, P2 extends keyof RCP1<P1>> = RC[P1]['children'][P2]['children']
  type RCP3<P1 extends keyof RC, P2 extends keyof RCP1<P1>, P3 extends keyof RCP2<P1, P2>> = RC[P1]['children'][P2]['children'][P3]['children']

  function H<P>(router: R, p1: P1): HRType<keyof RCP1<P1>, P>
  function H<P>(router: R, p1: P1, p2: P2): HRType<keyof RCP2<P1, P2>, P>
  function H<P>(router: R, p1: P1, p2: P2, p3: P3): HRType<keyof RCP3<P1, P2, P3>, P>
  function H<P>(router: R, p1: P1, p2: P2, p3: P3, p4: P4): HRType<keyof RCP3<P1, P2, P3>[P4]['children'], P>
  function H<P>(router: R, ...paths: string[]): <K extends string & keyof P>(key: K, handler: POST<P[K]>) => void {
    let lib: TRouterConformation = { children: serverRouterConformation }
    paths.forEach(p => {
      lib = lib.children[p]
    })
    return function statementHelper<K extends keyof TRouterConformation['children'] & keyof P>(key: K, handler: POST<P[K]>) {
      const target = lib.children[key]
      const method = target.method || SERVER_ROUTER_METHOD['*']
      const path = target.path || `/${key}`

      switch (method) {
        case SERVER_ROUTER_METHOD['*']:
          router.use(path, handler)
          break
        case SERVER_ROUTER_METHOD.POST:
          router.post(path, handler)
          break
        case SERVER_ROUTER_METHOD.GET:
          router.get(path, handler)
          break
      }
    }
  }
  type ARType<K extends string, S, E> = Record<K, <Data = S, Error = E>(config?: AxiosRequestConfig) => AxiosPromisePlus<Data, Error>>

  function A<P, S = any, E = any>(axios: X, p1: P1): ARType<keyof RCP1<P1> & keyof P, S, E>
  function A<P, S = any, E = any>(axios: X, p1: P1, p2: P2): ARType<keyof RCP2<P1, P2> & keyof P, S, E>
  function A<P, S = any, E = any>(axios: X, p1: P1, p2: P2, p3: P3): ARType<keyof RCP3<P1, P2, P3> & keyof P, S, E>
  function A<P, S = any, E = any>(axios: X, p1: P1, p2: P2, p3: P3, p4: P4): ARType<keyof RCP3<P1, P2, P3>[P4]['children'] & keyof P, S, E>
  function A(axios: X, ...paths: string[]) {
    let lib: TRouterConformation = { children: serverRouterConformation }
    let url = ''
    paths.forEach(p => {
      lib = lib.children[p]
      url += lib.path || `/${p}`
    })

    function actor(this: TActorContext, options: AxiosRequestConfig = {}) {
      return axios(
        Object.assign(
          {
            url: this.url,
            method: this.method,
          },
          options,
        ),
      )
    }

    function getMethod(method: SERVER_ROUTER_METHOD) {
      switch (method) {
        case SERVER_ROUTER_METHOD.POST:
          return 'post'
        case SERVER_ROUTER_METHOD.GET:
          return 'get'
      }
    }

    const actorHelper: any = {
      $map: {},
    }

    Object.keys(lib.children).forEach(key => {
      const target = lib.children[key]
      const context: TActorContext = {
        url: url + (target.path || `/${key}`),
        method: getMethod(target.method),
      }
      actorHelper.$map[key] = context
      actorHelper[key] = actor.bind(context)
    })

    return actorHelper
  }

  return {
    createStatementHelper: H,
    createActorHelper: A,
    SERVER_ROUTER_CONFORMATION: serverRouterConformation,
  }
}

export const { createStatementHelper, SERVER_ROUTER_CONFORMATION, createActorHelper } = statementHelperWarrper({
  api: {
    children: {
      user: {
        children: {
          login: {
            method: SERVER_ROUTER_METHOD.POST,
          },
          logout: {
            method: SERVER_ROUTER_METHOD.POST,
          },
          register: {
            method: SERVER_ROUTER_METHOD.POST,
          },
        },
      },
    },
  },
})
