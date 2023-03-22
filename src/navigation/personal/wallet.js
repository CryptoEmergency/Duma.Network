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
                      <div class="bag-value">
                        <span class="text">Nums</span>
                        <img class="arrow arr-left" src={svg.arrowLeft}></img>
                        <div class="nums">
                          <span class="num_big">0,00</span>
                          <span class="num_small">+0$</span>
                          <span class="num_small"> +0,00%</span>
                        </div>
                        <img class="arrow arr-right" src={svg.arrowRight}></img>
                      </div>
                      <div class="wallet-btns">
                        <button class="btn btn-white">Invest</button>
                        <button class="btn btn-white">Buy</button>
                        <button class="btn btn-white">ПРОДАТЬ</button>
                        <button class="btn btn-white">ВВОД</button>
                        <button class="btn btn-white">ВЫВОД</button>
                        <button class="btn btn-white">ОБМЕН</button>
                      </div>
                    </div>
                    <div class="blocks-item reward">
                      <div class="reward-inner">
                        <div class="row-block block-title">
                          <span>Reward</span>
                          <span class="text-green">15,530$ (+4,17%)</span>
                        </div>
                        <div class="row-block">
                          <span>Refs</span>
                          <span class="text-green">
                            +1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                        <div class="row-block">
                          <span>Tokens that come by distribution</span>
                          <span class="text-green">
                            +1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                        <div class="row-block">
                          <span>Passive income</span>
                          <span class="text-green">
                            +1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                        <div class="row-block">
                          <span>Staking accruals</span>
                          <span class="text-green">
                            +1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                        <div class="row-block">
                          <span>Profit</span>
                          <span class="text-green">
                            +1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="blocks-item lock">
                      <div class="reward-inner">
                        <div class="row-block block-title">
                          <span>Lock </span>
                          <span class="text-red">15,530$</span>
                        </div>
                        <div class="row-block">
                          <span>Blocked money in projects</span>
                          <span class="text-red">
                            1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                        <div class="row-block">
                          <span>Lock in Staking</span>
                          <span class="text-red">
                            1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                        <div class="row-block">
                          <span>Marketplace offers</span>
                          <span class="text-red">
                            1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                        <div class="row-block">
                          <span>Orders on the platform</span>
                          <span class="text-red">
                            1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
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
