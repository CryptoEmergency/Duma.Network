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

const team = [
  {
    name: "DEN MAGDANOV",
    img: images["team/den"],
    job: "ceo",
    flag: images["flags/tr"],
    about:
      "The creator of DÜMA NETWORK, 11 years in business, blogger, investor and crypto enthusiast.Investing in crypto since 2015.",
  },
  {
    name: "ROMAN SIDE",
    img: images["team/roman"],
    job: "ceo",
    flag: images["flags/country"],
    about: "President of the Blockchain Developers Association.",
  },
  {
    name: "MAXIM SINKEVICH",
    img: images["team/maxim"],
    job: "ceo",
    flag: images["flags/country"],
    about:
      "Head of development department at MST Company with more than 7 years of experience (Sberbank, Sberdrug, VTB, Dom.ru, Kinopoisk, Yandex).",
  },
  {
    name: "EUGENE KARR",
    img: images["team/roman"],
    job: "HDD",
    flag: images["flags/ru"],
    about:
      "Senior analyst and partnership development specialist. Experienced investor and crypto-enthusiast.",
  },
  // {
  //   name: "OGANNES OSIPYAN",
  //   img: images["team/ogannes"],
  //   job: "cm",
  //   flag: images["flags/am"],
  //   about: "President of the Blockchain Developers Association.",
  // },
  // {
  //   name: "IVERI KUDAVA",
  //   img: images["team/ivery"],
  //   job: "bdm",
  //   flag: images["flags/ge"],
  //   about:
  //     "Community manager. Crypto Business Developer. Professional Translator. Huge crypto enthusiast",
  // },
  // {
  //   name: "ALEKSA MIROSLAVSKAYA",
  //   img: images["team/roman"],
  //   job: "bdm",
  //   flag: images["flags/ru"],
  //   about:
  //     "Crypto enthusiast, investor. Has extensive experience working with major exchanges and foreign blockchain markets",
  // },
  // {
  //   name: "ROMAN SIDE",
  //   img: images["team/roman"],
  //   job: "ceo",
  //   flag: images["flags/country"],
  //   about: "President of the Blockchain Developers Association.",
  // },
];

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });

  load({
    ID,
    fn: () => {
      return (
        <div class="main-back">
          <div class="wrapper">
            <div class="main-inner">
              <section class="intro" id="about">
                <div class="intro-inner">
                  <div class="intro-desc">
                    <h1 class="intro-title">DÜMA.NETWORK</h1>
                    <p class="intro-info">
                      A tool for investors. Research, analytics, secure
                      contribution with any amount, split SAFT and sell through
                      the platform.
                    </p>
                  </div>
                  <div class="device">
                    <img src={images["device"]}></img>
                  </div>
                </div>

                <div class="ecosystem">
                  <h2 class="ecosystem-title">
                    ALL IN ONE - <br />
                    CHOOSE, RESEARCH, STUDY, INVEST, SELL, EARN.
                  </h2>
                  <div class="grid-3 ecosystem-box">
                    <div class="eco-item">
                      <h6 class="eco-title">RESEARCH HUB</h6>
                      <div class="eco-item_desc">
                        <p class="general-text eco-text">
                          We perform startup screening and research from our
                          analysts and create a rating evaluation so that users
                          don't waste time searching for this information on
                          other resources.
                        </p>
                        <p class="general-text eco-text">
                          The analytical section contains an alternative
                          evaluation of startups from third-party experts using
                          the SAAS model.
                        </p>
                      </div>
                    </div>
                    <div class="eco-item">
                      <h6 class="eco-title">protocol</h6>
                      <div class="eco-item_desc">
                        <p class="general-text eco-text">
                          An Escrow smart contract is designed to secure an
                          investor's funds and allow for staged financing of a
                          startup based on pre-agreed conditions.
                        </p>
                        <p class="general-text eco-text">
                          The SAFT can be divided into NFTs with metadata
                          indicating the final beneficiary, and tokens can be
                          further distributed through a protocol.
                        </p>
                      </div>
                    </div>
                    <div class="eco-item">
                      <h6 class="eco-title">SAFT MARKETPLACE</h6>
                      <div class="eco-item_desc">
                        <p class="general-text eco-text">
                          P2P transactions between funds, investors and users.{" "}
                        </p>
                        <p class="general-text eco-text">
                          Buy SAFT assets from early venture investors who are
                          selling their vested assets.
                        </p>
                        <p class="general-text eco-text">
                          Invest in early rounds, sell SAFT and increase the
                          token value before TGE.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p class="ecosystem-text">
                    All information and opportunities for funds, investors,
                    startups, and communities on one platform.
                  </p>
                  <p class="ecosystem-text">
                    No more need for third-party resources
                  </p>
                </div>
              </section>

              <section class="investing">
                <center>
                  <h2 class="general-title">Investing</h2>
                  <span>
                    The benefits of investing now on the Pre Seed round:
                  </span>
                </center>
                <div class="invest-inner">
                  <div class="invest-item">
                    <img src={svg["investing/coin"]} />
                    <p class="duma-text">Low token price, just $0.1</p>
                  </div>
                  <div class="invest-item">
                    <img src={svg["investing/door"]} />
                    <p class="duma-text">
                      No token hold, unlocking from the 1st month
                    </p>
                  </div>
                  <div class="invest-item">
                    <img src={svg["investing/key"]} />
                    <p class="duma-text">
                      No token hold, unlocking from the 1st month
                    </p>
                  </div>
                  <div class="invest-item">
                    <img src={svg["investing/picture"]} />
                    <p class="duma-text">
                      NFT from ecosystem collection, on investing from 2000$
                    </p>
                  </div>
                  <div class="invest-item">
                    <img src={svg["investing/bonus"]} />
                    <p class="duma-text">
                      Bonus of 10% of tokens on amounts investing from 10000$
                    </p>
                  </div>
                </div>
              </section>
              <section class="contract">
                <div class="contract-inner">
                  <div class="contract-desc">
                    <img src={svg["contract"]} class="contract-img" />
                    <span>
                      Conclusion of SAFT contract for amounts from 5000$
                    </span>
                  </div>
                  <button class="btn">INVEST IN PROJECT</button>
                </div>
              </section>
              <section class="advantages" id="advantages">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <h2 class="general-title">Opportunities</h2>
                <div class="advantages-inner">
                  <div class="advance">
                    <div class="advance-item advance-item_back--0">
                      <h6 class="advance-title">
                        Simple and straightforward investing
                      </h6>
                      <p class="duma-text">
                        register, choose a project, replenish the balance,
                        invest
                      </p>
                    </div>
                    <div class="advance-item advance-item_back--1">
                      <h6 class="advance-title">Information resource</h6>
                      <p class="duma-text">
                        full project descriptions and research, validated
                        information from startups and peer reviews
                      </p>
                    </div>
                    <div class="advance-item advance-item_back--2">
                      <h6 class="advance-title">SAAS token payment model</h6>
                      <p class="duma-text">
                        access to additional functionality when paying with
                        ecosystem tokens, will form a constant demand for token.
                      </p>
                    </div>
                  </div>
                  <div class="advance">
                    <div class="advance-item advance-item_back--3">
                      <h6 class="advance-title">Choice of any round</h6>
                      <p class="duma-text">Seed, Private, Public and others</p>
                    </div>
                    <div class="advance-item advance-item_back--4">
                      <h6 class="advance-title">Ranking Score of projects</h6>
                      <p class="duma-text">
                        ranking system with a number of scores assessing the
                        trustworthiness of the project
                      </p>
                    </div>
                    <div class="advance-item advance-item_back--5">
                      <h6 class="advance-title">Expertise and promotion</h6>
                      <p class="duma-text">
                        an opportunity for KOLs to become the project's
                        Ambassador, offers for Influencers and integration of
                        experts on the platform
                      </p>
                    </div>
                  </div>
                  <div class="advance">
                    <div class="advance-item advance-item_back--6">
                      <h6 class="advance-title">Open Venture Fund</h6>
                      <p class="duma-text">
                        opportunity for any VC and Influencer to become a
                        partner and organize their own fundraising through our
                        platform
                      </p>
                    </div>
                    <div class="advance-item advance-item_back--7">
                      <h6 class="advance-title">Virtual Assistant</h6>
                      <p class="duma-text">
                        the answer to any question when pointing the cursor,
                        text and video hints in any section of the ecosystem
                      </p>
                    </div>
                    <div class="advance-item advance-item_back--8">
                      <h6 class="advance-title">Affiliate program</h6>
                      <p class="duma-text">
                        for leaders and Influencers with an audience
                      </p>
                    </div>
                  </div>
                  <div class="advance">
                    <div class="advance-item advance-item_back--9">
                      <h6 class="advance-title">Startup incubator</h6>
                      <p class="duma-text">
                        attracting any amount of investment and community,
                        comprehensive startup, promotion and development
                      </p>
                    </div>
                    <div class="advance-item advance-item_back--10">
                      <h6 class="advance-title">Mobile application</h6>
                      <p class="duma-text">
                        for convenience and simplicity of using the ecosystem
                      </p>
                    </div>
                    <div class="advance-item advance-item_back--11">
                      <h6 class="advance-title">Crypto academy</h6>
                      <p class="duma-text">
                        learning while using the platform, as well as a section
                        with complete teaching on currencies
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section class="parthers" id="partners">
                <h2 class="general-title">Partners & Bakers</h2>
                <div class="parthers-inner">
                  <a target="_blank" href="https://zyx.network/">
                    <img class="parther-img" src={svg["partners/partner1"]} />
                  </a>
                  <a target="_blank" href="http://timeus.org">
                    <img class="parther-img" src={svg["partners/partner2"]} />
                  </a>
                  <a target="_blank" href="http://atomic.green">
                    <img class="parther-img" src={svg["partners/partner3"]} />
                  </a>
                  <a href="/">
                    <img class="parther-img" src={images["logo-white"]} />
                  </a>
                  <a target="_blank" href="https://crypto-emergency.com/">
                    <img class="parther-img" src={svg["partners/partner4"]} />
                  </a>
                </div>
              </section>
              <section class="roadmap" id="roadmap">
                <h2 class="general-title">Roadmap</h2>
                <div class="roadmap-inner">
                  <div class="roadmap-item">
                    <h6 class="roadmap-title">Q3 2022</h6>
                    <div class="roadmap-desc">
                      <p>Idea Generation</p>
                      <p>Market Analysis</p>
                      <p>WhitePaper v1.0</p>
                      <p>Pre-Seed round launch</p>
                      <p>Launch of the website and socials</p>
                      <p>Team building and expansion</p>
                      <p>Finalization of the concept and wrapping</p>
                      <p>Launch of the platform development</p>
                    </div>
                  </div>
                  <div class="roadmap-item">
                    <h6 class="roadmap-title">Q3 2022</h6>
                    <div class="roadmap-desc">
                      <p>Idea Generation</p>
                      <p>Market Analysis</p>
                      <p>WhitePaper v1.0</p>
                      <p>Pre-Seed round launch</p>
                      <p>Launch of the website and socials</p>
                      <p>Team building and expansion</p>
                      <p>Finalization of the concept and wrapping</p>
                      <p>Launch of the platform development</p>
                    </div>
                  </div>
                  <div class="roadmap-item">
                    <h6 class="roadmap-title">Q3 2022</h6>
                    <div class="roadmap-desc">
                      <p>Idea Generation</p>
                      <p>Market Analysis</p>
                      <p>WhitePaper v1.0</p>
                      <p>Pre-Seed round launch</p>
                      <p>Launch of the website and socials</p>
                      <p>Team building and expansion</p>
                      <p>Finalization of the concept and wrapping</p>
                      <p>Launch of the platform development</p>
                    </div>
                  </div>
                  <div class="roadmap-item">
                    <h6 class="roadmap-title">Q3 2022</h6>
                    <div class="roadmap-desc">
                      <p>Idea Generation</p>
                      <p>Market Analysis</p>
                      <p>WhitePaper v1.0</p>
                      <p>Pre-Seed round launch</p>
                      <p>Launch of the website and socials</p>
                      <p>Team building and expansion</p>
                      <p>Finalization of the concept and wrapping</p>
                      <p>Launch of the platform development</p>
                    </div>
                  </div>
                  <div class="roadmap-item">
                    <h6 class="roadmap-title">Q3 2022</h6>
                    <div class="roadmap-desc">
                      <p>Idea Generation</p>
                      <p>Market Analysis</p>
                      <p>WhitePaper v1.0</p>
                      <p>Pre-Seed round launch</p>
                      <p>Launch of the website and socials</p>
                      <p>Team building and expansion</p>
                      <p>Finalization of the concept and wrapping</p>
                      <p>Launch of the platform development</p>
                    </div>
                  </div>
                  <div class="roadmap-item">
                    <h6 class="roadmap-title">Q3 2022</h6>
                    <div class="roadmap-desc">
                      <p>Idea Generation</p>
                      <p>Market Analysis</p>
                      <p>WhitePaper v1.0</p>
                      <p>Pre-Seed round launch</p>
                      <p>Launch of the website and socials</p>
                      <p>Team building and expansion</p>
                      <p>Finalization of the concept and wrapping</p>
                      <p>Launch of the platform development</p>
                    </div>
                  </div>
                </div>
              </section>
              <section class="team" id="team">
                <a name="team"></a>
                <center>
                  <h2 class="general-title">Multinational team</h2>
                  <span>from different countries</span>
                </center>
                <div class="team-inner">
                  {team.map((item) => {
                    return (
                      <div class="team-item">
                        <img class="team-img" src={item.img} />
                        <h5 class="team-name">{item.name}</h5>
                        <span class="team-job">
                          {item.job}
                          <img src={item.flag} />
                        </span>
                        <p class="team-text">{item.about}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
              <section class="info-social" id="social">
                <div class="info">
                  <h3>MORE INFO</h3>
                  <button class="btn">PITCHDECK</button>
                  <button class="btn">LITEPAPER</button>
                </div>
                <div class="social">
                  <h3>SOCIAL</h3>
                  <span>Subscribe to our social networks!</span>
                  <div class="social-inner">
                    <a href="https://discord.gg/8wg2pDGHgj" target="_blank">
                      <img src={svg["icons/discord"]} alt="Discord" />
                    </a>
                    <a href="https://t.me/duma_network" target="_blank">
                      <img src={svg["icons/telegram"]} alt="Telegram" />
                    </a>
                    <a href="https://twitter.com/duma_network" target="_blank">
                      <img src={svg["icons/twitter"]} alt="Twitter" />
                    </a>
                    <a
                      href="https://www.youtube.com/@DENMAGDANOV/featured"
                      target="_blank"
                    >
                      <img src={svg["icons/youtube"]} alt="Youtube" />
                    </a>
                  </div>
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
