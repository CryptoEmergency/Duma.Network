import {
  jsx,
  jsxFrag,
  load,
  Data,
  Variable,
  setStorage,
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
    method: "Projects",
    action: "findOneAndUpdate",
    _id: Data.Static.item._id,
    params: { update },
  });
  if (!response || response.error) {
    console.log("=updateRecords= Error", response);
  }
};


const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.nameProject = "";
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
      if (!Variable.auth || !Variable.myInfo.role) {
        fn.siteLink("/");
        return;
      }
      if (Variable.dataUrl.params) {
        Static.item = await fn.socket.get({
          method: "Projects",
          _id: Variable.dataUrl.params,
          params: { populate: { path: "fonds author" } },
        });
        // console.log('=486295=',Static.item)


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
      if (!Variable.auth) {
        fn.siteLink("/");
        return <div></div>;
      }
      return (
        <div class="wrapper">
          <div class="personal-inner">
            <Elements.BlockMenu />
            <div class="personal-main">
              <div class="circle-effect circle-effect1"></div>
              <div class="circle-effect circle-effect2"></div>
              <Elements.BlockPersonal />
              <div class="personal-content">
                <Elements.Bredcrumbs
                  items={[
                    {
                      title: "Projects list",
                      link: "/personal/projects/",
                    },
                    {
                      title: "New project",
                    },
                  ]}
                />
                <div class="main mb-25  ">
                  <h2 class="general-title mt-25">Project verification</h2>

                </div>
                <section class="personal-form">
                  <div
                    Element={($el) => {
                      Static.elError = $el;
                    }}
                    style="display:none;"
                    class="error-text"
                  ></div>
                  <div class="grid-3">
                    <div class="wrap-logo">
                      <div class="picture">
                        <input
                          type="file"
                          hidden
                          Element={($el) => {
                            Static.addIcon = $el;
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
                            Static.addIcon.click();
                          }}
                        ></img>
                      </div>
                      <div class="form-div">
                        <div
                          class="form-input personal-input"
                          contenteditable="plaintext-only"
                          onchange = {function(){
                            Static.nameProject = this.value;
                            console.log('=16fd02=',Static.nameProject)
                          }}
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
                  </div>
                  <div class="grid-2">
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
                          {Static.item.round ? Static.item.round : "Choose round"}
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
                    <button
                      class="btn btn-green"
                      onclick={() => {
                        fn.modals.BlockchainList({
                          title: "Blockchain list",
                          listsBlockchains: Static.item.blockchains,
                          callback: async (filterBlockchains) => {
                            Static.item.blockchains = filterBlockchains;
                            await updateRecords({
                              blockchains: Static.item.blockchains,
                            });
                            let tmp = await fn.socket.get({
                              method: "Projects",
                              _id: Variable.dataUrl.params,
                              params: { populate: { path: "blockchains" } },
                            });
                            if (tmp.blockchains) {
                              Static.item.blockchains = tmp.blockchains;
                            }

                            initReload();
                            return;
                          },
                        });
                      }}
                    >
                      Choose blockchain
                    </button>
                    <div class="fondlist-wrap">
                      {Object.keys(Static.item?.blockchains).length ? (
                        <div class="fondlist-item">
                          <img
                            class="icon-delete"
                            src={svg["delete_icon"]}
                            onclick={() => {
                              Static.item.blockchains = {};
                              updateRecords({
                                blockchains: Static.item.blockchains,
                              });
                              initReload();
                            }}
                          ></img>
                          <div class="fondlist-item_img">
                            <img
                              src={
                                Static.item.blockchains.icon
                                  ? `/assets/upload/${Static.item.blockchains.icon}`
                                  : images["research/logo-empty"]
                              }
                            />
                          </div>
                          <span class="fondlist-item_desc">
                            {Static.item.blockchains.name}
                          </span>
                        </div>
                      ) : null}
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
                              Static.item.gallery.push(response.name);
                              updateValue({
                                key: "gallery",
                                value: Static.item.gallery,
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
                    </div>
                    <div class="scheme-card_desc">
                      <div
                        class="personal-input text"
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
                      <p class="text">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.problem}
                        >
                          {Static.item?.projectId.linkList?.problem}
                        </a> 
                      </p>
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
                      <span>Choose funds</span>
                    </div>

                    <div class="scheme-card_desc">
                      <div
                        class={["add", "mb-15"]}
                        onclick={() => {
                          fn.modals.FondList({
                            title: "Fund list",
                            listsFonds: Static.item.fonds,
                            callback: async (filterFonds) => {
                              Static.item.fonds = filterFonds;
                              if (!filterFonds.length) {
                                return;
                              }
                              await updateRecords({ fonds: Static.item.fonds });
                              let tmp = await fn.socket.get({
                                method: "Projects",
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
                    </div>

                    <div class="scheme-card_desc">
                      <div class="scheme-card_roadmap-img mb-15">
                        <div
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

                  <center class="el-bottom mt-70">
                    <div class="card-btns">
                      <button 
                        class={["btn", "btn-green", "mb-15" ]}
                        onclick={async function(){
      
                          await fn.socket.set({
                            method: "Projects",
                            action: "findOneAndUpdate",
                            params: {
                              update: { status: "Accepted" },
                              filter: {
                                _id: Static.item._id,
                              }
                            },
                          });
                          await fn.socket.send({
                            method: "BankToken",
                            params: {
                              projectId: Static.item._id, // id проекта в табл проджект
                              author: Static.item.author
                            },
                          });

      
                          fn.modals.Success({
                            title: "The project is accepted"
                          });
                          fn.siteLink(
                            `/personal/admin/list/projects/`
                          );
                          initReload();
                        }}  
                      >
                        Accepted
                      </button>
                      <button 
                        class="btn btn-bordo"
                        onclick={async function(){
      
                          await fn.socket.set({
                            method: "Projects",
                            action: "findOneAndUpdate",
                            params: {
                              update: { status: "Refused" },
                              filter: {
                                _id: Static.item._id,
                              }
                            },
                          });
      
                          fn.modals.Success({
                            title: "The project was rejected"
                          });
                          fn.siteLink(
                            `/personal/admin/list/projects/`
                          );
                          initReload();
                        }}  
                      >
                        Refused
                      </button>
                    </div>
                    
                  </center>
                </section>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
