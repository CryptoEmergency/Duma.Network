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

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.activeTabM = "all";
  Static.listRound = true;
  Static.listCategory = true;
  // Static.filter = false;
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
                        <div
                          class="accordeon-item"
                          onclick={() => {
                            Static.listRound = !Static.listRound;
                            initReload();
                          }}
                        >
                          <div class="accordeon-header">
                            <h5 class="accordeon-header_title">Round</h5>
                          </div>
                          <ul
                            class={[
                              "accordeon-list",
                              Static.listRound ? null : "content-show",
                            ]}
                          >
                            {roundList.map((item, index) => {
                              return <li class="list-item">{item.title}</li>;
                            })}
                          </ul>
                        </div>
                        <div
                          class="accordeon-item"
                          onclick={() => {
                            Static.listCategory = !Static.listCategory;
                            initReload();
                          }}
                        >
                          <div class="accordeon-header">
                            <h5 class="accordeon-header_title">Category</h5>
                          </div>
                          <ul
                            class={[
                              "accordeon-list",
                              Static.listCategory ? null : "content-show",
                            ]}
                          >
                            {categoryList.map((item, index) => {
                              return <li class="list-item">{item.title}</li>;
                            })}
                          </ul>
                        </div>
                      </div>
                      {/* <div class="accordeon">
                        {items.map((item, index) => {
                          console.log(item.hidden);
                          return (
                            <div
                              class={[
                                "accordeon-item",
                                className ? className : null,
                              ]}
                              onclick={function () {
                                item.hidden = !item.hidden;
                                if (item.onclick) {
                                  item.onclick();
                                }
                                initReload();
                              }}
                            >
                              <div class="accordeon-header">
                                <h5 class="accordeon-header_title">
                                  {item.title}
                                </h5>
                              </div>

                              <ul
                                class={[
                                  "accordeon-list",
                                  item.hidden ? null : "content-show",
                                ]}
                              >
                                {item.list.map((itemLi, index) => {
                                  return (
                                    <li class="list-item">{itemLi.title}</li>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })}
                      </div> */}
                      {/* <Elements.Accordeon
                        items={[
                          {
                            title: "Round",
                            list: roindList,
                            hidden: true,
                          },
                          {
                            title: "Category",
                            list: categoryList,
                            hidden: false,
                          },
                          // {
                          //   title: "Blockchain",
                          // },
                        ]}
                        Static={Static}
                      /> */}
                      {/* <div class="dropdown">
                        <button
                          class="dropdown__button"
                          onclick={() => {
                            Static.listRound.classList.toggle(
                              "dropdown__list--visible"
                            );
                          }}
                        >
                          Round
                        </button>
                        <ul
                          class="dropdown__list"
                          Element={($el) => {
                            Static.listRound = $el;
                          }}
                        >
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.listRound.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            Active
                          </li>
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.listRound.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            Upcoming
                          </li>
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.listRound.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            Past
                          </li>
                        </ul>
                      </div>
                      <div class="dropdown">
                        <button
                          class="dropdown__button"
                          onclick={() => {
                            Static.listCategory.classList.toggle(
                              "dropdown__list--visible"
                            );
                          }}
                        >
                          Category
                        </button>
                        <ul
                          class="dropdown__list"
                          Element={($el) => {
                            Static.listCategory = $el;
                          }}
                        >
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.listCategory.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            Active
                          </li>
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.listCategory.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            Upcoming
                          </li>
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.listCategory.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            Past
                          </li>
                        </ul>
                      </div> */}
                    </div>
                    <div class="filters-footer">
                      <button class="btn">Apply</button>
                      <button class="btn btn-white">
                        <img class="icon mr-15" src={svg.reset} />
                        Reset filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>

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
                <button
                  class="btn mr-15"
                  onclick={() => {
                    Static.filterContainer = !Static.filterContainer;
                    console.log("filter", Static.filterContainer);
                    initReload();
                  }}
                >
                  <img class="icon mr-10" src={svg.filter} />
                  Filter
                </button>
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
                    // {
                    //   title: "Top",
                    //   name: "top",
                    //   onclick: async () => {
                    //     Static.records = await fn.socket.get({
                    //       method: "Marketplace",
                    //       params: {
                    //         filter: {
                    //           moderation: true,
                    //           sort: -1,
                    //           "rankList.totalText": 101,
                    //         },
                    //         populate: { path: "projectId" },
                    //       },
                    //     });
                    //     initReload();
                    //   },
                    // },
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

              <table class="table-m">
                <thead class="table-m-header">
                  <tr class="table-m-item">
                    <th></th>
                    <th>Project</th>
                    <th>Round</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Collect</th>
                    <th>Total</th>
                    <th>BC</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody
                  class="table-m-body"
                  hidden={Static.activeTabM == "all" ? false : true}
                >
                  {Static.records.map((item) => {
                    // console.log("=e46996=", item.projectId.status);

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
                        <td>{item.projectId.tabs}</td>
                        <td>{item.status}</td>
                        <td>{item.projectId.category}</td>
                        <td>
                          {item.projectId.seedRound
                            ? `${item.projectId.seedRound}$`
                            : "—"}
                        </td>
                        <td>
                          {item.projectId.have
                            ? `${item.projectId.have}$`
                            : "—"}
                        </td>
                        <td>
                          {item.projectId.target
                            ? `${item.projectId.target}$`
                            : "—"}
                        </td>
                        <td>
                          <img src={svg.blockchain} />
                        </td>
                        <td>
                          <button class="btn btn-green">MORE INFO</button>
                        </td>
                        <td>
                          <button class="btn btn-green">RESEARCH</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tbody
                  class="table-m-body"
                  hidden={Static.activeTabM == "active" ? false : true}
                >
                  {Static.records.map((item) => {
                    // console.log("=e46996=", item.projectId.status);

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
                        <td>{item.projectId.tabs}</td>
                        <td>{item.status}</td>
                        <td>{item.projectId.category}</td>
                        <td>
                          {item.projectId.seedRound
                            ? `${item.projectId.seedRound}$`
                            : "—"}
                        </td>
                        <td>
                          {item.projectId.have
                            ? `${item.projectId.have}$`
                            : "—"}
                        </td>
                        <td>
                          {item.projectId.target
                            ? `${item.projectId.target}$`
                            : "—"}
                        </td>
                        <td>
                          <img src={svg.blockchain} />
                        </td>
                        <td>
                          <button class="btn btn-green">MORE INFO</button>
                        </td>
                        <td>
                          <button class="btn btn-green">RESEARCH</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tbody
                  class="table-m-body"
                  hidden={Static.activeTabM == "upcoming" ? false : true}
                >
                  {Static.records.map((item) => {
                    // console.log("=e46996=", item.projectId.status);

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
                        <td>{item.projectId.tabs}</td>
                        <td>{item.status}</td>
                        <td>{item.projectId.category}</td>
                        <td>
                          {item.projectId.seedRound
                            ? `${item.projectId.seedRound}$`
                            : "—"}
                        </td>
                        <td>
                          {item.projectId.have
                            ? `${item.projectId.have}$`
                            : "—"}
                        </td>
                        <td>
                          {item.projectId.target
                            ? `${item.projectId.target}$`
                            : "—"}
                        </td>
                        <td>
                          <img src={svg.blockchain} />
                        </td>
                        <td>
                          <button class="btn btn-green">MORE INFO</button>
                        </td>
                        <td>
                          <button class="btn btn-green">RESEARCH</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tbody
                  class="table-m-body"
                  hidden={Static.activeTabM == "past" ? false : true}
                >
                  {Static.records.length ? (
                    Static.records.map((item) => {
                      // console.log("=e46996=", item.projectId.status);
                      // console.log("past", item);
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
                          <td>{item.projectId.tabs}</td>
                          <td>{item.status}</td>
                          <td>{item.projectId.category}</td>
                          <td>
                            {item.projectId.seedRound
                              ? `${item.projectId.seedRound}$`
                              : "—"}
                          </td>
                          <td>
                            {item.projectId.have
                              ? `${item.projectId.have}$`
                              : "—"}
                          </td>
                          <td>
                            {item.projectId.target
                              ? `${item.projectId.target}$`
                              : "—"}
                          </td>
                          <td>
                            <img src={svg.blockchain} />
                          </td>
                          <td>
                            <button class="btn btn-green">MORE INFO</button>
                          </td>
                          <td>
                            <button class="btn btn-green">RESEARCH</button>
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
