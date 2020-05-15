import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { ServerVuePageInfoMixin } from 'src/utils/mixins/page-info'
import { isServer } from 'src/envs'
import ElementUI from 'element-ui'

if (isServer) {
  Vue.mixin(ServerVuePageInfoMixin)
}

Vue.use(ElementUI)

/**
 * 生成 vm app
 */
export function createApp() {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    store,
    router,
    render: h => h(App),
  })

  return { app, router, store }
}
