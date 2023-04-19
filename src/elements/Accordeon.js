import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Data,
} from "@betarost/cemserver/cem.js";

const forExport = function ({ onclick, className, varName, items }) {
  console.log("=accordeon items=", items);
  console.log("=accordeon items list=", items.list);

  return (
    <div class="accordeon">
      {items.map((item, index) => {
        console.log(item.hidden);
        return (
          <div
            class={["accordeon-item", className ? className : null]}
            onclick={function () {
              item.hidden = !item.hidden;
              if (item.onclick) {
                item.onclick();
              }
              initReload();
            }}
          >
            <div class="accordeon-header">
              <h5 class="accordeon-header_title">{item.title}</h5>
            </div>

            <ul class={["accordeon-list", item.hidden ? null : "content-show"]}>
              {item.list.map((itemLi, index) => {
                return <li class="list-item">{itemLi.title}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default forExport;
