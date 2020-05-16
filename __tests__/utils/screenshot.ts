import path from 'path'
import fs from 'fs'
import { page } from './e2e'
import { resolve } from './path'

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

export function initScreenshot() {
  fs.rmdirSync(screenshotDir, { recursive: true })
}

export async function screenshot(name: string) {
  ensureDirectoryExistence(getScreenshotPath(name))
  await page.setViewport({ width: 1366, height: 768 })
  await page.screenshot({ path: getScreenshotPath(`${name}-pc-1366×768`) })
  await page.setViewport({ width: 1440, height: 900 })
  await page.screenshot({ path: getScreenshotPath(`${name}-pc-1440x900`) })
  await page.setViewport({ width: 1920, height: 1080 })
  await page.screenshot({ path: getScreenshotPath(`${name}-pc-1920x1080`) })
}
