import { globalHelper } from 'src/store/helpers'
import { ActionPayload } from 'store'

import { User } from 'request'
import { userApi } from 'src/api/user'
import { commit } from 'src/store'

export const userAction = globalHelper.makeActions({
  /**
   * 获取用户数据
   */
  async FETCH_USER(ctx, payload: ActionPayload<User.login | undefined>) {
    if (ctx.state.user && ctx.state.user.ID) return
    const result = await userApi.login(payload.data, payload.ssr)
    commit(ctx, 'SET_USER', result)
  },

  /**
   * 用户退出登录
   */
  async USER_LOGOUT(ctx, payload: ActionPayload) {
    if (!ctx.state.user || !ctx.state.user.ID) return
    commit(ctx, 'SET_USER', {} as any)
    await userApi.logout(payload.ssr)
  },
})
