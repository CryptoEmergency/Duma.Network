import {
  jsx,
  jsxFrag
} from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";

const forExport = function ({ className }) {
  return (
    <section class="info-social" id="social">
      <div class="info">
        <h3>MORE INFO</h3>
        <a
          target="_blank"
          href="https://linktr.ee/duma_network"
          class="btn btn-green"
        >
          MORE INFO
        </a>
        <a
          target="_blank"
          href="https://duma-network.gitbook.io/duma.network-eng/"
          class="btn btn-green"
        >
          Dataroom
        </a>
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
  );
};

export default forExport;