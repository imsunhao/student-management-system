import mongoose from 'mongoose'
import { HOST, PORT, DATABASE } from './setting'
import { getENV } from '../utils/env'

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
      return
    }
    return mongoose.connect(
      uri,
      {
        authSource: MONGO_INITDB_DATABASE,
        auth: {
          user: MONGO_INITDB_USERNAME,
          password: MONGO_INITDB_PASSWORD,
        },
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

  db.once('open', function() {
    console.log('[MongoDB] 连接成功', uri)
    db.on('error', console.error.bind(console, '[MongoDB] 错误：'))
  })
}
