/**
 * 有关请求的类型集合
 */
declare module 'tests' {
  declare namespace Tests {
    namespace NodeJS {
      /**
       * 进程通讯类型
       */
      type ProcessMessage = {
        messageKey: string
        payload?: any
      }
    }
  }

  export = Tests
}
