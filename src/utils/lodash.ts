export function safeAssign<T = any>(o: Partial<T>, ...dataObjs: Array<Partial<T>>) {
  return Object.assign(o || {}, ...dataObjs)
}
