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

const forExport = function ({ Static, onclick, className }) {
  return (
    <div class="user-card">
      <div class="user-picture">
        <input
          type="file"
          hidden
          Element={($el) => {
            Data.Static.userIcon = $el;
          }}
        ></input>
        <img
          src={images["personal/user"]}
          // src={
          //   Static.item.icon
          //     ? `/assets/upload/${Static.item.icon}`
          //     : images["personal/user"]
          // }
          onclick={() => {
            Data.Static.userIcon.click();
          }}
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
