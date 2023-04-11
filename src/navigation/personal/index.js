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
  Static.activeQuestion = {};
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
                <div class="personal-header">
                  <div class="circle-effect circle-effect1"></div>
                  <div class="circle-effect circle-effect2"></div>
                  <div class="user">
                    <Elements.BlockPersonal />
                    <span
                      class="upgrade"
                      onclick={() => {
                        fn.modals.Soon({});
                      }}
                    >
                      upgrade
                    </span>
                  </div>
                </div>

                <div class="personal-content">
                  {/* main page */}
                  <section class="main mb-25  ">
                    <h2 class="general-title mt-25">Dashboard</h2>
                    <div class="main-blocks mt-20">
                      <Elements.BlockBoard
                        switcher={Static.activeQuestion}
                        key="t5"
                        textClue="Main user account information. Their account level and type, a link to verification or confirmed verification. Display of NFTs that are in staking and unlocking access. Daily platform visits and tasks."
                      >
                        <Elements.BlockPersonal />
                      </Elements.BlockBoard>

                      {/* <div class="blocks-item user-profile">
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
                      </div> */}

                      <Elements.BlockBoard
                        className="interesting"
                        switcher={Static.activeQuestion}
                        key="t1"
                        textCategory="Might be interesting"
                        textClue="A block displaying a list of projects or offers that may be of interest to the user, based on relevance and account type."
                        items={Static.projects}
                      />

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
                      <Elements.BlockBoard
                        className="graph"
                        switcher={Static.activeQuestion}
                        key="t2"
                        textClue="Graphic portfolio PNL. The changes in the graphical display vary depending on the right block, where you can select the asset display type. Additionally, the graphical display changes depending on the timeframe: D / W / M / 6M / 12M/ ALL."
                      />
                      <Elements.BlockBoard
                        className="circle-graph"
                        switcher={Static.activeQuestion}
                        key="t3"
                        textClue="Displaying a pie chart of your portfolio, divided by asset type: 1. Invested and unrealized, 2. in Vesting, 3. Tokens on platform wallet, 4. For sale on Marketplace, 5. Stablecoins, 6. Non-custodial wallet balance."
                      />
                      <Elements.BlockBoard
                        className="news"
                        switcher={Static.activeQuestion}
                        key="t4"
                        textCategory="News and Updates"
                        textClue="Latest news and updates on the projects that the user is tracking. Updates on sales on the marketplace and changes that have occurred in the projects the user has invested in."
                      />
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
