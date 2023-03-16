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
                    <div class="blocks-item wallet">
                      <div class="nums">
                        <span class="num_big">17,805</span>
                        <span class="num_small">+1,500$</span>
                        <span class="num_small"> +4,17%</span>
                      </div>
                      <div class="wallet-btns">
                        <button class="btn btn-white">ИНВЕСТИРОВАТЬ</button>
                        <button class="btn btn-white">КУПИТЬ</button>
                        <button class="btn btn-white">ПРОДАТЬ</button>
                        <button class="btn btn-white">ВВОД</button>
                        <button class="btn btn-white">ВЫВОД</button>
                        <button class="btn btn-white">ОБМЕН</button>
                      </div>
                    </div>
                    <div class="blocks-item reward">
                      <div class="reward-col">
                        <span>Reward</span>
                        <span>рефки</span>
                        <span>токены которые приходят дистрибьюцией</span>
                        <span>пассивный доход</span>
                        <span>начисления стейкинга</span>
                        <span>ЛП начисления</span>
                      </div>
                      <div class="reward-col">
                        <span
                          class="text-green"
                          style="justify-content:flex-end;display:flex;"
                        >
                          15,530$ (+4,17%)
                        </span>
                        <span
                          class="text-green"
                          style="justify-content:flex-end;display:flex;"
                        >
                          +1,500$
                        </span>
                        <span
                          class="text-green"
                          style="justify-content:flex-end;display:flex;"
                        >
                          +1,500$
                        </span>
                        <span
                          class="text-green"
                          style="justify-content:flex-end;display:flex;"
                        >
                          +1,500$
                        </span>
                        <span
                          class="text-green"
                          style="justify-content:flex-end;display:flex;"
                        >
                          +1,500$
                        </span>
                        <span
                          class="text-green"
                          style="justify-content:flex-end;display:flex;"
                        >
                          +1,500$
                        </span>
                      </div>
                    </div>
                    <div class="blocks-item lock">
                      <div class="lock-col">
                        <span>Reward</span>
                        <span>рефки</span>
                        <span>токены которые приходят дистрибьюцией</span>
                        <span>пассивный доход</span>
                        <span>начисления стейкинга</span>
                        <span>ЛП начисления</span>
                      </div>
                      <div class="lock-col">
                        <span
                          class="text-red"
                          style="justify-content:flex-end;display:flex;"
                        >
                          15,530$
                        </span>
                        <span
                          class="text-red"
                          style="justify-content:flex-end;display:flex;"
                        >
                          +1,500$
                        </span>
                        <span
                          class="text-red"
                          style="justify-content:flex-end;display:flex;"
                        >
                          +1,500$
                        </span>
                        <span
                          class="text-red"
                          style="justify-content:flex-end;display:flex;"
                        >
                          +1,500$
                        </span>
                        <span
                          class="text-red"
                          style="justify-content:flex-end;display:flex;"
                        >
                          +1,500$
                        </span>
                        <span
                          class="text-red"
                          style="justify-content:flex-end;display:flex;"
                        >
                          +1,500$
                        </span>
                      </div>
                    </div>
                    <div class="blocks-item news">
                      <span class="text-category text">NFT</span>
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
