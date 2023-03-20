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
                      <span>Problem</span>
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
                        <img src={images["project/tokenomisc"]} />
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
                    <div class="scheme-card_desc">
                      <p class="text">
                        The team currently consists of more than 15 people,
                        including experienced developers in the IT and
                        blockchain industry, analysts and traders, and product
                        managers from large companies. The CEO of the project is
                        an entrepreneur with 11 years of experience in retail
                        and a crypto influencer. The team is open and all
                        members can be found on social media, with their
                        experience confirmed
                      </p>
                      <div class="scheme-team">
                        <div class="scheme-team_item">
                          <img src={images["team/den"]} />
                          <span>Den Magdanov</span>
                        </div>
                        <div class="scheme-team_item">
                          <img src={images["team/eugene"]} />
                          <span>Den Magdanov</span>
                        </div>
                        <div class="scheme-team_item">
                          <img src={images["team/ivery"]} />
                          <span>Den Magdanov</span>
                        </div>
                        <div class="scheme-team_item">
                          <img src={images["team/ogannes"]} />
                          <span>Den Magdanov</span>
                        </div>
                        <div class="scheme-team_item">
                          <img src={images["team/roman"]} />
                          <span>Den Magdanov</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <center class="el-bottom">
                <button class="btn btn-green mb-15">
                  Contributing is currently unavailable
                </button>
                <div class="project-rang-vertical">
                  <span>101 points</span>
                  <span class="rang">medium rang</span>
                </div>
              </center>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
