import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Data,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";

const forExport = function ({ className, children, varName, items, Static }) {
  Static.tabWidth;
  // Static.glider.style.width = `${Static.tabWidth}px`;
  return (
    <div class="tabs">
      <div class="circle-effect circle-effect1"></div>
      <div class="circle-effect circle-effect2"></div>
      <div
        class="tabs-controller"
        style="z-index:5; position:relative; display:flex;"
      >
        <div
          class={[
            "glider",
            Data.Static[varName] == "seed" ? "tab0" : null,
            Data.Static[varName] == "private" ? "tab1" : null,
            Data.Static[varName] == "public" ? "tab2" : null,
          ]}
          Element={($el) => {
            Static.glider = $el;
            Static.glider.style.width = `${Static.tabWidth}px`;
          }}
        ></div>
        {items.map((item, index) => {
          return (
            <div
              class={[
                "tab-item",
                `tab-item-${index}`,
                Data.Static[varName] == item.name ? "checked" : null,
              ]}
              onclick={function () {
                Static.tabWidth = this.offsetWidth;
                // console.log(this.offsetWidth);
                Data.Static[varName] = item.name;
                if (item.name == "seed") {
                  Static.glider.style.left = 0;
                }
                if (item.name == "private") {
                  // Static.glider.style.left = "190px";
                  Static.glider.style.left = `${Static.tabWidth}px`;
                }
                if (item.name == "public") {
                  Static.glider.style.left = `${Static.tabWidth * 2}px`;
                  // Static.glider.style.width = "165px";
                }
                initReload();
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>
      {children}
    </div>
  );
};

export default forExport;
