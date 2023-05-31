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
      if (!Variable.auth) {
        fn.siteLink("/");
        return;
      }
      if (Variable.dataUrl.params) {
        Static.item = await fn.socket.get({
          method: "ResearchAnalyst",
          _id: Variable.dataUrl.params,
          params: { 
            populate: { 
              path: "fonds projectId", 
              populate:{
                path: "author"
              }
            } 
          },
        });
        console.log('=18356f=', Static.item)

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
                      title: "Researches list",
                      link: "/personal/researches/",
                    },
                    {
                      title: `Research ${Static.item.projectId?.name}`,
                    },
                  ]}
                />
                <div class="main mb-25 inner-add">
                  <h2 class="general-title mt-0">Fill out the research on the project</h2>
                </div>
                <section class="personal-form">
                  <div
                    Element={($el) => {
                      Static.elError = $el;
                    }}
                    style="display:none;"
                    class="error-text"
                  ></div>
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
                            : "Name project"}
                        </div>
                      </div>
                    </div>
                    <div class="user-card mb-15 research-user">
                      <div class="user-picture mr-15">
                        <img src={Static.item.projectId.author?.icon ? 
                          `/assets/upload/${Static.item.projectId.author?.icon}` : svg.user} />
                        <div class="user-status">
                          {Static.item.projectId.author?.status}
                        </div>
                      </div>
                      <div class="user-info">
                        <span class="text-green">Author project</span>
                        <div class="user-name">{Static.item.projectId.author?.firstName}</div>
                      </div>
                    </div>
                  </div>

                  <div class="grid-3">
                    <div class="form-div">
                      <label>Round:</label>
                      <div class="form-input personal-input">
                        {Static.item.round}
                      </div>
                    </div>
                    <div class="form-div">
                      <label>Category:</label>
                      <div class="form-input personal-input">
                        {Static.item.category}
                      </div>
                    </div>
                    <div class="form-div">
                      <label>Total rank:</label>
                      <div class="form-input personal-input">
                        {Static.item.rank.toFixed(2)} (Auto calculate)
                        {/* {Static.item.rankList.totalText} (Auto calculate) */}
                      </div>
                    </div>
                  </div>


                  <div class="form-item" style="position: relative;">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer; top: 0;"
                      onclick={()=>{
                        Static.item.description = Static.item.projectId.description
                        updateValue({
                          key: "description",
                          value: Static.item.description,
                        });
                        initReload();
                      }}></img>
                    <label>Description:</label>
                    <div
                      style="min-height:100px;"
                      class="form-input personal-input"
                      contenteditable={
                        Static.item.status == "Draft" ? true 
                        : Static.item.status == "Modify" ? true : false
                      }
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
                  <div class="" style="display:flex; position: relative;">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer; top: 0;"
                      onclick={()=>{
                        Static.item.socials = Static.item.projectId.socials
                        updateValue({
                          key: "socials",
                          value: Static.item.socials,
                        });
                        initReload();
                      }}></img>
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
                            Static.elSocialInput.innerText = Static.forms.socials[item].link;
                            // Static.elSocialInput.innerText = "Enter social network link";
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
                    {/* <button
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
                    </button> */}
                    <div class="fondlist-wrap">
                      {Object.keys(Static.item.projectId?.blockchains).length ? (
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
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.problem = Static.item.projectId.problem
                        updateValue({
                          key: "problem",
                          value: Static.item.problem,
                        });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>Problem</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        pattern="^[0-9]*[.,][0-9]+$"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.problem
                            ? Static.item.rankList.problem
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
                          Static.item.rankList.problem = Number(
                            // this.innerText.trim()
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
                    <div class="scheme-card_desc">
                      <span class="text">Specify the problem of the project:</span>
                      <div
                        class="personal-input text mb-15"
                        contenteditable={
                          Static.item.status == "Draft" ? true 
                          : Static.item.status == "Modify" ? true : false
                        }
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
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.product = Static.item.projectId.product
                        updateValue({
                          key: "product",
                          value: Static.item.product,
                        });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>Product</span>
                    </div>
                    <div class="scheme-card_desc">
                      <span class="text">Describe your product:</span>
                      <div
                        class="personal-input text mb-15"
                        contenteditable={
                          Static.item.status == "Draft" ? true 
                          : Static.item.status == "Modify" ? true : false
                        }
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
                      <p class="text">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.product}
                        >
                          {Static.item?.projectId.linkList?.product}
                        </a> 
                      </p>
                    </div>
                    
                  </div>

                  <div class="scheme-card">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.solution = Static.item.projectId.solution
                        updateValue({
                          key: "solution",
                          value: Static.item.solution,
                        });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>Solution</span>
                    </div>
                    <div class="scheme-card_desc">
                      <span class="text">Describe the solution to the problem:</span>
                      <div
                        class="personal-input text mb-15"
                        contenteditable={
                          Static.item.status == "Draft" ? true 
                          : Static.item.status == "Modify" ? true : false
                        }
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
                      <p class="text">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.solution}
                        >
                          {Static.item?.projectId.linkList?.solution}
                        </a> 
                      </p>
                    </div>
                    
                  </div>

                  <div class="scheme-card">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.investors = Static.item.projectId.investors
                        updateValue({
                          key: "investors",
                          value: Static.item.investors,
                        });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>Investors</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        pattern="^[0-9]*[.,][0-9]+$"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.investors
                            ? Static.item.rankList.investors
                            : "0"
                        }
                        oninput={function () {
                          // let value = this.value.replace (/\D/, '');
                          let value = this.value;
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
                    <div class="scheme-card_desc">
                      <span class="text">About investors</span>
                      <div
                        class="personal-input text mb-15"
                        contenteditable={
                          Static.item.status == "Draft" ? true 
                          : Static.item.status == "Modify" ? true : false
                        }
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
                      <p class="text">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.investors}
                        >
                          {Static.item?.projectId.linkList?.investors}
                        </a> 
                      </p>
                    </div>
                    
                  </div>

                  <div class="scheme-card">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.fonds = Static.item.projectId.fonds
                        updateValue({
                          key: "fonds",
                          value: Static.item.fonds,
                        });
                        initReload();
                      }}
                    />
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
                              console.log("=666583=", filterFonds);
                              Static.item.fonds = filterFonds;
                              if (!filterFonds.length) {
                                return;
                              }
                              await updateRecords({ fonds: Static.item.fonds });
                              let tmp = await fn.socket.get({
                                method: "ResearchAnalyst",
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
                      <div class="fondlist-wrap mt-15">
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
                      <p class="text">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.fonds}
                        >
                          {Static.item?.projectId.linkList?.fonds}
                        </a> 
                      </p>
                    </div>
                  </div>

                  <div class="scheme-card">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.tokenomics.text = Static.item.projectId.tokenomics.text;
                        updateValue({
                          key: "tokenomics.text",
                          value: Static.item.tokenomics.text,
                        });
                        Static.item.tokenomics.image = Static.item.projectId.tokenomics.image;
                        updateValue({
                          key: "tokenomics.image",
                          value: Static.item.tokenomics.image,
                        });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>Tokenomics</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        pattern="^[0-9]*[.,][0-9]+$"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.tokenomics
                            ? Static.item.rankList.tokenomics
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
                          contenteditable={
                            Static.item.status == "Draft" ? true 
                            : Static.item.status == "Modify" ? true : false
                          }
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
                        <p class="text">Enter the link confirming the information: 
                          <a 
                            class="link-modal text-green"
                            target="_blank"
                            href={Static.item?.projectId.linkList?.tokenomics}
                          >
                            {Static.item?.projectId.linkList?.tokenomics}
                          </a> 
                        </p>
                      </div>

                    </div>
                  </div>

                  <div class="scheme-card">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.utility.token = Static.item.projectId.utility.token;
                        Static.item.utility.capture = Static.item.projectId.utility.capture;
                        Static.item.utility.accural = Static.item.projectId.utility.accural;
                        updateValue({
                          key: "utility",
                          value: Static.item.utility,
                        });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>Utility and Value</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        pattern="^[0-9]*[.,][0-9]+$"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.utility
                            ? Static.item.rankList.utility
                            : "0"
                        }
                        oninput={function () {
                          let value = this.value;
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

                    <div class="scheme-card_desc mt-25">
                      <div class="scheme-row">
                        <div>Token Utility</div>
                        <div
                          class="text personal-input"
                          contenteditable={
                            Static.item.status == "Draft" ? true 
                            : Static.item.status == "Modify" ? true : false
                          }
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
                          contenteditable={
                            Static.item.status == "Draft" ? true 
                            : Static.item.status == "Modify" ? true : false
                          }
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
                          contenteditable={
                            Static.item.status == "Draft" ? true 
                            : Static.item.status == "Modify" ? true : false
                          }
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
                      <p class="text">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.utility}
                        >
                          {Static.item?.projectId.linkList?.utility}
                        </a> 
                      </p>
                    </div>
                  </div>

                  <div class="scheme-card">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.team.text = Static.item.projectId.team.text;
                        updateValue({
                          key: "team.text",
                          value: Static.item.team.text,
                        });
                        Static.item.team.records = Static.item.projectId.team.records;
                        updateValue({
                          key: "team.records",
                          value: Static.item.team.records,
                        });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>Team</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        pattern="^[0-9]*[.,][0-9]+$"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.team
                            ? Static.item.rankList.team
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
                      <span class="text">About the team:</span>
                      <div
                        class="personal-input text mb-15"
                        contenteditable={
                          Static.item.status == "Draft" ? true 
                          : Static.item.status == "Modify" ? true : false
                        }
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
                      <div class="scheme-team mb-15">
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
                                <span class="text">Full name:</span>
                                <div
                                  class="personal-input text mb-15"
                                  contenteditable={
                                    Static.item.status == "Draft" ? true 
                                    : Static.item.status == "Modify" ? true : false
                                  }
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
                                <span class="text">Link to a person:</span>
                                <div
                                  class="personal-input text"
                                  contenteditable={
                                    Static.item.status == "Draft" ? true 
                                    : Static.item.status == "Modify" ? true : false
                                  }
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
                      <p class="text">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.team}
                        >
                          {Static.item?.projectId.linkList?.team}
                        </a> 
                      </p>
                    </div>
                  </div>

                  <div class="scheme-card">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.roadmap.text = Static.item.projectId.roadmap.text;
                        Static.item.roadmap.link = Static.item.projectId.roadmap.link;
                        Static.item.roadmap.image = Static.item.projectId.image;
                        updateValue({
                          key: "roadmap",
                          value: Static.item.roadmap,
                        });
                        // updateValue({
                        //   key: "roadmap.link",
                        //   value: Static.item.roadmap.link,
                        // });
                        // updateValue({
                        //   key: "roadmap.image",
                        //   value: Static.item.roadmap.image,
                        // });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>Roadmap</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        pattern="^[0-9]*[.,][0-9]+$"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.roadmap
                            ? Static.item.rankList.roadmap
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
                      <div class="scheme-card_roadmap mt-20">
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
                          <span class="text">About roadmap:</span>
                          <div
                            class="scheme-card_desc personal-input text mb-15"
                            contenteditable={
                              Static.item.status == "Draft" ? true 
                              : Static.item.status == "Modify" ? true : false
                            }
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
                          <span class="text">Roadmap link:</span>
                          <div
                            class="scheme-card_desc personal-input text"
                            contenteditable={
                              Static.item.status == "Draft" ? true 
                              : Static.item.status == "Modify" ? true : false
                            }
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
                      <p class="text">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.roadmap}
                        >
                          {Static.item?.projectId.linkList?.roadmap}
                        </a> 
                      </p>
                    </div>
                  </div>

                  <div class="scheme-card">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.documentation = Static.item.projectId.documentation
                        updateValue({
                          key: "documentation",
                          value: Static.item.documentation,
                        });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>Documentation</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        pattern="^[0-9]*[.,][0-9]+$"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.documentation
                            ? Static.item.rankList.documentation
                            : "0"
                        }
                        // readonly={
                        //   Static.item.status == "Draft" ? true 
                        //   : Static.item.status == "Modify" ? true : false
                        // }
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
                    <div class="scheme-card_desc">
                      <span class="text">Describe your documentation: </span>
                      <div
                        class="personal-input text"
                        contenteditable={
                          Static.item.status == "Draft" ? true 
                          : Static.item.status == "Modify" ? true : false
                        }
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
                      <p class="text">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.documentation}
                        >
                          {Static.item?.projectId.linkList?.documentation}
                        </a> 
                      </p>
                    </div>
                    
                  </div>

                  <div class="scheme-card">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.social = Static.item.projectId.social
                        updateValue({
                          key: "social",
                          value: Static.item.social,
                        });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>Social</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        pattern="^[0-9]*[.,][0-9]+$"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.social
                            ? Static.item.rankList.social
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

                    <div class="scheme-card_desc">
                      <span class="text">Information about social:</span>
                      <div
                        class="personal-input text"
                        contenteditable={
                          Static.item.status == "Draft" ? true 
                          : Static.item.status == "Modify" ? true : false
                        }
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
                      <p class="text">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.social}
                        >
                          {Static.item?.projectId.linkList?.social}
                        </a> 
                      </p>
                    </div>

                    
                  </div>

                  <div class="scheme-card">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.launchpad = Static.item.projectId.launchpad
                        updateValue({
                          key: "launchpad",
                          value: Static.item.launchpad,
                        });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>Launchpad</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        pattern="^[0-9]*[.,][0-9]+$"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.launchpad
                            ? Static.item.rankList.launchpad
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

                    <div class="scheme-card_desc">
                      <span class="text">Describe the launcher:</span>
                      <div
                        class="personal-input text"
                        contenteditable={
                          Static.item.status == "Draft" ? true 
                          : Static.item.status == "Modify" ? true : false
                        }
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
                      <p class="text mt-15">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.launchpad}
                        >
                          {Static.item?.projectId.linkList?.launchpad}
                        </a> 
                      </p>
                    </div>

                    
                  </div>

                  <div class="scheme-card">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.cexDex = Static.item.projectId.cexDex
                        updateValue({
                          key: "cexDex",
                          value: Static.item.cexDex,
                        });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>CEX/DEX:</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        pattern="^[0-9]*[.,][0-9]+$"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.cexDex
                            ? Static.item.rankList.cexDex
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

                    <div class="scheme-card_desc">
                      <span class="text">CEX/DEX</span>
                      <div
                        class="personal-input text"
                        contenteditable={
                          Static.item.status == "Draft" ? true 
                          : Static.item.status == "Modify" ? true : false
                        }
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
                      <p class="text mt-15">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.cexDex}
                        >
                          {Static.item?.projectId.linkList?.cexDex}
                        </a> 
                      </p>
                    </div>
                  </div>

                  <div class="scheme-card">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.aggregator = Static.item.projectId.aggregator
                        updateValue({
                          key: "aggregator",
                          value: Static.item.aggregator,
                        });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>Listing on aggregator</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        pattern="^[0-9]*[.,][0-9]+$"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.aggregator
                            ? Static.item.rankList.aggregator
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
                          Static.item.rankList.aggregator = Number(
                            this.value.trim()
                          );
                          updateValue({
                            key: "rankList.aggregator",
                            value: Static.item.rankList.aggregator,
                          });
                          countTotalRank();
                        }}
                      >
                        {Static.item.rankList.aggregator}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>
                    <div class="scheme-card_desc">
                      <span class="text">Listing on aggregator:</span>
                      <div
                        class="personal-input text"
                        contenteditable={
                          Static.item.status == "Draft" ? true 
                          : Static.item.status == "Modify" ? true : false
                        }
                        oninput={function () {
                          Static.item.aggregator = this.innerText.trim();
                          updateValue({
                            key: "aggregator",
                            value: Static.item.aggregator,
                          });
                        }}
                      >
                        {Static.item?.aggregator}
                      </div>
                      <p class="text mt-15">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.aggregator}
                        >
                          {Static.item?.projectId.linkList?.aggregator}
                        </a> 
                      </p>
                    </div>   
                  </div>

                  <div class="scheme-card">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.competitors = Static.item.projectId.competitors
                        updateValue({
                          key: "competitors",
                          value: Static.item.competitors,
                        });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>Competitors</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        pattern="^[0-9]*[.,][0-9]+$"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.competitors
                            ? Static.item.rankList.competitors
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

                    <div class="scheme-card_desc">
                      <span class="text">About competitors:</span>
                      <div
                        class="personal-input text"
                        contenteditable={
                          Static.item.status == "Draft" ? true 
                          : Static.item.status == "Modify" ? true : false
                        }
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
                      <p class="text mt-15">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.competitors}
                        >
                          {Static.item?.projectId.linkList?.competitors}
                        </a> 
                      </p>
                    </div>    
                  </div>

                  <div class="scheme-card">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.mediaText = Static.item.projectId.mediaText
                        updateValue({
                          key: "mediaText",
                          value: Static.item.mediaText,
                        });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>Media</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        pattern="^[0-9]*[.,][0-9]+$"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.mediaText
                            ? Static.item.rankList.mediaText
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

                    <div class="scheme-card_desc">
                      <span class="text">About media:</span>
                      <div
                        class="personal-input text"
                        contenteditable={
                          Static.item.status == "Draft" ? true 
                          : Static.item.status == "Modify" ? true : false
                        }
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
                      <p class="text mt-15">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.mediaText}
                        >
                          {Static.item?.projectId.linkList?.mediaText}
                        </a> 
                      </p>
                    </div>
                  </div>

                  <div class="scheme-card">
                    <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        Static.item.audit = Static.item.projectId.audit
                        updateValue({
                          key: "audit",
                          value: Static.item.audit,
                        });
                        initReload();
                      }}
                    />
                    <div class="scheme-sidebar_item text">
                      <span>Audit</span>
                      <input
                        class="admin-input text-green"
                        type="text"
                        pattern="^[0-9]*[.,][0-9]+$"
                        maxlength="3"
                        placeholder="0"
                        value={
                          Static.item.rankList.audit
                            ? Static.item.rankList.audit
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

                    <div class="scheme-card_desc">
                      <span class="text">About audit:</span>
                      <div
                        class="personal-input text"
                        contenteditable={
                          Static.item.status == "Draft" ? true 
                          : Static.item.status == "Modify" ? true : false
                        }
                        oninput={function () {
                          Static.item.audit = this.innerText.trim();
                          updateValue({ 
                            key: "audit", 
                            value: Static.item.audit 
                          });
                        }}
                      >
                        {Static.item.audit}
                      </div>
                      <p class="text mt-15">Enter the link confirming the information: 
                        <a 
                          class="link-modal text-green"
                          target="_blank"
                          href={Static.item?.projectId.linkList?.audit}
                        >
                          {Static.item?.projectId.linkList?.audit}
                        </a> 
                      </p>
                    </div>
                  </div>

                  <div class="scheme-card">
                    {/* <img 
                      class="user-icon" 
                      src={svg.duplicate} 
                      width='20' 
                      height='20'
                      title="Duplicate content from a project"
                      style="cursor: pointer;"
                      onclick={()=>{
                        console.log('=a0278c=','click')
                        Static.item.totalText = Static.item.projectId.totalText
                        updateValue({
                          key: "totalText",
                          value: Static.item.totalText,
                        });
                        initReload();
                      }}
                    /> */}
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
                          countTotalRank();
                        }}
                      >
                        {Static.item.rankList.totalText}
                      </input>
                      <span class="text-green">Max. 10</span>
                    </div>
                    <div class="scheme-card_desc">
                      <span class="text">About total project:</span>
                      <div
                        class="personal-input text"
                        contenteditable={
                          Static.item.status == "Draft" ? true 
                          : Static.item.status == "Modify" ? true : false
                        }
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

                  <center class="el-bottom mt-70">
                    <button 
                      disabled={
                        Static.item.status == "Submitted for moderation"
                        || Static.item.status == "Accepted"}
                      class={["btn", "btn-green", "mb-15",
                      (Static.item.status  == "Submitted for moderation") || (Static.item.status  == "Accepted") ? "btn-disabled" : null ]}
                      onclick={async function(){
                        await fn.socket.set({
                          method: "ResearchAnalyst",
                          action: "findOneAndUpdate",
                          params: {
                            update: { status: "Submitted for moderation" },
                            filter: {
                              _id: Static.item._id,
                              author: Variable.myInfo._id,
                            }
                          },
                        });
                        await fn.socket.send({
                          method: "SendTelegram",
                          params: {
                            type: "research",
                            idProject: Static.item.projectId._id,
                          },
                        });
                        fn.siteLink('/personal/researches/')
                        fn.modals.Success({
                          title: "Your research has been submitted for moderation"
                        });
                        this.innerText = "Submitted for moderation";
                        initReload();
                      }}  
                    >
                      submit for moderation
                    </button>
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
