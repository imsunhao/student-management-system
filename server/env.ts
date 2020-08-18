import { config } from 'dotenv'

export function getENV(env: string) {
  return process.env[env]
}

export const NODE_ENV = getENV('NODE_ENV')
export const TEST_ENV = getENV('TEST_ENV')

export const isProduction = NODE_ENV === 'production'
export const isTest = !!TEST_ENV

export function requrieENVConfig(path: string) {
  const { error } = config({ path })
  if (error) {
    console.error('[dotenv] fail! path =', path, error)
  }
}
