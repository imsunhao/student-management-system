import ApiActor from './base-actor'

import { SSRPayload, User } from 'request'
import { TUser } from 'schema'

class UserApiActor extends ApiActor<TUser> {
  /**
   * 用户登录
   */
  login(data: User.login, { cookies }: SSRPayload = {}) {
    return this.post({
      uri: 'login',
      cookies,
      data,
    })
  }

  /**
   * 用户退出
   */
  logout() {
    return this.get({
      uri: 'logout',
    })
  }

  /**
   * 用户注册
   */
  register() {
    return this.get({
      uri: 'register',
    })
  }
}

export const userApi = new UserApiActor('user')
