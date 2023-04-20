import {
  jsx,
  jsxFrag,
  load,
  Data,
  Variable,
  initReload,
} from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";

const updateValue = async function ({ key, value }) {
  if (Data.Static.timerChange[key]) {
    clearTimeout(Data.Static.timerChange[key]);
    delete Data.Static.timerChange[key];
  }
  Data.Static.timerChange[key] = setTimeout(async () => {
    let update = {};
    update[key] = value;
    updateRecords(update);
  }, 300);
};

const updateRecords = async function (update) {
  let response = await fn.socket.set({
    method: "News",
    action: "findOneAndUpdate",
    _id: Data.Static.item._id,
    params: { update },
  });
  if (!response || response.error) {
    console.log("=updateRecords= Error", response);
  }
  // console.log("=a0d3c8=", response);
};

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });

  load({
    ID,
    fnLoad: async () => {
      if (!Variable.auth || !Variable.myInfo.role) {
        fn.siteLink("/");
        return;
      }
      if (Variable.dataUrl.params) {
        Static.item = await fn.socket.get({
          method: "News",
          _id: Variable.dataUrl.params,
          params: { populate: { path: "projectId" } },
        });
        Static.researchList = await fn.socket.get({
          method: "Research",
          params: { filter: { moderation: true } },
        });
        console.log("=9ebbf7=", Static.item);
      }
    },
    fn: () => {
      if (!Variable.auth || !Variable.myInfo.role) {
        fn.siteLink("/");
        return <div></div>;
      }
      if (!Static.item || !Static.item._id) {
        return <div>Not found</div>;
      }
      return (
        <div class="wrapper">
          <div class="personal-inner">
            <Elements.BlockMenu />
            <div class="personal-main">
              <Elements.BlockPersonal />
              <div class="personal-content">
                <Elements.Bredcrumbs
                  items={[
                    { title: "Admin", link: "/personal/admin/" },
                    {
                      title: "News lists",
                      link: "/personal/admin/list/news/",
                    },
                    {
                      title: Static.item.title
                        ? Static.item.title
                        : "New record",
                    },
                  ]}
                />
                <section class="main mY-25 inner-add">
                  <h2 class="general-title mt-0">Edit New</h2>
                  <label
                    style={
                      Static.item.moderation ? "color:green;" : "color:red;"
                    }
                  >
                    {Static.item.moderation ? "Show" : "Hidden"}
                  </label>
                  <div class="switcher mt-0 ">
                    <input
                      id="switch-moderation"
                      type="checkbox"
                      checked={Static.item.moderation}
                      onchange={() => {
                        Static.item.moderation = !Static.item.moderation;
                        updateValue({
                          key: "moderation",
                          value: Static.item.moderation,
                        });
                        initReload();
                      }}
                    ></input>
                    <label for="switch-moderation"></label>
                  </div>
                </section>
                <div class="personal-form">
                  <div class="form-item">
                    <span>Title new:</span>
                    <div class="form-div">
                      <div
                        class="form-input personal-input mr-15"
                        style="min-height=100px;max-width: 600px"
                        contenteditable="plaintext-only"
                        oninput={function () {
                          Static.item.title = this.innerText.trim();
                          updateValue({
                            key: "title",
                            value: Static.item.title,
                          });
                        }}
                      >
                        {Static.item.title}
                      </div>
                      <div class="form-div">
                        <span class="mr-15">Project:</span>
                        <div class="dropdown">
                          <button
                            class="dropdown__button"
                            onclick={() => {
                              Static.projectList.classList.toggle(
                                "dropdown__list--visible"
                              );
                            }}
                          >
                            {Static.item?.projectId
                              ? Static.item?.projectId?.name
                              : "Select project"}
                          </button>
                          <ul
                            class="dropdown__list"
                            Element={($el) => {
                              Static.projectList = $el;
                            }}
                          >
                            {Static.researchList.map((item, index) => {
                              return (
                                <li
                                  class="dropdown__list-item"
                                  onclick={() => {
                                    Static.item.projectId = item._id;
                                    updateValue({
                                      key: "projectId",
                                      value: item._id,
                                      params: {
                                        populate: { path: "projectId" },
                                      },
                                    });
                                    Static.projectList.classList.remove(
                                      "dropdown__list--visible"
                                    );
                                    initReload();
                                  }}
                                >
                                  {item.name}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="grid-2">
                    <div class="form-div">
                      <h4>Upload image for new</h4>
                      <div
                        class={[
                          "add",
                          "ml-15",
                          Static.item.icon ? "add-hidden" : null,
                        ]}
                        onclick={() => {
                          Static.mediaNew.click();
                        }}
                      >
                        +
                      </div>
                    </div>
                    <div class="picture">
                      <input
                        type="file"
                        hidden
                        Element={($el) => {
                          Static.mediaNew = $el;
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
                                Static.item.icon = response.name;
                                updateValue({
                                  key: "icon",
                                  value: Static.item.icon,
                                });
                                initReload();
                              },
                            });
                            return;
                          });
                        }}
                      />
                      <div class="news-form_gallery-image">
                        <img
                          class="roadmap-img"
                          src={
                            Static.item?.icon
                              ? `/assets/upload/${Static.item.icon}`
                              : images["research/logo-empty"]
                          }
                        />
                        <div
                          class="news-form_gallery-delete"
                          onclick={() => {
                            Static.item.icon = "";
                            updateValue({
                              key: "icon",
                              value: Static.item.icon,
                            });
                            initReload();
                          }}
                        >
                          <img src={svg["delete_icon"]} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <span>Description</span>
                  <div
                    class="form-input personal-input mr-15"
                    style="min-height=100px;"
                    contenteditable="plaintext-only"
                    oninput={function () {
                      Static.item.text = this.innerText.trim();
                      updateValue({
                        key: "text",
                        value: Static.item.text,
                      });
                    }}
                  >
                    {Static.item.text}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
