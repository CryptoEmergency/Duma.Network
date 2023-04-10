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
  console.log(Variable.myInfo);
  return (
    <div>
      <div class="circle-effect circle-effect1"></div>
      <div class="circle-effect circle-effect2"></div>
      <div class="personal-header">
        <div class="user">
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
          <span
            class="upgrade"
            onclick={() => {
              fn.modals.Soon({});
            }}
          >
            upgrade
          </span>
        </div>
      </div>
    </div>
  );
};

export default forExport;
