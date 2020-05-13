import express from 'express'
import { User } from 'request'
import { userOperation } from 'server/mongo/schema/user'

export const uri = '/user'

export function createUserRouter() {
  const router = express.Router()
  router.post('/login', async (req, res, next) => {
    console.log('POST /login', req.body)
    if (req.session.user) {
      console.log('[login] from session')
      return res.json(req.session.user)
    }
    try {
      const { ID, password } = req.body as User.login
      if (!ID || !password) {
        return res.json()
      }
      const users = await userOperation.find({ ID, password })
      const user = users[0]
      let result
      if (user) {
        result = user.toJSON()
        delete result.__v
        delete result._id
        delete result.password

        req.session.user = result
        req.session.save(err => {
          console.error(err)
        })
        console.log('[login] from userOperation')
      }
      res.json(result)
    } catch (err) {
      res.status(500).json(err)
    }
  })

  router.post('/logout', (req, res, next) => {
    console.log('[logout]')
    delete req.session.user
    req.session.save(err => {
      console.error(err)
    })
    res.json({ status: 200 })
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
