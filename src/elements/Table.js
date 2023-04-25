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

      </div>
      {children}
    </div>
  );
};

export default forExport;

