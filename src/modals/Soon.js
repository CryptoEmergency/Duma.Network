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
  let [Static] = fn.GetParams({ data, ID, initData: "registration" });
  load({
    ID,
    fnLoad() {
      setTimeout(() => {
        fn.modals.close(ID);
      }, 1500);
    },
    fn: () => {
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div
              class="wrap-content"
              id="settingsPage"
              style="background: rgba(48, 52, 55, 0.5)"
            >
              <div class="blur">
                <h2 class="general-title mt-0">Coming soon</h2>
              </div>
              <header class="header-modal"></header>
              {/* <div class="blur">
                <h2>Coming soon</h2> */}
              <main class="main-modal">
                <div class="form-item">
                  <label for="email" class="form-label">
                    xxxxx :
                  </label>
                  <input
                    class="form-input"
                    type="email"
                    placeholder="email@xyz.com"
                  ></input>
                </div>
                <div class="form-item">
                  <label for="password" class="form-label">
                    xxxxxxxx :
                  </label>
                  <input
                    class="form-input"
                    type="password"
                    placeholder="xxxxxxxxxx"
                  ></input>
                </div>
              </main>
              <footer class="footer-modal">
                <button class="btn btn-modal">LOG IN</button>
              </footer>
              {/* </div> */}
            </div>
          </div>
        </div>
      );
    },
  });
};

export default forExport;
