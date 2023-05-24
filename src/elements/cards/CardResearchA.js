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

const traded = function(id, marketplace){
  let priceToken;
  marketplace.reduce(function(count, item, index){
    if(item.projectId === id){
      console.log('=50b02f=', item.priceToken)
      priceToken = item.priceToken;
    }
  }, 0)
  return priceToken;
}

const forExport = function ({ Static, className, items = [], marketplace = [] }) {

  // console.log('=marketplace=', marketplace)
  // let [Static] = fn.GetParams({ data, ID });
  return (
    <div class="cards">
      {items.map((item, index) => {
        // console.log('=a254fa=', item.blur)
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
                      item.projectId.icon
                        ? `/assets/upload/${item.projectId.icon}`
                        : images[`research/logo-duma}`]
                    }
                  />
                  <div class="company-title">
                    <span>{item.projectId?.name}</span>
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
                            projectId: item.projectId._id,
                            author: Variable.myInfo._id,
                          },
                        },
                      });
                      await fn.socket.set({
                        method: "Projects",
                        action: "findOneAndUpdate",
                        params: {
                          update: { bookmarks: !item.bookmarks },
                          filter: {
                            _id: item.projectId._id,
                          },
                        },
                      });
                      item.projectId.bookmarks = !item.projectId.bookmarks;
                      initReload();
                    }}
                  >
                    {item.projectId.bookmarks ? (
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
                        item?.projectId?.blockchains?.icon
                          ? `/assets/upload/${item.projectId.blockchains.icon}`
                          : svg.binance
                      }
                    />
                  </div>
                  <div class="ecosystem">{item.category}</div>
                  <div class="circle">{item.rank.toFixed(0) ? item.rank.toFixed(0) : 0}</div>
                  <div class="rang">
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
                <div class="card-text flex-middleY mb-10">
                  
                  
                  <span class="ttu line-green">{item.round} ROUND</span>
                  { item.projectId.tokenPlatform ? 

                  <span class="flex-middleY mr-10">
                    <img class="icon mr-10" src={svg["personal/icons/marketplace"]}></img> 
                    {traded(item.projectId._id , marketplace)}$
                  </span> : null
                  }
                </div>
                <div class="progressBlock">
                  <div
                    style={
                      !item.projectId.have || !item.projectId.amount
                        ? `width: calc(0%)`
                        : item.projectId.have >= item.projectId.amount
                        ? `width: calc(100%)`
                        : `width: calc(100% * ${item.projectId.have / item.projectId.amount})`
                    }
                    class="progressBlock-column"
                  ></div>
                </div>

                <span class="summ">
                  {item.projectId.have || item.projectId.amount
                    ? `${item.projectId.have}$/${item.projectId.amount}$`
                    : null}
                </span>

                <button
                  class="btn btn-green"
                  onclick={() => {
                    if (!item.blur) {
                      fn.siteLink("/researchA/show/" + item._id);
                    }
                  }}
                >
                  {/* {!item.partners
                    ? "RESEARCH ABOUT THE Project"
                    : "Become a partners"} */}
                    research about the project
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
