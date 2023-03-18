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

const forExport = function ({ Static, onclick, className }) {
  return (
    <section class="intro" id="about">
      <div class="intro-inner">
        <div class="intro-desc">
          <h1 class="intro-title">DUMA.NETWORK</h1>
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
  );
};

export default forExport;
