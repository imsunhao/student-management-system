import mongoose from 'mongoose'
import { HOST, PORT, DATABASE } from './setting'
// import { getENV, isProduction } from 'server/env'
import { getENV } from 'server/env'
import { initMongoData, dropMongoData } from 'server/mongo/scripts'

const MAX_RETRY_TIME = 10

let init = false

export function mongooseInit() {
  if (init) return
  init = true

  const MONGO_INITDB_DATABASE = getENV('MONGO_INITDB_DATABASE')
  const MONGO_INITDB_USERNAME = getENV('MONGO_INITDB_USERNAME')
  const MONGO_INITDB_PASSWORD = getENV('MONGO_INITDB_PASSWORD')

  const uri = `mongodb://${HOST}:${PORT}/${DATABASE}`

  mongoose.Promise = global.Promise

  let retryTime = 0
  const db = mongoose.connection

  const connectWithRetry = function() {
    if (retryTime >= MAX_RETRY_TIME) {
      console.error('[MongoDB]', uri, '连接超时')
      process.exit(0)
    }
    return mongoose.connect(
      uri,
      {
        // autoIndex: !isProduction,
        authSource: MONGO_INITDB_DATABASE,
        auth: {
          user: MONGO_INITDB_USERNAME,
          password: MONGO_INITDB_PASSWORD,
        },
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      function(err) {
        if (err) {
          console.error('[MongoDB] 连接错误, 正在重试, 当前重试次数', ++retryTime)
          setTimeout(connectWithRetry, 2000)
        }
      },
    )
  }

  connectWithRetry()

  db.once('open', async function() {
    console.log('[MongoDB] 连接成功', uri)
    db.on('error', console.error.bind(console, '[MongoDB] 错误：'))

    try {
      if (process.env.TEST_ENV || process.env.INIT_MONGO) {
        await dropMongoData()
        await initMongoData()
        console.log('[MongoDB] 初始化 成功')
      }
    } catch (error) {
      console.log('[MongoDB] 初始化 失败', uri, error)
      return
    }
  })
}
