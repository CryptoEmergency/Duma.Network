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
              <div class="personal-content">
                {/* main page */}
                <section class="main mb-25  ">
                  <h2 class="general-title mt-25">Wallet</h2>
                  <div class="main-blocks mt-20">
                    <div class="blocks-item interesting">
                      <span class="text-category text">
                        Вам будет интересно
                      </span>
                      <span class="soon-text">coming soon</span>
                    </div>
                    <div class="blocks-item wallet">
                      <div class="user-icon">
                        <img src={svg["iconsGreen/bag"]}></img>
                      </div>
                      <div class="nums">
                        <span class="num_big">17,805</span>
                        <span class="num_small">+1,500$</span>
                        <span class="num_small"> +4,17%</span>
                      </div>
                      <button class="btn btn-white">ИНВЕСТИРОВАТЬ</button>
                      <button class="btn btn-white">КУПИТЬ</button>
                      <button class="btn btn-white">ПРОДАТЬ</button>
                      <button class="btn btn-white">ВВОД</button>
                      <button class="btn btn-white">ВЫВОД</button>
                      <button class="btn btn-white">ОБМЕН</button>
                    </div>
                    <div class="blocks-item"></div>
                    <div class="blocks-item news">
                      <span class="text-category text">
                        Вам будет интересно
                      </span>
                      <span class="soon-text">coming soon</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
