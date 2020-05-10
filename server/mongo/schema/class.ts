import mongoose from 'mongoose'
import { createSchema, BaseOperation } from './utils'
import { TClass } from 'schema'

export const ClassSchema = createSchema<TClass>({
  name: { type: String, index: true },
})

delete mongoose.connection.models['Class']
export const ClassModel = mongoose.model('Class', ClassSchema)

type TClassOperation = Record<keyof TClass, any>

class ClassOperation extends BaseOperation<TClass> {
  constructor() {
    super(ClassModel)
  }
}

export const classOperation = new ClassOperation()