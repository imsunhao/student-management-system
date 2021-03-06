export function mergeBase(src: { [x: string]: any }, target: { [x: string]: any }) {
  if (typeof target !== 'object' || typeof src !== 'object') return target
  Object.keys(target).forEach(t => {
    if (typeof target[t] === 'object' && typeof src[t] === 'object') {
      src[t] = mergeBase(src[t], target[t])
    } else {
      src[t] = target[t]
    }
  })
  return src
}

export function cloneDeep<T>(data: T): T {
  if (typeof data !== 'object') return data
  if (data instanceof RegExp) return data
  if (data instanceof Array) {
    return data.map(d => {
      return cloneDeep(d)
    }) as any
  }
  return Object.keys(data).reduce((t: any, o) => {
    t[o] = cloneDeep((data as any)[o])
    return t
  }, {})
}

export function merge(...args: any[]) {
  return args.reduce((t, o) => {
    if (!o) return t
    if (t === o) return t
    return mergeBase(t, cloneDeep(o))
  }, args[0])
}