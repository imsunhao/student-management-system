import { GetUserServerConfig } from '@web-steps/config'
import { T_INJECT_CONTEXT } from '../inject-context/type'
import { TServerContext, TAPP } from '@web-steps/server'
import { isProduction, requrieENVConfig } from './env'
import { mongooseInit } from './mongo'
import { createRouter } from 'server/router'
import bodyParser from 'body-parser'
import session from 'express-session'
import Tests from 'tests'

const INIT_LIFE_CYCLE = process.env.INIT_LIFE_CYCLE
if (!INIT_LIFE_CYCLE) process.env.INIT_LIFE_CYCLE = 'TRUE'

function sessionInit(APP: TAPP) {
  const sess: session.SessionOptions = {
    secret: 'keyboard cat',
    cookie: {},
  }

  if (isProduction) {
    APP.express.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }

  APP.use(session(sess))
}

const getServerConfig: GetUserServerConfig = ({ resolve }) => {
  requrieENVConfig(resolve('mongodb/mongo.env'))

  return {
    beforeCreated(APP) {
      if (!INIT_LIFE_CYCLE) {
        mongooseInit()
        if (process.env.TEST_ENV && process.send) {
          process.send({ messageKey: 'test-start' })
          process.on('message', (message: Tests.Node.ProcessMessage) => {
            const { messageKey } = message
            if (messageKey === 'exit') process.exit(0)
          })
        }
      }
      sessionInit(APP)
    },
    renderContext(context: TServerContext<T_INJECT_CONTEXT>) {
      const result: any = context
      result.STATIC_HOST = isProduction ? context.injectContext.STATIC_HOST : ''
    },
    beforeRender(req, res, next) {
      console.log('[beforeRender]', req.method, req.url)
      if (req.url.startsWith('/api')) {
        next()
      }
      if (req.url.startsWith('/web-steps')) {
        res.end(404)
        next()
      }
    },
    router(APP) {
      APP.use(bodyParser.json())
      APP.use(bodyParser.urlencoded({ extended: false }))

      APP.use('/api', createRouter())
    },
  }
}

export default getServerConfig
