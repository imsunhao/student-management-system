// Type definitions for method-override

/**
 * 拓展 WebStepsHelperAPI
 */
declare module '@web-steps/helper-api/@types/request' {
  type ResError = {
    status: number
    data?: any
  }
}

/**
 * 有关请求的类型集合
 */
declare module 'request' {
  declare namespace Request {
    import Schema from 'schema'
    namespace Api {
      type User = {
        login: {
          req: Pick<Schema.TUser, 'ID' | 'password'>
          res: Omit<Schema.TUser, 'password'>
        }
        logout: {
          req: null
          res: null
        }
        register: any
      }
    }
  }

  export = Request
}
