/**
 * 拓展 WebStepsHelperVuex
 */
declare module '@imsunhao/vuex/types/default/store' {
  import { Store as S } from '@imsunhao/vuex'
  import { TStore } from 'store'
  type TStore = S<TStore.State>
}
