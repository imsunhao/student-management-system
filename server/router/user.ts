import express from 'express'
import { Api } from 'request'
import { userOperation } from 'server/mongo/schema/user'
import { createStatementHelper } from 'server/router/helper'

export function createUserRouter() {
  const router = express.Router()

  const use = createStatementHelper<Api.User>(router, 'api', 'user')

  use('login', async (req, res, next) => {
    console.log('POST /login', req.body)
    if (req.session.user) {
      console.log('[login] from session')
      return res.json(req.session.user)
    }
    try {
      const { ID, password } = req.body
      if (!ID || !password) {
        return res.status(400).end()
      }
      const users = await userOperation.find({ ID, password })
      const user = users[0]
      if (user) {
        const result = user.toJSON()
        delete result.__v
        delete result._id
        delete result.password

        req.session.user = result
        req.session.save(() => {})
        console.log('[login] from userOperation')
        res.json(result)
      } else {
        res.status(400).end()
      }
    } catch (err) {
      res.status(500).json(err)
    }
  })

  use('logout', (req, res, next) => {
    console.log('[logout]')
    req.session.destroy(() => {})
    res.json({ status: 200 })
  })

  use('register', async (req, res, next) => {
    try {
      res.json(await userOperation.insert(req.body))
    } catch (err) {
      res.status(500).json(err)
    }
  })

  return router
}
