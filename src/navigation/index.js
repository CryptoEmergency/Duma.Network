import {
  jsx,
  jsxFrag,
  setStorage,
  Variable,
  load,
  Data,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });

  load({
    ID,
    fn: () => {
      return (
        <div class="wrap">
          123
        </div>
      );
    },
  });
};

export default start;
