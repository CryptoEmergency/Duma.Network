import { jsx, jsxFrag, load } from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const start = function (data, ID) {
  load({
    ID,
    fn: () => {
      return (
        <div class="wrapper">
          <div class="main-inner">
            <div class="error">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <img class="left polygon" src={svg.honeycombL}></img>
              <img class="right polygon" src={svg.honeycombR}></img>
              <div class="title-error">
                <h2>Page not found</h2>
                <h1 class="mb-25">Error 404</h1>
                <button class="btn btn-green">MAIN PAGE</button>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
