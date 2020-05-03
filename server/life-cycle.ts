import { GetUserServerConfig } from '@web-steps/config'
import express from 'express'
import { T_INJECT_CONTEXT } from '../inject-context/type'
import { TServerContext } from '@web-steps/server'

function getServerEnv(env: string) {
  return process.env[env]
}

const NODE_ENV = getServerEnv('NODE_ENV')

const getServerConfig: GetUserServerConfig = () => {
  return {
    renderContext(context: TServerContext<T_INJECT_CONTEXT>) {
      const c: any = context
      console.log(NODE_ENV)
      c.STATIC_HOST = NODE_ENV === 'production' ? context.injectContext.STATIC_HOST : ''
      // console.log(context)
    },
    beforeRender(req, res, next) {
      console.log('[beforeRender]', req.method, req.url)
      if (req.url.startsWith('/private')) {
        next()
      }
      if (req.url.startsWith('/web-steps')) {
        res.end(404)
        next()
      }
    },
    router(APP) {
      const router = express.Router()

      APP.use('/private', router)
    },
  }
}
export default getServerConfig
