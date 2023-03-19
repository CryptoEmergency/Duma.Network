import {
  jsx,
  jsxFrag
} from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";

const forExport = function ({ className }) {
  return (
    <section id="advantages">
      <section class="investing">
        <center>
          <h2 class="general-title">Advantages</h2>
          <span>
            For different market participants.
          </span>
        </center>
        <div class="invest-inner">
          <div class="invest-item">
            <img src={svg["investing/coin"]} />
            <p class="duma-text">Private investors receive project research and fund startups</p>
          </div>
          <div class="invest-item">
            <img src={svg["investing/door"]} />
            <p class="duma-text">
              Newcomers study the market and all the information about
              new projects
            </p>
          </div>
          <div class="invest-item">
            <img src={svg["investing/key"]} />
            <p class="duma-text">
              Startups receive listing, shilling, investments and a large community from the platform.
            </p>
          </div>
          <div class="invest-item">
            <img src={svg["investing/picture"]} />
            <p class="duma-text">
              The community buys SAFT from investors, even after closed rounds.
            </p>
          </div>
          <div class="invest-item">
            <img src={svg["investing/bonus"]} />
            <p class="duma-text">
              Influencers get allocations in the best projects and can invest together with followers
            </p>
          </div>
        </div>
      </section>
      <section class="contract">
        <div class="contract-inner">
          <div class="contract-desc">
            <img src={svg["contract"]} class="contract-img" />
            <span style="width: 80%; padding-left: 50px">
              Secure investing through the platform protocol with escrow wallets and the possibility of a refund in case of a lack of development from the startup
            </span>
          </div>
          <a
            style="width: 20%;"
            target="_blank"
            href="https://linktr.ee/duma_network"
            class="btn btn-green"
          >
            More INFORMATION
          </a>
          {/* <button class="btn btn-green"></button> */}
        </div>
      </section>
      <section class="advantages">
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
    </section>
  );
};

export default forExport;