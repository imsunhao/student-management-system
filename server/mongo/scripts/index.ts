import mongoose from 'mongoose'

import { userOperation } from 'server/mongo/schema'
import { getENV } from 'server/env'

export async function dropMongoData() {
  let resove: any, reject: any
  const promise = new Promise<void>((r, j) => {
    resove = r
    reject = j
  })
  const db = mongoose.connection.db
  db.dropDatabase(function(err) {
    if (err) return reject(err)
    resove()
  })
  await promise
}

export async function initMongoData() {
  const initRootUser = async () => {
    const ROOT_ID = getENV('STUDENT_MANAGEMENT_SYSTEM_ID')
    const ROOT_PASSWORD = getENV('STUDENT_MANAGEMENT_SYSTEM_PASSWORD')
    await userOperation.insert({ ID: ROOT_ID, password: ROOT_PASSWORD, role: 1, name: '管理员', class: [] })
  }

  try {
    await initRootUser()
  } catch (error) {
    console.error('[initMongoData] 失败', error)
  }
}
