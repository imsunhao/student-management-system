/* eslint-disable @typescript-eslint/prefer-includes */
import { GetUserServerConfig } from '@web-steps/config'
import { T_INJECT_CONTEXT } from '../inject-context/type'
import { TServerContext, TAPP } from '@web-steps/server'
import { isProduction, requrieENVConfig, isTest } from './env'
import { mongooseInit } from './mongo'
import { createRouter } from 'server/router'
import bodyParser from 'body-parser'
import session from 'express-session'
import Tests from 'tests'
import connectMongo from 'connect-mongo'
import mongoose from 'mongoose'

const INIT_LIFE_CYCLE = process.env.INIT_LIFE_CYCLE
if (!INIT_LIFE_CYCLE) process.env.INIT_LIFE_CYCLE = 'TRUE'

function sessionInit(APP: TAPP) {
  const MongoStore = connectMongo(session)
  const sess: session.SessionOptions = {
    secret: 'password;secret;',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {},
    saveUninitialized: false, //  在存储某些内容之前不创建会话
    resave: false, //如果未修改，则不保存会话
  }

  // if (isProduction) {
  //   APP.express.set('trust proxy', 1) // trust first proxy
  //   sess.cookie.secure = true // serve secure cookies
  // }

  APP.use(session(sess))
  console.log('[添加 session 中间件]')
}

function bodyParserInit(APP: TAPP) {
  APP.use(bodyParser.json())
  APP.use(bodyParser.urlencoded({ extended: false }))
  console.log('[添加 bodyParser 中间件]')
}

function handleErrorInit(APP: TAPP) {
  APP.use((err, req, res, next) => {
    // console.log('[handleError]')
    if (/MongoError: E11000/.test(err)) return
    console.error(err)
  })
  console.log('[添加 handleError 中间件]')
}

const getServerConfig: GetUserServerConfig = ({ resolve }) => {
  requrieENVConfig(resolve('mongodb/mongo.env'))

  return {
    beforeCreated(APP) {
      if (!INIT_LIFE_CYCLE) {
        mongooseInit()
      }
      bodyParserInit(APP)
      sessionInit(APP)
    },
    renderContext(context: TServerContext<T_INJECT_CONTEXT>) {
      const result: any = context
      result.STATIC_HOST = isProduction && !isTest ? context.injectContext.STATIC_HOST : ''
    },
    beforeRender(req, res, next) {
      let userInfo = ''
      if (req.session.user) userInfo = `ID=${req.session.user.ID} name=${req.session.user.name}`
      console.log('[beforeRender]', req.method, req.url, userInfo)
      if (req.url.startsWith('/api')) {
        next()
      }
      if (req.url.startsWith('/web-steps')) {
        res.end(404)
        next()
      }
      if (!process.__WEB_STEPS__) process.__WEB_STEPS__ = {}
      process.__WEB_STEPS__.req = req
    },
    renderSend(html, req, res) {
      delete process.__WEB_STEPS__.req
      res.end(html)
    },
    router(APP) {
      APP.use('/api', createRouter())
      console.log('[添加 api 路由]')
      handleErrorInit(APP)

      if (process.env.TEST_ENV && process.send) {
        process.send({ messageKey: '启动服务器标识符' })
        process.on('message', (message: Tests.NodeJS.ProcessMessage) => {
          const { messageKey } = message
          if (messageKey === 'exit') process.exit(0)
        })
      }
    },
  }
}

export default getServerConfig
