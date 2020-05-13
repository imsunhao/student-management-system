import { globalHelper } from './helpers'
import { userGetters } from './local-modules/user/getters'

export const getters = globalHelper.makeGetters({
  ...userGetters,
})

export default getters

export const getGetter = globalHelper.createGetGetter()
