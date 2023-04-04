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
    method: "Research",
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

  Static.fondList = [];
  Static.forms = {};
  Static.forms.socials = {
    youtube: {},
    facebook: {},
    twitter: {},
    discord: {},
    instagram: {},
    tiktok: {},
    twitch: {},
    vk: {},
    telegram: {},
    github: {},
    linkedin: {},
  };
  load({
    ID,
    fnLoad: async () => {
      if (!Variable.auth || !Variable.myInfo.role) {
        fn.siteLink("/");
        return;
      }
      if (Variable.dataUrl.params) {
        Static.item = await fn.socket.get({
          method: "Research",
          _id: Variable.dataUrl.params,
          params: { populate: { path: "fonds" } },
        });
        console.log("=9ebbf7=", Static.item);
        if (Static.item && !Static.item.gallery) {
          Static.item.gallery = [];
        }

        if (!Static.item.socials) {
          Static.item.socials = [];
        }

        if (!Static.item.utility) {
          Static.item.utility = {};
        }

        if (!Static.item.roadmap) {
          Static.item.roadmap = {};
        }

        if (!Static.item.tokenomics) {
          Static.item.tokenomics = {};
        }

        for (let item of Static.item.socials) {
          Static.forms.socials[item.name] = item;
        }

        if (!Static.item.team) {
          Static.item.team = {};
        }
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
                      title: "Research lists",
                      link: "/personal/admin/list/research/",
                    },
                    {
                      title: Static.item.name ? Static.item.name : "New record",
                    },
                  ]}
                />
                <section class="main mb-25 inner-add">
                  <h2 class="general-title mt-0">Edit Research</h2>
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
                  <div class="grid-2">
                    <div class="form-item wrap-logo">
                      <div class="picture">
                        <input
                          type="file"
                          hidden
                          Element={($el) => {
                            Static.elAddIcon = $el;
                          }}
                          onchange={async function (e) {
                            e.stopPropagation();
                            Array.from(this.files).forEach((item) => {
                              fn.uploadFile({
                                file: item,
                                onload: async function () {
                                  // console.log('=81bde2=', "onload")
                                  if (!this.response) {
                                    alert("Have some Error. Try again...");
                                    return;
                                  }
                                  let response = JSON.parse(this.response);
                                  // console.log('=35f155=', response)
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
                                onprogress: async function (e) {
                                  let contentLength;
                                  if (e.lengthComputable) {
                                    contentLength = e.total;
                                  } else {
                                    contentLength = parseInt(
                                      e.target.getResponseHeader(
                                        "x-decompressed-content-length"
                                      ),
                                      10
                                    );
                                  }
                                  console.log(
                                    "onprogress",
                                    e.loaded,
                                    contentLength
                                  );
                                },
                              });
                              return;
                            });
                          }}
                        />
                        <img
                          src={
                            Static.item.icon
                              ? `/assets/upload/${Static.item.icon}`
                              : images["research/logo-empty"]
                          }
                          width="50"
                          height="50"
                          onclick={() => {
                            Static.elAddIcon.click();
                          }}
                        ></img>
                      </div>
                      <div class="form-div">
                        <div
                          class="form-input personal-input"
                          contenteditable="plaintext-only"
                          oninput={function () {
                            Static.item.name = this.innerText.trim();
                            updateValue({
                              key: "name",
                              value: Static.item.name,
                            });
                          }}
                        >
                          {Static.item?.name
                            ? Static.item?.name
                            : "Name research"}
                        </div>
                      </div>
                    </div>

                    <div class="form-div">
                      <label>Total rank:</label>
                      <div class="form-input personal-input">
                        {Static.item.rank} (Auto calculate)
                      </div>
                    </div>
                  </div>
                  <div class="grid-3">
                    <div class="form-div">
                      <label>Tabs:</label>
                      <div class="dropdown">
                        <button
                          class="dropdown__button"
                          onclick={() => {
                            Static.selectList.tabs.classList.toggle(
                              "dropdown__list--visible"
                            );
                          }}
                        >
                          {Static.item.tabs}
                        </button>
                        <ul
                          class="dropdown__list"
                          Element={($el) => {
                            Static.selectList.tabs = $el;
                          }}
                        >
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.item.tabs = "seed";
                              updateValue({
                                key: "tabs",
                                value: Static.item.tabs,
                              });
                              Static.selectList.tabs.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            seed
                          </li>
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.item.tabs = "pre-seed";
                              updateValue({
                                key: "tabs",
                                value: Static.item.tabs,
                              });
                              Static.selectList.tabs.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            pre-seed
                          </li>
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.item.tabs = "strategic";
                              updateValue({
                                key: "tabs",
                                value: Static.item.tabs,
                              });
                              Static.selectList.tabs.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            strategic
                          </li>
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.item.tabs = "public";
                              updateValue({
                                key: "tabs",
                                value: Static.item.tabs,
                              });
                              Static.selectList.tabs.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            public
                          </li>
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.item.tabs = "private";
                              updateValue({
                                key: "tabs",
                                value: Static.item.tabs,
                              });
                              Static.selectList.tabs.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            private
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="form-div">
                      <label>Status:</label>
                      <div class="dropdown">
                        <button
                          class="dropdown__button"
                          onclick={() => {
                            Static.selectList.status.classList.toggle(
                              "dropdown__list--visible"
                            );
                          }}
                        >
                          {Static.item?.status
                            ? Static.item.status
                            : "Select status"}
                        </button>
                        <ul
                          class="dropdown__list"
                          Element={($el) => {
                            Static.selectList.status = $el;
                          }}
                        >
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.item.status = "Active";
                              updateValue({
                                key: "status",
                                value: Static.item.status,
                              });
                              Static.selectList.status.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            Active
                          </li>
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.item.status = "Listing";
                              updateValue({
                                key: "status",
                                value: Static.item.status,
                              });
                              Static.selectList.status.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            Listing
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="form-div">
                      <label>Category:</label>
                      <div class="dropdown">
                        <button
                          class="dropdown__button"
                          onclick={() => {
                            Static.selectList.category.classList.toggle(
                              "dropdown__list--visible"
                            );
                          }}
                        >
                          {Static.item?.category
                            ? Static.item.category
                            : "Select category"}
                        </button>
                        <ul
                          class="dropdown__list"
                          Element={($el) => {
                            Static.selectList.category = $el;
                          }}
                        >
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.item.category = "Platform";
                              updateValue({
                                key: "category",
                                value: Static.item.category,
                              });
                              Static.selectList.category.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            Platform
                          </li>
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.item.category = "Ecosystem";
                              updateValue({
                                key: "category",
                                value: Static.item.category,
                              });
                              Static.selectList.category.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            Ecosystem
                          </li>
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.item.category = "Service";
                              updateValue({
                                key: "category",
                                value: Static.item.category,
                              });
                              Static.selectList.category.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            Service
                          </li>
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.item.category = "DEX";
                              updateValue({
                                key: "category",
                                value: Static.item.category,
                              });
                              Static.selectList.category.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            DEX
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="form-item">
                    <label>Description:</label>
                    <div
                      style="min-height:100px;"
                      class="form-input personal-input"
                      contenteditable="plaintext-only"
                      oninput={function () {
                        Static.item.description = this.innerText.trim();
                        updateValue({
                          key: "description",
                          value: Static.item.description,
                        });
                      }}
                    >
                      {Static.item.description}
                    </div>
                  </div>

                  <div class="grid-3">
                    <div class="form-div">
                      <label>Seed round:</label>
                      <div
                        class="form-input personal-input"
                        contenteditable="plaintext-only"
                        oninput={function () {
                          Static.item.seedRound = Number(this.innerText.trim());
                          if (
                            Static.item.seedRound ||
                            Static.item.seedRound >= 0
                          ) {
                            updateValue({
                              key: "seedRound",
                              value: Static.item.seedRound,
                            });
                          }
                        }}
                      >
                        {Static.item.seedRound}
                      </div>
                    </div>
                    <div class="form-div">
                      <label>Invest:</label>
                      <div
                        class="form-input personal-input"
                        contenteditable="plaintext-only"
                        oninput={function () {
                          Static.item.have = Number(this.innerText.trim());
                          if (Static.item.have || Static.item.have >= 0) {
                            updateValue({
                              key: "have",
                              value: Static.item.have,
                            });
                          }
                        }}
                      >
                        {Static.item.have}
                      </div>
                    </div>
                    <div class="form-div">
                      <label>Target invest:</label>
                      <div
                        class="form-input personal-input"
                        contenteditable="plaintext-only"
                        oninput={function () {
                          Static.item.target = Number(this.innerText.trim());
                          if (Static.item.target || Static.item.target >= 0) {
                            updateValue({
                              key: "target",
                              value: Static.item.target,
                            });
                          }
                        }}
                      >
                        {Static.item.target}
                      </div>
                    </div>
                  </div>

                  <div class="" style="display:flex;">
                    {Object.keys(Static.forms.socials).map((item) => {
                      return (
                        <div
                          class={[
                            "create_social_icon",
                            Static.channelNewSocial == item
                              ? "create_social_icon_active"
                              : Static.forms.socials[item].link &&
                                Static.forms.socials[item].link.length
                              ? "create_social_icon_have"
                              : null,
                          ]}
                          onclick={(e) => {
                            e.preventDefault();
                            Static.channelNewSocial = item;
                            Static.viewForm = true;
                            Static.elSocialInput.innerText =
                              Static.forms.socials[item].link;
                            initReload();
                          }}
                        >
                          <div class="create_social_icon_inner">
                            <img src={svg[`socials/${item}-white`]} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    hidden={!Static.viewForm}
                    class="form-input personal-input"
                    contenteditable="plaintext-only"
                    Element={(el) => {
                      Static.elSocialInput = el;
                    }}
                    oninput={function () {
                      Static.forms.socials[Static.channelNewSocial].link =
                        this.innerText.trim();
                      let tmpSocials = [];
                      for (let key in Static.forms.socials) {
                        tmpSocials.push({
                          name: key,
                          link: Static.forms.socials[key].link,
                        });
                      }
                      Static.item.socials = tmpSocials;
                      updateValue({
                        key: "socials",
                        value: Static.item.socials,
                      });
                    }}
                  ></div>

                  <div class="grid-2">
                    <div class="form-div">
                      <label>Start date:</label>
                      <div class="form-input personal-input">
                        <input
                          type="date"
                          max="9999-12-31T23:59"
                          value={
                            !Static.item.startDate
                              ? fn.moment().format("YYYY-MM-DD")
                              : fn
                                  .moment(Static.item.startDate)
                                  .format("YYYY-MM-DD")
                          }
                          oninput={function (e) {
                            Static.item.startDate = this.value;
                            updateValue({
                              key: "startDate",
                              value: Static.item.startDate,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div class="form-div">
                      <label>End date:</label>
                      <div class="form-input personal-input">
                        <input
                          type="date"
                          max="9999-12-31T23:59"
                          value={
                            !Static.item.endDate
                              ? fn.moment().format("YYYY-MM-DD")
                              : fn
                                  .moment(Static.item.endDate)
                                  .format("YYYY-MM-DD")
                          }
                          oninput={function (e) {
                            Static.item.endDate = this.value;
                            updateValue({
                              key: "endDate",
                              value: Static.item.endDate,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="inner-add">
                    <h4>Upload gallery</h4>
                    <div
                      class="add"
                      onclick={() => {
                        Static.elAddMedia.click();
                      }}
                    >
                      +
                    </div>
                  </div>
                  <div class="form-item pictures">
                    <input
                      type="file"
                      hidden
                      Element={($el) => {
                        Static.elAddMedia = $el;
                      }}
                      onchange={async function (e) {
                        e.stopPropagation();
                        Array.from(this.files).forEach((item) => {
                          fn.uploadFile({
                            file: item,
                            onload: async function () {
                              // console.log('=81bde2=', "onload")
                              if (!this.response) {
                                alert("Have some Error. Try again...");
                                return;
                              }
                              let response = JSON.parse(this.response);
                              // console.log('=35f155=', response)
                              if (response.error || !response.name) {
                                alert(
                                  "Have some Error. Try again... " +
                                    response.error
                                );
                                return;
                              }
                              Static.item.gallery.push(response.name);
                              updateValue({
                                key: "gallery",
                                value: Static.item.gallery,
                              });
                              // let tmp = await fn.socket.set({ method: "Research", action: "findOneAndUpdate", _id: Static.item._id, params: { update: { gallery: Static.item.gallery } } })
                              initReload();
                            },
                            onprogress: async function (e) {
                              let contentLength;
                              if (e.lengthComputable) {
                                contentLength = e.total;
                              } else {
                                contentLength = parseInt(
                                  e.target.getResponseHeader(
                                    "x-decompressed-content-length"
                                  ),
                                  10
                                );
                              }
                              console.log(
                                "onprogress",
                                e.loaded,
                                contentLength
                              );
                            },
                          });
                          return;
                        });
                      }}
                    />
                    {Static.item.gallery.map((item, index) => {
                      return (
                        <div class="news-form_gallery">
                          <div class="news-form_gallery-image">
                            <img
                              src={`/assets/upload/${item}`}
                              width="200"
                              height="100"
                            ></img>
                            <div
                              class="news-form_gallery-delete"
                              onClick={() => {
                                Static.item.gallery.splice(index, 1);
                                updateRecords({ gallery: Static.item.gallery });
                                initReload();
                              }}
                            >
                              <img src={svg["delete_icon"]} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Problem</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        maxlength="2"
                        placeholder="0"
                        value={
                          Static.item.rankList.problem
                            ? Static.item.rankList.problem
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace(/[^0-9]/g, "");
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 10) {
                            this.value = 10;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.problem = Number(
                            // this.innerText.trim()
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.problem",
                            value: Static.item.rankList.problem,
                          });
                        }}
                      >
                        {Static.item.rankList.problem}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>
                    <div
                      class="scheme-card_desc personal-input text"
                      contenteditable="plaintext-only"
                      oninput={function () {
                        Static.item.problem = this.innerText.trim();
                        updateValue({
                          key: "problem",
                          value: Static.item.problem,
                        });
                      }}
                    >
                      {Static.item.problem}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Product</span>
                    </div>
                    <div
                      class="scheme-card_desc personal-input text"
                      contenteditable="plaintext-only"
                      oninput={function () {
                        Static.item.product = this.innerText.trim();
                        updateValue({
                          key: "product",
                          value: Static.item.product,
                        });
                      }}
                    >
                      {Static.item.product}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Solution</span>
                    </div>
                    <div
                      class="scheme-card_desc personal-input text"
                      contenteditable="plaintext-only"
                      oninput={function () {
                        Static.item.solution = this.innerText.trim();
                        updateValue({
                          key: "solution",
                          value: Static.item.solution,
                        });
                      }}
                    >
                      {Static.item.solution}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Investors</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.investors
                            ? Static.item.rankList.investors
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace(/[^0-9]/g, "");
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 100) {
                            this.value = 100;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.investors = Number(
                            // this.innerText.trim()
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.investors",
                            value: Static.item.rankList.investors,
                          });
                        }}
                      >
                        {Static.item.rankList.investors}
                      </input>
                      <span class="text-green">Max. 100</span>
                    </div>
                    <div
                      class="scheme-card_desc personal-input text"
                      contenteditable="plaintext-only"
                      oninput={function () {
                        Static.item.investors = this.innerText.trim();
                        updateValue({
                          key: "investors",
                          value: Static.item.investors,
                        });
                      }}
                    >
                      {Static.item.investors}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>{Static.item.tabs} Round</span>
                    </div>

                    <div class="scheme-card_desc">
                      <div
                        class={["add", "mb-15"]}
                        onclick={() => {
                          fn.modals.FondList({
                            title: "Fund list",
                            listsFonds: Static.item.fonds,
                            callback: async (filterFonds) => {
                              console.log("=666583=", filterFonds);
                              Static.item.fonds = filterFonds;
                              if (!filterFonds.length) {
                                return;
                              }
                              await updateRecords({ fonds: Static.item.fonds });
                              let tmp = await fn.socket.get({
                                method: "Research",
                                _id: Variable.dataUrl.params,
                                params: { populate: { path: "fonds" } },
                              });
                              if (tmp.fonds) {
                                Static.item.fonds = tmp.fonds;
                              }

                              initReload();
                              return;
                            },
                          });
                        }}
                      >
                        +
                      </div>

                      <div class="fondlist-wrap">
                        {(Static.item.fonds || []).map((item, index) => {
                          return (
                            <div class="fondlist-item">
                              <img
                                class="icon-delete"
                                src={svg["delete_icon"]}
                                onclick={() => {
                                  Static.item.fonds.splice(index, 1);
                                  updateRecords({
                                    fonds: Static.item.fonds,
                                  });
                                  initReload();
                                }}
                              ></img>
                              <div class="fondlist-item_img">
                                <img
                                  src={
                                    item.icon
                                      ? `/assets/upload/${item.icon}`
                                      : images["research/logo-empty"]
                                  }
                                />
                              </div>
                              <span class="fondlist-item_desc">
                                {item.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Tokenomics</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        maxlength="2"
                        placeholder="0"
                        value={
                          Static.item.rankList.tokenomics
                            ? Static.item.rankList.tokenomics
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace(/[^0-9]/g, "");
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 10) {
                            this.value = 10;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.tokenomics = Number(
                            // this.innerText.trim()
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.tokenomics",
                            value: Static.item.rankList.tokenomics,
                          });
                        }}
                      >
                        {Static.item.rankList.tokenomics}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>

                    <div class="scheme-card_desc">
                      <div class="scheme-card_roadmap">
                        <div class="scheme-card_roadmap-img">
                          <div
                            class={[
                              "add",
                              "mb-15",
                              Static.item.tokenomics.image
                                ? "add-hidden"
                                : null,
                            ]}
                            onclick={() => {
                              Static.mediaTokenomics.click();
                            }}
                          >
                            +
                          </div>
                          <div class="picture">
                            <input
                              type="file"
                              hidden
                              Element={($el) => {
                                Static.mediaTokenomics = $el;
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
                                      Static.item.tokenomics.image =
                                        response.name;
                                      updateValue({
                                        key: "tokenomics.image",
                                        value: Static.item.tokenomics.image,
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
                                  Static.item.tokenomics.image
                                    ? `/assets/upload/${Static.item.tokenomics.image}`
                                    : images["research/logo-empty"]
                                }
                              />
                              <div
                                class={["news-form_gallery-delete"]}
                                onclick={() => {
                                  Static.item.tokenomics.image = "";
                                  updateValue({
                                    key: "roadmap.image",
                                    value: Static.item.tokenomics.image,
                                  });
                                  initReload();
                                }}
                              >
                                <img
                                  class={
                                    Static.item.tokenomics.image
                                      ? null
                                      : "add-hidden"
                                  }
                                  src={svg["delete_icon"]}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="scheme-card_roadmap-desc">
                          <div
                            class="scheme-card_desc personal-input text mb-15"
                            contenteditable="plaintext-only"
                            oninput={function () {
                              Static.item.tokenomics.text =
                                this.innerText.trim();
                              updateValue({
                                key: "tokenomics.text",
                                value: Static.item.tokenomics.text,
                              });
                            }}
                          >
                            {Static.item.tokenomics?.text}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Utility and Value</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        maxlength="2"
                        placeholder="0"
                        value={
                          Static.item.rankList.utility
                            ? Static.item.rankList.utility
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace(/[^0-9]/g, "");
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 10) {
                            this.value = 10;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.utility = Number(
                            // this.innerText.trim()
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.utility",
                            value: Static.item.rankList.utility,
                          });
                        }}
                      >
                        {Static.item.rankList.utility}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>

                    <div class="scheme-card_desc">
                      <div class="scheme-row">
                        <div>Token Utility</div>
                        <div
                          class="text personal-input"
                          contenteditable="plaintext-only"
                          oninput={function () {
                            Static.item.utility.token = this.innerText.trim();
                            updateValue({
                              key: "utility",
                              value: Static.item.utility,
                            });
                          }}
                        >
                          {Static.item.utility?.token}
                        </div>
                      </div>
                      <div class="scheme-row">
                        <div>Value capture</div>
                        <div
                          class="text personal-input"
                          contenteditable="plaintext-only"
                          oninput={function () {
                            Static.item.utility.capture = this.innerText.trim();
                            updateValue({
                              key: "utility",
                              value: Static.item.utility,
                            });
                          }}
                        >
                          {Static.item.utility?.capture}
                        </div>
                      </div>
                      <div class="scheme-row">
                        <div>Value accural</div>
                        <div
                          class="text personal-input"
                          contenteditable="plaintext-only"
                          oninput={function () {
                            Static.item.utility.accural = this.innerText.trim();
                            updateValue({
                              key: "utility",
                              value: Static.item.utility,
                            });
                          }}
                        >
                          {Static.item.utility?.accural}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Team</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        maxlength="2"
                        placeholder="0"
                        value={
                          Static.item.rankList.team
                            ? Static.item.rankList.team
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace(/[^0-9]/g, "");
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 10) {
                            this.value = 10;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.team = Number(
                            // this.innerText.trim()
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.team",
                            value: Static.item.rankList.team,
                          });
                        }}
                      >
                        {Static.item.rankList.team}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>

                    <div class="scheme-card_desc">
                      <div
                        class="personal-input text mb-15"
                        contenteditable="plaintext-only"
                        oninput={function () {
                          Static.item.team.text = this.innerText.trim();
                          updateValue({
                            key: "team.text",
                            value: Static.item.team.text,
                          });
                        }}
                      >
                        {Static.item.team?.text}
                      </div>
                      {/* поля для заполнения текста ^ */}
                      <div
                        class={["add", "mb-15"]}
                        onclick={() => {
                          if (!Static.item.team?.records) {
                            Static.item.team.records = [];
                          }
                          Static.item.team.records.push({});
                          initReload();
                        }}
                      >
                        +
                      </div>
                      {/* add + нового члена команды ^ */}

                      <input
                        type="file"
                        hidden
                        Element={($el) => {
                          Static.addPartner = $el;
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
                                Static.item.team["image"] = response.name;
                                updateValue({
                                  key: "team",
                                  value: Static.item.team,
                                });
                                initReload();
                              },
                            });
                            return;
                          });
                        }}
                      />
                      <div class="scheme-team">
                        {(Static.item.team?.records || []).map(
                          (item, index) => {
                            return (
                              <div class="scheme-team_item">
                                <img
                                  onclick={() => {
                                    Static.item.team.records.splice(index, 1);
                                    updateRecords({
                                      "team.records": Static.item.team.records,
                                    });
                                    initReload();
                                  }}
                                  class="icon-delete"
                                  src={svg["delete_icon"]}
                                />
                                <div
                                  class="scheme-team_item-img"
                                  onclick={() => {
                                    // Static.teamMedia.click();
                                    Static[`teamMedia${index}`].click();
                                  }}
                                >
                                  <input
                                    type="file"
                                    hidden
                                    Element={($el) => {
                                      // Static.teamMedia = $el;
                                      Static[`teamMedia${index}`] = $el;
                                    }}
                                    onchange={async function (e) {
                                      e.stopPropagation();
                                      Array.from(this.files).forEach((item) => {
                                        fn.uploadFile({
                                          file: item,
                                          onload: async function () {
                                            if (!this.response) {
                                              alert(
                                                "Have some Error. Try again..."
                                              );
                                              return;
                                            }
                                            let response = JSON.parse(
                                              this.response
                                            );
                                            if (
                                              response.error ||
                                              !response.name
                                            ) {
                                              alert(
                                                "Have some Error. Try again... " +
                                                  response.error
                                              );
                                              return;
                                            }
                                            Static.item.team.records[
                                              index
                                            ].image = response.name;
                                            updateValue({
                                              key: "team.records",
                                              value: Static.item.team.records,
                                            });
                                            initReload();
                                          },
                                        });
                                        return;
                                      });
                                    }}
                                  />
                                  <img
                                    src={
                                      item.image
                                        ? `/assets/upload/${item.image}`
                                        : images["research/logo-empty"]
                                    }
                                  />
                                </div>
                                <div
                                  class="personal-input text mb-15"
                                  contenteditable="plaintext-only"
                                  oninput={function () {
                                    Static.item.team.records[index].fio =
                                      this.innerText.trim();
                                    updateValue({
                                      key: "team.records",
                                      value: Static.item.team.records,
                                    });
                                  }}
                                >
                                  {item?.fio}
                                </div>
                                <div
                                  class="personal-input text"
                                  contenteditable="plaintext-only"
                                  oninput={function () {
                                    Static.item.team.records[index].link =
                                      this.innerText.trim();
                                    updateValue({
                                      key: "team.records",
                                      value: Static.item.team.records,
                                    });
                                  }}
                                >
                                  {item?.link}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Roadmap</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        maxlength="2"
                        placeholder="0"
                        value={
                          Static.item.rankList.roadmap
                            ? Static.item.rankList.roadmap
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace(/[^0-9]/g, "");
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 10) {
                            this.value = 10;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.roadmap = Number(
                            // this.innerText.trim()
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.roadmap",
                            value: Static.item.rankList.roadmap,
                          });
                        }}
                      >
                        {Static.item.rankList.roadmap}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>

                    <div class="scheme-card_desc">
                      <div class="scheme-card_roadmap">
                        <div class="scheme-card_roadmap-img">
                          <div
                            class={[
                              "add",
                              "mb-15",
                              Static.item.roadmap.image ? "add-hidden" : null,
                            ]}
                            onclick={() => {
                              Static.mediaRoadmap.click();
                            }}
                          >
                            +
                          </div>
                          <div class="picture">
                            <input
                              type="file"
                              hidden
                              Element={($el) => {
                                Static.mediaRoadmap = $el;
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
                                      Static.item.roadmap.image = response.name;
                                      updateValue({
                                        key: "roadmap.image",
                                        value: Static.item.roadmap.image,
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
                                  Static.item.roadmap.image
                                    ? `/assets/upload/${Static.item.roadmap.image}`
                                    : images["research/logo-empty"]
                                }
                              />
                              <div
                                class="news-form_gallery-delete"
                                onclick={() => {
                                  Static.item.roadmap.image = "";
                                  // updateRecords({
                                  //   gallery: Static.item.gallery,
                                  // });
                                  updateValue({
                                    key: "roadmap.image",
                                    value: Static.item.roadmap.image,
                                  });
                                  initReload();
                                }}
                              >
                                <img src={svg["delete_icon"]} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="scheme-card_roadmap-desc">
                          <div
                            class="scheme-card_desc personal-input text mb-15"
                            contenteditable="plaintext-only"
                            oninput={function () {
                              Static.item.roadmap.text = this.innerText.trim();
                              updateValue({
                                key: "roadmap.text",
                                value: Static.item.roadmap.text,
                              });
                            }}
                          >
                            {Static.item.roadmap?.text}
                          </div>
                          <div
                            class="scheme-card_desc personal-input text"
                            contenteditable="plaintext-only"
                            oninput={function () {
                              Static.item.roadmap.link = this.innerText.trim();
                              updateValue({
                                key: "roadmap.link",
                                value: Static.item.roadmap.link,
                              });
                            }}
                          >
                            {Static.item.roadmap?.link}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Documentation</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        maxlength="2"
                        placeholder="0"
                        value={
                          Static.item.rankList.documentation
                            ? Static.item.rankList.documentation
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace(/[^0-9]/g, "");
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 10) {
                            this.value = 10;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.documentation = Number(
                            // this.innerText.trim()
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.documentation",
                            value: Static.item.rankList.documentation,
                          });
                        }}
                      >
                        {Static.item.rankList.documentation}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>
                    <div
                      class="scheme-card_desc personal-input text"
                      contenteditable="plaintext-only"
                      oninput={function () {
                        Static.item.documentation = this.innerText.trim();
                        updateValue({
                          key: "documentation",
                          value: Static.item.documentation,
                        });
                      }}
                    >
                      {Static.item.documentation}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Social</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        maxlength="2"
                        placeholder="0"
                        value={
                          Static.item.rankList.social
                            ? Static.item.rankList.social
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace(/[^0-9]/g, "");
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 10) {
                            this.value = 10;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.social = Number(
                            // this.innerText.trim()
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.social",
                            value: Static.item.rankList.social,
                          });
                        }}
                      >
                        {Static.item.rankList.social}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>
                    <div
                      class="scheme-card_desc personal-input text"
                      contenteditable="plaintext-only"
                      oninput={function () {
                        Static.item.social = this.innerText.trim();
                        updateValue({
                          key: "social",
                          value: Static.item.social,
                        });
                      }}
                    >
                      {Static.item.social}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Launchpad</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        maxlength="2"
                        placeholder="0"
                        value={
                          Static.item.rankList.launchpad
                            ? Static.item.rankList.launchpad
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace(/[^0-9]/g, "");
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 10) {
                            this.value = 10;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.launchpad = Number(
                            // this.innerText.trim()
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.launchpad",
                            value: Static.item.rankList.launchpad,
                          });
                        }}
                      >
                        {Static.item.rankList.launchpad}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>
                    <div
                      class="scheme-card_desc personal-input text"
                      contenteditable="plaintext-only"
                      oninput={function () {
                        Static.item.launchpad = this.innerText.trim();
                        updateValue({
                          key: "launchpad",
                          value: Static.item.launchpad,
                        });
                      }}
                    >
                      {Static.item.launchpad}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>CEX/DEX</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        maxlength="2"
                        placeholder="0"
                        value={
                          Static.item.rankList.cexDex
                            ? Static.item.rankList.cexDex
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace(/[^0-9]/g, "");
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 10) {
                            this.value = 10;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.cexDex = Number(
                            // this.innerText.trim()
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.cexDex",
                            value: Static.item.rankList.cexDex,
                          });
                        }}
                      >
                        {Static.item.rankList.cexDex}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>
                    <div
                      class="scheme-card_desc personal-input text"
                      contenteditable="plaintext-only"
                      oninput={function () {
                        Static.item.cexDex = this.innerText.trim();
                        updateValue({
                          key: "cexDex",
                          value: Static.item.cexDex,
                        });
                      }}
                    >
                      {Static.item.cexDex}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Listing on aggregator</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        maxlength="2"
                        placeholder="0"
                        value={
                          Static.item.rankList.aggregator
                            ? Static.item.rankList.aggregator
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace(/[^0-9]/g, "");
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 10) {
                            this.value = 10;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.aggregator = Number(
                            // this.innerText.trim()
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.aggregator",
                            value: Static.item.rankList.aggregator,
                          });
                        }}
                      >
                        {Static.item.rankList.aggregator}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>
                    <div
                      class="scheme-card_desc personal-input text"
                      contenteditable="plaintext-only"
                      oninput={function () {
                        Static.item.aggregator = this.innerText.trim();
                        updateValue({
                          key: "aggregator",
                          value: Static.item.aggregator,
                        });
                      }}
                    >
                      {Static.item.aggregator}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Competitors</span>
                    </div>
                    <div
                      class="scheme-card_desc personal-input text"
                      contenteditable="plaintext-only"
                      oninput={function () {
                        Static.item.competitors = this.innerText.trim();
                        updateValue({
                          key: "competitors",
                          value: Static.item.competitors,
                        });
                      }}
                    >
                      {Static.item.competitors}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Media</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        maxlength="2"
                        placeholder="0"
                        value={
                          Static.item.rankList.mediaText
                            ? Static.item.rankList.mediaText
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace(/[^0-9]/g, "");
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 10) {
                            this.value = 10;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.mediaText = Number(
                            // this.innerText.trim()
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.mediaText",
                            value: Static.item.rankList.mediaText,
                          });
                        }}
                      >
                        {Static.item.rankList.mediaText}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>
                    <div
                      class="scheme-card_desc personal-input text"
                      contenteditable="plaintext-only"
                      oninput={function () {
                        Static.item.mediaText = this.innerText.trim();
                        updateValue({
                          key: "mediaText",
                          value: Static.item.mediaText,
                        });
                      }}
                    >
                      {Static.item.mediaText}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Audit</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        maxlength="2"
                        placeholder="0"
                        value={
                          Static.item.rankList.audit
                            ? Static.item.rankList.audit
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace(/[^0-9]/g, "");
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 10) {
                            this.value = 10;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.audit = Number(
                            // this.innerText.trim()
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.audit",
                            value: Static.item.rankList.audit,
                          });
                        }}
                      >
                        {Static.item.rankList.audit}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>
                    <div
                      class="scheme-card_desc personal-input text"
                      contenteditable="plaintext-only"
                      oninput={function () {
                        Static.item.audit = this.innerText.trim();
                        updateValue({ key: "audit", value: Static.item.audit });
                      }}
                    >
                      {Static.item.audit}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>TOTAL</span>
                      <div
                        class="form-input personal-input text-green"
                        contenteditable="plaintext-only"
                        oninput={function () {
                          Static.item.rankList.totalText = Number(
                            this.innerText.trim()
                          );
                          if (
                            Static.item.rankList.totalText ||
                            Static.item.rankList.totalText >= 0
                          ) {
                            updateValue({
                              key: "rankList.totalText",
                              value: Static.item.rankList.totalText,
                            });
                          }
                        }}
                      >
                        {Static.item.rankList.totalText}
                      </div>
                    </div>
                    <div
                      class="scheme-card_desc personal-input text"
                      contenteditable="plaintext-only"
                      oninput={function () {
                        Static.item.totalText = this.innerText.trim();
                        updateValue({
                          key: "totalText",
                          value: Static.item.totalText,
                        });
                      }}
                    >
                      {Static.item.totalText}
                    </div>
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
