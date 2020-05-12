import { Execa } from './utils/node'
import Tests from 'tests'
import { setupPuppeteer } from './utils/e2e'
import { isShow, isRead, timeout, url, useCache } from './setting'
import execa from 'execa'

describe('e2e Tests', () => {
  let childProcess: execa.ExecaChildProcess<string>
  // eslint-disable-next-line jest/expect-expect
  test(
    'init server',
    done => {
      const nodeArgv = ['node_modules/@web-steps/cli/bin/web-steps', 'dev', `--cache=${useCache}`]

      childProcess = Execa.runNodeIPC(nodeArgv, { isSilence: !isShow, isRead })

      childProcess.on('message', (message: Tests.Node.ProcessMessage) => {
        const { messageKey } = message
        if (messageKey === 'test-start') done()
      })
    },
    timeout,
  )

  test(
    '首页',
    async done => {
      const { page, text, destroy } = await setupPuppeteer()
      const beforeExit = async () => {
        if (isShow) console.log('[Puppeteer] destroy')
        childProcess.send({ messageKey: 'exit' })
        await destroy()
      }
      try {
        await page.goto(url.home, { timeout: 5000 })
        if (isShow) console.log('[Puppeteer] goto', url.home)
        const result = await text('#title')
        expect(result).toBe('学生管理系统')
        await beforeExit()
      } catch (e) {
        await beforeExit()
        throw e
      }
      done()
    },
    timeout,
  )
})
