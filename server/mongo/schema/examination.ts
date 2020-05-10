import mongoose from 'mongoose'
import { createSchema, BaseOperation } from './utils'
import { TExamination } from 'schema'

export const ExaminationSchema = createSchema<TExamination>({
  name: { type: String },
  startTime: { type: Date },
  endTime: { type: Date },
  type: { type: Number },
  sourceList: [{ id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', source: Number } }],
  class: { type: String, ref: 'Class' },
})

delete mongoose.connection.models['Examination']
export const ExaminationModel = mongoose.model('Examination', ExaminationSchema)

type TExaminationOperation = Record<keyof TExamination, any>

class ExaminationOperation extends BaseOperation<TExamination> {
  constructor() {
    super(ExaminationModel)
  }
}

export const examinationOperation = new ExaminationOperation()
