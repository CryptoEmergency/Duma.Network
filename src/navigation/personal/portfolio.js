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
                  <h2 class="general-title mt-25">Portfolio</h2>
                  <div class="main-blocks portfolio mt-20">
                    <div class="blocks-item">
                      <span class="title-block pb-10">Capitalization</span>
                      <div class="nums">
                        <span class="num_big">{Variable.myInfo.balance.toFixed(2)}$</span>
                        <span class="num_small">+0$</span>
                        <span class="num_small"> +0,00%</span>
                      </div>
                      <Elements.Diagram 
                        className="clear-block"
                        switcher={Static.activeQuestion}
                        textCategory="Portfolio"
                        key="t3"
                        textClue="Displaying a pie chart of your portfolio, divided by asset type: 1. Invested and unrealized, 2. in Vesting, 3. Tokens on platform wallet, 4. For sale on Marketplace, 5. Stablecoins, 6. Non-custodial wallet balance."
                      />
                      <button class="btn btn-white mt-10">More</button>
                    </div>
                    <div class="blocks-item">
                      <span class="title-block">Profitability</span>
                      <img src={images["personal/grafikWallet"]}></img>
                      <div class="grid-2">
                        <div>
                          <div class="blocks-item_check">
                            <span>Venture investments</span>
                            <div class="checkbox">
                              <input
                                id="checkbox-1"
                                type="checkbox"
                                checked
                              ></input>
                              <label for="checkbox-1">
                                <img class="icon-done" src={svg.done}></img>
                              </label>
                            </div>
                          </div>
                          <span class="text-green">+1,500$ +4,17%</span>
                          <div class="row-block">
                            <span>Sale</span>
                            <span class="text-green">+1,500$</span>
                          </div>
                          <div class="row-block">
                            <span>Buy</span>
                            <span class="text-red">-1,500$</span>
                          </div>
                          <div class="row-block">
                            <span>Input</span>
                            <span class="text-green">+1,500$</span>
                          </div>
                          <div class="row-block">
                            <span>Output</span>
                            <span class="text-red">-1,500$</span>
                          </div>
                          <button class="btn btn-white mt-10">More</button>
                        </div>
                        <div>
                          <div class="blocks-item_check">
                            <span>Marketplace</span>
                            <div class="checkbox">
                              <input
                                id="checkbox-1"
                                type="checkbox"
                                checked
                              ></input>
                              <label for="checkbox-1">
                                <img class="icon-done" src={svg.done}></img>
                              </label>
                            </div>
                          </div>
                          <span class="text-green">+1,500$ +4,17%</span>
                          <div class="row-block">
                            <span>Sale</span>
                            <span class="text-green">+1,500$</span>
                          </div>
                          <div class="row-block">
                            <span>Buy</span>
                            <span class="text-red">-1,500$</span>
                          </div>
                          <div class="row-block">
                            <span>Input</span>
                            <span class="text-green">+1,500$</span>
                          </div>
                          <div class="row-block">
                            <span>Output</span>
                            <span class="text-red">-1,500$</span>
                          </div>
                          <button class="btn btn-white mt-10">More</button>
                        </div>
                        <div>
                          <div class="blocks-item_check">
                            <span>Exchange portfolio</span>
                            <div class="checkbox">
                              <input
                                id="checkbox-1"
                                type="checkbox"
                                checked
                              ></input>
                              <label for="checkbox-1">
                                <img class="icon-done" src={svg.done}></img>
                              </label>
                            </div>
                          </div>
                          <span class="text-green">+1,500$ +4,17%</span>
                          <div class="row-block">
                            <span>Sale</span>
                            <span class="text-green">+1,500$</span>
                          </div>
                          <div class="row-block">
                            <span>Buy</span>
                            <span class="text-red">-1,500$</span>
                          </div>
                          <div class="row-block">
                            <span>Input</span>
                            <span class="text-green">+1,500$</span>
                          </div>
                          <div class="row-block">
                            <span>Output</span>
                            <span class="text-red">-1,500$</span>
                          </div>
                          <button class="btn btn-white mt-10">More</button>
                        </div>
                        <div>
                          <div class="blocks-item_check">
                            <span>Non-custodial wallet</span>
                            <div class="checkbox">
                              <input
                                id="checkbox-1"
                                type="checkbox"
                                checked
                              ></input>
                              <label for="checkbox-1">
                                <img class="icon-done" src={svg.done}></img>
                              </label>
                            </div>
                          </div>
                          <span class="text-green">+1,500$ +4,17%</span>
                          <div class="row-block">
                            <span>Sale</span>
                            <span class="text-green">+1,500$</span>
                          </div>
                          <div class="row-block">
                            <span>Buy</span>
                            <span class="text-red">-1,500$</span>
                          </div>
                          <div class="row-block">
                            <span>Input</span>
                            <span class="text-green">+1,500$</span>
                          </div>
                          <div class="row-block">
                            <span>Output</span>
                            <span class="text-red">-1,500$</span>
                          </div>
                          <button class="btn btn-white mt-10">More</button>
                        </div>
                      </div>
                    </div>
                    <div class="blocks-item">
                      <span class="title-block pb-10">History</span>
                      <div class="row-block">
                        <span>Sale</span>
                        <span class="text-green">+1,500$</span>
                      </div>
                      <div class="row-block">
                        <span>Buy</span>
                        <span class="text-red">-1,500$</span>
                      </div>
                      <div class="row-block">
                        <span>Input</span>
                        <span class="text-green">+1,500$</span>
                      </div>
                      <div class="row-block">
                        <span>Output</span>
                        <span class="text-red">-1,500$</span>
                      </div>
                    </div>
                    <div class="blocks-item">
                      <span class="title-block pb-15">
                        Released projects <span class="add">+</span>
                      </span>
                      <div class="project-wrap">
                        <div class="block-project">
                          <div class="user-card">
                            <img src={images["personal/logoProject"]}></img>
                            <span class="project-logo">unknown</span>
                          </div>
                          <div class="project-info pt-10">
                            <span>Token price</span>
                            <span>Purchase amount</span>
                            <span>Commission</span>
                            <span>Tokens</span>
                            <span>TGE date</span>
                          </div>
                        </div>
                        <div class="block-project">
                          <div class="user-card">
                            <img src={images["personal/logoProject"]}></img>
                            <span class="project-logo">unknown</span>
                          </div>
                          <div class="project-info pt-10">
                            <span>Token price</span>
                            <span>Purchase amount</span>
                            <span>Commission</span>
                            <span>Tokens</span>
                            <span>TGE date</span>
                          </div>
                        </div>
                      </div>

                      <span class="title-block pb-15 pt-15">
                        Unreleased projects
                        <span class="add">+</span>
                      </span>
                      <div class="project-wrap">
                        <div class="block-project">
                          <div class="user-card">
                            <img src={images["personal/logoProject"]}></img>
                            <span class="project-logo">unknown</span>
                          </div>
                          <div class="project-info pt-10">
                            <span>Token price</span>
                            <span>Purchase amount</span>
                            <span>Commission</span>
                            <span>Tokens</span>
                            <span>TGE date</span>
                          </div>
                        </div>
                      </div>
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
