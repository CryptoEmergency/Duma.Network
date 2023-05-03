import {
  jsx,
  jsxFrag,
  data,
  initReload,
  Variable,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const forExport = function ({ Static, className, items = [] }) {
  // let [Static] = fn.GetParams({ data, ID });
  return (
    <div class="cards">
      {items.map((item, index) => {
        // console.log("=ad7907=", item);
        return (
          <div class={["card-item", `card-item_${index}`]}>
            {item.blur ? (
              <span class="soon-text">NEW STARTUPS IS COMING SOON</span>
            ) : null}
            <div
              class={["card-item_inner", item.blur ? "card-item_blur" : null]}
            >
              <div class="card-item_img">
                <img
                  src={
                    item.gallery[0]
                      ? `/assets/upload/${item.gallery[0]}`
                      : images[`research/duma}`]
                  }
                />
              </div>
              <div class="info">
                <div class="company">
                  <img
                    src={
                      item.icon
                        ? `/assets/upload/${item.icon}`
                        : images[`research/logo-duma}`]
                    }
                  />
                  <div class="company-title">
                    <span>{item.name}</span>
                  </div>
                  <div
                    class="info-bell"
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
                    {item.bookmarks ? (
                      <img src={svg.bellGreen} class="bell" />
                    ) : (
                      <img src={svg.bellWhite} class="bell" />
                    )}
                  </div>
                </div>
                <div class="statuses">
                  <div class="icon">
                    <img
                      class="blockchain"
                      src={
                        item?.blockchains?.icon
                          ? `/assets/upload/${item.blockchains.icon}`
                          : svg.binance
                      }
                    />
                  </div>
                  <div class="status">{item.status}</div>
                  <div class="ecosystem">{item.category}</div>
                  <div class="circle">{item.rank ? item.rank : 0}</div>
                  <div class="rang">
                    {/* {item.rank < 100 ? "low rank" : "medium rank"} */}
                    {
                      item.rank < 50 ? "low rank" : 
                      (item.rank >= 50 && item.rank < 100) ? " medium rank" :
                      (item.rank >= 100) ? "high rank" : null
                    }
                  </div>
                </div>
                <div class="desc">
                  <p class="desc-text">{item.description}</p>
                </div>
                <div class="socials mY-15">
                  {(item.socials || []).map((element) => {
                    if (element.link && element.link.length > 0) {
                      return (
                        <a target="_blank" href={element.link}>
                          <img
                            alt={element.name}
                            src={svg[`socials/${element.name}-green`]}
                            class="icon-green"
                          ></img>
                        </a>
                      );
                    } else {
                      return (
                        <img
                          alt={element.name}
                          src={svg[`socials/${element.name}-grey`]}
                          class="icon-green"
                        ></img>
                      );
                    }
                  })}
                </div>
                <div class="card-text">
                  <span class="ttu line-green">{item.tabs} ROUND</span>
                  {item.seedRound}$
                </div>
                <div class="progressBlock">
                  <div
                    style={
                      !item.have || !item.target
                        ? `width: calc(0%)`
                        : item.have >= item.target
                        ? `width: calc(100%)`
                        : `width: calc(100% * ${item.have / item.target})`
                    }
                    class="progressBlock-column"
                  ></div>
                </div>

                <span class="summ">
                  {item.have || item.target
                    ? `${item.have}$/${item.target}$`
                    : null}
                </span>

                <button
                  class="btn btn-green"
                  onclick={() => {
                    if (!item.blur) {
                      fn.siteLink("/research/show/" + item._id);
                    }
                  }}
                >
                  {!item.partners
                    ? "RESEARCH ABOUT THE Project"
                    : "Become a partners"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default forExport;
