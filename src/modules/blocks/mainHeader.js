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
              <a href="https://duma.network" src={images[logo]}></a>
            </div>
          </div>
        </div>
      );
    },
  });
  return;
};

export { mainHeader };
