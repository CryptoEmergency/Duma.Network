import {
  jsx,
  jsxFrag,
  Variable,
  Data,
  initReload,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const forExport = function ({ Static, onclick, className, item }) {
  return (
    <div class="user-card">
      <div class="user-picture">
        <img
          src={
            Variable.myInfo.icon
              ? `/assets/upload/${Variable.myInfo.icon}`
              : images["personal/user"]
          }
        />
      </div>
      <div class="user-name">
        <span class="user-name_wel">Welcome</span>
        <span class="user-name_name">{Variable.myInfo.firstName}</span>
      </div>
    </div>
  );
};

export default forExport;
