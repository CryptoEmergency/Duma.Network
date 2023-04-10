import { ServerInit, ServerBuild, ServerStart } from "@betarost/cemserver";
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
  watch: true,
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
      target: `https://${target}`,
      secure: false,
      ws: true,
      changeOrigin: true,
    },
    "/assets/upload": {
      target: `https://${target}`,
      changeOrigin: true,
      secure: false,
    },
    "/upload": {
      target: `https://${target}`,
      changeOrigin: true,
      secure: false,
    },
  },
}

if (process.env.DISABLERELOAD) {
  optionInit.hotReload = false
}

const start = async function () {
  ServerInit(optionInit);
  ServerBuild({}).then((result) => {
    if (result) ServerStart(result);
  });
};

start();