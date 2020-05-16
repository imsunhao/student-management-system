import { config } from 'dotenv'
import { resolve } from './path'

function requrieENVConfig(path: string) {
  const { error } = config({ path })
  if (error) {
    console.error('[dotenv] fail! path =', path, error)
  }
}

export function envsInit() {
  requrieENVConfig(resolve('mongodb/mongo.env'))
}
