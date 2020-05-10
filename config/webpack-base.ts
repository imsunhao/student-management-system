import { TGetWebpackConfig } from '@web-steps/config'
import { STATIC_HOST } from './settings'

const getConfig: TGetWebpackConfig = function({ args: { env }, resolve }) {
  const isProduction = env === 'production'
  const publicPath = isProduction ? STATIC_HOST + '/dist/web-steps/' : '/web-steps/'

  return {
    output: {
      publicPath,
    },
    resolve: {
      alias: {
        src: resolve('src'),
        mongodb: resolve('mongodb'),
        server: resolve('server'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(woff2?|eot|ttf|otf)/,
          loader: 'file-loader',
          options: {
            limit: 10000,
            publicPath,
          },
        },
      ],
    },
  }
}

export default getConfig
