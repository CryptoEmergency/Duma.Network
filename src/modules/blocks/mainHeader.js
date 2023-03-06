import {
  jsx,
  jsxFrag,
  Variable,
  load,
  setStorage,
} from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
import { fn } from "@src/functions/export.js";
import images from "@assets/images/index.js";

const mainHeader = async function () {
  load({
    ID: "mainHeader",
    fn: () => {
      return (
        <div class="wrapper">
          <div class="header-inner">
            <div class="header-logo">
              <a href="https://duma.network">
                <img src={images["logo"]}></img>
              </a>
            </div>
            <nav class="header-nav">
              <ul class="header-list">
                <li class="header-list_item">PROJECTS</li>
                <li class="header-list_item">Products</li>
                <li class="header-list_item">Academy</li>
                <li class="header-list_item">About</li>
                <li class="header-list_item">Documents</li>
              </ul>
            </nav>
            <div class="header-btns">
              <button class="btn">INVEST IN PROJECT</button>
              <button class="btn">MY ACCOUNT</button>
              <button class="btn">CONNECT WALLET</button>
            </div>
            <span>EN</span>
          </div>
        </div>
      );
    },
  });
  return;
};

export { mainHeader };
