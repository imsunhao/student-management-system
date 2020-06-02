import { T_INJECT_CONTEXT } from '../inject-context/type'
import { Store } from 'vuex'
import { VUEX_DEVTOOL } from '@web-steps/helper'

interface HostGlobal extends Window {
  /**
   * vuex 自动注入 state
   * - 来着 服务端
   */
  __INITIAL_STATE__: any

  /**
   * 注入 环境 信息
   */
  __INJECT_ENV__: any

  /**
   * 注入 服务器配置信息
   */
  __INJECT_CONTEXT__: T_INJECT_CONTEXT

  /**
   * vuex 实例
   */
  store: Store<any>

  /**
   * @bestminr/vuex-utils log 工具
   * - 默认 false 关闭
   * - server端 与 production环境下 一定关闭
   */
  VUEX_DEVTOOL: VUEX_DEVTOOL
}

let hostGlobal: HostGlobal

try {
  hostGlobal = window as any

  hostGlobal.__INJECT_ENV__ = hostGlobal.__INJECT_ENV__ || ({} as any)
  hostGlobal.__INJECT_CONTEXT__ = hostGlobal.__INJECT_CONTEXT__ || ({} as any)
} catch (err) {
  hostGlobal = {} as any
  hostGlobal.__INJECT_ENV__ = process.env
  hostGlobal.__INJECT_CONTEXT__ = (process as any).__INJECT_CONTEXT__
}

export const VUE_ENV = process.env.VUE_ENV

const isServer = VUE_ENV === 'server'

export { hostGlobal, isServer }
