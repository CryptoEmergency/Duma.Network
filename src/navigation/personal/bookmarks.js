import {
  jsx,
  jsxFrag,
  load,
  Data,
  Variable,
  setStorage,
  initReload,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fnLoad: async () => {
      if (!Variable.auth) {
        fn.siteLink("/");
        return;
      }
    },
    fn: () => {
      if (!Variable.auth) {
        fn.siteLink("/");
        return <div></div>;
      }
      return (
        <div class="wrapper">
          <div class="personal-inner">
            <Elements.BlockMenu />
            <div class="personal-main">
              <Elements.BlockPersonal />

              {/* main page */}
              <section class="bookmarks">
                <h2 class="general-title mt-25">Bookmarks</h2>
                <div class="bookmarks-inner">
                  <div class="bookmarks-item">
                    <div class="user-card">
                      <img src={images["personal/logoProject"]}></img>
                      <span>название</span>
                    </div>
                    <div class="round">round</div>
                    <div class="price">price token</div>
                    <div class="price">10k/100k</div>
                    <div>date tge</div>
                    <div>lead investor</div>
                    <div>category</div>
                    <div>
                      <button class="btn btn-white">more</button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
