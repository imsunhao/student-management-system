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

/**
 * 有关 mongo schema 类型集合
 */
declare module 'schema' {
  declare namespace Schema {
    type TClass = {
      name: string
    }

    type TExamination = {
      name: string
      startTime: Date
      endTime: Date
      /**
       * 类别
       * - 1 语文
       * - 2 数学
       */
      type: number
      sourceList: Array<{ id: string; source: number }>
      class: string
    }

    type TUser = {
      ID: string
      name: string
      password: string
      class: string[]
      /**
       * 角色
       * - 1 超级管理员
       * - 2 老师
       * - 3 学生
       */
      role: number
    }
  }

  export = Schema
}
