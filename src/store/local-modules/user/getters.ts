import { globalHelper } from 'src/store/helpers'

export const userGetters = globalHelper.makeGetters({
  hasUser(state) {
    return state.user && state.user.ID
  },
})
