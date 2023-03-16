import {
  jsx,
  jsxFrag,
  setStorage,
  Variable,
  load,
  Data,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });

  load({
    ID,
    fn: () => {
      return (
        <div class="wrapper">
          <div class="main-inner">
            <div class="crumbs" style="z-index:3; position:relative;">
              <a href="/">
                <img alt="Home" src={svg["home"]} />
              </a>
              <img class="arrow-path" alt="path" src={svg["arrowPath"]} />
              <span>Academy</span>
            </div>
            <h2
              class="general-title mt-25"
              style="z-index:3; position:relative;"
            >
              Academy
            </h2>
            <section class="courses pt-30 pb-30">
              <div class="blur">
                <h2>COMING SOON</h2>
              </div>
              <div class="courses-item">
                <img src={images["academy/1"]}></img>
              </div>
              <div class="courses-item">
                <img src={images["academy/2"]}></img>
              </div>
              <div class="courses-item">
                <img src={images["academy/3"]}></img>
              </div>
              <div class="courses-item">
                <img src={images["academy/4"]}></img>
              </div>
              <div class="courses-item">
                <img src={images["academy/1"]}></img>
              </div>
              <div class="courses-item">
                <img src={images["academy/2"]}></img>
              </div>
              <div class="courses-item">
                <img src={images["academy/3"]}></img>
              </div>
              <div class="courses-item">
                <img src={images["academy/4"]}></img>
              </div>
              <div class="courses-item">
                <img src={images["academy/1"]}></img>
              </div>
            </section>
          </div>
        </div>
      );
    },
  });
};

export default start;
