import minimist from 'minimist'

export const timeout = 15000

export const args = minimist(process.argv.slice(3), { string: 'case', default: { cache: 'false' } })

export const { show: isShow, read: isRead, cache: useCache } = args

export const url = {
  home: 'http://127.0.0.1:8060/',
}
