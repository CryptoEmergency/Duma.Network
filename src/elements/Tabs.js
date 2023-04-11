import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Data,
  setStorage,
} from "@betarost/cemserver/cem.js";

const forExport = function ({ className, children, varName, items }) {
  Data.Static.tabWidth;
  return (
    <div class="tabs">
      <div class="circle-effect circle-effect1"></div>
      <div class="circle-effect circle-effect2"></div>
      <div class="tabs-controller">
        <div
          class={[
            "glider",
            Data.Static[varName] == "seed" ? "tab0" : null,
            Data.Static[varName] == "private" ? "tab1" : null,
            Data.Static[varName] == "public" ? "tab2" : null,
            Data.Static[varName] == "pre-seed" ? "tab3" : null,
            Data.Static[varName] == "strategic" ? "tab4" : null,
          ]}
          Element={($el) => {
            Data.Static.glider = $el;
            Data.Static.glider.style.width = `${Data.Static.tabWidth}px`;
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
              After={($el) => {
                if (Data.Static.activeTab == item.name) {
                  Data.Static.tabWidth = $el.offsetWidth;
                  Data.Static.glider.style.width = `${Data.Static.tabWidth}px`;
                }
              }}
              onclick={function () {
                Data.Static.tabWidth = this.offsetWidth;
                Data.Static[varName] = item.name;
                setStorage("filterTabsResearch", item.name);
                if (item.name == "seed") {
                  Data.Static.glider.style.left = 0;
                }
                if (item.name == "private") {
                  Data.Static.glider.style.left = `${Data.Static.tabWidth}px`;
                }
                if (item.name == "public") {
                  Data.Static.glider.style.left = `${
                    Data.Static.tabWidth * 2
                  }px`;
                }
                if (item.name == "pre-seed") {
                  Data.Static.glider.style.left = `${
                    Data.Static.tabWidth * 3
                  }px`;
                }
                if (item.name == "strategic") {
                  Data.Static.glider.style.left = `${
                    Data.Static.tabWidth * 4
                  }px`;
                }
                if (item.onclick) {
                  item.onclick();
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
// 24.03.2023
// 06.04.2023
