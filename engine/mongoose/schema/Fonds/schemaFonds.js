import { mongoose } from "../../export.js";

const getQuery = function ({ action, filter, ls }) {
  let query = null;
  switch (action) {
    case "findOne":
      query = model.findOne(filter);
      break;

    default:
      query = model.find(filter, null, ls);
      break;
  }
  return query;
};

const standartDate = {
  timestamps: { createdAt: "dateCreate", updatedAt: "dateUpdate" },
  versionKey: false,
};

const forExport = {};
forExport.name = "Fonds";
forExport.collection = "duma_fonds";

forExport.schema = new mongoose.Schema(
  {
    name: { type: String },
    icon: { type: String },
    active: { type: Boolean, default: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "duma_users" },
  },
  standartDate
);

const model = mongoose.model(forExport.collection, forExport.schema);

forExport.get = {};
forExport.set = {};

forExport.get.all = async function (
  { filter = {}, sort = { _id: -1 }, limit = 20, offset = 0 },
  { _id = null, action, userInfo }
) {
  // console.log('=c69964=', filter, sort, limit, offset, _id, action)
  filter.active = true;
  if (_id) {
    const query = model.findOne({ _id });
    const result = await query.exec();
    return result;
  }
  const query = getQuery({ action, filter, ls: { limit, skip: offset } });
  if (sort) {
    query.sort(sort);
  }
  const result = await query.exec();
  return result;
};

forExport.set.all = async function (
  { insert = {}, update = {}, filter = {} },
  { _id = null, action, userInfo }
) {
  // filter.author = userInfo._id;
  if (_id) {
    action = "findOneAndUpdate";
    filter._id = _id;
  }

  if (action == "insert") {
    insert.author = userInfo._id;
    let record = new model();
    Object.assign(record, insert);
    const result = await record.save();
    return result;
  }
  if (action == "updateMany") {
    const query = model.updateMany(filter, update);
    const result = await query.exec();
    return result;
  }

  if (action == "findOneAndUpdate") {
    const query = model.findOneAndUpdate(filter, update, { new: true });
    const result = await query.exec();
    return result;
  }
};

export default forExport;
