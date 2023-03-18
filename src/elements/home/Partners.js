import {
  jsx,
  jsxFrag,
  load,
  Data,
  Variable,
  setStorage,
  initReload,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const forExport = function ({ Static, onclick, className }) {
  return (
    <section class="parthers" id="partners">
      <h2 class="general-title">Partners + Bakers</h2>
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
        <a href="/">
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
