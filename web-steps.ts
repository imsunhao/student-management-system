import { GetUserConfig } from '@web-steps/config'
import getBaseConfig from './config/webpack-base'
import getClientConfig from './config/webpack-client'
import getServerConfig from './config/webpack-server'
import { T_INJECT_CONTEXT } from './inject-context/type'
import { cdn } from './cdn'

const getConfig: GetUserConfig<T_INJECT_CONTEXT> = function({ resolve }) {
  return {
    injectContext: resolve('inject-context/production.ts'),
    port: 8060,
    src: {
      SSR: {
        base: { webpack: getBaseConfig },
        client: { webpack: getClientConfig },
        server: {
          webpack: getServerConfig,
          exclude: [],
          statics: {
            '/web-steps': {
              path: resolve('./dist/web-steps'),
            },
            '/static': {
              path: resolve('./static'),
            },
            '/public': {
              path: resolve('./public'),
            },
          },
          render: {
            templatePath: resolve('./src/index.template.html'),
          },
        },
      },
      DLL: {
        Vue: 'vue',
        Vuex: { name: 'vuex', refs: ['Vue'] },
        VueRouter: { name: 'vue-router', refs: ['Vue'] },
        Axios: 'axios',
      },
    },
    release: {
      cdn,
      target: {
        production: {
          host: 'https://student.imsunhao.com',
          bin({ gitHash, tag }) {
            console.log(`\n\n请提交上线申请!\n\tgit: ${gitHash}\n\ttag: ${tag}\n\n`)
          },
        },
      },
    },
  }
}

export default getConfig
