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
  Static.chooseProject = {};
  Static.chooseUser = {};
  load({
    ID,
    fnLoad: async () => {
      Static.items = await fn.socket.get({ 
        method: "Projects",
        params: {
          filter: { moderation: true },
          populate: { path: "author" },
          find: { owner: { "$eq": null } }
        } 
      });

      console.log('=bf9dc6=',Static.items )

      Static.showProjects = Static.items;
      Static.users = await fn.socket.get({ method: "Users" });
      Static.showUsers = Static.users;
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
              <main class="main-modal owner-modal">
                <span class="text">Step 1. Choose project</span>
                <div class="fondlistForm-wrap mt-10">
                  <form class="filter-fondlist mb-15">
                    <input
                      Element={($el) => {
                        Static.ProjectsSearch = $el;
                      }}
                      type="text"
                      class="filter-fondlist_input form-input"
                      placeholder="Сhoose a project"
                      oninput={function () {
                        let searchText = this.value.toLowerCase();
                        Static.showProjects = Static.items.filter((item) => {
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
                {
                  Object.keys(Static.chooseProject).length ? 
                  <div class="fondList-wrap grid-2">
                    <span class="text">Selected projects</span>
                    <div class={["fondlist-item"]}>
                      <div class="fondlist-item_img">
                        <img
                          src={
                            Static.chooseProject?.icon
                              ? `/assets/upload/${Static.chooseProject.icon}`
                              : images["research/logo-empty"]
                          }
                        />
                      </div>
                      <span class="fondlist-item_desc">{Static.chooseProject?.name}</span>
                    </div>
                  </div> : null
                }
                
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
                <span class="text">Step 2. Choose owner profile</span>
                <div class="fondlistForm-wrap mt-10">
                  <form class="filter-fondlist mb-15">
                    <input
                      Element={($el) => {
                        Static.UsersSearch = $el;
                      }}
                      type="text"
                      class="filter-fondlist_input form-input"
                      placeholder="Сhoose a user"
                      oninput={function () {
                        let searchText = this.value.toLowerCase();
                        Static.showUsers = Static.users.filter((item) => {
                          if (item.firstName.toLowerCase().includes(searchText)) {
                            return true;
                          }
                        });
                        initReload("modals");
                      }}
                    />
                    <span
                      class="input-delete"
                      Element={($el) => {
                        Static.UsersSearchDel = $el;
                      }}
                      onclick={() => {
                        Static.showUsers = Static.users;
                        Static.UsersSearch.value = "";
                        initReload("modals");
                      }}
                    >
                      x
                    </span>
                  </form>
                </div>
                {
                  Object.keys(Static.chooseUser).length ? 
                  <div class="fondList-wrap grid-2">
                    <span class="text">
                      Selected user:
                    </span>
                    <div class={["fondlist-item",]} >
                      <div class="fondlist-item_img">
                        <img
                          style="border-radius: 50%;"
                          width="35"
                          height="35"
                          src={
                            Static.chooseUser?.icon
                              ? `/assets/upload/${Static.chooseUser.icon}`
                              : svg.user
                          }
                        />
                      </div>
                      <span class="fondlist-item_desc">{Static.chooseUser?.firstName}</span>
                    </div>
                  </div> : null
                }
                
                <div class="fondlist-wrap">
                  {Static.showUsers.map((item) => {
                    return (
                      <div
                        class={[
                          "fondlist-item",
                          Static.chooseUser == item
                            ? "fondlist-item_active"
                            : null,
                        ]}
                        onclick={() => {
                          if (Static.chooseUser == item) {
                            Static.chooseUser = {};
                          } else {
                            Static.chooseUser = item;
                          }
                          console.log('=owner=', Static.chooseUser.firstName)

                          initReload("modals");
                        }}
                      >
                        <div class="fondlist-item_img">
                          <img
                            style="border-radius: 50%;"
                            width="35"
                            height="35"
                            src={
                              item.icon
                                ? `/assets/upload/${item.icon}`
                                : images["research/logo-empty"]
                            }
                          />
                        </div>
                        <span class="fondlist-item_desc">{item.firstName}</span>
                      </div>
                    );
                  })}
                </div>
              </main>
              <footer class="footer-modal">
                <button
                  class="btn btn-white"
                  onclick={async() => {
                   
                    let response = await fn.socket.set({
                      method: "Projects",
                      action: "findOneAndUpdate",
                      params: {
                        update: { owner: Static.chooseUser._id, },
                        filter: {
                          _id: Static.chooseProject._id,
                        }
                      },
                    });
                    await fn.socket.set({
                      method: "HistoryOwner",
                      action: "insert",
                      params: {
                        insert: { 
                          idUser: Static.chooseUser._id,
                          projectId: Static.chooseProject._id,
                          type: "owner"
                        },
                      },
                    });

                    await fn.socket.send({
                      method: "SendTelegram",
                      params: {
                        type: "owner",
                        idProject: Static.chooseProject._id,
                        owner: Static.chooseUser._id,
                        author: Static.chooseProject.author._id
                      },
                    });
                    // await fn.socket.set({
                    //   method: "HistoryMarketplace",
                    //   action: "insert",
                    //   params: { insert: { type: "owner",  } },
                    // });
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
