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
      Static.projects = await fn.socket.get({
        method: "Research",
        params: { filter: { moderation: true }, limit: 3 },
      });
    },
    fn: () => {
      if (!Variable.auth) {
        fn.siteLink("/");
        return <div></div>;
      }
      return (
        <div class="back-secondary">
          <div class="wrapper">
            <div class="personal-inner">
              <Elements.BlockMenu Static={Static} />
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
                            <div class="user-picture">
                              <img src={images["personal/user"]}></img>
                            </div>
                            <div class="user-name">
                              <span class="user-name_name">
                                {Variable.myInfo.firstName}
                                <span class="notice">5</span>
                              </span>
                              <span
                                class="text-underline"
                                onclick={() => {
                                  fn.modals.Soon({});
                                }}
                              >
                                Verify
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="user-images pt-10">
                          <img src={images["personal/1"]}></img>
                          <img src={images["personal/2"]}></img>
                          <img src={images["personal/3"]}></img>
                          <img src={images["personal/4"]}></img>
                        </div>
                        <div class="daily-progress mt-15">
                          <img src={images["personal/everyDay"]}></img>
                        </div>
                        <button class="btn btn-green mt-10">daily task</button>
                      </div>
                      <div class="blocks-item interesting">
                        <span class="text-category text">
                          You will be interested
                        </span>
                        <div class="user-icon">
                          <Elements.Question text="A block displaying a list of projects or offers that may be of interest to the user, based on relevance and account type." />
                        </div>
                        {Static.projects ? (
                          <Elements.cards.Small items={Static.projects} />
                        ) : (
                          <span class="soon-text">coming soon</span>
                        )}
                      </div>
                      <div class="blocks-item bag">
                        <span class="text-category text">Portfolio</span>
                        <div class="user-icon">
                          <img src={svg["iconsGreen/bag"]}></img>
                        </div>
                        <div class="bag-value">
                          <span class="text">Nums</span>
                          <img class="arrow arr-left" src={svg.arrowLeft}></img>
                          <div class="nums">
                            <span class="num_big">0,00</span>
                            <span class="num_small">+0$</span>
                            <span class="num_small"> +0,00%</span>
                          </div>
                          <img
                            class="arrow arr-right"
                            src={svg.arrowRight}
                          ></img>
                        </div>
                      </div>
                      <div class="blocks-item graph"></div>
                      <div class="blocks-item circle-graph"></div>
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
        </div>
      );
    },
  });
};

export default start;
