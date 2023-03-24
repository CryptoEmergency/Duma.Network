import { ServerInit, ServerBuild, ServerStart } from "@betarost/cemserver";
import { schemaMongo, connectMongo } from "./mongoose/export.js";
import { startExpress } from "./express/export.js"
import { startSocket } from "./socket/export.js"
import { runDebugger, catchError } from "./debugger/export.js";

import path from "path";
import dotenv from "dotenv";
dotenv.config();

const portApi = 9092;
const portExpress = 53535;
const target = "duma.network";

const optionInit = {
  port: 80,
  target,
  hotReload: true,
  mode: "development",
  path: {
    src: path.resolve("app.js"),
    public: path.resolve("public"),
    fileName: "main.[fullhash].js",
    template: path.resolve("src/template/index.html"),
  },
  allowedHosts: [target],
  proxy: {
    "/api/v2": {
      target: "http://127.0.0.1:" + portApi,
      ws: true
    }
  },
}

if (process.env.DISABLERELOAD) {
  optionInit.hotReload = false
  optionInit.proxy["/upload"] = {
    target: "http://127.0.0.1:" + portExpress,
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
  runDebugger()
  await schemaMongo()
  await connectMongo()
  await startExpress(portExpress)
  await startSocket(portApi)
  ServerInit(optionInit);
  ServerBuild({}).then((result) => {
    if (result) ServerStart(result);
  });
};

start();
// 24.03.2023