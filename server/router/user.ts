import express from 'express'
import { userOperation } from 'server/mongo/schema/user'

export const uri = '/user'

export function createUserRouter() {
  const router = express.Router()
  router.post('/login', async (req, res, next) => {
    try {
      res.json(await userOperation.insert(req.body))
    } catch (err) {
      res.status(500).json(err)
    }
  })

  router.post('/logout', async (req, res, next) => {
    try {
      res.json(await userOperation.insert(req.body))
    } catch (err) {
      res.status(500).json(err)
    }
  })

  router.post('/register', async (req, res, next) => {
    try {
      res.json(await userOperation.insert(req.body))
    } catch (err) {
      res.status(500).json(err)
    }
  })
  return router
}
