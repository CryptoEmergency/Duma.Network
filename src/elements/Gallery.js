import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Data,
} from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const forExport = function ({ className, children, varName, items }) {
  // Data.Static.activeImg;
  Data.Static.activeImg = items[0];
  return (
    <div class="gallery">
      <img
        class="gallery-main_img"
        src={
          Data.Static.activeImg
            ? `/assets/upload/${Data.Static.activeImg}`
            : images[`research/duma}`]
        }
      ></img>
      <div class="gallery-nav">
        <button type="button" class="gallery-prev">
          <img src={svg.galleryPrev} />
        </button>
        <div class="gallery-list">
          <div class="gallery-track">
            {items.map((item, index) => {
              return (
                <div
                  class="gallery-slide"
                  onclick={() => {
                    Data.Static.activeImg = items[index];
                    initReload();
                  }}
                >
                  <img src={`/assets/upload/${items[index]}`} />
                </div>
              );
            })}
          </div>
        </div>

        <button type="button" class="gallery-next">
          <img src={svg.galleryNext} />
        </button>
      </div>
    </div>
  );
};

export default forExport;
