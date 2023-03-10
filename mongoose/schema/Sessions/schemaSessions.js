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
forExport.name = "Sessions"
forExport.collection = "duma_sessions"

forExport.schema = new mongoose.Schema({
  uuid: { type: String, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'duma_users' },
  active: { type: Boolean, default: true }
}, standartDate);


const model = mongoose.model(forExport.collection, forExport.schema)

forExport.get = {}
forExport.set = {}

forExport.get.full = async function ({ filter = {}, populate }, { _id = null, action, userInfo }) {

  if (_id) {
    const query = model.findOne({ _id })
    if (populate) {
      query.populate(populate)
    }
    const result = await query.exec()
    return result
  }
  const query = getQuery({ action, filter })
  if (populate) {
    query.populate(populate)
  }
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