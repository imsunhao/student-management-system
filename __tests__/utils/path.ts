import path from 'path'
export const resolve = (...args: string[]) => {
  return path.resolve.apply(undefined, [__dirname, '../..', ...args])
}