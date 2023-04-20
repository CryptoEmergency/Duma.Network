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
  Static.dailyCounter = 0;
  load({
    ID,
    fnLoad: async () => {
      if (!Variable.auth) {
        fn.siteLink("/");
        return;
      }
      Static.user = await fn.socket.get({
        method: "Users",
        _id: Variable.myInfo._id,
      });
      Static.projects = await fn.socket.get({
        method: "Research",
        params: {
          filter: { moderation: true },
          limit: 3,
        },
      });
      Static.news = await fn.socket.get({
        method: "News",
        params: {
          filter: { moderation: true },
          limit: 3,
        },
      });
      console.log('=b96092=',Static.news)
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
              <Elements.BlockMenu Static={Static} item={Static.user} />
              <div class="personal-main">
                <div class="personal-header">
                  <div class="circle-effect circle-effect1"></div>
                  <div class="circle-effect circle-effect2"></div>
                  <div class="user">
                    <div class="setting">
                      <input
                        type="file"
                        hidden
                        Element={($el) => {
                          Data.Static.userIcon = $el;
                        }}
                        onchange={async function (e) {
                          e.stopPropagation();
                          Array.from(this.files).forEach((item) => {
                            fn.uploadFile({
                              file: item,
                              onload: async function () {
                                if (!this.response) {
                                  alert("Have some Error. Try again...");
                                  return;
                                }
                                let response = JSON.parse(this.response);
                                if (response.error || !response.name) {
                                  alert(
                                    "Have some Error. Try again... " +
                                      response.error
                                  );
                                  return;
                                }
                                Static.user = response.name;

                                await fn.socket.set({
                                  method: "Users",
                                  action: "findOneAndUpdate",
                                  _id: Variable.myInfo._id,
                                  params: {
                                    update: { icon: Static.user },
                                  },
                                });
                                initReload();
                              },
                              onprogress: async function (e) {
                                let contentLength;
                                if (e.lengthComputable) {
                                  contentLength = e.total;
                                } else {
                                  contentLength = parseInt(
                                    e.target.getResponseHeader(
                                      "x-decompressed-content-length"
                                    ),
                                    10
                                  );
                                }
                                // console.log("onprogress", e.loaded, contentLength);
                              },
                            });
                            initReload();
                            return;
                          });
                        }}
                      />
                      <img
                        src={svg.setting}
                        onclick={() => {
                          Data.Static.userIcon.click();
                          initReload();
                        }}
                      />
                    </div>
                    <Elements.BlockPersonal
                      Static={Static}
                      item={Static.user}
                    />
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
                      {/* <Elements.BlockBoard
                        className="userBlock"
                        switcher={Static.activeQuestion}
                        key="t5"
                        textClue="Main user account information. Their account level and type, a link to verification or confirmed verification. Display of NFTs that are in staking and unlocking access. Daily platform visits and tasks."
                      >

                      </Elements.BlockBoard> */}

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
                          {/* <img src={images["personal/everyDay"]}></img> */}
                          <div class="daily-line"></div>
                          <div class="daily-item">
                            <span class="daily-circle"></span>
                            <span>mn</span>
                          </div>
                          <div class="daily-item">
                            <span class="daily-circle"></span>
                            <span>tu</span>
                          </div>
                          <div class="daily-item">
                            <span class="daily-circle"></span>
                            <span class="mt-5">we</span>
                          </div>
                          <div class="daily-item">
                            <span class="daily-circle"></span>
                            <span>th</span>
                          </div>
                          <div class="daily-item">
                            <span class="daily-circle"></span>
                            <span>fr</span>
                          </div>
                          <div class="daily-item">
                            <span class="daily-circle"></span>
                            <span>sa</span>
                          </div>
                          <div class="daily-item">
                            <span class="daily-circle"></span>
                            <span>su</span>
                          </div>
                        </div>
                        <button class="btn btn-green mt-10">daily task</button>
                      </div>

                      <Elements.BlockBoard
                        className="interesting"
                        switcher={Static.activeQuestion}
                        key="t1"
                        textCategory="News and Update"
                        textClue="Latest news and updates on the projects that the user is tracking. Updates on sales on the marketplace and changes that have occurred in the projects the user has invested in."
                        news={Static.news}
                      />

                      <Elements.Diagram 
                        switcher={Static.activeQuestion}
                        textCategory="Portfolio"
                        key="t3"
                        textClue="Displaying a pie chart of your portfolio, divided by asset type: 1. Invested and unrealized, 2. in Vesting, 3. Tokens on platform wallet, 4. For sale on Marketplace, 5. Stablecoins, 6. Non-custodial wallet balance."
                      />


                      <Elements.BlockBoard
                        className="graph"
                        switcher={Static.activeQuestion}
                        key="t2"
                        textClue="Graphic portfolio PNL. The changes in the graphical display vary depending on the right block, where you can select the asset display type. Additionally, the graphical display changes depending on the timeframe: D / W / M / 6M / 12M/ ALL."
                      />
                      
                      <div class="blocks-item refferal">
                        <span class="text-category text">Refferal earning</span>
                        <Elements.Question 
                          textClue="Referral earnings block. With key metrics of attracted users and your profit." 
                          switcher={Static.activeQuestion} 
                          key="t5" 
                        />
                        <div class="refferal-inner">
                          <div>
                            <span class="ref-sum">2811$</span>
                            <p><span class="text-green mr-15">+1500$</span>Total</p>
                            <p><span class="text-green mr-15">+89,17$</span>Per 1 day</p>
                          </div>
                          <div class="grid-2 mt-15">
                            <div class="flex-col">
                              <span class="ref-sum">41</span>
                              <span>Total refferals</span>
                            </div>
                            <div class="flex-col">
                              <span class="ref-sum">41</span>
                              <span>Confirmed</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Elements.BlockBoard
                        className="news"
                        switcher={Static.activeQuestion}
                        key="t4"
                        textCategory="Might be interesting"
                        textClue="A block displaying a list of projects or offers that may be of interest to the user, based on relevance and account type"
                        items={Static.projects}
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
