import { jsx, jsxFrag, load } from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import Elements from "@src/elements/export.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fn: () => {
      return (
        <div class="main-back">
          <div class="wrapper">
            <div class="main-inner">
              <Elements.home.About />
              <Elements.home.Advantages />
              <Elements.home.Opportunities />
              <Elements.home.Partners />
              <Elements.home.Roadmap />
              <Elements.home.Team />
              <Elements.home.Social />
            </div>
          </div>
          <img class="backDown" src={svg.backDown}></img>
        </div>
      );
    },
  });
};

export default start;
// 24.03.2023