import { ServerInit, ServerBuild, ServerStart } from "@betarost/cemserver";
import { schemaMongo, connectMongo } from "./mongoose/export.js";
import { startSocket } from "./socket/export.js"
import { startExpress } from "./express/export.js"
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const port = 80;
const portApi = 9092;
let hotReload = true;
const target = "duma.network";
const mode = "development";

const optionInit = {
  target,
  hotReload,
  path: {
    src: path.resolve("app.js"),
    public: path.resolve("public"),
    fileName: "main.[fullhash].js",
    template: path.resolve("src/template/index.html"),
  },
  port,
  mode,
  allowedHosts: ["duma.cryptodev.store", target],
  proxy: {
    "/api/v2": {
      target: "http://127.0.0.1:" + portApi,
      // pathRewrite: { "^/api": "" },
      ws: true
    }
  },
}

if (process.env.DISABLERELOAD) {
  hotReload = false;
  optionInit.proxy["/upload"] = {
    target: "http://127.0.0.1:53535",
    changeOrigin: true,
    secure: false,
  }
} else {
  optionInit.proxy["/upload"] = {
    target: `https://${target}`,
    changeOrigin: true,
    secure: false,
  }
  optionInit.proxy["/assets/upload"] = {
    target: `https://${target}`,
    changeOrigin: true,
    secure: false,
  }
}

const start = async function () {
  await schemaMongo()
  await connectMongo()
  await startExpress(53535)
  await startSocket(portApi)
  ServerInit(optionInit);
  ServerBuild({}).then((result) => {
    if (result) ServerStart(result);
  });
};

start();