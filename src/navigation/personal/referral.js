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
                        <span>123234</span>
                      </div>
                      <div class="row-block">
                        <span>Link</span>
                        <span>12323432</span>
                      </div>
                      <button class="btn btn-white mt-10">
                        invite friends
                      </button>
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
                          <div class="nums">
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
                          <span>Registered</span>
                          <span>Invested</span>
                          <span>Average investment amount</span>
                          <span>Total investment amount</span>
                          <span>The total amount of referral</span>
                        </div>
                        <div class="block-table_row">
                          <span>1</span>
                          <span>1%</span>
                          <span>123</span>
                          <span>-</span>
                          <span>2344</span>
                          <span>1500</span>
                          <span>1234</span>
                        </div>
                        <div class="block-table_row">
                          <span>2</span>
                          <span>1%</span>
                          <span>123</span>
                          <span>-</span>
                          <span>2344</span>
                          <span>1500</span>
                          <span>1234</span>
                        </div>
                        <div class="block-table_row">
                          <span>3</span>
                          <span>1%</span>
                          <span>123</span>
                          <span>-</span>
                          <span>2344</span>
                          <span>1500</span>
                          <span>1234</span>
                        </div>
                      </div>
                    </div>
                    {/* <div class="blocks-item">
                      <span class="text-category text">
                        You will be interested
                      </span>
                    </div> */}
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
