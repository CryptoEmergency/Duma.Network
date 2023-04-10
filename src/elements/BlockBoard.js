import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Data,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";

const forExport = function ({ className, children, varName, text }) {
  return (
    <div class="blocks-item">
      <Element.Question />
    </div>
  );
};

export default forExport;
