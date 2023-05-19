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

const countResearches = function(id, array){
  let sum = 0;
  let total = array.reduce(function(count, item, index){
    if(item.projectId === id){
      sum++;
    }
    return sum;
  }, 0);
  return total;
} 

const forExport = function ({ Static, className, itemsProjects = [], itemsResearches = [] }) {
  return (
    <div class="cards">
      {itemsProjects.map((item, index) => {
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
                  <div class="ecosystem">{item.category}</div>
                </div>
                <div class="desc">
                  <p class="desc-text">{item.description}</p>
                </div>
                <div class="socials">
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

                <div class="card-text mt-15">
                  <span class="ttu line-green">
                    Researches: 
                  </span> 
                  {countResearches(item._id, itemsResearches)}
                </div>

                <button
                  class="btn btn-green"
                  onclick={() => {
                    
                      fn.siteLink("/projects/show/" + item._id);
                    
                  }}
                >
                  about project
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
