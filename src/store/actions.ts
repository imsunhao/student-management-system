import { TStore } from 'store'
import { globalHelper } from './helpers'

import { userAction } from './local-modules/user/action'

export const actions = globalHelper.makeActions({
  ...userAction,
})

export default actions

export type TActions = typeof actions

export const dispatch = globalHelper.createDispatch<TStore.Actions>()
