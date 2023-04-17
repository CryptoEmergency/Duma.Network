import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Data,
} from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

let x1 = null;
let y1 = null;

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
              <div class="counter-slider">{items.length}</div>
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
                    ontouchstart={function (event) {
                      const firstTouch = event.touches[0];
                      x1 = firstTouch.clientX;
                      y1 = firstTouch.clientY;
                    }}
                    ontouchmove={function (event) {
                      if (!x1 || !y1) {
                        return false;
                      }
                      let x2 = event.touches[0].clientX;
                      let y2 = event.touches[0].clientY;
                      let xDiff = x2 - x1;
                      let yDiff = y2 - y1;
                      if (Math.abs(xDiff) > Math.abs(yDiff)) {
                        //r-l
                        if (xDiff > 0) {
                          if (Data.Static.imgPosition == 0) {
                            return;
                          }
                          Data.Static.slideHiddenMobile++;
                          Data.Static.imgPosition -= 415;
                          Data.Static.track.style.left = `-${Data.Static.imgPosition}px`;
                          Data.Static.activeImg =
                            items[Data.Static.currentSlide - 1];
                          Data.Static.currentSlide--;
                          console.log("=dfaf82=", "right");
                        } else {
                          console.log("=9ae82b=", "left");
                          if (Data.Static.slideHiddenMobile == 0) {
                            Data.Static.activeImg = items[0];
                            Data.Static.slideHiddenMobile = items.length - 1;
                            Data.Static.imgPosition = 0;
                            Data.Static.track.style.left = 0;
                            Data.Static.currentSlide = 0;
                            initReload();
                            return;
                          }
                          Data.Static.slideHiddenMobile--;
                          Data.Static.imgPosition += 415;
                          Data.Static.track.style.left = `-${Data.Static.imgPosition}px`;
                          Data.Static.activeImg =
                            items[Data.Static.currentSlide + 1];
                          Data.Static.currentSlide++;
                        }
                      }
                      x1 = null;
                      y1 = null;
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
                Data.Static.activeImg = items[0];
                Data.Static.slideHidden = items.length - 4;
                Data.Static.imgPosition = 0;
                Data.Static.track.style.left = `${Data.Static.imgPosition}px`;
                Data.Static.currentSlide = 0;
                initReload();
                return;
              }
              Data.Static.slideHidden--;
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
