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

const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fn: () => {
      console.log('=e18a85=',data.sum)
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div class="wrap-content" id="settingsPage">
              
              <header class="header-modal">
                <h2 class="general-title mt-0">{data.title}</h2>
                <button
                  class="button-close button-modal"
                  onclick={() => {
                    fn.modals.close(ID);
                  }}
                >
                  X
                </button>
              </header>
              <main class="main-modal">
                <div class="personal-input text">
                  {data.text}
                </div>
              </main>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default forExport;
