import { GetUserConfig } from '@web-steps/config'
import getBaseConfig from './config/webpack-base'
import getClientConfig from './config/webpack-client'
import getServerConfig from './config/webpack-server'
import { T_INJECT_CONTEXT } from './inject-context/type'
import { cdn } from './private-configuration'

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
        ElementUI: { name: 'element-ui', refs: ['Vue'] },
      },
    },
    release: {
      cdn,
      target: {
        production: {
          host: 'https://student.imsunhao.com',
          bin({ tag }) {
            return `bin/release_production.sh ${tag}`
          },
        },
      },
    },
  }
}

export default getConfig
