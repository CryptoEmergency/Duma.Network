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
                  <h2 class="general-title mt-25">Referral</h2>
                  <div class="main-blocks referral mt-20">
                    <div class="blocks-item">
                      <span class="title-block pb-15">Offer</span>
                      <div class="row-block">
                        <span>ID</span>
                        <span class="cY">
                          123234<img class="ml-10" src={svg.copy}></img>
                        </span>
                      </div>
                      <div class="row-block">
                        <span>Link</span>
                        <span class="cY">
                          12323432<img class="ml-10" src={svg.copy}></img>
                        </span>
                      </div>
                      <button class="btn btn-white mt-10">
                        invite friends
                      </button>
                      <span class="text">referral program</span>
                    </div>
                    <div class="blocks-item">
                      <span class="title-block pb-15">
                        Block of graphical display of accruals
                      </span>
                    </div>
                    <div class="blocks-item">
                      <span class="title-block pb-15">Referral accruals</span>
                      <div class="grid-3 pb-20">
                        <div>
                          <div class="nums-col">
                            <span class="num_big">0,00</span>
                            <span class="num_small">+0$</span>
                            <span class="num_small"> +0,00%</span>
                          </div>
                          <button class="btn btn-white">more</button>
                        </div>
                        <div class="ref-general">
                          <span class="num_big">1280</span>
                          <span>Total number of referrals</span>
                        </div>
                        <img src={images["personal/circleGraph"]}></img>
                      </div>
                      <div class="block-table">
                        <div class="block-table_row subtitle">
                          <span>№</span>
                          <span>%</span>
                          <span>E-mail</span>
                          <span>Projects</span>
                          <span>Average amount</span>
                          <span>Total amount</span>
                          <span>Referral</span>
                        </div>
                        <div class="block-table_row">
                          <span>1</span>
                          <span>15%</span>
                          <span>person2@ya.ru</span>
                          <span>123</span>
                          <span>344$</span>
                          <span>1500$</span>
                          <span>1234</span>
                        </div>
                        <div class="block-table_row">
                          <span>2</span>
                          <span>1%</span>
                          <span>person1@mail.com</span>
                          <span>123</span>
                          <span>244$</span>
                          <span>1500$</span>
                          <span>1234</span>
                        </div>
                        <div class="block-table_row">
                          <span>3</span>
                          <span>12%</span>
                          <span>person2@ya.ru</span>
                          <span>123</span>
                          <span>230$</span>
                          <span>1500$</span>
                          <span>123</span>
                        </div>
                        <div class="block-table_row">
                          <span>4</span>
                          <span>14%</span>
                          <span>person1@mail.com</span>
                          <span>123</span>
                          <span>235$</span>
                          <span>1454$</span>
                          <span>123</span>
                        </div>
                      </div>
                    </div>
                    <div class="blocks-item platform">
                      <div class="blur">
                        <h2>coming soon</h2>
                      </div>
                      <span class="title-block">
                        Closed sections of the platform that can be opened for
                        referral accruals
                      </span>
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
