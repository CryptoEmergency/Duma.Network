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
    rank: { type: Number, default: 0 },
    rankList: {
      problem: { type: Number, default: 0 },
      product: { type: Number, default: 0 },
      solution: { type: Number, default: 0 },
      investors: { type: Number, default: 0 },
      documentation: { type: Number, default: 0 },
      social: { type: Number, default: 0 },
      launchpad: { type: Number, default: 0 },
      cexDex: { type: Number, default: 0 },
      aggregator: { type: Number, default: 0 },
      competitors: { type: Number, default: 0 },
      mediaText: { type: Number, default: 0 },
      audit: { type: Number, default: 0 },
      totalText: { type: Number, default: 0 },
    },
    status: { type: String },
    category: { type: String },
    tabs: { type: String },
    description: { type: String },
    socials: [
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
    problem: { type: String },
    product: { type: String },
    solution: { type: String },
    investors: { type: String },
    documentation: { type: String },
    social: { type: String },
    launchpad: { type: String },
    cexDex: { type: String },
    aggregator: { type: String },
    competitors: { type: String },
    mediaText: { type: String },
    audit: { type: String },
    totalText: { type: String },
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