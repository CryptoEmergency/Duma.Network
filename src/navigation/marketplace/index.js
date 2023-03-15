import { jsx, jsxFrag, load, initReload } from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.activeTab = "Seed";
  load({
    ID,
    fn: () => {
      return (
        <div class="wrapper">
          <div class="blur">
            <h2>COMING SOON</h2>
          </div>
          <div class="main-inner">
            <div class="crumbs" style="z-index:2; position:relative;">
              <a href="/">
                <img alt="Home" src={svg["home"]} />
              </a>
              <img class="arrow-path" alt="path" src={svg["arrowPath"]} />
              <span>Marketplace</span>
            </div>
            <h2
              class="general-title mt-25"
              style="z-index:2; position:relative;"
            >
              Marketplace
            </h2>

            <div class="tabs">
              <div class="circle-effect circle-effect1"></div>
              <div class="circle-effect circle-effect2"></div>
              <div class="tabs-controller">
                <input
                  id="tab-1"
                  type="radio"
                  class="tab tab-selector"
                  checked="checked"
                  name="tab"
                />
                <label
                  for="tab-1"
                  class="tab tab-primary"
                  onclick={() => {
                    Static.activeTab = "Active";
                    initReload();
                  }}
                >
                  Seed
                </label>
                <input
                  id="tab-2"
                  type="radio"
                  class="tab tab-selector"
                  name="tab"
                />
                <label
                  for="tab-2"
                  class="tab tab-success"
                  onclick={() => {
                    Static.activeTab = "Upcoming";
                    initReload();
                  }}
                >
                  Private
                </label>
                <input
                  id="tab-3"
                  type="radio"
                  class="tab tab-selector"
                  name="tab"
                />
                <label
                  for="tab-3"
                  class="tab tab-default"
                  onclick={() => {
                    Static.activeTab = "Past";
                    initReload();
                  }}
                >
                  Public
                </label>
                <div class="glider"></div>
              </div>
              <div
                class="tabs-content"
                hidden={Static.activeTab == "Seed" ? false : true}
              >
                <div class="cards">
                  <div class="card-item">
                    <img class="card-item_img" src={images["card/1"]} />
                    <div class="info">
                      <div class="info-bell">
                        <div class="circle">123</div>
                        <img src={svg["iconsGreen/bell"]} class="bell"></img>
                      </div>
                      <div class="company">
                        <img src={images.logo} alt="Duma Network"></img>
                        <div class="company-title">
                          <span>DUMA</span>
                          <span>Network</span>
                        </div>
                      </div>
                      <div class="statuses">
                        <div class="icon">
                          <img src={svg.binance}></img>
                        </div>
                        <div class="status">Active</div>
                        <div class="ecosystem">Ecosystem</div>
                      </div>
                      <div class="desc">
                        <span class="desc-title">Unite To Earn</span>
                        <p class="desc-text">
                          Is an investment ecosystem that combines a Launchpad,
                          an information resource and an academy.
                        </p>
                      </div>
                      <div class="socials">
                        <a target="_blank" href="#">
                          <img src={svg["iconsGreen/instagram"]}></img>
                        </a>
                        <a target="_blank" href="#">
                          <img src={svg["iconsGreen/facebook"]}></img>
                        </a>
                        <a target="_blank" href="#">
                          <img src={svg["iconsGreen/twitter"]}></img>
                        </a>
                        <a target="_blank" href="#">
                          <img src={svg["iconsGreen/youtube"]}></img>
                        </a>
                      </div>
                      <div class="progressBlock">
                        <div
                          style={[`width: calc(100% / 100 * 25)`]}
                          class="progressBlock-column"
                        ></div>
                      </div>
                      <span class="summ">80 000$</span>
                      <button class="btn">InvesT</button>
                    </div>
                  </div>
                  <div class="card-item">
                    <img class="card-item_img" src={images["card/1"]} />
                    <div class="info">
                      <div class="info-bell">
                        <div class="circle">123</div>
                        <img src={svg["iconsGreen/bell"]} class="bell"></img>
                      </div>
                      <div class="company">
                        <img
                          src={images["card/logo/cookie"]}
                          alt="Cookie 3"
                        ></img>
                        <div class="company-title">
                          <span>Cookie 3</span>
                        </div>
                      </div>
                      <div class="statuses">
                        <div class="icon">
                          <img src={svg.binance}></img>
                        </div>
                        <div class="status">Active</div>
                        <div class="ecosystem">Ecosystem</div>
                      </div>
                      <div class="desc">
                        <span class="desc-title">Unite To Earn</span>
                        <p class="desc-text">
                          Is an investment ecosystem that combines a Launchpad,
                          an information resource and an academy.
                        </p>
                      </div>
                      <div class="socials">
                        <a target="_blank" href="#">
                          <img src={svg["iconsGreen/instagram"]}></img>
                        </a>
                        <a target="_blank" href="#">
                          <img src={svg["iconsGreen/facebook"]}></img>
                        </a>
                        <a target="_blank" href="#">
                          <img src={svg["iconsGreen/twitter"]}></img>
                        </a>
                        <a target="_blank" href="#">
                          <img src={svg["iconsGreen/youtube"]}></img>
                        </a>
                      </div>
                      <div class="progressBlock">
                        <div
                          style={[`width: calc(100% / 100 * 75)`]}
                          class="progressBlock-column"
                        ></div>
                      </div>
                      <span class="summ">2.500.000$</span>
                      <button class="btn">InvesT</button>
                    </div>
                  </div>
                  <div class="card-item">
                    <img class="card-item_img" src={images["card/1"]} />
                    <div class="info">
                      <div class="info-bell">
                        <div class="circle">123</div>
                        <img src={svg["iconsGreen/bell"]} class="bell"></img>
                      </div>
                      <div class="company">
                        <img
                          src={images["card/logo/cookie"]}
                          alt="Cookie 3"
                        ></img>
                        <div class="company-title">
                          <span>Cookie 3</span>
                        </div>
                      </div>
                      <div class="statuses">
                        <div class="icon">
                          <img src={svg.binance}></img>
                        </div>
                        <div class="status">Active</div>
                        <div class="ecosystem">Ecosystem</div>
                      </div>
                      <div class="desc">
                        <span class="desc-title">Unite To Earn</span>
                        <p class="desc-text">
                          Is an investment ecosystem that combines a Launchpad,
                          an information resource and an academy.
                        </p>
                      </div>
                      <div class="socials">
                        <a target="_blank" href="#">
                          <img src={svg["iconsGreen/instagram"]}></img>
                        </a>
                        <a target="_blank" href="#">
                          <img src={svg["iconsGreen/facebook"]}></img>
                        </a>
                        <a target="_blank" href="#">
                          <img src={svg["iconsGreen/twitter"]}></img>
                        </a>
                        <a target="_blank" href="#">
                          <img src={svg["iconsGreen/youtube"]}></img>
                        </a>
                      </div>
                      <div class="progressBlock">
                        <div
                          style={[`width: calc(100% / 100 * 75)`]}
                          class="progressBlock-column"
                        ></div>
                      </div>
                      <span class="summ">2.500.000$</span>
                      <button class="btn">InvesT</button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tabs-content"
                hidden={Static.activeTab == "Private" ? false : true}
              >
                123
              </div>
              <div
                class="tabs-content"
                hidden={Static.activeTab == "Public" ? false : true}
              >
                5687
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
