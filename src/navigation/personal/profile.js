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
                  <h2 class="general-title mt-25">Profile</h2>
                  <div class="main-blocks mt-20 profile">
                    <div class="blocks-item">
                      <span>Personal data</span>
                      <div class="profile-inner">
                        <div>
                          <div class="user-card mt-15">
                            <img src={images["personal/user"]}></img>
                            <div class="user-name">
                              <span class="user-name_name">
                                {Variable.myInfo.firstName}
                                <span class="notice">5</span>
                              </span>
                              <span class="text">Name Surname</span>
                            </div>
                          </div>
                          <div class="userDate mt-10">
                            <span>{Variable.myInfo.email}</span>
                            <span>pipe number</span>
                            <span>security check</span>
                            <span>KYC</span>
                          </div>
                          <button class="btn btn-white mt-10">
                            change password
                          </button>
                        </div>
                        <div class="dailyReward">
                          <span>Daily Reward</span>
                          <div class="nums">
                            <span class="num_big">0,00</span>
                          </div>
                          <img
                            class="mb-20"
                            src={images["personal/profileDaily"]}
                          ></img>
                          <button class="btn btn-green">Daily Reward</button>
                        </div>
                        <div class="recentLogins">
                          <span>Recent logins</span>
                          <div class="recentLogins-inner">
                            <div class="recentLogins-item">
                              <span>ip</span>
                              <span>date</span>
                              <span>other data</span>
                            </div>
                            <div class="recentLogins-item">
                              <span>ip</span>
                              <span>date</span>
                              <span>other data</span>
                            </div>
                            <div class="recentLogins-item">
                              <span>ip</span>
                              <span>date</span>
                              <span>other data</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="blocks-item wallets">
                      <div class="blur">
                        <h2>coming soon</h2>
                      </div>
                      <span class="title-block">
                        Block with connection of a non-custodial wallet
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
