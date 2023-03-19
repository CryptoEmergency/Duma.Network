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
    </section>
  );
};

export default forExport;