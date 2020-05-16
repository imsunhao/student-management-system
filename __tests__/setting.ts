import minimist from 'minimist'

export const timeout = 15000

export const args = minimist(process.argv.slice(3), { string: 'case', default: { cache: 'false' } })

export const { show: isShow, read: isRead, cache: useCache } = args

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export const port = getRandomArbitrary(10000, 40000)

const indexUrl = `http://127.0.0.1:${port}`

export const url = {
  home: `${indexUrl}/`,
  login: `${indexUrl}/`,
}
