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

const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.showForAdd = false;
  Static.blockchains_list;
  // if (Static.listsBlockchains) {
  //   for (let item of Static.listsFonds) {
  //     Static.blockchains_list.push(item._id);
  //   }
  // }
  // console.log("=09601a=", Static.listsBlockchains);
  load({
    ID,
    fnLoad: async () => {
      Static.items = await fn.socket.get({ method: "Blockchains" });
      Static.showBlockchains = Static.items;
    },
    fn: () => {
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
                      Static.BlockchainMedia.click();
                    }}
                  >
                    <input
                      type="file"
                      hidden
                      Element={($el) => {
                        Static.BlockchainMedia = $el;
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
                              Static.BlockchainIcon = response.name;
                              initReload();
                            },
                          });
                          return;
                        });
                      }}
                    />
                    <img
                      src={
                        Static.BlockchainIcon
                          ? `/assets/upload/${Static.BlockchainIcon}`
                          : images["research/logo-empty"]
                      }
                    />
                  </div>
                  <div
                    class="personal-input text"
                    contenteditable="plaintext-only"
                    oninput={function () {
                      Static.nameBlockchain = this.innerText.trim();
                    }}
                  >
                    {Static.nameBlockchain}
                  </div>
                  <button
                    class="btn btn-white ml-15"
                    onclick={async () => {
                      let create = await fn.socket.set({
                        method: "Blockchains",
                        action: "insert",
                        params: {
                          insert: {
                            name: Static.nameBlockchain,
                            icon: Static.BlockchainIcon,
                          },
                        },
                      });
                      Static.BlockchainIcon = null;
                      Static.nameBlockchain = "";
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
                        Static.BlockchainSearch = $el;
                      }}
                      type="text"
                      class="filter-fondlist_input form-input"
                      placeholder="Сhoose a blockchain"
                      oninput={function () {
                        let searchText = this.value.toLowerCase();
                        Static.showBlockchains = Static.items.filter((item) => {
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
                        Static.BlockchainsSearchDel = $el;
                      }}
                      onclick={() => {
                        Static.showBlockchains = Static.items;
                        Static.BlockchainSearch.value = "";
                        initReload("modals");
                      }}
                    >
                      x
                    </span>
                  </form>
                </div>
                <div class="fondlist-wrap">
                  {Static.showBlockchains.map((item) => {
                    return (
                      <div
                        class={[
                          "fondlist-item",
                          Static.blockchains_list == item
                            ? "fondlist-item_active"
                            : null,
                        ]}
                        onclick={() => {
                          console.log("=64bd17=", item);
                          if (Static.blockchains_list == item) {
                            Static.blockchains_list = {};
                          } else {
                            Static.blockchains_list = item;
                          }
                          // Static.blockchains_list == item;
                          console.log("=64bd17=", Static.blockchains_list);

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
                      Static.callback(Static.blockchains_list);
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
