import { GetUserServerConfig } from '@web-steps/config'
import express from 'express'
import { T_INJECT_CONTEXT } from '../inject-context/type'
import { TServerContext } from '@web-steps/server'
import { getENV, requrieENVConfig } from './utils/env'
import { mongooseInit } from './mongo'

const getServerConfig: GetUserServerConfig = ({ resolve }) => {
  const NODE_ENV = getENV('NODE_ENV')
  requrieENVConfig(resolve('mongodb/mongo.env'))

  return {
    renderContext(context: TServerContext<T_INJECT_CONTEXT>) {
      const result: any = context
      result.STATIC_HOST = NODE_ENV === 'production' ? context.injectContext.STATIC_HOST : ''
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
      mongooseInit()
      const router = express.Router()

      APP.use('/private', router)
    },
  }
}
export default getServerConfig
