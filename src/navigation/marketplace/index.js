import {
  jsx,
  jsxFrag,
  load,
  Variable,
  initReload,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.activeTabM = "all";
  // Static.tabWidth = 0;
  load({
    ID,
    fnLoad: async () => {
      if (Variable.dataUrl.params) {
        Static.activeTabM = Variable.dataUrl.params;
      }
      Static.records = await fn.socket.get({
        method: "Marketplace",
        params: {
          filter: { moderation: true },
          limit: 20,
          populate: {
            path: "projectId",
          },
        },
      });
      Static.slides = await fn.socket.get({
        method: "Marketplace",
        params: {
          filter: { moderation: true },
          limit: 3,
          populate: { path: "projectId" },
        },
      });
      Static.projects = await fn.socket.get({
        method: "Research",
        params: { filter: { moderation: true }, limit: 5 },
      });
      console.log("=6bfe4a=", Static.records);
    },
    fn: () => {
      return (
        <div class="back-market main-back">
          <div class="wrapper">
            <div class="main-inner">
              <Elements.Bredcrumbs
                items={[{ title: "Marketplace", link: "/marketplace" }]}
              />

              <div class="slider-mCards">
                {Static.slides.map((item, index) => {
                  return (
                    <div
                      class="mCards-item"
                      style={
                        item.projectId.gallery[0]
                          ? `background-image: url('/assets/upload/${item.projectId.gallery[0]}');`
                          : images[`research/duma}`]
                      }
                    >
                      <div class="mCard-item_blur">
                        <img
                          src={
                            item.projectId.gallery[0]
                              ? `/assets/upload/${item.projectId.gallery[0]}`
                              : images["research/logo-empty"]
                          }
                        ></img>
                      </div>
                      <div class="mCards-item-inner" style="z-index:5;">
                        <div class="mCards-info">
                          <div class="company">
                            <div class="small-logo">
                              <img
                                src={
                                  item.projectId.icon
                                    ? `/assets/upload/${item.projectId.icon}`
                                    : images[`research/logo-duma}`]
                                }
                              />
                            </div>

                            <span class="company-title">
                              {item.projectId.name}
                            </span>
                          </div>
                          <div class="mCards-info_status">
                            <div class="info-bell-m">
                              <img src={svg.bellGrey} class="bell" />
                            </div>
                            <div style="display: flex; align-items:center;">
                              <div class="icon mr-15">
                                <img src={svg.blockchain} />
                              </div>
                              <div class="status">{item.projectId.status}</div>
                            </div>
                            <div class="ecosystem mt-10">
                              {item.projectId.category}
                            </div>
                          </div>
                        </div>

                        <div class="statuses">
                          <span class="circle mr-15">
                            {item.rank ? item.rank : 0}
                          </span>
                          <span class="rang">
                            {item.projectId.rank < 100
                              ? "low rank"
                              : "medium rank"}
                          </span>
                        </div>
                        <p class="text">{item.projectId.description}</p>
                        <div class="card-text">
                          <span class="ttu">
                            {item.projectId.tabs}/ seed round is open
                          </span>
                          {item.projectId.have}$
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div class="m-search">
                <form class="mb-15">
                  <input
                    class="form-input"
                    type="text"
                    placeholder="Search"
                    Element={($el) => {
                      Static.searchM = $el;
                    }}
                  />
                  <span
                    class="input-delete"
                    // Element={($el)=>{
                    //   Static.DelsearchM = $el;
                    // }}
                    onclick={() => {
                      Static.searchM.value = "";
                      initReload();
                    }}
                  >
                    X
                  </span>
                </form>
              </div>

              <div class="filter-m">
                <button class="btn btn-filter mr-15">Filter</button>
                <Elements.Tabs
                  class="tabs-m"
                  varName={"activeTabM"}
                  items={[
                    {
                      title: "All",
                      name: "all",
                      onclick: async () => {
                        Static.records = await fn.socket.get({
                          method: "Marketplace",
                          params: {
                            filter: {
                              moderation: true,
                            },
                            populate: { path: "projectId" },
                          },
                        });
                        initReload();
                      },
                    },
                    {
                      title: "Top",
                      name: "top",
                      onclick: async () => {
                        Static.records = await fn.socket.get({
                          method: "Marketplace",
                          params: {
                            filter: {
                              moderation: true,
                              "rankList.totalText": 101,
                            },
                          },
                        });
                        initReload();
                      },
                    },
                    {
                      title: "Active",
                      name: "active",
                      onclick: async () => {
                        Static.records = await fn.socket.get({
                          method: "Marketplace",
                          params: {
                            filter: {
                              moderation: true,
                              status: "Active",
                            },
                            populate: { path: "projectId" },
                          },
                        });
                        initReload();
                      },
                    },
                    {
                      title: "Upcoming",
                      name: "upcoming",
                      onclick: async () => {
                        Static.records = await fn.socket.get({
                          method: "Marketplace",
                          params: {
                            filter: {
                              moderation: true,
                              status: "Upcoming",
                            },
                            populate: { path: "projectId" },
                          },
                        });
                        initReload();
                      },
                    },
                    {
                      title: "Past",
                      name: "past",
                      onclick: async () => {
                        Static.records = await fn.socket.get({
                          method: "Marketplace",
                          params: {
                            filter: {
                              moderation: true,
                              status: "Past",
                            },
                            populate: { path: "projectId" },
                          },
                        });
                        initReload();
                      },
                    },
                  ]}
                  Static={Static}
                />
              </div>

              <div class="table-m">
                <div class="table-m-content">
                  <div class="table-m-item">
                    <div></div>
                    <div class="m-active">Project</div>
                    <div>Round</div>
                    <div>Type</div>
                    <div>Category</div>
                    <div>Price</div>
                    <div>Collect</div>
                    <div>Total</div>
                    <div>BC</div>
                    <div></div>
                    <div></div>
                  </div>
                  <div
                    class="table-m-show"
                    hidden={Static.activeTabM == "all" ? false : true}
                  >
                    {Static.records.map((item) => {
                      // console.log("=e46996=", item.projectId.status);

                      return (
                        <div class="table-m-item">
                          <div class="small-logo">
                            <img
                              src={
                                item.projectId.icon
                                  ? `/assets/upload/${item.projectId.icon}`
                                  : images[`research/logo-duma}`]
                              }
                            />
                          </div>
                          <div>{item.projectId.name}</div>
                          <div>{item.projectId.tabs}</div>
                          <div>{item.status}</div>
                          <div>{item.projectId.category}</div>
                          <div>{item.projectId.seedRound}$</div>
                          <div>{item.projectId.have}$</div>
                          <div>{item.projectId.target}$</div>
                          <div>
                            <img src={svg.blockchain} />
                          </div>
                          <button class="btn btn-green">MORE INFO</button>
                          <button class="btn btn-green">RESEARCH</button>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    class="table-m-show"
                    hidden={Static.activeTabM == "active" ? false : true}
                  >
                    {Static.records.map((item) => {
                      console.log(item);
                      return (
                        <div class="table-m-item">
                          <div class="small-logo">
                            <img
                              src={
                                item.projectId.icon
                                  ? `/assets/upload/${item.projectId.icon}`
                                  : images[`research/logo-duma}`]
                              }
                            />
                          </div>
                          <div>{item.projectId.name}</div>
                          <div>{item.projectId.tabs}</div>
                          <div>{item.status}</div>
                          <div>{item.projectId.category}</div>
                          <div>{item.projectId.seedRound}$</div>
                          <div>{item.projectId.have}$</div>
                          <div>{item.projectId.target}$</div>
                          <div>
                            <img src={svg.blockchain} />
                          </div>
                          <button class="btn btn-green">MORE INFO</button>
                          <button class="btn btn-green">RESEARCH</button>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    class="table-m-show"
                    hidden={Static.activeTabM == "upcoming" ? false : true}
                  >
                    {Static.records.map((item) => {
                      return (
                        <div class="table-m-item">
                          <div class="small-logo">
                            <img
                              src={
                                item.projectId.icon
                                  ? `/assets/upload/${item.projectId.icon}`
                                  : images[`research/logo-duma}`]
                              }
                            />
                          </div>
                          <div>{item.projectId.name}</div>
                          <div>{item.projectId.tabs}</div>
                          <div>{item.status}</div>
                          <div>{item.projectId.category}</div>
                          <div>{item.projectId.seedRound}$</div>
                          <div>{item.projectId.have}$</div>
                          <div>{item.projectId.target}$</div>
                          <div>
                            <img src={svg.blockchain} />
                          </div>
                          <button class="btn btn-green">MORE INFO</button>
                          <button class="btn btn-green">RESEARCH</button>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    class="table-m-show"
                    hidden={Static.activeTabM == "past" ? false : true}
                  >
                    {Static.records.map((item) => {
                      return (
                        <div class="table-m-item">
                          <div class="small-logo">
                            <img
                              src={
                                item.projectId.icon
                                  ? `/assets/upload/${item.projectId.icon}`
                                  : images[`research/logo-duma}`]
                              }
                            />
                          </div>
                          <div>{item.projectId.name}</div>
                          <div>{item.projectId.tabs}</div>
                          <div>{item.status}</div>
                          <div>{item.projectId.category}</div>
                          <div>{item.projectId.seedRound}$</div>
                          <div>{item.projectId.have}$</div>
                          <div>{item.projectId.target}$</div>
                          <div>
                            <img src={svg.blockchain} />
                          </div>
                          <button class="btn btn-green">MORE INFO</button>
                          <button class="btn btn-green">RESEARCH</button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div class="btn-block">
                  <button class="btn btn-green">VIEW ALL PROJECTS</button>
                </div>
              </div>

              <h2 class="general-title mY-25">Almost done</h2>

              <Elements.cards.Small
                items={Static.projects}
                className="mCards-small"
              />
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
