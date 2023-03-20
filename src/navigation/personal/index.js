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
                  <h2 class="general-title mt-25">Dashboard</h2>
                  <div class="main-blocks mt-20">
                    <div class="blocks-item user-profile">
                      <div class="user-icon">
                        <img src={svg["iconsGreen/user"]}></img>
                      </div>
                      <div class="user">
                        <div class="user-card">
                          <img src={images["personal/user"]}></img>
                          <div class="user-name">
                            <span class="user-name_name">
                              {Variable.myInfo.firstName}
                              <span class="notice">5</span>
                            </span>
                            <span class="user-name_wel">Verify</span>
                          </div>
                        </div>
                      </div>
                      <div class="user-images pt-10">
                        <img src={images["personal/1"]}></img>
                        <img src={images["personal/2"]}></img>
                        <img src={images["personal/3"]}></img>
                        <img src={images["personal/4"]}></img>
                      </div>
                      <div class="daily-progress"></div>
                      <button class="btn btn-green mt-10">daily task</button>
                    </div>
                    <div class="blocks-item interesting">
                      <span class="text-category text">
                        You will be interested
                      </span>
                      <span class="soon-text">coming soon</span>
                    </div>
                    <div class="blocks-item bag">
                      <div class="user-icon">
                        <img src={svg["iconsGreen/bag"]}></img>
                      </div>
                      <div class="nums">
                        <span class="num_big">0,00</span>
                        <span class="num_small">+0$</span>
                        <span class="num_small"> +0,00%</span>
                      </div>
                    </div>
                    <div class="blocks-item graph">
                      <div class="blur">
                        <h2>coming soon</h2>
                      </div>
                      {/* <img src={images["personal/grafik"]}></img> */}
                    </div>
                    <div class="blocks-item circle-graph">
                      <div class="blur">
                        <h2>coming soon</h2>
                      </div>
                      {/* <img src={images["personal/circleGraph"]}></img> */}
                    </div>
                    <div class="blocks-item news">
                      <span class="text-category text">News</span>
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
