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
  Data.Static.widthImg;
  // Data.Static.activeImg = items[0];
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
        <button
          type="button"
          class="gallery-prev"
          onclick={() => {
            Data.Static.track.style.left = `${Data.Static.widthImg}px`;
          }}
        >
          <img src={svg.galleryPrev} />
        </button>
        <div class="gallery-list">
          <div
            class="gallery-track"
            Element={($el) => {
              Data.Static.track = $el;
            }}
          >
            {items.map((item, index) => {
              return (
                <div
                  class={[
                    "gallery-slide",
                    Data.Static.activeImg == item
                      ? "gallery-slide_active"
                      : null,
                  ]}
                  After={($el) => {
                    Data.Static.widthImg = $el.offsetWidth;
                  }}
                  onclick={() => {
                    Data.Static.activeImg = item;
                    initReload();
                  }}
                >
                  <img src={`/assets/upload/${item}`} />
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          class="gallery-next"
          onclick={() => {
            for (let i in items) {
            }
            // Data.Static.track.style.left = `-${Data.Static.widthImg}px`;
          }}
        >
          <img src={svg.galleryNext} />
        </button>
      </div>
    </div>
  );
};

export default forExport;
