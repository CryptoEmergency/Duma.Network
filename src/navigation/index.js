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
  {
    name: "OGANNES OSIPYAN",
    img: images["team/ogannes"],
    job: "cm",
    flag: images["flags/am"],
    about: "President of the Blockchain Developers Association.",
  },
  {
    name: "IVERI KUDAVA",
    img: images["team/ivery"],
    job: "bdm",
    flag: images["flags/ge"],
    about:
      "Community manager. Crypto Business Developer. Professional Translator. Huge crypto enthusiast",
  },
  {
    name: "ALEKSA MIROSLAVSKAYA",
    img: images["team/roman"],
    job: "bdm",
    flag: images["flags/ru"],
    about:
      "Crypto enthusiast, investor. Has extensive experience working with major exchanges and foreign blockchain markets",
  },
  {
    name: "ROMAN SIDE",
    img: images["team/roman"],
    job: "ceo",
    flag: images["flags/country"],
    about: "President of the Blockchain Developers Association.",
  },
];

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });

  load({
    ID,
    fn: () => {
      return (
        <div class="wrapper">
          {/* <img class="main-img" src={svg["backMain"]} /> */}
          <div class="main-inner">
            <section class="intro">
              <div class="intro-inner">
                <div class="intro-desc">
                  <h1 class="intro-title">DÜMA NETWORK</h1>
                  <h2 class="intro-title_second">Unite To Earn</h2>
                  <p class="intro-info">
                    Is an investment ecosystem that combines a Launchpad, an
                    information resource and an academy.
                  </p>
                </div>
                <img src={images["device"]}></img>
              </div>

              <div class="ecosystem">
                <h4 class="ecosystem-title">The ecosystem includes:</h4>
                <div class="grid-3 ecosystem-box">
                  <div class="eco-item">
                    <h6 class="eco-title">LAUNCHPAD</h6>
                    <p class="eco-text">
                      Our crowdfunding ecosystem helps startups to raise
                      investments in any round, with support from a large
                      community of private investors. This allows each user to
                      invest in any round, while the startup builds a community.
                    </p>
                  </div>
                  <div class="eco-item">
                    <h6 class="eco-title">INFORMATION RESOURCE</h6>
                    <p class="eco-text">
                      Integration of the information resource allows you to
                      collect all the information about the startup in one
                      place, assigning points to each section of information and
                      forming a final rating of trustworthiness for the project.
                      This allows the investor to research the project without
                      having to go to third-party resources.
                    </p>
                  </div>
                  <div class="eco-item">
                    <h6 class="eco-title">ACADEMY</h6>
                    <p class="eco-text">
                      Crypto Academy and Information Assistant will allow you to
                      get information about any element or item on the platform,
                      providing text and video hints, natively educating the
                      user when he needs this information.
                    </p>
                  </div>
                </div>
                <p class="ecosystem-text ecosystem-text1">
                  So the ecosystem user doesn't have to go to other resources to
                  find answers to their questions. We focus their attention on
                  the ecosystem projects, increasing conversion rates.
                </p>
                <p class="ecosystem-text ecosystem-text2">
                  We simplify and automate processes, provide quality service
                  and comprehensive solutions for all market participants.
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
                  <p>Low token price, just $0.1</p>
                </div>
                <div class="invest-item">
                  <img src={svg["investing/door"]} />
                  <p>No token hold, unlocking from the 1st month</p>
                </div>
                <div class="invest-item">
                  <img src={svg["investing/key"]} />
                  <p>No token hold, unlocking from the 1st month</p>
                </div>
                <div class="invest-item">
                  <img src={svg["investing/picture"]} />
                  <p>NFT from ecosystem collection, on investing from 2000$</p>
                </div>
                <div class="invest-item">
                  <img src={svg["investing/bonus"]} />
                  <p>Bonus of 10% of tokens on amounts investing from 10000$</p>
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
            <section class="advantages">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <h2 class="general-title">Advantages</h2>
              <div class="advantages-inner">
                <div class="advance">
                  <div class="advance-item">
                    <h6 class="advance-title">
                      Simple and straightforward investing
                    </h6>
                    <p class="advance-text">
                      register, choose a project, replenish the balance, invest
                    </p>
                  </div>
                  <div class="advance-item">
                    <h6 class="advance-title">Information resource</h6>
                    <p class="advance-text">
                      full project descriptions and research, validated
                      information from startups and peer reviews
                    </p>
                  </div>
                  <div class="advance-item">
                    <h6 class="advance-title">SAAS token payment model</h6>
                    <p class="advance-text">
                      access to additional functionality when paying with
                      ecosystem tokens, will form a constant demand for token.
                    </p>
                  </div>
                  <div class="advance-item">
                    <h6 class="advance-title">DEFI capabilities</h6>
                    <p class="advance-text">
                      DAO, Staking, Liquid Pool, Cross-chain, Swap and DEX
                    </p>
                  </div>
                </div>
                <div class="advance">
                  <div class="advance-item">
                    <h6 class="advance-title">Choice of any round</h6>
                    <p class="advance-text">Seed, Private, Public and others</p>
                  </div>
                  <div class="advance-item">
                    <h6 class="advance-title">Ranking Score of projects</h6>
                    <p class="advance-text">
                      ranking system with a number of scores assessing the
                      trustworthiness of the project
                    </p>
                  </div>
                  <div class="advance-item">
                    <h6 class="advance-title">Expertise and promotion</h6>
                    <p class="advance-text">
                      an opportunity for KOLs to become the project's
                      Ambassador, offers for Influencers and integration of
                      experts on the platform
                    </p>
                  </div>
                  <div class="advance-item">
                    <h6 class="advance-title">
                      Crypto-wallet with the fiat payments integration
                    </h6>
                    <p class="advance-text">
                      for quick financial tasks solution
                    </p>
                  </div>
                </div>
                <div class="advance">
                  <div class="advance-item">
                    <h6 class="advance-title">Open Venture Fund</h6>
                    <p class="advance-text">
                      opportunity for any VC and Influencer to become a partner
                      and organize their own fundraising through our platform
                    </p>
                  </div>
                  <div class="advance-item">
                    <h6 class="advance-title">Virtual Assistant</h6>
                    <p class="advance-text">
                      the answer to any question when pointing the cursor, text
                      and video hints in any section of the ecosystem
                    </p>
                  </div>
                  <div class="advance-item">
                    <h6 class="advance-title">Affiliate program</h6>
                    <p class="advance-text">
                      for leaders and Influencers with an audience
                    </p>
                  </div>
                  <div class="advance-item">
                    <h6 class="advance-title">NFT Marketplace and INO</h6>
                    <p class="advance-text">
                      for buying and selling any NFT assets and launching NFT
                      collections
                    </p>
                  </div>
                </div>
                <div class="advance">
                  <div class="advance-item">
                    <h6 class="advance-title">Startup incubator</h6>
                    <p class="advance-text">
                      attracting any amount of investment and community,
                      comprehensive startup, promotion and development
                    </p>
                  </div>
                  <div class="advance-item">
                    <h6 class="advance-title">Mobile application</h6>
                    <p class="advance-text">
                      for convenience and simplicity of using the ecosystem
                    </p>
                  </div>
                  <div class="advance-item">
                    <h6 class="advance-title">Crypto academy</h6>
                    <p class="advance-text">
                      learning while using the platform, as well as a section
                      with complete teaching on currencies
                    </p>
                  </div>
                  <div class="advance-item">
                    <h6 class="advance-title">
                      AP2P exchanger and trading platform
                    </h6>
                    <p class="advance-text">
                      automatic person-to-person exchanger and ability to buy
                      cryptocurrency quickly
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section class="parthers">
              <h2 class="general-title">Partners & Bakers</h2>
              <div class="parthers-inner">
                <img class="parther-img" src={svg["partners/partner1"]} />
                <img class="parther-img" src={svg["partners/partner2"]} />
                <img class="parther-img" src={svg["partners/partner3"]} />
                <img class="parther-img" src={images["logo-white"]} />
              </div>
            </section>
            <section class="roadmap">
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
            <section class="team">
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
            <section class="info-social">
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
      );
    },
  });
};

export default start;
