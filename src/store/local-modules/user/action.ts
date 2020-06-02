import { globalHelper } from 'src/store/helpers'
import { ActionPayload } from 'store'

import { Api } from 'request'
import { userApi } from 'src/api/user'
import { commit } from 'src/store'

export const userAction = globalHelper.makeActions({
  /**
   * 获取用户数据
   */
  async FETCH_USER(ctx, payload: ActionPayload<Api.User['login'] | undefined>) {
    if (ctx.state.user && ctx.state.user.ID) return
    const result = await userApi.login({
      data: payload.data,
    })
    commit(ctx, 'SET_USER', result.data)
  },

  /**
   * 用户退出登录
   */
  async USER_LOGOUT(ctx, payload: ActionPayload) {
    if (!ctx.state.user || !ctx.state.user.ID) return
    commit(ctx, 'SET_USER', {} as any)
    await userApi.logout()
  },
})
