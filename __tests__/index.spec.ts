/* eslint-disable jest/expect-expect */
import { Execa } from './utils/node'
import Tests from 'tests'
import { createPuppeteer, page, text, destroy } from './utils/e2e'
import { screenshot, initScreenshot } from './utils/screenshot'
import { Log } from './utils/log'
import { isShow, isRead, timeout, url, useCache, port } from './setting'
import execa from 'execa'

let childProcess: execa.ExecaChildProcess<string>

const beforeExit = async () => {
  Log.log('[server] stop')
  childProcess.send({ messageKey: 'e2e' })
  Log.log('[Puppeteer] destroy')
  await destroy()
}

describe('e2e Tests', () => {
  createPuppeteer()
  initScreenshot()

  test(
    'init server',
    done => {
      const nodeArgv = ['node_modules/@web-steps/cli/bin/web-steps', 'dev', `--cache=${useCache}`, `--port=${port}`]

      childProcess = Execa.runNodeIPC(nodeArgv, { isSilence: !isShow, isRead })

      childProcess.on('message', (message: Tests.NodeJS.ProcessMessage) => {
        const { messageKey } = message
        if (messageKey === 'test-start') {
          done()
        }
      })
    },
    timeout,
  )

  test(
    '首页',
    async () => {
      try {
        await page.goto(url.home, { timeout: 5000 })
        Log.log('[Puppeteer] goto', url.home)
        const result = await text('#title')
        expect(result).toBe('学生管理系统')
        await screenshot('index/首页')
      } catch (err) {
        await beforeExit()
        throw err
      }
    },
    timeout,
  )

  // test(
  //   '首页-admin-登录',
  //   async () => {
  //     try {
  //       await page.goto(url.home, { timeout: 5000 })
  //       Log.log('[Puppeteer] goto', url.home)
  //       const result = await text('#title')
  //       expect(result).toBe('学生管理系统')
  //       await screenshot('index/首页')
  //       await beforeExit()
  //     } catch (err) {
  //       await beforeExit()
  //       throw err
  //     }
  //   },
  //   timeout,
  // )
})
