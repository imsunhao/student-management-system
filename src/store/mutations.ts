import { globalHelper } from './helpers'
import { TStore } from 'store'

import { userMutations } from './local-modules/user/mutations'

export const mutations = globalHelper.makeMutations({
  ...userMutations,
})

export default mutations

export type TMutations = typeof mutations

export const commit = globalHelper.createCommit<TStore.Mutations>()
export const getState = globalHelper.createGetState()
