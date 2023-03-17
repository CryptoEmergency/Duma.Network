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
                        <span class="num_big">0,00</span>
                        <span class="num_small">+0$</span>
                        <span class="num_small"> +0,00%</span>
                      </div>
                      <img src={images["personal/circleGraph"]}></img>
                      <button class="btn btn-white mt-10">More</button>
                    </div>
                    <div class="blocks-item">
                      <span class="title-block pb-10">Profitability</span>
                      <img src={images["personal/grafikWallet"]}></img>
                      <div class="grid-2">
                        <div>
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
                      <span class="title-block pb-15">Released projects</span>
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
