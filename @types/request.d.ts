/**
 * 有关请求的类型集合
 */
declare module 'request' {
  declare namespace Request {
    /**
     * action
     * - server端 必须传递的参数
     */
    type SSRPayload = {
      cookies?: any
    }

    namespace User {
      type login = {
        ID: string
        password: string
      }
    }
  }

  export = Request
}