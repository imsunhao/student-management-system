import puppeteer from 'puppeteer-core'

const puppeteerOptions: puppeteer.LaunchOptions = process.env.CI
  ? { args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'] }
  : { args: ['--ignore-certificate-errors'] }

puppeteerOptions.executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
puppeteerOptions.headless = false

export async function setupPuppeteer() {
  const browser = await puppeteer.launch(puppeteerOptions)
  const page = await browser.newPage()
  await page.setRequestInterception(true)

  page.on('console', e => {
    if (e.type() === 'error') {
      console.error(`Error from Puppeteer-loaded page:\n`, e)
    }
  })
  page.on('request', req => {
    req.continue()
  })

  return {
    browser,
    page,
  }
}

export let browser: puppeteer.Browser
export let page: puppeteer.Page

let puppeteerInit = false

export async function click(selector: string, options?: puppeteer.ClickOptions) {
  if (!puppeteerInit) return
  await page.click(selector, options)
}

export async function count(selector: string) {
  if (!puppeteerInit) return
  return (await page.$$(selector)).length
}

export async function text(selector: string) {
  if (!puppeteerInit) return
  return await page.$eval(selector, node => node.textContent)
}

export async function value(selector: string) {
  if (!puppeteerInit) return
  return await page.$eval(selector, (node: HTMLInputElement) => node.value)
}

export async function html(selector: string) {
  if (!puppeteerInit) return
  return await page.$eval(selector, node => node.innerHTML)
}

export async function classList(selector: string) {
  if (!puppeteerInit) return
  return await page.$eval(selector, (node: any) => [...node.classList])
}

export async function children(selector: string) {
  if (!puppeteerInit) return
  return await page.$eval(selector, (node: any) => [...node.children])
}

export async function isVisible(selector: string) {
  if (!puppeteerInit) return
  const display = await page.$eval(selector, (node: HTMLElement) => {
    return window.getComputedStyle(node).display
  })
  return display !== 'none'
}

export async function isChecked(selector: string) {
  if (!puppeteerInit) return
  return await page.$eval(selector, (node: HTMLInputElement) => node.checked)
}

export async function isFocused(selector: string) {
  if (!puppeteerInit) return
  return await page.$eval(selector, node => node === document.activeElement)
}

export async function setValue(selector: string, value: string) {
  if (!puppeteerInit) return
  const el = await page.$(selector)
  if (el) {
    await el.evaluate((node: HTMLInputElement) => (node.value = ''))
    await el.type(value)
  }
}

export async function enterValue(selector: string, value: string) {
  if (!puppeteerInit) return
  const el = await page.$(selector)
  if (el) {
    await el.evaluate((node: HTMLInputElement) => (node.value = ''))
    await el.type(value)
    await el.press('Enter')
  }
}

export async function clearValue(selector: string) {
  if (!puppeteerInit) return
  return await page.$eval(selector, (node: HTMLInputElement) => (node.value = ''))
}

export async function destroy() {
  if (!puppeteerInit) return
  await browser.close()
  puppeteerInit = false
}

export async function createPuppeteer() {
  if (puppeteerInit) return
  puppeteerInit = true

  browser = await puppeteer.launch(puppeteerOptions)
  page = await browser.newPage()

  await page.setRequestInterception(true)

  page.on('console', e => {
    if (e.type() === 'error') {
      console.error(`Error from Puppeteer-loaded page:\n`, e)
    }
  })

  page.on('request', req => {
    req.continue()
  })
}
