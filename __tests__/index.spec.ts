/* eslint-disable jest/expect-expect */
import { Execa } from './utils/node'
import Tests from 'tests'
import { createPuppeteer, page, text, destroy } from './utils/e2e'
import { isShow, isRead, timeout, url, useCache, port } from './setting'
import execa from 'execa'
import path from 'path'
import fs from 'fs'

const resolve = (...args: string[]) => {
  return path.resolve.apply(undefined, [__dirname, '..', ...args])
}

const screenshotDir = './dist/test-screenshot/'

const getScreenshotPath = (name: string) => {
  name = name + '.png'
  return resolve(screenshotDir, name)
}

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) return true
  fs.mkdirSync(dirname, { recursive: true })
}

ensureDirectoryExistence(screenshotDir + 'test.png')

async function screenshot(name: string) {
  await page.setViewport({ width: 1366, height: 768 })
  await page.screenshot({ path: getScreenshotPath(`${name}-pc-1366×768`) })
  await page.setViewport({ width: 1440, height: 900 })
  await page.screenshot({ path: getScreenshotPath(`${name}-pc-1440x900`) })
  await page.setViewport({ width: 1920, height: 1080 })
  await page.screenshot({ path: getScreenshotPath(`${name}-pc-1920x1080`) })
}

class Log {
  static log(...args: string[]) {
    if (!isShow) return
    console.log.apply(undefined, args)
  }
  static warn(...args: string[]) {
    if (!isShow) return
    console.warn.apply(undefined, args)
  }
  static error(...args: string[]) {
    console.error.apply(undefined, args)
  }
}

let childProcess: execa.ExecaChildProcess<string>

const puppeteerDestroy = async () => {
  Log.log('[Puppeteer] destroy')
  childProcess.send({ messageKey: 'exit' })
  await destroy()
}

describe('e2e Tests', () => {
  createPuppeteer()

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
    done => {
      const main = async () => {
        await page.goto(url.home, { timeout: 5000 })
        Log.log('[Puppeteer] goto', url.home)
        const result = await text('#title')
        expect(result).toBe('学生管理系统')
        await screenshot('首页')
        done()
      }

      main()
        .then(() => {
          puppeteerDestroy()
        })
        .catch(err => {
          puppeteerDestroy()
        })
    },
    timeout,
  )
})
