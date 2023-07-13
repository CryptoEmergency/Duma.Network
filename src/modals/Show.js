import {
  jsx,
  jsxFrag,
  load,
  Data,
  initReload,
  Variable,

} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";


const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });

  load({
    ID,
    // fnLoad: () => {},duma
    fn: () => {
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div class="wrap-content wrap-content_show">
              <header class="header-modal">
                <button
                  class="button-close button-modal"
                  onclick={() => {
                    fn.modals.close(ID);
                  }}
                >
                  X
                </button>
              </header>
              <main class="show-content">
                <img src={data.image}></img>
              </main>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default forExport;
