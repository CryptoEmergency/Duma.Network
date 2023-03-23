import {
  jsx,
  jsxFrag,
  setStorage,
  Variable,
  load,
  Data,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const start = function (data, ID) {
  load({
    ID,
    fn: () => {
      return (
        <div class="back-secondary">
          <div class="wrapper">
            <div class="main-inner">
              <div class="crumbs">
                <a href="/">
                  <img alt="Home" src={svg["home"]} />
                </a>
                <img class="arrow-path" alt="path" src={svg["arrowPath"]} />
                <span>Seed Round</span>
                <img class="arrow-path" alt="path" src={svg["arrowPath"]} />
                <span>DUMA</span>
              </div>
              <section class="card-project">
                <div class="project-name">
                  <div class="company">
                    <img src={images["project/logo/logo"]}></img>
                    <span class="company-title">DUMA NETWORK</span>
                  </div>
                  <div class="statuses">
                    <div class="icon">
                      <img src={svg.binance}></img>
                    </div>
                    <div class="status">Active</div>
                    <div class="ecosystem">Ecosystem</div>
                  </div>
                </div>
                <div class="card-project-img">
                  <img src={images["project/duma"]}></img>
                </div>
                <div class="project-rang">
                  <span>101 points</span>
                  <span class="rang">medium rang</span>
                </div>
                <div>
                  <div class="about-project">
                    <div class="info-bell">
                      <img src={svg["iconsGreen/bell"]} class="bell"></img>
                    </div>
                    <h2>PRE SEED ROUND IS OPEN</h2>
                    <p class="text">
                      Invest in startups with flexible amounts & sell assets
                      pre-market entry via our platform. Make informed decisions
                      by studying the research.
                    </p>
                    <div class="socials">
                      <a target="_blank" href="#">
                        <img src={svg["iconsGreen/instagram"]}></img>
                      </a>
                      <a target="_blank" href="#">
                        <img src={svg["iconsGreen/facebook"]}></img>
                      </a>
                      <a target="_blank" href="#">
                        <img src={svg["iconsGreen/twitter"]}></img>
                      </a>
                      <a target="_blank" href="#">
                        <img src={svg["iconsGreen/youtube"]}></img>
                      </a>
                    </div>
                    <div class="progressBlock">
                      <div
                        style={[`width: calc(100% / 100 * 25)`]}
                        class="progressBlock-column"
                      ></div>
                    </div>
                    <span class="summ">60.000$/100.000$</span>
                    <div class="card-btns">
                      <button class="btn btn-black">min.1000$</button>
                      <button class="btn btn-black">without comission</button>
                    </div>
                    <button class="btn btn-green mt-10">
                      BECOME OUR INVESTOR
                    </button>
                  </div>
                </div>
              </section>
              <section class="project-scheme">
                <div class="scheme-sidebar">
                  <div class="scheme-sidebar_item text">
                    <span>Problem</span>
                    <span class="text-green">10/10 points</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Product</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Solution</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Investors</span>
                    <span class="text-green">4 points</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Seed Round</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Tokenomics</span>
                    <span class="text-green">23 points</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Utility Value</span>
                    <span class="text-green">30 points</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Team Advisors</span>
                    <span class="text-green">8/10 points</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Roadmap</span>
                    <span class="text-green">10/10 points</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Documentation</span>
                    <span class="text-green">8/10 points</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Social</span>
                    <span class="text-green">8/10 points</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Launchpad</span>
                    <span class="text-green">0/10 points</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>CEX/DEX</span>
                    <span class="text-green">0/10 points</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Listing</span>
                    <span class="text-green">0 points</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Media</span>
                    <span class="text-green">8/10 points</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Competitors</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Audit</span>
                    <span class="text-green">5/10 points</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Total</span>
                    <span class="text-green">107 points</span>
                  </div>
                  <div class="scheme-sidebar_item text">
                    <span>Comments</span>
                  </div>
                </div>
                <div class="scheme-cards">
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Problem</span>
                      <span class="text-green">10/10 points</span>
                    </div>
                    <div class="scheme-card_desc text">
                      The first problem is the large number of newcomers who
                      annually lose more than $10 billion in scam projects. The
                      reason for this is the lack of basic knowledge of analysis
                      and the high cost of quality education. The second problem
                      is that venture investing is not accessible to most people
                      and is often limited only to public rounds. The third
                      problem is that more investors want to exit SAFT deals
                      before TGE or before vesting ends. However, they cannot do
                      so because there are no automated mechanics and liquidity
                      for the asset.
                    </div>
                  </div>
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Product</span>
                    </div>
                    <div class="scheme-card_desc text">
                      A platform for investing in startups with small checks and
                      selling assets before entering the market, which includes:
                      <ul class="list-num">
                        <ol>
                          Research hub with all the information about projects,
                          research, a rating system and education.
                        </ol>
                        <ol>
                          SAFT Marketplace for crowdfunding, asset management,
                          distribution, and sales.
                        </ol>
                        <ol>
                          A protocol for safe investment through an escrow smart
                          contract, splitting your vesting assets, packaging
                          them into NFTs with metadata about the final recipient
                          and amount, for the possibility of further selling the
                          vesting asset
                        </ol>
                      </ul>
                    </div>
                  </div>
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Solution</span>
                    </div>
                    <div class="scheme-card_desc text">
                      The platform allows private investors to make simple and
                      secure deals to purchase SAFT assets at early stages with
                      small checks. They receive all the necessary information,
                      research, and education directly on the platform, without
                      relying on third-party resources. We offer an automated
                      crowdfunding solution with investor protection mechanics,
                      quality service, project expertise, and a SAFT Marketplace
                      for selling assets before entering the market. Our goal is
                      to guide private investors from point A to point B, where
                      they become knowledgeable venture crypto angels investing
                      in the right market directions. Our screening model,
                      project research, rating system, aggregation of all
                      startup information, and knowledge library enable us to
                      filter and select only high-potential investment projects,
                      thoroughly analyze them, and create a project card for our
                      investors. Investors, in turn, study information about
                      startups, research, and expertise, and are assigned a
                      certain number of points for each section of expertise.
                      This allows them to make investment decisions faster,
                      increasing lead conversion to clients
                      <ul class="list-standart mt-20">
                        <li>
                          The platform provides comprehensive information needed
                          for studying and investing, so there's no need to
                          collect any necessary information bit by bit.
                        </li>
                        <li>
                          Private investors receive project research and fund
                          startups.
                        </li>
                        <li>
                          Novices learn about the market and all project
                          information, becoming our partners.
                        </li>
                        <li>
                          The community buys SAFT stakes from investors through
                          the platform's Marketplace, even after closed
                          investment rounds.
                        </li>
                        <li>
                          Experts monetize their knowledge through SAAS
                          expertise monetization models. Influencers receive
                          allocations in the best projects and automate
                          fundraising processes through the community.
                        </li>
                        <li>
                          Startups get listing, shilling, investment, and a
                          large community on the platform.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Investors</span>
                      <span class="text-green">4 points</span>
                    </div>
                    <div class="scheme-card_desc text">
                      The project is currently at an early stage and is looking
                      for a lead investor for the SEED round. Previously, the
                      team was developing on their own funds and also almost
                      closed a PRE SEED round of $60,000, attracting their own
                      pool of investors within the framework of the DUMA CAPITAL
                      fund.
                    </div>
                  </div>
                  <div class="scheme-card">
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
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Tokenomics</span>
                      <span class="text-green">23 points</span>
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
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Utility and Value</span>
                      <span class="text-green">30 points</span>
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

                  {/* <div class="scheme-card">
                  <div class="scheme-sidebar_item text">
                    <span>Utility Value</span>
                    <span class="text-green">30 points</span>
                  </div>
                  <div class="scheme-card_desc">
                   <div class="grid-2">
                    <div>

                    </div>
                    <div></div>
                   </div>
                  </div>
                </div> */}
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Team</span>
                      <span class="text-green">8/10 points</span>
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

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Roadmap</span>
                      <span class="text-green">10/10 points</span>
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
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Documentation</span>
                      <span class="text-green">8/10 points</span>
                    </div>
                    <div class="scheme-card_desc text">
                      The project has a Big Data Room, a Unit Economics model, a
                      Financial Model, a Pitch Deck, and a Lightpaper. After the
                      pivot, the Whitepaper is being rewritten. The main
                      documents can be found at the following
                      <a class="text-green link-text" href="#" target="_blank">
                        {" "}
                        link
                      </a>
                      . The company is registered in Hong Kong and publicly
                      stated its registration. The documents are available in
                      the public domain
                    </div>
                  </div>
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Social</span>
                      <span class="text-green">8/10 points</span>
                    </div>
                    <div class="scheme-card_desc text">
                      <ul class="list-standart">
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
                      </ul>
                    </div>
                  </div>
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Launchpad</span>
                      <span class="text-green">0/10 points</span>
                    </div>
                    <div class="scheme-card_desc text">
                      The project is not listed on top tier launchpads
                    </div>
                  </div>
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>CEX/DEX</span>
                      <span class="text-green">0/10 points</span>
                    </div>
                    <div class="scheme-card_desc text">
                      The project has no agreements to be listed on any exchange
                      exchange
                    </div>
                  </div>
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Listing on aggregator</span>
                      <span class="text-green">0 points</span>
                    </div>
                    <div class="scheme-card_desc text">
                      The project is not listed on aggregator sites
                    </div>
                  </div>
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Competitors</span>
                    </div>
                    <div class="scheme-card_desc text">
                      At the moment, there are no direct public competitors to
                      the startup with the same business model.
                    </div>
                  </div>
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Media</span>
                      <span class="text-green">0/10 points</span>
                    </div>
                    <div class="scheme-card_desc text">
                      Articles and reviews on media resources were not found
                    </div>
                  </div>
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Audit</span>
                      <span class="text-green">0/10 points</span>
                    </div>
                    <div class="scheme-card_desc text">
                      The smart contract has not yet been created and no audit
                      has been conducted
                    </div>
                  </div>
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>TOTAL</span>
                      <span class="text-green">101 points</span>
                    </div>
                    <div class="scheme-card_desc text-green bold">
                      The startup is at an early stage, but this is the main
                      advantage in terms of investment now. By developing a mass
                      adoption for the venture investment market, the project
                      will allow private capital to be directed towards
                      financing new startups and developing the market. A
                      simple, open, automated investment model with a commission
                      will enable rapid development in this direction and
                      attract a large number of new customers. Additional SAAS
                      products serve as funnels for customers within the
                      platform, allowing for the conversion of different
                      audiences into investors. Information hubs and research
                      openly available will additionally attract an audience
                      that is more likely to make investment decisions, as all
                      the information about the startup is already on the
                      platform. The ability to resell vesting assets on the
                      platform will also expand this market and increase the
                      value of resold assets even before entering the market.
                    </div>
                  </div>
                  <div class="scheme-card">
                    <div class="scheme-sidebar_item">
                      <span>Comments</span>
                    </div>
                    <div class="scheme-card_desc">
                      <textarea
                        rows="4"
                        class="form-input"
                        placeholder="Enter text..."
                      ></textarea>
                    </div>
                  </div>
                  <center class="el-bottom mt-70">
                    <button class="btn btn-green mb-15">
                      Contributing is currently unavailable
                    </button>
                    <div class="project-rang-vertical">
                      <span>101 points</span>
                      <span class="rang">medium rang</span>
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
