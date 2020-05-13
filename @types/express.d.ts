// Type definitions for method-override

/**
 * 拓展 express
 */
declare namespace Express {
  import { TUser } from 'schema'

  export interface SessionData {
    cookie: SessionCookieData
    user: TUser
  }

  interface SessionCookieData {
    originalMaxAge: number
    path: string
    maxAge: number | null
    secure?: boolean
    httpOnly: boolean
    domain?: string
    expires: Date | boolean
    sameSite?: boolean | string
  }
}
