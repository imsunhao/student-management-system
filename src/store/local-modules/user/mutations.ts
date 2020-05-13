import { globalHelper } from 'src/store/helpers'
import { TStore } from 'store'
import Vue from 'vue'

export const userMutations = globalHelper.makeMutations({
  SET_USER: (state, user?: TStore.State['user']) => {
    Vue.set(state, 'user', user)
  },
})
