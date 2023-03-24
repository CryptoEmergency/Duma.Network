import {
  jsx,
  jsxFrag,
  load
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import images from "@assets/images/index.js";
import Elements from '@src/elements/export.js';

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fn: () => {
      return (
        <div class="wrapper">
          <div class="main-inner">
            <Elements.Bredcrumbs items={[{ title: "Academy", link: '/academy' }]} />
            <h2 class="general-title mt-25" style="z-index:3; position:relative;">
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
