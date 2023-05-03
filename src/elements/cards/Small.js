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
    <div class={className}>
      {items.map((item, index) => {
        // console.log("=ad7907=", item);
        return (
          <div
            class="card-item_small"
            style={
              item.gallery[0]
                ? `background-image: url('/assets/upload/${item.gallery[0]}')`
                : images[`research/duma}`]
            }
            onclick={() => {
              fn.siteLink("/research/show/" + item._id);
            }}
          >
            <div class="mCard-item_blur">
              <img
                src={
                  item.gallery[0]
                    ? `/assets/upload/${item.gallery[0]}`
                    : images["research/logo-empty"]
                }
              ></img>
            </div>
            <div class="mCards-item-inner" style="z-index:5;">
              <div class="small-header">
                <div class="small-logo">
                  <img
                    src={
                      item.icon
                        ? `/assets/upload/${item.icon}`
                        : images[`research/logo-duma}`]
                    }
                  />
                </div>

                <div>
                  <span class="rang">
                    {
                      item.rank < 50 ? "low rank" : 
                      (item.rank >= 50 && item.rank < 100) ? " medium rank" :
                      (item.rank >= 100) ? "high rank" : null
                    }
                  </span>
                  <span class="circle">{item.rank ? item.rank : 0}</span>
                </div>
              </div>
              <div class="small-body">
                <h5 class="small-body_title">{item.name}</h5>
              </div>
              <div class="small-footer">
                <div class="card-text">
                  <span class="ttu">{item.tabs} ROUND</span>
                  {/* {item.seedRound}$ */}
                  {item.seedRound}
                </div>

                {/* <span class="text-green percent">70%</span>
              <div>
                <span class="summ">
                  {item.have}$/{item.target}$
                </span>
                <span></span>
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
              </div> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default forExport;
