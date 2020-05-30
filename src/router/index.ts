import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Home Page
const HomePage = () => import('../views/index.vue')

// App Page
const App = {
  index: () => import('../views/app/index.vue'),
  UserManagement: {
    UserBaseInfo: () => import('../views/app/user-management/UserBaseInfo.vue'),
  },
}

const EmptyPage = {
  template: '<router-view></router-view>',
}

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: HomePage,
      },
      {
        path: '/app',
        name: 'App',
        component: App.index,
        children: [
          {
            path: 'user-management',
            component: EmptyPage,
            children: [
              {
                path: 'base-info',
                name: 'UserBaseInfo',
                component: App.UserManagement.UserBaseInfo,
              },
            ],
          },
        ],
      },
    ],
  })
}
