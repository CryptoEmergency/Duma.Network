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
    maxPoint: 23,
  },
  utility: {
    name: "Utility and Value",
    maxPoint: 0,
  },
  team: {
    name: "Team & Advisors",
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
    maxPoint: 0,
  },
  mediaText: {
    name: "Media",
    maxPoint: 10,
  },
  competitors: {
    name: "Competitors",
    maxPoint: 0,
    noPoints: true,
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
  load({
    ID,
    fnLoad: async () => {
      if (Variable.dataUrl.params) {
        Static.item = await fn.socket.get({
          method: "Research",
          _id: Variable.dataUrl.params,
        });
      }
      if (!Static.item.socials || !Static.item.socials[0]) {
        Static.item.socials = [];
      }
    },
    fn: () => {
      console.log("=0e0048=", Static.item);
      if (!Static.item || !Static.item._id) {
        return <div>Not found</div>;
      }
      return (
        <div class="back-secondary">
          <div class="wrapper">
            <div class="main-inner">
              <Elements.Bredcrumbs
                items={[
                  { title: "Research", link: "/research" },
                  { title: Static.item.name },
                ]}
              />
              <section class="card-project">
                <div class="project-name">
                  <div class="company">
                    <img
                      src={
                        Static.item.icon
                          ? `/assets/upload/${Static.item.icon}`
                          : images[`research/logo-duma}`]
                      }
                    ></img>
                    <span class="company-title">{Static.item.name}</span>
                  </div>
                  <div class="statuses">
                    <div class="icon">
                      <img src={svg.binance}></img>
                    </div>
                    <div class="status">{Static.item.status}</div>
                    <div class="ecosystem">{Static.item.category}</div>
                  </div>
                </div>
                <div class="card-project-img">
                  <img
                    src={
                      Static.item.gallery[0]
                        ? `/assets/upload/${Static.item.gallery[0]}`
                        : images[`research/duma}`]
                    }
                  ></img>
                </div>
                <div class="project-rang">
                  <span>{Static.item.rank ? Static.item.rank : 0} points</span>
                  <span class="rang">
                    {Static.item.rank < 100 ? "low rank" : "medium rank"}
                  </span>
                </div>
                <div>
                  <div class="about-project">
                    <div class="info-bell">
                      <img src={svg["iconsGreen/bell"]} class="bell"></img>
                    </div>
                    <h2>PRE SEED ROUND IS OPEN</h2>
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
                    <div class="progressBlock">
                      <div
                        style={
                          !Static.item.have || !Static.item.target
                            ? `width: calc(0%)`
                            : Static.item.have >= Static.item.target
                            ? `width: calc(100%)`
                            : `width: calc(100% * ${
                                Static.item.have / Static.item.target
                              })`
                        }
                        class="progressBlock-column"
                      ></div>
                    </div>
                    <span class="summ">
                      {Static.item.have}$/{Static.item.target}$
                    </span>
                    <div class="card-btns">
                      <button class="btn btn-black">
                        min. {Static.item.seedRound}$
                      </button>
                      <button class="btn btn-black">without comission</button>
                    </div>
                    <button class="btn btn-green mt-10">
                      BECOME OUR PARTNER
                    </button>
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
                        {!mapPoints[key].noPoints ? (
                          <span class="text-green">
                            {Static.item?.rankList[key]}
                            {mapPoints[key].maxPoint
                              ? `/${mapPoints[key].maxPoint}`
                              : null}{" "}
                            points
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
                <div class="scheme-cards">
                  <div class="scheme-card" id="problem">
                    <div class="scheme-sidebar_item text">
                      <span>Problem</span>
                      <span class="text-green">
                        {Static.item.rankList.problem}
                        {mapPoints.problem.maxPoint
                          ? `/${mapPoints.problem.maxPoint}`
                          : null}{" "}
                        points
                      </span>
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
                      <span class="text-green">
                        {/* {Static.item.rankList.investors} points */}
                        {Static.item.rankList.investors}
                        {mapPoints.investors.maxPoint
                          ? `/${mapPoints.investors.maxPoint}`
                          : null}{" "}
                        points
                      </span>
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
                      <span>Pre-Seed Round</span>
                    </div>
                    <div class="scheme-card_desc">
                      <span>Raised: $ 60,000 / 01 Mar, 2023/ </span>
                      <div class="grid-2">
                        <div class="company">
                          <img src={images["project/circle2"]} />
                          <span>DUMA Capital</span>
                        </div>
                        <div class="company">
                          <img src={images["project/circle1"]} />
                          <span>Angel investors</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="scheme-card" id="tokenomics">
                    <div class="scheme-sidebar_item text">
                      <span>Tokenomics</span>
                      <span class="text-green">
                        {Static.item.rankList.tokenomics}
                        {mapPoints.tokenomics.maxPoint
                          ? `/${mapPoints.tokenomics.maxPoint}`
                          : null}{" "}
                        points
                      </span>
                    </div>
                    <div class="scheme-card_desc">
                      <div class="grid-2">
                        <div class="tokenomic">
                          <div class="blur">
                            <h2>Tokenomic is changed</h2>
                          </div>
                        </div>
                        <ul class="list-standart">
                          <li>
                            The main task of the team is to make every effort to
                            encourage token holders to hold onto their tokens
                            after TGE and not sell them.
                          </li>
                          <li>
                            New token mechanics and adjustments are being
                            considered daily. In the future, public rounds and
                            the team's share will be reduced and adjusted to
                            avoid large token sales in the future
                          </li>
                          <li>
                            The tokenomics include a portion allocated for
                            marketing and a portion for reserves. This has been
                            done to maintain the token price and have tokens
                            available for anticipated situations
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="scheme-card" id="utility">
                    <div class="scheme-sidebar_item text">
                      <span>Utility and Value</span>
                      <span class="text-green">
                        {Static.item.rankList.utility}
                        {mapPoints.utility.maxPoint
                          ? `/${mapPoints.utility.maxPoint}`
                          : null}{" "}
                        points
                      </span>
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
                      <span class="text-green">
                        {Static.item.rankList.team}
                        {mapPoints.team.maxPoint
                          ? `/${mapPoints.team.maxPoint}`
                          : null}{" "}
                        points
                      </span>
                    </div>
                    <div class="scheme-card_desc text">
                      The team currently consists of more than 15 people,
                      including experienced developers in the IT and blockchain
                      industry, analysts and traders, and product managers from
                      large companies. The CEO of the project is an entrepreneur
                      with 11 years of experience in retail and a crypto
                      influencer. The team is open and all members can be found
                      on social media, with their experience confirmed
                      <div class="scheme-team">
                        <div>
                          <a
                            class="scheme-team_item"
                            href="https://www.linkedin.com/in/denmagdanov/"
                            target="_blank"
                          >
                            <img src={images["team/den"]} />
                            <span>DEN</span>
                            <span>MAGDANOV</span>
                          </a>
                        </div>
                        <div>
                          <a
                            class="scheme-team_item"
                            href="https://www.linkedin.com/in/tom-nosov/"
                            target="_blank"
                          >
                            <img src={images["team/tom"]} />
                            <span>TOM</span>
                            <span>NOSOV</span>
                          </a>
                        </div>
                        <div>
                          <a
                            class="scheme-team_item"
                            href="https://www.linkedin.com/in/yan-krivonosov-328584219/"
                            target="_blank"
                          >
                            <img src={images["team/yan"]} />
                            <span>YAN</span>
                            <span>KRIVONOSOV</span>
                          </a>
                        </div>
                        <div class="scheme-team_item">
                          <img src={images["team/igor"]} />
                          <span>IGOR</span>
                          <span>IENSHIN</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="scheme-card" id="roadmap">
                    <div class="scheme-sidebar_item text">
                      <span>Roadmap</span>
                      <span class="text-green">
                        {Static.item.rankList.roadmap}
                        {mapPoints.roadmap.maxPoint
                          ? `/${mapPoints.roadmap.maxPoint}`
                          : null}{" "}
                        points
                      </span>
                    </div>
                    <div class="scheme-card_desc text">
                      <div class="scheme-card_roadmap">
                        <div class="scheme-card_roadmap-item">
                          <h6>Q3 2022 </h6>
                          <div class="text-green">
                            <p>Launch of the Platform Development</p>
                            <p>Personal Account Development</p>
                            <p>Registration of the Company</p>
                            <p>Start Information Recourse Development</p>
                            <p>Search for Investors & Affiliates</p>
                            <p>Strategic partnerships</p>
                            <p>Launching Landing page</p>
                            <p>Launching Subpage on Site</p>
                          </div>
                        </div>
                        <div class="scheme-card_roadmap-item">
                          <h6>Q4 2022 </h6>
                          <div class="text-green">
                            <p>Launch of the Platform Development</p>
                            <p>Personal Account Development</p>
                            <p>Registration of the Company</p>
                            <p>Start Information Recourse Development</p>
                            <p>Search for Investors & Affiliates</p>
                            <p>Strategic partnerships</p>
                            <p>Launching Landing page</p>
                            <p>Launching Subpage on Site</p>
                          </div>
                        </div>
                        <div class="scheme-card_roadmap-item">
                          <h6>Q1 2023</h6>
                          <div class="text-green">
                            <p>Negotiations with VC & DAO</p>
                            <p>Integration of Neural Networks in work</p>
                            <p>Launching Social Network & Automatization</p>
                            <p>First Projects on Listing</p>
                            <p>First Airdrop</p>
                            <p>Alpha Version of The Information Recourse</p>
                            <p>Preparation of sites for attracting traffic</p>
                            <p>MVP, Testing</p>
                            <p>Launching Personal Account in System</p>
                          </div>
                          <div>
                            <p>Launch of Referral System</p>
                            <p>Closing of the PreSeed Round</p>
                            <p>Open of the Seed Round</p>
                            <p>The First Investment from VC</p>
                            <p>Partnership with KOLs and PRs</p>
                            <p>Lead Investor Partnership</p>
                          </div>
                        </div>
                        <div class="scheme-card_roadmap-item">
                          <h6>Q2 2023</h6>
                          <div>
                            <p>Closing a Seed Round</p>
                            <p>Open of Strategic Round</p>
                            <p>Marketing Events</p>
                            <p>The Alpha Version of the Ecosystem</p>
                            <p>First Fundraisings on the Platform</p>
                            <p>Launching Academy Development</p>
                            <p>Implementation of Info-Bot</p>
                            <p>Negotiations with CEX and DEX platforms</p>
                            <p>Closing a Strategic Round</p>
                            <p>Launch of Private Round</p>
                            <p>NFT collection Developing</p>
                            <p>Marketplace and INO development</p>
                            <p>Customer and User Scaling</p>
                            <p>Mobile application development</p>
                            <p>Closing a Private Round</p>
                          </div>
                        </div>
                        <div class="scheme-card_roadmap-item">
                          <h6>Q3 2023 </h6>
                          <div>
                            <p>Launch of Public Round on IDO</p>
                            <p>Launch of NFT Sale</p>
                            <p>Launch DAO, Staking, LP</p>
                            <p>Closing a Public Round</p>
                            <p>Development of bot-assistant</p>
                            <p>First Educational Programs</p>
                            <p>Firtst Alpha Mobile Application</p>
                            <p>TGE and Listing Listing on CEX and DEX</p>
                            <p>Development of P2P Exchanger</p>
                            <p>Launch and Testing of the Marketplace</p>
                            <p>Educational software integration</p>
                            <p>Launch and testing of the Online Academy</p>
                            <p>Scaling all directions of the ecosystem</p>
                            <p>Holding marketing events</p>
                            <p>Launch a Markentlace on Platform</p>
                          </div>
                        </div>
                        <div class="scheme-card_roadmap-item">
                          <h6>Q4 2023</h6>
                          <div>
                            <p>Deployment of the trading platform</p>
                            <p>Wallet development</p>
                            <p>Promotion of the Online Academy</p>
                            <p>Opening affiliate branches</p>
                            <p>Emphasis on patner formation</p>
                            <p>Active ecosystem and brand PR</p>
                            <p>
                              Expanding the community of the entire ecosystem
                            </p>
                            <p>Analysis and fine-tuning of the entire system</p>
                            <p>Official opening of all ecosystem products</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="scheme-card" id="documentation">
                    <div class="scheme-sidebar_item text">
                      <span>Documentation</span>
                      <span class="text-green">
                        {Static.item.rankList.documentation}
                        {mapPoints.documentation.maxPoint
                          ? `/${mapPoints.documentation.maxPoint}`
                          : null}{" "}
                        points
                      </span>
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
                      <span class="text-green">
                        {Static.item.rankList.social}
                        {mapPoints.social.maxPoint
                          ? `/${mapPoints.social.maxPoint}`
                          : null}{" "}
                        points
                      </span>
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
                      <span class="text-green">
                        {Static.item.rankList.launchpad}
                        {mapPoints.launchpad.maxPoint
                          ? `/${mapPoints.launchpad.maxPoint}`
                          : null}{" "}
                        points
                      </span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.launchpad, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card" id="cexDex">
                    <div class="scheme-sidebar_item text">
                      <span>CEX/DEX</span>
                      <span class="text-green">
                        {Static.item.rankList.cexDex}
                        {mapPoints.cexDex.maxPoint
                          ? `/${mapPoints.cexDex.maxPoint}`
                          : null}{" "}
                        points
                      </span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.cexDex, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card" id="aggregator">
                    <div class="scheme-sidebar_item text">
                      <span>Listing on aggregator</span>
                      <span class="text-green">
                        {Static.item.rankList.aggregator}
                        {mapPoints.aggregator.maxPoint
                          ? `/${mapPoints.aggregator.maxPoint}`
                          : null}{" "}
                        points
                      </span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.aggregator, {
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
                      <span class="text-green">
                        {Static.item.rankList.mediaText}
                        {mapPoints.mediaText.maxPoint
                          ? `/${mapPoints.mediaText.maxPoint}`
                          : null}{" "}
                        points
                      </span>
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
                      {fn.editText(Static.item.totalText, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <center class="el-bottom mt-70">
                    <button class="btn btn-green mb-15">
                      Contributing is currently unavailable
                    </button>
                    <div class="project-rang-vertical">
                      <span>
                        {Static.item.rank ? Static.item.rank : 0} points
                      </span>
                      <span class="rang">
                        {Static.item.rank < 100 ? "low rank" : "medium rank"}
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
