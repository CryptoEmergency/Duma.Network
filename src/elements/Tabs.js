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
  // load({
  //   ID,
  //   fn: () => {
  //     console.log(Static.glider);
  //     return (
  //       <div class="tabs">
  //         <div class="circle-effect circle-effect1"></div>
  //         <div class="circle-effect circle-effect2"></div>
  //         <div
  //           class="tabs-controller"
  //           style="z-index:5; position:relative; display:flex;"
  //         >
  //           <div
  //             Element={($el) => {
  //               Static.glider = $el;
  //             }}
  //             class="glider"
  //           ></div>
  //           {items.map((item, index) => {
  //             return (
  //               <div>
  //                 <input
  //                   id={`tab-${index + 1}`}
  //                   type="radio"
  //                   class={[
  //                     Data.Static[varName] == item.name
  //                       ? "checked-input"
  //                       : null,
  //                   ]}
  //                   name="tab"
  //                 />
  //                 <label
  //                   for={`tab-${index + 1}`}
  //                   class={[
  //                     "tab-item",
  //                     Data.Static[varName] == item.name ? "checked" : null,
  //                   ]}
  //                   style="z-index:5; position:relative;"
  //                   onclick={() => {
  //                     Data.Static[varName] = item.name;
  //                     initReload();
  //                   }}
  //                 >
  //                   {item.title}
  //                 </label>
  //               </div>

  //               // ==================
  //               // <div
  //               //   class={[
  //               //     "tab-item",
  //               //     `tab-item-${index}`,
  //               //     Data.Static[varName] == item.name ? "checked" : null,
  //               //   ]}
  //               //   onclick={() => {
  //               //     Data.Static[varName] = item.name;
  //               //     initReload();
  //               //   }}
  //               // >
  //               //   {item.title}
  //               // </div>
  //               // =======================
  //               // <section>
  //               //   <input
  //               //     // id={`tab-${varName + index}`}
  //               //     id={`tab-${index + 1}`}
  //               //     type="radio"
  //               //     class={[
  //               //       Data.Static[varName] == item.name ? "checked-input" : null,
  //               //     ]}
  //               //     name="tab"
  //               //   />
  //               //   <label
  //               //     // for={`tab-${varName + index}`}
  //               //     for={`tab-${index + 1}`}
  //               //     class={[
  //               //       Data.Static[varName] == item.name ? "checked-label" : null,
  //               //     ]}
  //               //     style="z-index:5; position:relative;"
  //               //     onclick={() => {
  //               //       Data.Static[varName] = item.name;
  //               //       initReload();
  //               //     }}
  //               //   >
  //               //     {item.title}
  //               //   </label>
  //               // </section>
  //             );
  //           })}
  //         </div>
  //         {children}
  //       </div>
  //     );
  //   },
  // });
  return (
    <div class="tabs">
      <div class="circle-effect circle-effect1"></div>
      <div class="circle-effect circle-effect2"></div>
      <div
        class="tabs-controller"
        style="z-index:5; position:relative; display:flex;"
      >
        <div
          class="glider"
          Element={($el) => {
            Static.glider = $el;
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
              onclick={() => {
                Data.Static[varName] = item.name;
                console.log(item.name);
                if (item.name == "seed") {
                  Static.glider.style.left = 0;
                }
                if (item.name == "private") {
                  Static.glider.style.left = "200px";
                }
                if (item.name == "public") {
                  Static.glider.style.left = "415px";
                  Static.glider.style.width = "165px";
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
