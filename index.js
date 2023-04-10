import { CEM } from "@betarost/cemserver";
import path from "path";
import dotenv from "dotenv";
dotenv.config();


const port = 80;
const target = "duma.network";


const options = {
  port,
  hotReload: true,
  allowedHosts: [target],
  path: {
    src: path.resolve("app.js"),
    public: path.resolve("public"),
    fileName: "main.[fullhash].js",
    template: path.resolve("src/template/index.html"),
  },
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

CEM.start(options)