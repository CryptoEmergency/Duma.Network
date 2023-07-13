import {
  jsx,
  jsxFrag,
  load,
  Data,
  Variable,
  initReload,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";

const categoryList = [
  {
    title: "Platform",
  },
  {
    title: "Ecosystem",
  },
  {
    title: "Service",
  },
  {
    title: "Another",
  },
  {
    title: "Art",
  },
  {
    title: "Artificial Intelligence (AI)",
  },
  {
    title: "Blockchain Service",
  },
  {
    title: "Bridge",
  },
  {
    title: "CEX",
  },
  {
    title: "CeFi",
  },
  {
    title: "DAO",
  },
  {
    title: "DAPP",
  },
  {
    title: "DEX",
  },
  {
    title: "DPoS",
  },
  {
    title: "Data Service",
  },
  {
    title: "DeFi",
  },
  {
    title: "Derivatives",
  },
  {
    title: "Digital Identity",
  },
  {
    title: "Education",
  },
  {
    title: "Fan Token",
  },
  {
    title: "GameFi",
  },
  {
    title: "Gaming Guild",
  },
  {
    title: "Governance",
  },
  {
    title: "Inflastructure",
  },
  {
    title: "Launchpad",
  },
  {
    title: "Layer 1 (L1)",
  },
  {
    title: "Layer 2 (L2)",
  },
  {
    title: "Layer 3 (L3)",
  },
  {
    title: "Lending/Borrowing",
  },
  {
    title: "Marketplace",
  },
  {
    title: "Metaverse",
  },
  {
    title: "Mobile",
  },
  {
    title: "Move to Earn (M2E)",
  },
  {
    title: "SocialFi",
  },
];
const roundList = [
  {
    title: "Seed",
  },
  {
    title: "Public",
  },
  {
    title: "Private",
  },
  {
    title: "Pre-seed",
  },
  {
    title: "Strategic",
  },
];

const makeFilters = function (records) {
  console.log("=96ff96=", records);
  return;
};

let x1 = null;
let y1 = null;

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  // slider
  Static.imgPosition = 0;
  Static.slider = Static.slides;

  Static.activeTabM = "all";
  Static.selectedRounds = [];
  Static.selectedCategories = [];
  Static.selectedBlockchains = [];
  load({
    ID,
    fnLoad: async () => {
      if (Variable.dataUrl.params) {
        Static.activeTabM = Variable.dataUrl.params;
      }
      Static.recordsDuma = await fn.socket.get({
        method: "MarketUser",
        params: {
          filter: { moderation: true, author: '6461b5b1179f315ed7fc65ce' },
          limit: 20,
          populate: {
            path: "projectId",
          },
        },
      });
      Static.records = await fn.socket.get({
        method: "MarketUser",
        params: {
          filter: { moderation: true,  },
          populate: {
            path: "projectId",
          },
        },
      });

      Static.slides = await fn.socket.get({

        method: "MarketUser",
        params: {
          filter: { moderation: true, preferred: true },
          limit: 9,
          populate: { path: "projectId" },
        },
      });

      Static.projects = await fn.socket.get({
        method: "ResearchAnalyst",
        params: { filter: { moderation: true }, limit: 5 },
      });
      Static.blockchain_list = await fn.socket.get({
        method: "Blockchains",
      });
      Static.slideHidden = Static.slides.length - 3;

      Static.researchDuma = await fn.socket.get({
        method: "ResearchAnalyst",
        params: { 
          filter: { 
            moderation: true,
            author: '645dea921d0831d67662684b',
          }, 
          populate:{ path: "projectId" },
          limit: 5 
        },
      });

      setInterval(() => {
        if (Static.slideHidden == 0) {
          Static.imgPosition = 0;
          Static.slideHidden = Static.slides.length - 3;
          Static.lineSlider.style.left = Static.imgPosition + "px";

          initReload();
          return;
        }

        Static.slideHidden--;
        Static.imgPosition = Static.imgPosition - 430;
        Static.lineSlider.style.left = Static.imgPosition + "px";
        initReload();
      }, 3500);
    },
    fn: () => {
      return (
        <div
          class={[
            "back-market",
            "main-back",
            Static.filterContainer ? "notScroll" : null,
          ]}
        >
          <div class="wrapper">
            <div class="main-inner">
              <Elements.Bredcrumbs
                items={[{ title: "Marketplace", link: "/marketplace" }]}
              />

              <div class="side-filters">
                <div
                  class={[
                    "filters-box",
                    Static.filterContainer ? "filters-box_active" : null,
                  ]}
                >
                  <div class="filters-container">
                    <div class="filters-header">
                      <h5 class="filters-title">Filters</h5>
                      <button
                        class="button-close button-modal"
                        onclick={() => {
                          Static.filterContainer = !Static.filterContainer;
                          initReload();
                        }}
                      >
                        X
                      </button>
                    </div>
                    <div class="filters-body">
                      <div class="accordeon">
                        <div class="accordeon-item">
                          <div
                            class="accordeon-header"
                            onclick={() => {
                              Static.listRound.classList.toggle("content-show");
                              initReload();
                            }}
                          >
                            <h5 class="accordeon-header_title">
                              Round
                              {Static.selectedRounds.length ? (
                                <span>{Static.selectedRounds.length}</span>
                              ) : null}
                            </h5>
                          </div>
                          <ul
                            class="accordeon-list"
                            Element={($el) => {
                              Static.listRound = $el;
                            }}
                          >
                            {roundList.map((item, index) => {
                              return (
                                <li
                                  class={[
                                    "list-item",
                                    Static.selectedRounds.includes(item)
                                      ? "list-item_active"
                                      : null,
                                  ]}
                                  onclick={() => {
                                    if (Static.selectedRounds.includes(item)) {
                                      Static.selectedRounds.splice(
                                        Static.selectedRounds.indexOf(index),
                                        1
                                      );
                                    } else {
                                      Static.selectedRounds.push(item);
                                    }
                                    initReload();
                                  }}
                                >
                                  {item.title}
                                </li>
                              );
                            })}
                          </ul>
                          {Static.selectedRounds.length ? (
                            <div class="selected-items">
                              {Static.selectedRounds.map((item, index) => {
                                return (
                                  <div class="selected-item">
                                    {item.title}
                                    <button
                                      class="delete-item"
                                      onclick={() => {
                                        Static.selectedRounds.splice(index, 1);
                                        initReload();
                                      }}
                                    >
                                      X
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                        <div class="accordeon-item">
                          <div
                            class="accordeon-header"
                            onclick={() => {
                              Static.listCategory.classList.toggle(
                                "content-show"
                              );
                              initReload();
                            }}
                          >
                            <h5 class="accordeon-header_title">
                              Category
                              {Static.selectedCategories.length ? (
                                <span>{Static.selectedCategories.length}</span>
                              ) : null}
                            </h5>
                          </div>
                          <ul
                            class="accordeon-list"
                            Element={($el) => {
                              Static.listCategory = $el;
                            }}
                          >
                            {categoryList.map((item, index) => {
                              return (
                                <li
                                  class={[
                                    "list-item",
                                    Static.selectedCategories.includes(item)
                                      ? "list-item_active"
                                      : null,
                                  ]}
                                  onclick={() => {
                                    if (
                                      Static.selectedCategories.includes(item)
                                    ) {
                                      Static.selectedCategories.splice(
                                        Static.selectedCategories.indexOf(
                                          index
                                        ),
                                        1
                                      );
                                    } else {
                                      Static.selectedCategories.push(item);
                                    }
                                    initReload();
                                  }}
                                >
                                  {item.title}
                                </li>
                              );
                            })}
                          </ul>
                          {Static.selectedCategories.length ? (
                            <div class="selected-items">
                              {Static.selectedCategories.map((item, index) => {
                                return (
                                  <div class="selected-item">
                                    {item.title}
                                    <button
                                      class="delete-item"
                                      onclick={() => {
                                        Static.selectedCategories.splice(
                                          index,
                                          1
                                        );
                                        initReload();
                                      }}
                                    >
                                      X
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                        <div class="accordeon-item">
                          <div
                            class="accordeon-header"
                            onclick={() => {
                              Static.listBlockchain.classList.toggle(
                                "content-show"
                              );
                              initReload();
                            }}
                          >
                            <h5 class="accordeon-header_title">
                              Blockchain
                              {Static.selectedBlockchains.length ? (
                                <span>{Static.selectedBlockchains.length}</span>
                              ) : null}
                            </h5>
                          </div>
                          <ul
                            class="accordeon-list"
                            Element={($el) => {
                              Static.listBlockchain = $el;
                            }}
                          >
                            {Static.blockchain_list.map((item, index) => {
                              return (
                                <li
                                  class={[
                                    "list-item",
                                    Static.selectedBlockchains.includes(
                                      item.name
                                    )
                                      ? "list-item_active"
                                      : null,
                                  ]}
                                  onclick={() => {
                                    if (
                                      Static.selectedBlockchains.includes(
                                        item.name
                                      )
                                    ) {
                                      Static.selectedBlockchains.splice(
                                        Static.selectedBlockchains.indexOf(
                                          index
                                        ),
                                        1
                                      );
                                    } else {
                                      Static.selectedBlockchains.push(
                                        item.name
                                      );
                                    }
                                    initReload();
                                  }}
                                >
                                  <img
                                    class="blockchain mr-15"
                                    src={
                                      item?.icon
                                        ? `/assets/upload/${item.icon}`
                                        : svg.binance
                                    }
                                  />
                                  {item.name}
                                </li>
                              );
                            })}
                          </ul>
                          {Static.selectedBlockchains.length ? (
                            <div class="selected-items">
                              {Static.selectedBlockchains.map((item, index) => {
                                return (
                                  <div class="selected-item">
                                    {item}
                                    <button
                                      class="delete-item"
                                      onclick={() => {
                                        Static.selectedBlockchains.splice(
                                          index,
                                          1
                                        );
                                        initReload();
                                      }}
                                    >
                                      X
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div class="filters-footer">
                      <button
                        class="btn"
                        onclick={() => {
                          makeFilters(Static.recordsDuma);
                        }}
                      >
                        Apply
                      </button>
                      <button class="btn btn-white">
                        <img class="icon mr-15" src={svg.reset} />
                        Reset filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="slider-mCards" style={Static.slides.length == 0 ? "height: auto" : "height:310px"}>
                {/* <span class="counter-slider">{Static.slides.length}</span> */}
                <div
                  class="line"
                  Element={($el) => {
                    Static.lineSlider = $el;
                  }}
                  onmousestart={function (event) {
                    x1 = event.clientX;
                    y1 = event.clientY;
                    console.log("=f631aa=", x1, y1);
                  }}
                  onmousemove={function (event) {
                    const firstMove = event;
                    // console.log("=260761=", event);
                  }}
                >
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
                            <div>
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

                                <span class="company-title ml-15">
                                  {item.projectId.name}
                                </span>
                              </div>
                              <div class="statuses">
                                <span class="circle mr-15">
                                  {item.projectId.rank ? item.projectId.rank : 0}
                                </span>
                                <span class="rang">
                                  {/* {item.projectId.rank < 100
                                    ? "low rank"
                                    : "medium rank"} */}
                                  {
                                    item.projectId.rank < 50 ? "low rank" : 
                                    (item.projectId.rank >= 50 && item.projectId.rank < 100) ? " medium rank" :
                                    (item.projectId.rank >= 100) ? "high rank" : null
                                  }
                                </span>
                              </div>
                            </div>

                            <div class="mCards-info_status">
                              <div
                                class="info-bell-m"
                                onclick={async () => {
                                  await fn.socket.set({
                                    method: "Bookmarks",
                                    action: "findOneAndUpdate",
                                    params: {
                                      update: { active: !item.bookmarks },
                                      filter: {
                                        projectId: item._id,
                                        author: Variable.myInfo._id,
                                      },
                                    },
                                  });
                                  item.bookmarks = !item.bookmarks;
                                  initReload();
                                }}
                              >
                                {item.projectId.bookmarks ? (
                                  <img src={svg.bellGreen} class="bell" />
                                ) : (
                                  <img src={svg.bellWhite} class="bell" />
                                )}
                              </div>
                              <div style="display: flex; align-items:center;">
                                <div class="icon">
                                  {/* <img src={svg.blockchain} /> */}
                                  <img
                                    class="blockchain"
                                    width="30"
                                    src={
                                      item.projectId.blockchains?.icon
                                        ? `/assets/upload/${item.projectId.blockchains.icon}`
                                        : svg.blockchain
                                    }
                                  />
                                </div>
                              </div>
                              <div class="ecosystem mt-10">
                                {item.projectId.category}
                              </div>
                            </div>
                          </div>

                          <p class="text-more">{item.projectId.description}</p>
                          <div class="card-text">
                            <span class="ttu">
                              {item.projectId.round}/ seed round is open
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                <button
                  class="btn mr-15"
                  onclick={() => {
                    Static.filterContainer = !Static.filterContainer;
                    initReload();
                  }}
                >
                  <img class="icon mr-10" src={svg.filter} />
                  Filter
                </button>
                {/* <Elements.Tabs
                  class="tabs-m"
                  varName={"activeTabM"}
                  items={[
                    {
                      title: "All",
                      name: "all",
                      onclick: async () => {
                        Static.records = await fn.socket.get({
                          method: "MarketUser",
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
                      title: "Active",
                      name: "active",
                      onclick: async () => {
                        Static.records = await fn.socket.get({
                          method: "MarketUser",
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
                          method: "MarketUser",
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
                          method: "MarketUser",
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
                /> */}
              </div>
              <div class="table-m_wrap">
                <table class="table-m">
                  <thead class="table-m-header">
                    <tr class="table-m-item">
                      <th></th>
                      <th>Project</th>
                      <th>Round</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Tokens</th>
                      <th>Collect</th>
                      <th>BC</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody
                    class="table-m-body"
                    // hidden={Static.activeTabM == "all" ? false : true}
                  >
                    {Static.recordsDuma.length ? (
                      Static.recordsDuma.map((item) => {
                        return (
                          <tr class="table-m-item">
                            <td class="small-logo">
                              <img
                                src={
                                  item.projectId.icon
                                    ? `/assets/upload/${item.projectId.icon}`
                                    : images[`research/logo-duma}`]
                                }
                              />
                            </td>
                            <td>{item.projectId.name}</td>
                            <td>{item.projectId.round}</td>
                            <td>{item.projectId.category}</td>
                            <td>{item.priceToken
                                ? `${item.priceToken}$`
                                : "—"}</td>
                            <td>
                              {item.tokens
                                ? `${item.tokens}`
                                : "—"}
                            </td>
                            <td>
                              {`${item.projectId.have}$ / ${item.projectId.amount}$`}
                            </td>
                            <td>
                              <img
                                class="blockchain"
                                src={
                                  item.projectId.blockchains?.icon
                                    ? `/assets/upload/${item.projectId.blockchains.icon}`
                                    : svg.binance
                                }
                              />
                            </td>
                            <td>
                              <button 
                                onclick={()=>{
                                  fn.siteLink("/marketplace/show/" + item._id);
                                }}
                                class="btn btn-green">
                                  MORE INFO
                              </button>
                            </td>
                            <td>
                              <button
                                onclick={()=>{
                                  if(Variable.myInfo.status === "User"){
                                    fn.modals.Status({});
                                  }
                                  Static.researchDuma.forEach((el)=>{
                                    if(el.projectId._id == el.projectId._id){
                                      Static.linkResearch = el._id;
                                    }
                                  })
                                  fn.siteLink("/researchA/show/" + Static.linkResearch);
                                }}
                                class="btn btn-green">
                                RESEARCH
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <div class="notFound">
                        <span>Records not found in table</span>
                        <img src={svg.notFound} />
                      </div>
                    )}
                  </tbody>

                  <div class="btn-block">
                    <button class="btn btn-green">VIEW ALL PROJECTS</button>
                  </div>
                </table>
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
