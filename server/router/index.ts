import express from 'express'
import { createUserRouter } from './user'
import { createRouterHelper } from 'src/api/helper'

export function createRouter() {
  const router = express.Router()
  const helper = createRouterHelper<any>(router, 'api')
  helper.use('user', createUserRouter())
  return router
}
