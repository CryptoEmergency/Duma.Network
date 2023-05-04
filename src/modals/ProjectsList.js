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
  Static.chooseProject;
  load({
    ID,
    fnLoad: async () => {
      Static.items = await fn.socket.get({ method: "Projects" });
      Static.showProjects = Static.items;
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

              </header>
              <main class="main-modal">
                <div class="fondlistForm-wrap">
                  <form class="filter-fondlist mb-15">
                    <input
                      Element={($el) => {
                        Static.ProjectsSearch = $el;
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
                        Static.ProjectsSearchDel = $el;
                      }}
                      onclick={() => {
                        Static.showProjects = Static.items;
                        Static.ProjectsSearch.value = "";
                        initReload("modals");
                      }}
                    >
                      x
                    </span>
                  </form>
                </div>
                <div class="fondlist-wrap">
                  {Static.showProjects.map((item) => {
                    return (
                      <div
                        class={[
                          "fondlist-item",
                          Static.chooseProject == item
                            ? "fondlist-item_active"
                            : null,
                        ]}
                        onclick={() => {
                          if (Static.chooseProject == item) {
                            Static.chooseProject = {};
                          } else {
                            Static.chooseProject = item;
                          }
                          console.log("=64bd17=", Static.chooseProject._id);

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
                  onclick={async() => {
                    let insert = {
                      projectId: Static.chooseProject._id
                    };
                    let response = await fn.socket.set({
                      method: "ResearchAnalyst",
                      action: "insert",
                      params: { insert }
                    });
                    // if (Static.callback) {
                    //   Static.callback(Static.chooseProject);
                    // }
                    initReload()
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
