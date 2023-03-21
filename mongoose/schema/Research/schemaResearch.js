import { mongoose } from "../../export.js";

const getQuery = function ({ action, filter, ls }) {
  let query = null
  switch (action) {
    case "findOne":
      query = model.findOne(filter)
      break;

    default:
      query = model.find(filter, null, ls)
      break;
  }
  return query
}

const standartDate = {
  timestamps: { createdAt: "dateCreate", updatedAt: "dateUpdate" },
  versionKey: false,
};

const forExport = {};
forExport.name = "Research";
forExport.collection = "duma_research";

forExport.schema = new mongoose.Schema(
  {
    name: { type: String },
    rank: { type: Number },
    status: { type: String },
    category: { type: String },
    tabs: { type: String },
    description: { type: String },
    social: [
      {
        name: { type: String },
        icon: { type: String },
        link: { type: String },
      },
    ],
    seedRound: { type: Number },
    have: { type: Number },
    target: { type: Number },
    icon: { type: String },
    gallery: [],
    partners: { type: Boolean, default: false },
    moderation: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "duma_users" },
    showDate: { type: Date, default: Date.now }
  },
  standartDate
);

const model = mongoose.model(forExport.collection, forExport.schema);

forExport.get = {};
forExport.set = {};

forExport.get.full = async function ({ filter = {} }, { _id = null, action, userInfo }) {
  filter.action = true
  if (_id) {
    const query = model.findOne({ _id });
    query.select({ password: 0 });
    const result = await query.exec();
    return result;
  }
  const query = getQuery({ action, filter });
  query.select({ password: 0 });
  const result = await query.exec();
  return result;
};

forExport.get.all = async function ({ filter = {}, sort = { _id: -1 }, limit = 20, offset = 0 }, { _id = null, action, userInfo }) {
  filter.action = true
  if (_id) {
    const query = model.findOne({ _id });
    query.select({ password: 0 });
    const result = await query.exec();
    return result;
  }
  const query = getQuery({ action, filter, ls: { limit, skip: offset } })
  if (sort) {
    query.sort(sort)
  }
  const result = await query.exec();
  return result;
};

forExport.set.full = async function (
  { insert = {} },
  { _id = null, action, userInfo }
) {
  if (action == "insert") {
    insert.author = userInfo._id;
    let record = new model();
    Object.assign(record, insert);
    const result = await record.save();
    return result;
  }
};

forExport.set.auth = async function (
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
