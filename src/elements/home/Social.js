import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";

const forExport = function ({ className }) {
  return (
    <section class="info-social" id="social">
      <img class="polygonSmall polygon" src={svg.polygonSmall}></img>
      <img class="polygonBig polygon" src={svg.polygonBig}></img>
      <div class="info info-social_item">
        <a
          target="_blank"
          href="https://linktr.ee/duma_network"
          class="btn btn-green"
        >
          MORE INFO
        </a>
        <a
          target="_blank"
          href="https://duma-network.gitbook.io/duma.network-eng2/"
          class="btn btn-green"
        >
          Dataroom
        </a>
      </div>
      <div class="social info-social_item">
        <h2>SOCIAL</h2>
        <span>Subscribe to our social networks!</span>
        <div class="social-inner">
          <a href="https://www.linkedin.com/company/88679206/" target="_blank">
            <img src={svg["icons/linkedin"]} alt="Linkedin" />
          </a>
          <a href="https://discord.gg/8wg2pDGHgj" target="_blank">
            <img src={svg["icons/discord"]} alt="Discord" />
          </a>
          <a href="https://t.me/+hcqjTIVE8Z0xNzUy" target="_blank">
            <img src={svg["icons/telegram"]} alt="Telegram" />
          </a>
          <a href="https://t.me/+OiD9SYSHvNk2YTUy" target="_blank">
            <img src={svg["icons/telegram"]} alt="Telegram" />
          </a>
          <a href="https://twitter.com/duma_network/" target="_blank">
            <img src={svg["icons/twitter"]} alt="Twitter" />
          </a>
          <a
            href="https://www.youtube.com/c/DENMAGDANOV/videos"
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
// 24.03.2023
