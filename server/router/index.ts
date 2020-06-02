import express from 'express'
import { createUserRouter } from './user'
import { createStatementHelper } from 'server/router/helper'

export function createRouter() {
  const router = express.Router()
  const use = createStatementHelper<any>(router, 'api')
  use('user', createUserRouter())
  return router
}
