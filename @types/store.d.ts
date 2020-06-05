/**
 * 有关 vuex-store 类型集合
 */
declare module 'store' {
  import { GlobalMutations, GlobalActions } from 'src/store'
  import { TUserState } from 'src/store/local-modules/user/state'

  declare namespace Store {
    /**
     * 请求的包装类型
     */
    type ActionPayload<T = undefined> = {
      data?: T
    }

    /**
     * vuex store
     *  * typescript namespace
     */
    namespace TStore {
      /**
       * vuex state
       */
      type State = TUserState & {}
      /**
       * vuex getters
       */
      type Getters = {
        hasUser: boolean
      }

      /**
       * vuex Mutation-tree
       */
      type Mutations = GlobalMutations

      /**
       * vuex Action-tree
       */
      type Actions = GlobalActions
    }
  }

  export = Store
}