import mongoose from 'mongoose'
import schemaLists from './schema/export.js'
import actionsLists from './action/export.js'

const Api = {}
mongoose.set('strictQuery', true);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    connectTimeoutMS: 10000
}

const db = mongoose.connection;
db.on('connecting', function () {
    console.log("trying to establish a connection to mongo");
});

db.on('connected', function () {
    console.log("connection established successfully");
});

db.on('error', function (err) {
    console.log('connection to mongo failed ' + err);
});

db.on('disconnected', function () {
    console.log('mongo db connection closed');
})

db.on('open', function () {
    console.log('mongo db open');
})

const connectMongo = async function () {
    mongoose.connect('mongodb://' + process.env.MDNAME + '@' + process.env.MDSERVER + '/' + process.env.MDBASE, options).then(() => {
        console.log("Подключено к базе")
        return true
    }).catch((err) => {
        console.error("Mongo err", err)
        return false
    });
}

const methodType = ["all", "visitors", "auth", "role", "full"]

const schemaMongo = async function () {
    Object.keys(schemaLists).map((key) => {
        Api[`get${key}`] = {}
        Api[`set${key}`] = {}
        for (let type of methodType) {
            if (schemaLists[key].get[type]) {
                Api[`get${key}`][type] = schemaLists[key].get[type]
            }
            if (schemaLists[key].set && schemaLists[key].set[type]) {
                Api[`set${key}`][type] = schemaLists[key].set[type]
            }
        }
    })

    Object.keys(actionsLists).map((key) => {
        Api[key] = {}
        for (let type of methodType) {
            if (actionsLists[key][type]) {
                Api[key][type] = actionsLists[key][type]
            }
        }
    })

    return true
}

export { Api, connectMongo, schemaMongo, mongoose }