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
      <div class="user-picture mr-15">
        <img
          src={
            Variable.myInfo.icon
              ? `/assets/upload/${Variable.myInfo.icon}`
              : svg.user
          }
        />
        <div class="user-status">{Variable.myInfo.status}</div>
      </div>
      <div class="user-info">
        <span class="text-green">Welcome</span>
        <span class="user-name">{Variable.myInfo.firstName}</span>
      </div>
    </div>
  );
};

export default forExport;
