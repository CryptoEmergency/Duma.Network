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

const mapPoints = {
  problem: {
    name: "Problem",
    maxPoint: 10,
  },
  product: {
    name: "Product",
    maxPoint: 0,
    noPoints: true,
  },
  solution: {
    name: "Solution",
    maxPoint: 0,
    noPoints: true,
  },
  investors: {
    name: "Investors",
    maxPoint: 0,
  },
  preSeed: {
    name: "Seed Round",
    maxPoint: 0,
    noPoints: true,
  },
  tokenomics: {
    name: "Tokenomics",
    maxPoint: 10,
  },
  utility: {
    name: "Utility and Value",
    maxPoint: 10,
  },
  team: {
    name: "Team and Advisors",
    maxPoint: 10,
  },
  roadmap: {
    name: "Roadmap",
    maxPoint: 10,
  },
  documentation: {
    name: "Documentation",
    maxPoint: 10,
  },
  social: {
    name: "Social",
    maxPoint: 10,
  },
  launchpad: {
    name: "Launchpad",
    maxPoint: 10,
  },
  cexDex: {
    name: "CEX/DEX",
    maxPoint: 10,
  },
  aggregator: {
    name: "Listing on aggregator",
    maxPoint: 10,
  },
  competitors: {
    name: "Competitors",
    maxPoint: 10,
  },
  mediaText: {
    name: "Media",
    maxPoint: 10,
  },
  audit: {
    name: "Audit",
    maxPoint: 10,
  },
  totalText: {
    name: "Total",
    maxPoint: 0,
  },
};

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  // Static.imgWidth;
  load({
    ID,
    fnLoad: async () => {
      if (Variable.dataUrl.params) {
        Static.item = await fn.socket.get({
          method: "Projects",
          _id: Variable.dataUrl.params,
          params: { populate: { path: "author" } },
        });
      }
      if (!Static.item.socials || !Static.item.socials[0]) {
        Static.item.socials = [];
      }



      Static.research = await fn.socket.get({
        method: "ResearchAnalyst",
        projectId: Variable.dataUrl.params,
        params: {
          filter: { moderation: true },
          limit: 5,
          populate: {
            path: "author projectId", 
          },
        },
      })



      Static.activeImg = Static.item.gallery[0];
      Static.imgPosition = 0;
      Static.currentSlide = 0;
      Static.slideHidden = Static.item.gallery.length - 4;
      Static.slideHiddenMobile = Static.item.gallery.length - 1;
      Static.invest;
      Static.investCommission;
      Static.totalInvest;
    },
    fn: () => {
      // console.log("=71c0ea=", Static.item);
      if (!Static.item || !Static.item._id) {
        return <div>Not found</div>;
      }
      return (
        <div class="back-secondary">
          <div class="wrapper">
            <div class="main-inner">
              <Elements.Bredcrumbs
                items={[
                  { title: "Project", link: "/projects" },
                  { title: Static.item.name },
                ]}
              />
              <section class="card-project" id="cardProject">
                <div class="project-name">
                  <div class="company">
                    <img
                      src={
                        Static.item.icon
                          ? `/assets/upload/${Static.item.icon}`
                          : images[`research/logo-duma}`]
                      }
                    ></img>
                    <h2 class="company-title">{Static.item.name}</h2>
                  </div>
                  <div class="statuses">
                    <div class="icon">
                      <img
                        class="blockchain"
                        src={
                          Static.item?.blockchains?.icon
                            ? `/assets/upload/${Static.item.blockchains.icon}`
                            : svg.binance
                        }
                      />
                    </div>
                    <div class="ecosystem">{Static.item.category}</div>
                  </div>
                </div>
                <Elements.Gallery
                  items={Static.item.gallery}
                ></Elements.Gallery>
                <div class="project-rang">
                  {/* <span>{Static.item.rank ? Static.item.rank : 0} points</span>
                  <span class="rang">
                    {
                      Static.item.rank < 50 ? "low rank" : 
                      (Static.item.rank >= 50 && Static.item.rank < 100) ? " medium rank" :
                      (Static.item.rank >= 100) ? "high rank" : null
                    }
                  </span> */}
                </div>
                <div>
                  <div class="about-project">
                    <div
                      class="info-bell"
                      onclick={async () => {
                        await fn.socket.set({
                          method: "Bookmarks",
                          action: "findOneAndUpdate",
                          params: {
                            update: { active: !Static.item.bookmarks },
                            filter: {
                              projectId: Static.item._id,
                              author: Variable.myInfo._id,
                            },
                          },
                        });
                        Static.item.bookmarks = !Static.item.bookmarks;
                        initReload();
                      }}
                    >
                      {Static.item.bookmarks ? (
                        <img src={svg.bellGreen} class="bell" />
                      ) : (
                        <img src={svg.bellWhite} class="bell" />
                      )}
                    </div>
                    
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

                    <p class="text">{Static.item.description}</p>
                    <div class="socials mt-15 mb-15">
                      {(Static.item.socials || []).map((element) => {
                        if (element.link && element.link.length > 0) {
                          return (
                            <a target="_blank" href={element.link}>
                              <img
                                alt={element.name}
                                src={svg[`socials/${element.name}-green`]}
                                class="icon-green"
                              ></img>
                            </a>
                          );
                        } else {
                          return (
                            <img
                              alt={element.name}
                              src={svg[`socials/${element.name}-grey`]}
                              class="icon-green"
                            ></img>
                          );
                        }
                      })}
                    </div>

                    <div class="list-news">
                      {
                        Static.research.map((item)=>{
                          return(
                            <div 
                              class="new" 
                              style="display:flex; cursor: pointer; position: relative;"
                              onclick={()=>{
                                if(Variable.myInfo.status === "User"){
                                  fn.modals.Status({});
                                }
                                fn.siteLink("/researchA/show/" + item._id);
                              }}
                            >
                              <span>Research by</span>
                               <div class="user-picture ml-15">
                                  <span class="text-green">{item.author.firstName}</span>
                                  {/* <div class="user-status">{item.author.status}</div> */}
                               </div>
                               <div class="project-rang ml-15">
                                <span>{item.rank} points</span>
                                <span class="rang">
                                  {
                                    item.rank < 50 ? "low rank" : 
                                    (item.rank >= 50 && item.rank < 100) ? " medium rank" :
                                    (item.rank >= 100) ? "high rank" : null
                                  }
                                </span>
                               </div>
                               {
                                Variable.myInfo.status === "User" ?
                                <img class="icon-status" src={svg.lock} /> :
                                <img class="icon-status" src={svg.public} />

                               }
                            </div>

                          )
                        })
                      }
                      
                    </div>

                    {/* <button
                      class={[
                        "btn",
                        "btn-green",
                        "mt-10",
                        Static.totalInvest &&
                        Static.totalInvest < Variable.myInfo.balance
                          ? null
                          : "btn-disabled",
                      ]}
                      onclick={async function () {
                        if (!Variable.auth) {
                          fn.modals.Login({});
                          return;
                        }
                        if (
                          Variable.myInfo.balance < Static.invest ||
                          Static.invest == "undefined"
                        ) {
                          fn.modals.Transaction({
                            title: "Deposit",
                            text: "Replenishment amount",
                            type: "deposit",
                          });
                          return;
                        }
                        if (Static.totalInvest > Variable.myInfo.balance) {
                          fn.modals.Transaction({
                            title: "Deposit",
                            text: "Replenishment amount",
                            type: "deposit",
                          });
                          return;
                        }
                        await fn.socket.send({
                          method: "Invest",
                          params: {
                            projectId: Static.item._id,
                            sum: Static.invest,
                          },
                        });
                        
                        Static.item.have += Static.invest;
                        Static.investInput.value = "";
                        Static.invest = "";
                        Static.investCommission = "";
                        Static.totalInvest = "";
                        fn.modals.Success({
                          title: `You have successfully invested in the project ${Static.item.name}`
                        })
                        initReload();
                      }}
                    >
                      BECOME OUR PARTNER
                    </button> */}
                  </div>
                </div>
              </section>

              <section class="project-scheme">
                <div class="scheme-sidebar">
                  {Object.keys(mapPoints).map((key) => {
                    return (
                      <div
                        class="scheme-sidebar_item text"
                        onclick={(e) => {
                          let timeGo = 10;
                          setTimeout(() => {
                            window.scrollTo({
                              top:
                                document.querySelector(`#${key}`).offsetTop -
                                72,
                              behavior: "smooth",
                            });
                          }, timeGo);
                        }}
                      >
                        <span>{mapPoints[key].name}</span>
                      </div>
                    );
                  })}
                </div>
                <div class="scheme-cards">
                  <div class="scheme-card" id="problem">
                    <div class="scheme-sidebar_item text">
                      <span>Problem</span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.problem, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card" id="product">
                    <div class="scheme-sidebar_item text">
                      <span>Product</span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.product, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card" id="solution">
                    <div class="scheme-sidebar_item text">
                      <span>Solution</span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.solution, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card" id="investors">
                    <div class="scheme-sidebar_item text">
                      <span>Investors</span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.investors, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card" id="preSeed">
                    <div class="scheme-sidebar_item text">
                      <span>{Static.item.tabs} Round</span>
                    </div>
                    <div class="scheme-card_desc">
                      <span>
                        Raised: $ {Static.item.target} / 01 Mar, 2023/
                      </span>
                      <div class="grid-2 mt-15">
                        {Static.item.fonds.map((item) => {
                          return (
                            <div class="company">
                              <img
                                src={
                                  item.icon
                                    ? `/assets/upload/${item.icon}`
                                    : null
                                }
                              />
                              <span>{item.name}</span>
                            </div>
                          );
                        })}
                        {/* <div class="company">
                          <img src={images["project/circle2"]} />
                          <span>DUMA Capital</span>
                        </div>
                        <div class="company">
                          <img src={images["project/circle1"]} />
                          <span>Angel investors</span>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  <div class="scheme-card" id="tokenomics">
                    <div class="scheme-sidebar_item text">
                      <span>Tokenomics</span>
                    </div>
                    <div class="scheme-card_desc">
                      {Static.item.tokenomics?.image ? (
                        <div class="grid-2">
                          <div class="tokenomic">
                            {/* <div class="blur">
                            <h2>Tokenomic is changed</h2>
                          </div> */}
                            <img
                              src={
                                Static.item.tokenomics.image
                                  ? `/assets/upload/${Static.item.tokenomics.image}`
                                  : null
                              }
                            />
                          </div>
                          <div class="text">
                            {fn.editText(Static.item.tokenomics?.text, {
                              paragraph: true,
                              html: true,
                            })}
                          </div>
                        </div>
                      ) : (
                        <div class="text">
                          {fn.editText(Static.item.tokenomics?.text, {
                            paragraph: true,
                            html: true,
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div class="scheme-card" id="utility">
                    <div class="scheme-sidebar_item text">
                      <span>Utility and Value</span>
                    </div>
                    <div class="scheme-card_desc">
                      <div class="scheme-row">
                        <div>Token Utility</div>
                        <div>
                          The tokenomics and mechanics of interacting with the
                          token have been deeply thought out. The token is
                          necessary for generating and improving NFTs, packaging
                          and unpacking assets, and all interactions on the
                          platform that enable its full functionality
                        </div>
                      </div>
                      <div class="scheme-row">
                        <div>Value capture(how project earns money)</div>
                        <div>
                          The platform operates on the SAAS model, providing
                          opportunities and functionality. Commission from
                          investors, payment for placement on the platform,
                          commissions from resales on the marketplace, SAAS
                          products, and subscriptions to them. The wide range of
                          features allows attracting a large number of users
                          through various funnels
                        </div>
                      </div>
                      <div class="scheme-row">
                        <div>Value accural(how profit translates to token)</div>
                        <div>
                          Converting it to various NFTs and staking them opens
                          up opportunities for earning income through various
                          methods. These include: a percentage of platform
                          revenue, access to the section for distributing
                          airdrops, payment of fees for contribution, resale of
                          SAFT, discounts on section payments, and various other
                          opportunities that lead to potential earnings when
                          holding and using the token.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="scheme-card" id="team">
                    <div class="scheme-sidebar_item text">
                      <span>Team</span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.team.text, {
                        paragraph: true,
                        html: true,
                      })}
                      <div class="scheme-team mt-15">
                        {Static.item.team.records.map((item) => {
                          return (
                            <div>
                              <a
                                class="scheme-team_item"
                                href={item.link}
                                target="_blank"
                              >
                                <img
                                  src={
                                    item.image
                                      ? `/assets/upload/${item.image}`
                                      : null
                                  }
                                />
                                <span>{item.fio}</span>
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div class="scheme-card" id="roadmap">
                    <div class="scheme-sidebar_item text">
                      <span>Roadmap</span>
                    </div>
                    <div class="scheme-card_desc text">
                      {Static.item.roadmap?.image ? (
                        <div class="scheme-card_roadmap">
                          <div class="scheme-card_roadmap-img">
                            <img
                              src={
                                Static.item.roadmap?.image
                                  ? `/assets/upload/${Static.item.roadmap.image}`
                                  : null
                              }
                            />
                          </div>
                          <div class="scheme-card_roadmap-desc">
                            {fn.editText(Static.item.roadmap?.text, {
                              paragraph: true,
                              html: true,
                            })}
                          </div>
                        </div>
                      ) : (
                        <div class="scheme-card_roadmap-desc">
                          {fn.editText(Static.item.roadmap?.text, {
                            paragraph: true,
                            html: true,
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div class="scheme-card" id="documentation">
                    <div class="scheme-sidebar_item text">
                      <span>Documentation</span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.documentation, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card" id="social">
                    <div class="scheme-sidebar_item text">
                      <span>Social</span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.social, {
                        paragraph: true,
                        html: true,
                      })}
                      {/* <ul class="list-standart">
                        <li>
                          The access to the Github repository with the
                          open-source code will not be made publicly available
                          as the developments are considered the company's
                          intellectual property.
                        </li>
                        <li>
                          There are few followers on Twitter and major funds are
                          not subscribed to the account
                        </li>
                        <li>
                          The CEO of the project has their own YouTube channel
                          with 13,000 subscribers, and the channel's theme is
                          cryptocurrency. This is an organic audience interested
                          in investing
                        </li>
                        <li>
                          The CEO's Telegram channels have a total of over 8,000
                          subscribers.
                        </li>
                        <li>
                          22000 subs - Total audience
                          (twitter+discord+Telegram+youTube)
                        </li>
                      </ul> */}
                    </div>
                  </div>

                  <div class="scheme-card" id="launchpad">
                    <div class="scheme-sidebar_item text">
                      <span>Launchpad</span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item?.launchpad, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card" id="cexDex">
                    <div class="scheme-sidebar_item text">
                      <span>CEX/DEX</span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item?.cexDex, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card" id="aggregator">
                    <div class="scheme-sidebar_item text">
                      <span>Listing on aggregator</span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item?.aggregator, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card" id="competitors">
                    <div class="scheme-sidebar_item text">
                      <span>Competitors</span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.competitors, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card" id="mediaText">
                    <div class="scheme-sidebar_item text">
                      <span>Media</span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.mediaText, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card" id="audit">
                    <div class="scheme-sidebar_item text">
                      <span>Audit</span>
                      <span class="text-green">
                        {Static.item.rankList.audit}
                        {mapPoints.audit.maxPoint
                          ? `/${mapPoints.audit.maxPoint}`
                          : null}{" "}
                        points
                      </span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.audit, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card" id="totalText">
                    <div class="scheme-sidebar_item text">
                      <span>TOTAL</span>
                      <span class="text-green">
                        {Static.item.rankList.totalText}
                        {mapPoints.totalText.maxPoint
                          ? `/${mapPoints.totalText.maxPoint}`
                          : null}{" "}
                        points
                      </span>
                    </div>
                    <div class="scheme-card_desc text-green bold">
                      {fn.editText(Static.item?.totalText, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <center class="el-bottom mt-70">
                    <button 
                      class="btn btn-green mb-15"
                      onclick={() => {
                        window.scrollTo({
                          top: document.querySelector("#cardProject").offsetTop - 72,
                          behavior: "smooth",
                        });
                        Static.investInput.focus();
                      }}  
                    >
                      Contributing is currently unavailable
                    </button>
                    <div class="project-rang-vertical">
                      <span>
                        {Static.item.rank ? Static.item.rank : 0} points
                      </span>
                      <span class="rang">
                        {
                          Static.item.rank < 50 ? "low rank" : 
                          (Static.item.rank >= 50 && Static.item.rank < 100) ? " medium rank" :
                          (Static.item.rank >= 100) ? "high rank" : null
                        }
                      </span>
                    </div>
                  </center>
                </div>
              </section>


            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
