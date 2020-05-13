import { TStore } from 'store'

import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import actions, { dispatch, TActions } from './actions'
import mutations, { commit, getState, TMutations } from './mutations'
import getters, { getGetter } from './getters'
import { getUserState } from './local-modules/user/state'

function state(): TStore.State {
  return {
    ...getUserState(),
  }
}

Vue.use(Vuex)

let store: Store<TStore.State>

/// <RemoveCodeBlock=server-production>
import { WebpackHelper } from '@web-steps/helper'
if (module.hot) {
  const webpackHelper: WebpackHelper = require('@web-steps/helper').webpackHelper

  webpackHelper.hotReload(
    module,
    () => (require as any).context('.', true, /(?<!\.d)\.ts/),
    ({ requrie }) => {
      store.hotUpdate({
        getters: requrie('./getters.ts'),
        actions: requrie('./actions.ts'),
        mutations: requrie('./mutations.ts'),
      })
      console.log('Vuex hot reload')
    },
  )
}
/// </RemoveCodeBlock=server-production>

export function createStore() {
  store = new Vuex.Store<TStore.State>({
    state: state(),
    actions,
    mutations,
    getters,
  })
  return store
}

export { commit, getState, dispatch, getGetter }

export type GlobalMutations = TMutations
export type GlobalActions = TActions
