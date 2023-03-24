import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";

import { fn } from '@src/functions/export.js';
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const forExport = function ({ className }) {
  return (
    <section class="parthers" id="partners">
      <img class="polygonSmall polygon" src={svg.polygonSmall}></img>
      <img class="polygonBig polygon" src={svg.polygonBig}></img>
      <h2 class="general-title">Partners and Baсkers</h2>
      <div class="parthers-inner">
        <a target="_blank" href="https://zyx.network/">
          <img class="parther-img" src={svg["partners/partner1"]} />
        </a>
        <a target="_blank" href="http://timeus.org">
          <img class="parther-img" src={svg["partners/partner2"]} />
        </a>
        <a target="_blank" href="http://atomic.green">
          <img class="parther-img" src={svg["partners/partner3"]} />
        </a>
        <a
          href="/"
          onclick={(e) => {
            fn.siteLink(e);
          }}>
          <img class="parther-img" src={images["logo-white"]} />
        </a>
        <a target="_blank" href="https://crypto-emergency.com/">
          <img class="parther-img" src={svg["partners/partner4"]} />
        </a>
      </div>
    </section>
  );
};

export default forExport;
// 24.03.2023