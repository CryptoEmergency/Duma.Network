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

const categoryList = [
  {
    title: "Another",
  },
  {
    title: "Art",
  },
  {
    title: "AI",
  },
  {
    title: "BC Service",
  },
  {
    title: "Bridge",
  },
  {
    title: "CEX",
  },
  {
    title: "CeFi",
  },
  {
    title: "DAO",
  },
  {
    title: "DAPP",
  },
  {
    title: "DEX",
  },
  {
    title: "DPoS",
  },
  {
    title: "Data Service",
  },
  {
    title: "DeFi",
  },
  {
    title: "Derivatives",
  },
  {
    title: "Ecosystem",
  },
  {
    title: "Education",
  },
  {
    title: "Fan Token",
  },
  {
    title: "GameFi",
  },
  {
    title: "cGuild",
  },
  {
    title: "Governance",
  },
  {
    title: "Infrastructure",
  },
  {
    title: "Identity",
  },
  {
    title: "L1",
  },
  {
    title: "L2",
  },
  {
    title: "L3",
  },
  {
    title: "Launchpad",
  },
  {
    title: "Lending",
  },
  {
    title: "Marketplace",
  },
  {
    title: "Metaverse",
  },
  {
    title: "Mobile",
  },
  {
    title: "M2E",
  },
  {
    title: "SocialFi",
  },
];

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
    method: "ResearchAnalyst",
    action: "findOneAndUpdate",
    _id: Data.Static.item._id,
    params: { update },
  });
  if (!response || response.error) {
    console.log("=updateRecords= Error", response);
  }
};

const countTotalRank = function () {
  let total = 0;
  for (let key in Data.Static.item.rankList) {
    total += Data.Static.item.rankList[key];
  }
  updateValue({
    key: "rank",
    value: total,
  });
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
    site: {},
  };
  load({
    ID,
    fnLoad: async () => {
      if (!Variable.auth || !Variable.myInfo._id == '6454ef0ef4baaaecaff06672') {
        fn.siteLink("/");
        return;
      }
      if (Variable.dataUrl.params) {
        Static.item = await fn.socket.get({
          method: "ResearchAnalyst",
          _id: Variable.dataUrl.params,
          params: { 
            populate: { 
              path: "author fonds projectId",
            } 
          },
        });
        console.log('=55a4b6=',Static.item)
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
        if (!Static.item.blockchains) {
          Static.item.blockchains = {};
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
      if (!Variable.auth || !Variable.myInfo._id == '6454ef0ef4baaaecaff06672') {
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
                    {
                      title: "Research lists",
                      link: "/personal/moderator/list/research/",
                    },
                    {
                      title: Static.item.projectId?.name ? Static.item.projectId?.name : "Research",
                    },
                  ]}
                />
                <section class="inner-add mb-15">
                  <h2 class="general-title mt-0">Research verification</h2>
                  <div class="user-card mb-15 research-user">
                    <div class="user-picture mr-15">
                      <img src={Static.item.author?.icon ? 
                        `/assets/upload/${Static.item.author?.icon}` : svg.user} />
                      <div class="user-status">
                        {Static.item.author?.status}
                      </div>
                    </div>
                    <div class="user-info">
                      <span class="text-green">Author</span>
                      <div class="user-name">{Static.item.author?.firstName}</div>
                    </div>
                  </div>
                </section>
                <div class="personal-form">
                  <div class="grid-2">
                    <div class="wrap-logo">
                      <div class="picture">
                        <img
                          src={
                            Static.item.projectId.icon
                              ? `/assets/upload/${Static.item.projectId.icon}`
                              : images["research/logo-empty"]
                          }
                          width="50"
                          height="50"
                        ></img>
                      </div>
                      <div class="form-div">
                        <div class="form-input personal-input">
                          {Static.item.projectId?.name
                            ? Static.item.projectId?.name
                            : "Name research"}
                        </div>
                      </div>
                    </div>                    
                  </div>
                  <div class="grid-3">
                    <div class="form-div">
                      <label>Round:</label>
                      <div class="dropdown">
                        <button
                          class="dropdown__button"
                          onclick={() => {
                            Static.selectList.rounds.classList.toggle(
                              "dropdown__list--visible"
                            );
                          }}
                        >
                          {Static.item?.round ? Static.item?.round : "Select round"}
                        </button>
                        <ul
                          class="dropdown__list"
                          Element={($el) => {
                            Static.selectList.rounds = $el;
                          }}
                        >
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.item.round = "seed";
                              updateValue({
                                key: "round",
                                value: Static.item.round,
                              });
                              Static.selectList.rounds.classList.remove(
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
                              Static.item.round = "pre-seed";
                              updateValue({
                                key: "round",
                                value: Static.item.round,
                              });
                              Static.selectList.rounds.classList.remove(
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
                              Static.item.round = "strategic";
                              updateValue({
                                key: "round",
                                value: Static.item.round,
                              });
                              Static.selectList.rounds.classList.remove(
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
                              Static.item.round = "public";
                              updateValue({
                                key: "round",
                                value: Static.item.round,
                              });
                              Static.selectList.rounds.classList.remove(
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
                              Static.item.round = "private";
                              updateValue({
                                key: "round",
                                value: Static.item.round,
                              });
                              Static.selectList.rounds.classList.remove(
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
                          {categoryList.map((item, index) => {
                            return (
                              <li
                                class="dropdown__list-item"
                                onclick={() => {
                                  Static.item.category = item.title;
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
                                {item.title}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div class="form-div">
                      <label>Total rank:</label>
                      <div class="form-input personal-input">
                        {Static.item.rank.toFixed(2)} (Auto calculate)
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
                  <div class="grid-2">
                    <div class="fondlist-wrap">
                      {Object.keys(Static.item.projectId.blockchains).length ? (
                        <div class="fondlist-item">
                          <div class="fondlist-item_img">
                            <img
                              src={
                                Static.item.projectId.blockchains.icon
                                  ? `/assets/upload/${Static.item.projectId.blockchains.icon}`
                                  : images["research/logo-empty"]
                              }
                            />
                          </div>
                          <span class="fondlist-item_desc">
                            {Static.item.projectId.blockchains.name}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div class="inner-add">
                    <h4>Upload gallery</h4>
                  </div>
                  <div class="form-item pictures">
                    {Static.item.gallery.map((item, index) => {
                      return (
                        <div class="news-form_gallery">
                          <div class="news-form_gallery-image">
                            <img
                              src={`/assets/upload/${item}`}
                              width="200"
                              height="100"
                            ></img>
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
                        // type="number"
                        type="text"
                        // step="any"
                        pattern="\d+(\.\d{2})?"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.problem
                            ? Static.item.rankList.problem
                            : "0"
                        }
                        oninput={function () {
                          // let value = this.value.replace (/\D/);
                          // let value = this.value.!(/^[А-Яа-яA-Za-z ]$/.test(e.key))
                          // this.value = this.value.replace(/[^\d\.,]/g, "");
                          // this.value = this.value.replace(/,/g, ".");
                          // if(this.value.match(/\./g).length > 1) {
                          //     this.value = this.value.substr(0, this.value.lastIndexOf("."));
                          // }
                          let value = this.value;
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 10) {
                            this.value = 10;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.problem = Number(
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.problem",
                            value: Static.item.rankList.problem,
                          });
                          countTotalRank();
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
                          let value = this.value.replace (/\D/, '');
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
                          countTotalRank();
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
                      <span>{Static.item.round} Round</span>
                    </div>

                    <div class="scheme-card_desc">
                      {/* <div
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
                      </div> */}

                      <div class="fondlist-wrap">
                        {(Static.item.fonds || []).map((item, index) => {
                          return (
                            <div class="fondlist-item">
                              {/* <img
                                class="icon-delete"
                                src={svg["delete_icon"]}
                                onclick={() => {
                                  Static.item.fonds.splice(index, 1);
                                  updateRecords({
                                    fonds: Static.item.fonds,
                                  });
                                  initReload();
                                }}
                              ></img> */}
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
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.tokenomics
                            ? Static.item.rankList.tokenomics
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace (/\D/, '');
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
                          countTotalRank();
                        }}
                      >
                        {Static.item.rankList.tokenomics}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>

                    <div class="scheme-card_desc">
                      <div class="scheme-card_roadmap-img mb-15">
                        {/* <div
                          class={[
                            "add",
                            "mb-15",
                            Static.item.tokenomics.image ? "add-hidden" : null,
                          ]}
                          onclick={() => {
                            Static.mediaTokenomics.click();
                          }}
                        >
                          +
                        </div> */}
                        <div class="picture">
                          {/* <input
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
                          /> */}
                          <div class="news-form_gallery-image">
                            <img
                              class="roadmap-img"
                              src={
                                Static.item.tokenomics.image
                                  ? `/assets/upload/${Static.item.tokenomics.image}`
                                  : images["research/logo-empty"]
                              }
                            />
                            {/* <div
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
                            </div> */}
                          </div>
                        </div>
                      </div>
                      <div class="scheme-card_roadmap-desc">
                        <div
                          class="scheme-card_desc personal-input text mb-15"
                          contenteditable="plaintext-only"
                          oninput={function () {
                            Static.item.tokenomics.text = this.innerText.trim();
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

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Utility and Value</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.utility
                            ? Static.item.rankList.utility
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace (/\D/, '');
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
                          countTotalRank();
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
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.team
                            ? Static.item.rankList.team
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace (/\D/, '');
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
                          countTotalRank();
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
                      {/* <div
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
                      </div> */}
                      {/* add + нового члена команды ^ */}

                      {/* <input
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
                      /> */}
                      <div class="scheme-team">
                        {(Static.item.team?.records || []).map(
                          (item, index) => {
                            return (
                              <div class="scheme-team_item">
                                {/* <img
                                  onclick={() => {
                                    Static.item.team.records.splice(index, 1);
                                    updateRecords({
                                      "team.records": Static.item.team.records,
                                    });
                                    initReload();
                                  }}
                                  class="icon-delete"
                                  src={svg["delete_icon"]}
                                /> */}
                                <div
                                  class="scheme-team_item-img"
                                  onclick={() => {
                                    // Static.teamMedia.click();
                                    Static[`teamMedia${index}`].click();
                                  }}
                                >
                                  {/* <input
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
                                            Static.item.team.records[index].image = response.name;
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
                                  /> */}
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
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.roadmap
                            ? Static.item.rankList.roadmap
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace (/\D/, '');
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
                          countTotalRank();
                        }}
                      >
                        {Static.item.rankList.roadmap}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>

                    <div class="scheme-card_desc">
                      <div class="scheme-card_roadmap">
                        <div class="scheme-card_roadmap-img">
                          {/* <div
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
                          </div> */}
                          <div class="picture">
                            {/* <input
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
                            /> */}
                            <div class="news-form_gallery-image">
                              <img
                                class="roadmap-img"
                                src={
                                  Static.item.roadmap.image
                                    ? `/assets/upload/${Static.item.roadmap.image}`
                                    : images["research/logo-empty"]
                                }
                              />
                              {/* <div
                                class="news-form_gallery-delete"
                                onclick={() => {
                                  Static.item.roadmap.image = "";
                                  updateValue({
                                    key: "roadmap.image",
                                    value: Static.item.roadmap.image,
                                  });
                                  initReload();
                                }}
                              >
                                <img src={svg["delete_icon"]} />
                              </div> */}
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
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.documentation
                            ? Static.item.rankList.documentation
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace (/\D/, '');
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
                          countTotalRank();
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
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.social
                            ? Static.item.rankList.social
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace (/\D/, '');
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
                          countTotalRank();
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
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.launchpad
                            ? Static.item.rankList.launchpad
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace (/\D/, '');
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
                          countTotalRank();
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
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.cexDex
                            ? Static.item.rankList.cexDex
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace (/\D/, '');
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
                          countTotalRank();
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
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.aggregator
                            ? Static.item.rankList.aggregator
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace (/\D/, '');
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
                      <input
                        class="admin-input text-green"
                        type="text"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.competitors
                            ? Static.item.rankList.competitors
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace (/\D/, '');
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 10) {
                            this.value = 10;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.competitors = Number(
                            // this.innerText.trim()
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.competitors",
                            value: Static.item.rankList.competitors,
                          });
                          countTotalRank();
                        }}
                      >
                        {Static.item.rankList.competitors}
                      </input>
                      <span class="text-green">Max. 10</span>
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
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.mediaText
                            ? Static.item.rankList.mediaText
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace (/\D/, '');
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
                          countTotalRank();
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
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.audit
                            ? Static.item.rankList.audit
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value.replace (/\D/, '');
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
                          countTotalRank();
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
                      <input
                        class="admin-input text-green"
                        type="text"
                        pattern="^[0-9]*[.,][0-9]+$"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.totalText
                            ? Static.item.rankList.totalText
                            : "0"
                        }
                        oninput={function () {
                          // let value = this.value.replace (/\D/, '');
                          let value = this.value;
                          if (value < 0) {
                            this.value = 0;
                          } else if (value > 10) {
                            this.value = 10;
                          } else {
                            this.value = value;
                          }
                          Static.item.rankList.totalText = Number(
                            // this.innerText.trim()
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.totalText",
                            value: Static.item.rankList.totalText,
                          });
                          countTotalRank()
                        }}
                      >
                        {Static.item.rankList.totalText}
                      </input>
                      <span class="text-green">Max. 10</span>
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

                  <div class="scheme-card_desc">
                    <span class="text">Comment from the moderator</span>
                    <div
                      class="personal-input text mt-15"
                      style="max-width: 100%;"
                      contenteditable="plaintext-only"
                      oninput={function () {
                        Static.item.commentModerator = this.innerText.trim();
                        updateValue({
                          key: "commentModerator",
                          value: Static.item.commentModerator,
                        });
                      }}
                    >
                      {Static.item.commentModerator}
                    </div>
                  </div>
                  
                  <center class="el-bottom mt-70">
                    <div class="card-btns">
                      <button 
                        class={["btn", "btn-green", "mb-15" ]}
                        onclick={async function(){
      
                          await fn.socket.set({
                            method: "ResearchAnalyst",
                            action: "findOneAndUpdate",
                            params: {
                              update: { 
                                status: "Accepted",
                                moderation: true 
                              },
                              filter: {
                                _id: Static.item._id,
                              }
                            },
                          });
                          await fn.socket.send({
                            method: "SendTelegram",
                            params: {
                              type: "mResearchAccepted",
                              idProject: Static.item.projectId._id,
                              author: Static.item.author._id
                            },
                          });
                          fn.modals.Success({
                            title: "The research is accepted"
                          });
                          fn.siteLink(
                            `/personal/moderator/list/research/`
                          );
                          initReload();
                        }}  
                      >
                        Accepted
                      </button>
                      <button 
                        class="btn btn-bordo"
                        onclick={async function(){
                          fn.modals.SureModerator({
                            title: "Reject the project without the possibility of revision?",
                            idProject: Static.item._id,
                            projectId: Static.item.projectId._id,
                            type: "research",
                            author: Static.item.author._id,
                          });
                          initReload();
                        }}  
                      >
                        Refused
                      </button>
                    </div>
                    
                  </center>
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
