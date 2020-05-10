import mongoose, { SchemaTypeOpts, Schema, SchemaType } from 'mongoose'

type SchemaDefinition<T extends string> = Record<T, SchemaTypeOpts<any> | Schema | SchemaType>

export function createSchema<T>(definition: SchemaDefinition<keyof T>, options?: mongoose.SchemaOptions) {
  return new mongoose.Schema<T>(definition, options)
}

export class BaseOperation<DATA, TOperation = Record<keyof DATA, any>> {
  model: mongoose.Model<mongoose.Document, {}>

  constructor(model) {
    this.model = model
  }

  async insert(data: DATA) {
    let resove: any, reject: any
    const promise = new Promise<mongoose.Document>((r, j) => {
      resove = r
      reject = j
    })
    const document = new this.model(data)
    document.save((err, product) => {
      if (err) return reject(err)
      resove(product)
    })
    return await promise
  }
  async update(where: Partial<TOperation>, doc: Partial<TOperation>) {
    let resove: any, reject: any
    const promise = new Promise<any>((r, j) => {
      resove = r
      reject = j
    })
    this.model.update(where, doc, (err, raw) => {
      if (err) return reject(err)
      resove(raw)
    })
    return await promise
  }
  async remove(where: Partial<TOperation>) {
    let resove: any, reject: any
    const promise = new Promise<
      mongoose.Query<
        {
          ok?: number
          n?: number
        } & {
          deletedCount?: number
        }
      >
    >((r, j) => {
      resove = r
      reject = j
    })
    const result = this.model.remove(where, err => {
      if (err) return reject(err)
      resove(result)
    })
    return await promise
  }
  async find(where: Partial<TOperation>) {
    let resove: any, reject: any
    const promise = new Promise<mongoose.Document[]>((r, j) => {
      resove = r
      reject = j
    })
    this.model.find(where, (err, res) => {
      if (err) return reject(err)
      resove(res)
    })
    return await promise
  }
}
