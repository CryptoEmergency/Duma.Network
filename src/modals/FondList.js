import {
  jsx,
  jsxFrag,
  load,
  Data,
  initReload,
  Variable,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

// let showForAdd = true;

const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  // console.log("=b1d9cd=", Static.listsFonds);
  Static.showForAdd = false;
  Static.fond_list = [];
  if (Static.listsFonds) {
    for (let item of Static.listsFonds) {
      Static.fond_list.push(item._id);
    }
  }

  load({
    ID,
    fnLoad: async () => {
      Static.items = await fn.socket.get({ method: "Fonds" });
      Static.showFonds = Static.items;
    },
    fn: () => {
      // console.log("fond list:", Static.items);
      // console.log("check fond list", Static.fond_list);
      console.log("=7ba689=", Static.showFonds);
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div class="wrap-content fonds">
              <header class="header-modal">
                <h2 class="general-title mt-0">{data.title}</h2>
                <button
                  class="button-close button-modal"
                  onclick={() => {
                    fn.modals.close(ID);
                  }}
                >
                  X
                </button>
                <div
                  class="add"
                  Element={($el) => {
                    Static.addNewFond = $el;
                  }}
                  onclick={() => {
                    Static.showForAdd = !Static.showForAdd;
                    if (Static.showForAdd == true) {
                      Static.addNewFond.innerText = "x";
                    } else {
                      Static.addNewFond.innerText = "+";
                    }
                    initReload();
                  }}
                >
                  +
                </div>
              </header>
              <main class="main-modal">
                <div
                  class={[
                    "fondlistEdit-wrap",
                    "mb-15",
                    Static.showForAdd ? "fondlistEdit-wrap_show" : null,
                  ]}
                >
                  <div
                    class="fondlist-item_img"
                    onclick={() => {
                      Static.fondMedia.click();
                    }}
                  >
                    <input
                      type="file"
                      hidden
                      Element={($el) => {
                        Static.fondMedia = $el;
                      }}
                      onchange={async function (e) {
                        e.stopPropagation();
                        Array.from(this.files).forEach((item) => {
                          fn.uploadFile({
                            file: item,
                            onload: async function () {
                              if (!this.response) {
                                alert("Have some Error. Try again...");
                                return;
                              }
                              let response = JSON.parse(this.response);
                              if (response.error || !response.name) {
                                alert(
                                  "Have some Error. Try again... " +
                                    response.error
                                );
                                return;
                              }
                              Static.fondIcon = response.name;
                              initReload();
                            },
                          });
                          return;
                        });
                      }}
                    />
                    <img
                      src={
                        Static.fondIcon
                          ? `/assets/upload/${Static.fondIcon}`
                          : images["research/logo-empty"]
                      }
                    />
                  </div>
                  <div
                    class="personal-input text"
                    contenteditable="plaintext-only"
                    oninput={function () {
                      Static.nameFond = this.innerText.trim();
                    }}
                  >
                    {Static.nameFond}
                  </div>
                  <button
                    class="btn btn-white ml-15"
                    onclick={async () => {
                      let create = await fn.socket.set({
                        method: "Fonds",
                        action: "insert",
                        params: {
                          insert: {
                            name: Static.nameFond,
                            icon: Static.fondIcon,
                          },
                        },
                      });
                      // if (create.error || create) {
                      //   alert("Error, fund filling");
                      //   return;
                      // }
                      Static.fondIcon = null;
                      Static.nameFond = "";
                      Static.items.push(create);
                      Static.showForAdd = !Static.showForAdd;
                      Static.addNewFond.innerText = "+";
                      initReload();
                    }}
                  >
                    Create
                  </button>
                </div>
                <div class="fondlistForm-wrap">
                  <form class="filter-fondlist mb-15">
                    <input
                      Element={($el) => {
                        Static.fondSearch = $el;
                      }}
                      type="text"
                      class="filter-fondlist_input form-input"
                      placeholder="Сhoose a fund"
                      oninput={function () {
                        let searchText = this.value.toLowerCase();
                        // console.log("=69eb6a=", this.value);
                        Static.showFonds = Static.items.filter((item) => {
                          if (item.name.toLowerCase().includes(searchText)) {
                            return true;
                          }
                        });
                        initReload("modals");
                      }}
                    />
                    <span
                      class="input-delete"
                      Element={($el) => {
                        Static.fondSearchDel = $el;
                      }}
                      onclick={() => {
                        Static.showFonds = Static.items;
                        Static.fondSearch.value = "";
                        initReload("modals");
                      }}
                    >
                      x
                    </span>
                  </form>
                </div>
                <div class="fondlist-wrap">
                  {Static.showFonds.map((item) => {
                    return (
                      <div
                        class={[
                          "fondlist-item",
                          Static.fond_list.includes(item._id)
                            ? "fondlist-item_active"
                            : null,
                        ]}
                        onclick={() => {
                          if (Static.fond_list.includes(item._id)) {
                            Static.fond_list.splice(
                              Static.fond_list.indexOf(item._id),
                              1
                            );
                          } else {
                            Static.fond_list.push(item._id);
                          }
                          initReload("modals");
                        }}
                      >
                        <div class="fondlist-item_img">
                          <img
                            src={
                              item.icon
                                ? `/assets/upload/${item.icon}`
                                : images["research/logo-empty"]
                            }
                          />
                        </div>
                        <span class="fondlist-item_desc">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </main>
              <footer class="footer-modal">
                <button
                  class="btn btn-white"
                  onclick={() => {
                    if (Static.callback) {
                      Static.callback(Static.fond_list);
                    }
                    fn.modals.close(ID);
                  }}
                >
                  Confirm
                </button>
              </footer>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default forExport;
