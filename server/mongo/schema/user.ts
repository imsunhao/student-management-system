import mongoose from 'mongoose'
import { createSchema, BaseOperation } from './utils'
import { TUser } from 'schema'

export const UserSchema = createSchema<TUser>({
  ID: { type: String, index: true, unique: true },
  name: { type: String },
  password: { type: String },
  class: { type: [{ type: String }], ref: 'Class' },
  role: { type: Number },
})

delete mongoose.connection.models['User']
export const UserModel = mongoose.model('User', UserSchema)

type TUserOperation = Record<keyof TUser, any>

class UserOperation extends BaseOperation<TUser> {
  constructor() {
    super(UserModel)
  }
}

export const userOperation = new UserOperation()
