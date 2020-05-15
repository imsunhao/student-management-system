
import { isShow } from '../setting'

export class Log {
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