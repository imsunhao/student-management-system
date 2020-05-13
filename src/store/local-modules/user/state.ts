import { TUser } from 'schema'
import { isServer } from 'src/envs'

export type TUserState = {
  user?: Omit<TUser, 'password'>
}

export function getUserState(): TUserState {
  let user: any = {}
  if (isServer && process.__WEB_STEPS__) {
    const req = process.__WEB_STEPS__.req
    if (req.session.user) {
      user = req.session.user
    }
  }
  return {
    user,
  }
}
