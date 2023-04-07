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
      {items.length > 1 ? (
        <div class="gallery-nav">
          <button
            type="button"
            class="gallery-prev"
            onclick={() => {
              if (Data.Static.imgPosition == 0) {
                return;
              }
              Data.Static.slideHidden++;
              Data.Static.imgPosition -= Data.Static.widthImg;
              Data.Static.track.style.left = `-${Data.Static.imgPosition}px`;
              Data.Static.activeImg = items[Data.Static.currentSlide - 1];
              Data.Static.currentSlide--;
              initReload();
            }}
          >
            <img src={svg.galleryPrev} />
          </button>
          <div class="gallery-list">
            <div
              class="gallery-track"
              Element={($el) => {
                Data.Static.track = $el;
                // Data.Static.track.style.width = Data.Static.generalWidth;
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
                      Data.Static.generalWidth =
                        items.length * Data.Static.widthImg;
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
              if (Data.Static.slideHidden == 0) {
                return;
              }
              Data.Static.slideHidden--;
              console.log("=faba73=", Data.Static.slideHidden);
              Data.Static.imgPosition += Data.Static.widthImg;
              Data.Static.track.style.left = `-${Data.Static.imgPosition}px`;
              Data.Static.activeImg = items[Data.Static.currentSlide + 1];
              Data.Static.currentSlide++;
              initReload();
            }}
          >
            <img src={svg.galleryNext} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default forExport;
