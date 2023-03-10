import { mongoose } from "../../export.js"

const getQuery = function ({ action, filter }) {
  let query = null
  switch (action) {
    case "findOne":
      query = model.findOne(filter)
      break;

    default:
      query = model.find(filter)
      break;
  }
  return query
}

const standartDate = { timestamps: { createdAt: 'dateCreate', updatedAt: 'dateUpdate' }, versionKey: false }

const forExport = {}
forExport.name = "Users"
forExport.collection = "duma_users"

forExport.schema = new mongoose.Schema({
  firstName: { type: String },
  email: { type: String, index: true, trim: true, lowercase: true, maxLength: 100, unique: true },
  password: { type: String, maxLength: 32 },
}, standartDate);


const model = mongoose.model(forExport.collection, forExport.schema)

forExport.get = {}
forExport.set = {}

forExport.get.full = async function ({ filter = {} }, { _id = null, action, userInfo }) {
  if (_id) {
    const query = model.findOne({ _id })
    query.select({ password: 0 })
    const result = await query.exec()
    return result
  }
  const query = getQuery({ action, filter })
  query.select({ password: 0 })
  const result = await query.exec()
  return result
}

forExport.set.full = async function ({ insert = {} }, { _id = null, action, userInfo }) {
  if (action == "insert") {
    let record = new model();
    Object.assign(record, insert)
    const result = await record.save()
    return result
  }
}

export default forExport