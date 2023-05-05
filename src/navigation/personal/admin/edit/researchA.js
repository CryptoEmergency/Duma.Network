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
      if (!Variable.auth || !Variable.myInfo.role) {
        fn.siteLink("/");
        return;
      }
      if (Variable.dataUrl.params) {
        Static.item = await fn.socket.get({
          method: "ResearchAnalyst",
          _id: Variable.dataUrl.params,
          params: { 
            populate: { 
              path: "projectId author" ,
              // populate: { path: "fonds" }
            } 
          },
        });
        console.log('=55a4b6=',Static.item)
        // if (Static.item && !Static.item.gallery) {
        //   Static.item.gallery = [];
        // }

        // if (!Static.item.socials) {
        //   Static.item.socials = [];
        // }

        // if (!Static.item.utility) {
        //   Static.item.utility = {};
        // }

        // if (!Static.item.roadmap) {
        //   Static.item.roadmap = {};
        // }

        // if (!Static.item.tokenomics) {
        //   Static.item.tokenomics = {};
        // }

        // if (!Static.item.blockchains) {
        //   Static.item.blockchains = {};
        // }

        // for (let item of Static.item.socials) {
        //   Static.forms.socials[item.name] = item;
        // }

        // if (!Static.item.team) {
        //   Static.item.team = {};
        // }
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
                <h2 class="general-title mt-0">Moderation research</h2>
                <div class="personal-form">
                  <div class="user-card mb-15">
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
                  <div class="grid-3">
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
                          {Static.item.projectId?.name ? Static.item.projectId?.name : "Name research"}
                        </div>
                      </div>
                    </div>
                    
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

                    <div class="form-div">
                      <label>Total rank:</label>
                      <div class="form-input personal-input">
                        {Static.item.rank} (Auto calculate)
                        {/* {Static.item.rankList.totalText} (Auto calculate) */}
                      </div>
                    </div>
                  </div>
                  <div class="grid-3">
                    <div class="form-div">
                      <label>Round:</label>
                      <div class="form-div">
                        <div class="form-input personal-input">
                          {Static.item?.tabs}
                        </div>
                      </div>
                    </div>
                    <div class="form-div">
                      <label>Status:</label>
                      <div class="form-div">
                        <div class="form-input personal-input">
                          {Static.item?.status}
                        </div>
                      </div>
                    </div>
                    <div class="form-div">
                      <label>Category:</label>
                      <div class="form-div">
                        <div class="form-input personal-input">
                          {Static.item.projectId?.category}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-item">
                    <label>Description:</label>
                    <div class="form-input personal-input">
                      {Static.item.projectId.description}
                    </div>
                  </div>
                  <div class="grid-3">
                    <div class="form-div">
                      <label>Price per token:</label>
                      <div class="form-input personal-input">
                        {Static.item.seedRound}
                      </div>
                    </div>
                    <div class="form-div">
                      <label>Invest:</label>
                      <div class="form-input personal-input">
                        {Static.item.have}
                      </div>
                    </div>
                    <div class="form-div">
                      <label>Target invest:</label>
                      <div class="form-input personal-input">
                        {Static.item.target}
                      </div>
                    </div>
                  </div>
                  {/* <div class="" style="display:flex;">
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
                  </div> */}
                  {/* <div class="grid-2">
                    <div class="form-div">
                      <label>Start date:</label>
                      <div class="form-input personal-input">
                       {Static.item.startDate}
                      </div>
                    </div>
                    <div class="form-div">
                      <label>End date:</label>
                      <div class="form-input personal-input">
                        {Static.item.endDate}
                      </div>
                    </div>
                  </div> */}
                  <div class="form-item pictures">
                    {Static.item.projectId.gallery.map((item, index) => {
                      return (
                        <div class="news-form_gallery">
                          <div class="news-form_gallery-image">
                            <img
                              src={`/assets/upload/${item}`}
                              width="200"
                              height="100"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Problem</span>
                      <span class="admin-input text-green">
                        {Static.item.rankList.problem}
                      </span>
                      <span class="text-green">Max. 10</span>
                    </div>
                    <div class="scheme-card_desc personal-input text">
                      {Static.item.projectId.problem}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Product</span>
                    </div>
                    <div class="scheme-card_desc personal-input text">
                      {Static.item.projectId.product}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Solution</span>
                    </div>
                    <div class="scheme-card_desc personal-input text">
                      {Static.item.projectId.solution}
                    </div>
                  </div>
                  
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Investors</span>
                      <span class="admin-input text-green">
                        {Static.item.rankList.investors}
                      </span>
                      <span class="text-green">Max. 100</span>
                    </div>
                    <div class="scheme-card_desc personal-input text">
                      {Static.item.projectId.investors}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>{Static.item.tabs} Round</span>
                    </div>

                    <div class="scheme-card_desc">
                      <div class="fondlist-wrap">
                        {(Static.item.projectId.fonds || []).map((item, index) => {
                          return (
                            <div class="fondlist-item">
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
                      <span class="admin-input text-green">
                        {Static.item.rankList.tokenomics}
                      </span>
                      <span class="text-green">Max. 10</span>
                    </div>

                    <div class="scheme-card_desc">
                      <div class="scheme-card_roadmap-img mb-15">
                        <div class="picture">
                          <div class="news-form_gallery-image">
                            <img
                              class="roadmap-img"
                              src={
                                Static.item.projectId.tokenomics.image
                                  ? `/assets/upload/${Static.item.projectId.tokenomics.image}`
                                  : images["research/logo-empty"]
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div class="scheme-card_roadmap-desc">
                        <div class="scheme-card_desc personal-input text mb-15">
                          {Static.item.projectId.tokenomics?.text}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Utility and Value</span>
                      <span class="admin-input text-green">
                        {Static.item.rankList.utility}
                      </span>
                      <span class="text-green">Max. 10</span>
                    </div>

                    <div class="scheme-card_desc">
                      <div class="scheme-row">
                        <div>Token Utility</div>
                        <div class="text personal-input">
                          {Static.item.projectId.utility?.token}
                        </div>
                      </div>
                      <div class="scheme-row">
                        <div>Value capture</div>
                        <div class="text personal-input" >
                          {Static.item.projectId.utility?.capture}
                        </div>
                      </div>
                      <div class="scheme-row">
                        <div>Value accural</div>
                        <div class="text personal-input" >
                          {Static.item.projectId.utility?.accural}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Team</span>
                      <span class="admin-input text-green">
                        {Static.item.rankList.team}
                      </span>
                      <span class="text-green">Max. 10</span>
                    </div>

                    <div class="scheme-card_desc">
                      <div class="personal-input text mb-15" >
                        {Static.item.projectId.team?.text}
                      </div>

                      <div class="scheme-team">
                        {(Static.item.projectId.team?.records || []).map(
                          (item, index) => {
                            return (
                              <div class="scheme-team_item">

                                <div
                                  class="scheme-team_item-img"
                                >

                                  <img
                                    src={
                                      item.image
                                        ? `/assets/upload/${item.image}`
                                        : images["research/logo-empty"]
                                    }
                                  />
                                </div>
                                <div class="personal-input text mb-15" >
                                  {item?.fio}
                                </div>
                                <div class="personal-input text">
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
                      <span class="admin-input text-green">
                        {Static.item.rankList.roadmap}
                      </span>
                      <span class="text-green">Max. 10</span>
                    </div>

                    <div class="scheme-card_desc">
                      <div class="scheme-card_roadmap">
                        <div class="scheme-card_roadmap-img">
                          <div class="picture">

                            <div class="news-form_gallery-image">
                              <img
                                class="roadmap-img"
                                src={
                                  Static.item.projectId.roadmap.image
                                    ? `/assets/upload/${Static.item.projectId.roadmap.image}`
                                    : images["research/logo-empty"]
                                }
                              />

                            </div>
                          </div>
                        </div>
                        <div class="scheme-card_roadmap-desc">
                          <div class="scheme-card_desc personal-input text mb-15">
                            {Static.item.projectId.roadmap?.text}
                          </div>
                          <div class="scheme-card_desc personal-input text">
                            {Static.item.projectId.roadmap?.link}
                          </div>
                        </div>
                      </div>
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
