/**
 * 有关请求的类型集合
 */
declare module 'request' {
  declare namespace Request {
    namespace Api {
      type User = {
        login: {
          ID: string
          password: string
        }
        logout: any
        register: any
      }
    }
  }

  export = Request
}
