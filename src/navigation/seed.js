import {
  jsx,
  jsxFrag,
  setStorage,
  Variable,
  load,
  initReload,
  Data,
} from "@betarost/cemserver/cem.js";
import Swiper from "swiper";
import "swiper/css";
import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.activeTab = "Active";

  load({
    ID,
    fn: () => {
      return (
        <div class="wrapper">
          <div class="main-inner">
            <div class="crumbs">
              <a href="/">
                <img alt="Home" src={svg["home"]} />
              </a>
              <img class="arrow-path" alt="path" src={svg["arrowPath"]} />
              <span>Seed Round</span>
            </div>
            <h2 class="general-title mt-25">Seed Round</h2>
            <div class="tabs">
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
                  Active
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
                  Upcoming
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
                  Past
                </label>
                <div class="glider"></div>
              </div>
              <div
                class="tabs-content"
                hidden={Static.activeTab == "Active" ? false : true}
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
                </div>
              </div>
              <div
                class="tabs-content"
                hidden={Static.activeTab == "Upcoming" ? false : true}
              >
                123
              </div>
              <div
                class="tabs-content"
                hidden={Static.activeTab == "Past" ? false : true}
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
