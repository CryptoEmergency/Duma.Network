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
    fnLoad: () => {
      setTimeout(() => {
        fn.modals.close(ID);
      }, 2500);
    },
    fn: () => {
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div class="wrap-content" id="settingsPage">
              <div class="header-modal mb-3">
                <div class="text-center name">Notification</div>
                <button
                  class="button-close button-modal"
                  onclick={() => {
                    fn.modals.close(ID);
                  }}
                >
                  X
                </button>
              </div>
              <div class="body-modal form-wrap">
                <div class="text-center name">{data.text}</div>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default forExport;
