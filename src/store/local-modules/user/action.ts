import { globalHelper } from 'src/store/helpers'
import { ActionPayload } from 'store'

import { Api } from 'request'
import { userApi } from 'src/api/user'
import { commit } from 'src/store'

export const userAction = globalHelper.makeActions({
  /**
   * 获取用户数据
   */
  async FETCH_USER(ctx, payload: ActionPayload<Api.User['login']['req']>) {
    if (ctx.state.user && ctx.state.user.ID) return
    const { data } = await userApi('login', payload)
    commit(ctx, 'SET_USER', data)
  },

  /**
   * 用户退出登录
   */
  async USER_LOGOUT(ctx, payload: ActionPayload) {
    if (!ctx.state.user || !ctx.state.user.ID) return
    commit(ctx, 'DELETE_USER', payload)
    await userApi('logout')
  },
})
