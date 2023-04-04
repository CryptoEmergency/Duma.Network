import { mongoose, Api } from "../../export.js";

let preFind = {
  start: false,
  userId: null,
};
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
forExport.name = "Research";
forExport.collection = "duma_research";

forExport.schema = new mongoose.Schema(
  {
    name: { type: String },
    rank: { type: Number, default: 0 },
    test: { type: String },
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
      utility: { type: Number, default: 0 },
      totalText: { type: Number, default: 0 },
      roadmap: { type: Number, default: 0 },
      tokenomics: { type: Number, default: 0 },
      team: { type: Number, default: 0 },
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
    utility: {
      token: { type: String },
      capture: { type: String },
      accural: { type: String },
    },
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
    roadmap: {
      image: { type: String },
      text: { type: String },
      link: { type: String },
    },
    tokenomics: {
      image: { type: String },
      text: { type: String },
    },
    team: {
      text: { type: String },
      link: { type: String },
      records: [
        {
          fio: { type: String },
          link: { type: String },
          image: { type: String },
        },
      ],
    },
    fonds: [{ type: mongoose.Schema.Types.ObjectId, ref: "duma_fonds" }],
    partners: { type: Boolean, default: false },
    moderation: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    bookmarks: { type: Boolean, default: false },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "duma_users" },
    showDate: { type: Date, default: Date.now },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  standartDate
);

// forExport.schema.post("init", async function (doc) {
//   doc.bookmarks = false;
//   if (preFind?.userId) {
//     console.log("=f6d68a=", "Startt pre init ", preFind?.userId);
//     doc.bookmarks = true;
//     let tmp = await Api.getBookmarks.all(
//       { filter: { projectId: doc._id } },
//       { userInfo: { _id: preFind?.userId } }
//     );

//     if (tmp && tmp.length) {
//       doc.test = "555555";
//       doc.bookmarks = true;
//     }
//     console.log("=e8b364=", tmp);
//   }
//   // console.log(doc._id, doc.name, doc.$locals);
// });

// forExport.schema.virtual("checkBook").get(async function (userID) {
//   console.log("=3b064c=", userID, this);
//   return this;
//   // return this.email.slice(this.email.indexOf('@') + 1);
// });

// forExport.schema.methods.checkBook = function (userID, cb) {
//   console.log("=3b064c=", userID, this);
//   return;
//   return mongoose.model("Animal").find({ type: this.type }, cb);
// };

// forExport.schema.method("checkBook", function checkBook() {
//   console.log("=3b064c=", userID, this);
//   return;
//   return this.firstName + " " + this.lastName;
// });

const model = mongoose.model(forExport.collection, forExport.schema);

// model.checkBook = function (userID, cb) {
//   console.log("=3b064c=", userID, this);
//   return;
//   return mongoose.model("Animal").find({ type: this.type }, cb);
// };

forExport.get = {};
forExport.set = {};

forExport.get.full = async function (
  { filter = {} },
  { _id = null, action, userInfo }
) {
  preFind = {};

  filter.action = true;
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

forExport.get.all = async function (
  { filter = {}, sort = { _id: -1 }, limit = 20, offset = 0, populate },
  { _id = null, action, userInfo }
) {
  // console.log('=c69964=', filter, sort, limit, offset, _id, action)
  preFind = {
    start: true,
    userId: userInfo._id,
  };
  filter.action = true;
  if (_id) {
    const query = model.findOne({ _id });
    if (populate) {
      query.populate(populate);
    }
    query.select({ password: 0 });
    const result = await query.exec();
    if (userInfo?._id && result?._id) {
      result.bookmarks = false;
      let tmp = await Api.getBookmarks.all(
        { filter: { projectId: result._id } },
        { userInfo }
      );
      if (tmp && tmp.length) {
        result.bookmarks = true;
      }
    }
    return result;
  }
  const query = getQuery({ action, filter, ls: { limit, skip: offset } });
  if (populate) {
    query.populate(populate);
  }
  if (sort) {
    query.sort(sort);
  }

  const result = await query.exec();

  if (userInfo?._id) {
    for (let item of result) {
      item.bookmarks = false;
      let tmp = await Api.getBookmarks.all(
        { filter: { projectId: item._id } },
        { userInfo }
      );
      if (tmp && tmp.length) {
        item.bookmarks = true;
      }
    }
  }
  return result;
};

forExport.set.full = async function (
  { insert = {} },
  { _id = null, action, userInfo }
) {
  preFind = {};
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
  preFind = {};
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
