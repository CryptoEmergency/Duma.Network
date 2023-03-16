import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Variable,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.activeTab = "seed";
  load({
    ID,
    fnLoad: async () => {
      if (Variable.dataUrl.params) {
        Static.activeTab = Variable.dataUrl.params;
      }
      Static.projects = await fn.socket.get({
        method: "Projects",
        params: { filter: {} },
      });
      console.log(Static.projects);
    },
    fn: () => {
      return (
        <div class="wrapper">
          <div class="main-inner">
            <div class="crumbs" style="z-index:2; position:relative;">
              <a href="/">
                <img alt="Home" src={svg["home"]} />
              </a>
              <img class="arrow-path" alt="path" src={svg["arrowPath"]} />
              <span>Research</span>
            </div>
            <h2
              class="general-title mt-25"
              style="z-index:2; position:relative;"
            >
              Research
            </h2>

            <div class="tabs">
              <div class="circle-effect circle-effect1"></div>
              <div class="circle-effect circle-effect2"></div>
              <div
                class="tabs-controller"
                style="z-index:5; position:relative;"
              >
                <input
                  id="tab-1"
                  type="radio"
                  class={[Static.activeTab == "seed" ? "checked-input" : null]}
                  name="tab"
                />
                <label
                  for="tab-1"
                  class={[Static.activeTab == "seed" ? "checked-label" : null]}
                  style="z-index:5; position:relative;"
                  onclick={() => {
                    Static.activeTab = "seed";
                    initReload();
                  }}
                >
                  Seed
                </label>
                <input
                  id="tab-2"
                  type="radio"
                  class={[
                    Static.activeTab == "private" ? "checked-input" : null,
                  ]}
                  name="tab"
                />
                <label
                  for="tab-2"
                  class={[
                    Static.activeTab == "private" ? "checked-label" : null,
                  ]}
                  style="z-index:5; position:relative;"
                  onclick={() => {
                    Static.activeTab = "private";
                    initReload();
                  }}
                >
                  Private
                </label>
                <input
                  id="tab-3"
                  type="radio"
                  class={[
                    Static.activeTab == "public" ? "checked-input" : null,
                  ]}
                  name="tab"
                />
                <label
                  for="tab-3"
                  class={[
                    Static.activeTab == "public" ? "checked-label" : null,
                  ]}
                  style="z-index:5; position:relative;"
                  onclick={() => {
                    Static.activeTab = "public";
                    initReload();
                  }}
                >
                  Public
                </label>
                <div class="glider"></div>
              </div>

              <div
                class="tabs-content"
                hidden={Static.activeTab == "seed" ? false : true}
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
                  {Static.projects.map((item) => {
                    return (
                      <div class="card-item">
                        {/* {showMainImg(Static.projects.galery)} */}
                        {/* {Static.projects.galery.map((element) => {
                          return <img class="card-item_img" src={element} />;
                        })} */}
                        <img class="card-item_img" src={item.galery[0]} />
                        <div class="info">
                          <div class="info-bell">
                            {item.rang ? (
                              <div class="circle">{item.rang}</div>
                            ) : null}
                            <img
                              src={svg["iconsGreen/bell"]}
                              class="bell"
                            ></img>
                          </div>
                          <div class="company">
                            <img src={item.icon}></img>
                            <div class="company-title">
                              <span>{item.name}</span>
                            </div>
                          </div>
                          <div class="statuses">
                            <div class="icon">
                              <img src={svg.binance}></img>
                            </div>
                            {item.status ? (
                              <div class="status">{item.status}</div>
                            ) : null}
                            {item.category ? (
                              <div class="ecosystem">{item.category}</div>
                            ) : null}
                          </div>
                          <div class="desc">
                            <span class="desc-title">{item.title}</span>
                            <p class="desc-text">{item.description}</p>
                          </div>
                          <div class="socials">
                            {item.social.map((element) => {
                              // console.log(element.name, svg[`iconsGreen/${element.name}`]);

                              return (
                                <a target="_blank" href={element.link}>
                                  <img
                                    alt="Telegram"
                                    src={svg[`icons/${element.name}`]}
                                    class="icon-green"
                                  ></img>
                                </a>
                              );
                            })}
                          </div>
                          {item.price && item.targetPrice ? (
                            <div class="progressBlock">
                              <div
                                style={[
                                  `width: calc(100% / 100 * ${
                                    (item.price * 100) / item.targetPrice
                                  })`,
                                ]}
                                class="progressBlock-column"
                              ></div>
                            </div>
                          ) : null}

                          <span class="summ">{item.targetPrice}$</span>
                          <button class="btn">InvesT</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                class="tabs-content"
                hidden={Static.activeTab == "private" ? false : true}
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
                hidden={Static.activeTab == "public" ? false : true}
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
