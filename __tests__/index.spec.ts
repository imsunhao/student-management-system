/* eslint-disable jest/expect-expect */
import { Execa } from './utils/node'
import Tests from 'tests'
import { createPuppeteer, page, text, destroy, setValue, click, waitResponse } from './utils/e2e'
import { screenshot, initScreenshot, screenshotDir } from './utils/screenshot'
import { envsInit } from './utils/envs'
import { Log } from './utils/log'
import { isShow, isRead, timeout, url, useCache, port } from './setting'
import execa from 'execa'

let childProcess: execa.ExecaChildProcess<string>

const beforeExit = async () => {
  Log.log('[server] stop')
  childProcess.send({ messageKey: 'e2e' })
  Log.log('[Puppeteer] destroy')
  await destroy()
  console.log('\n\n[Screenshot] 测试已完成 测试关键节点已截图\n\t截图存放位置:', screenshotDir)
}

describe('e2e Tests', () => {
  createPuppeteer()
  envsInit()

  test(
    '初始化 服务器',
    done => {
      const nodeArgv = ['node_modules/@web-steps/cli/bin/web-steps', 'dev', `--cache=${useCache}`, `--port=${port}`]

      childProcess = Execa.runNodeIPC(nodeArgv, { isSilence: !isShow, isRead })
      childProcess.on('message', (message: Tests.NodeJS.ProcessMessage) => {
        const { messageKey } = message
        if (messageKey === '启动服务器标识符') {
          initScreenshot()
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
        await page.goto(url.Home, { timeout: 5000 })
        Log.log('[Puppeteer] goto', '首页', url.Home)
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

  /**
   * 用户登录
   * - 默认 管理员 登录
   */
  const userLogin = async ({ id, password }: { id?: string; password?: string } = {}) => {
    await page.goto(url.Login, { timeout: 5000 })
    Log.log('[Puppeteer] goto', '登录页', url.Login)

    await setValue('#user-id', id || process.env.STUDENT_MANAGEMENT_SYSTEM_ID)
    await setValue('#user-password', password || process.env.STUDENT_MANAGEMENT_SYSTEM_PASSWORD)
    await click('#login')
    await waitResponse()
  }

  test(
    '首页-管理员-登录',
    async () => {
      try {
        await userLogin()
        await screenshot('login/登录成功')

        expect(await text('.login-success')).toBe('登录成功')

        await click('#logout')
        await waitResponse()

        await screenshot('login/退出成功')

        expect(await text('.logout-success')).toBe('用户退出')
      } catch (err) {
        await beforeExit()
        throw err
      }
    },
    timeout,
  )

  const newAdminUserPassword = 'password'

  test(
    '首页-用户管理-修改密码',
    async () => {
      try {
        await userLogin()
        expect(await text('.login-success')).toBe('登录成功')
        await page.goto(url.UserBaseInfo, { timeout: 5000 })
        await screenshot('app/用户管理/基础信息')

        await beforeExit()
      } catch (err) {
        await beforeExit()
        throw err
      }
    },
    timeout,
  )
})
