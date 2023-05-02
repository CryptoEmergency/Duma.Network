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
  let activeIndex = 0;

  items.forEach((tmpItems, index) => {
    if (tmpItems.name == Data.Static[varName]) {
      activeIndex = index;
    }
  });

  return (
    <div class={["tabs", className ? className : null]}>
      <div class="tabs-controller">
        <div
          class={["glider", `tab${activeIndex}`]}
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
                `tab-item-${activeIndex}`,
                Data.Static[varName] == item.name ? "checked" : null,
              ]}
              After={($el) => {
                if (Data.Static.activeTab == item.name) {
                  Data.Static.tabWidth = $el.offsetWidth;
                  Data.Static.glider.style.width = `${Data.Static.tabWidth}px`;
                }
              }}
              onclick={function () {
                activeIndex = index;
                Data.Static.tabWidth = this.offsetWidth;
                Data.Static[varName] = item.name;
                setStorage(varName, item.name);

                Data.Static.glider.style.left = `${
                  Data.Static.tabWidth * activeIndex
                }px`;

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
