import express from 'express'
import { createUserRouter, uri as userUri } from './user'

export function createRouter() {
  const router = express.Router()
  router.use(userUri, createUserRouter())
  return router
}
