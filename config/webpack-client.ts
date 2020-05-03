import { TGetWebpackConfig } from '@web-steps/config'

const getConfig: TGetWebpackConfig = function ({ resolve }) {
  return {
    entry: {
      client: resolve('./src/entry-client.ts'),
    },
    output: {
      globalObject: 'this',
    },
  }
}

export default getConfig
