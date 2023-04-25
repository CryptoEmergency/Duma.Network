import {
  jsx,
  jsxFrag,
  load,
  Data,
  Variable,
  initReload,
  setStorage
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";




const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  setStorage("ref", Variable.dataUrl.params);

  load({
    ID,
    fn: () => {
      fn.siteLink('/');
      return (
        <div
          class={[
            "back-market",
            "main-back"
           
          ]}
        >
          <div class="wrapper">
            {Variable.dataUrl.params}
          </div>
        </div>
      );
    },
  });
};

export default start;
