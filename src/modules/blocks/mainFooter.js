import { jsx, jsxFrag, load, Variable } from "@betarost/cemserver/cem.js";
import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";
import { fn } from "@src/functions/export.js";
const mainFooter = async function () {
  load({
    ID: "mainFooter",
    fn: () => {
      if (!Variable.Static.FooterShow) {
        return <div></div>;
      }
      return (
        <div class="wrapper">
          <div class="footer-inner">
            <div class="footer-logo">
              <a
                href="/"
                onclick={(e) => {
                  fn.siteLink(e);
                  burger = !burger;
                }}
              >
                <img src={images["logo"]}></img>
              </a>
              <span class="text ml-10">DUMA NETWORK LTD</span>
            </div>
            <div class="social-icons">
              <a
                href="https://www.linkedin.com/company/88679206/"
                target="_blank"
                class="social-icon"
              >
                <img src={svg["icons/linkedin"]} alt="Linkedin" />
              </a>
              <a
                href="https://discord.gg/8wg2pDGHgj"
                target="_blank"
                class="social-icon"
              >
                <img src={svg["icons/discord"]} alt="Discord" />
              </a>
              <a
                href="https://t.me/+hcqjTIVE8Z0xNzUy"
                target="_blank"
                class="social-icon"
              >
                <img src={svg["icons/telegram"]} alt="Telegram" />
              </a>
              <a
                href="https://t.me/+OiD9SYSHvNk2YTUy"
                target="_blank"
                class="social-icon"
              >
                <img src={svg["icons/telegram"]} alt="Telegram" />
              </a>
              <a
                href="https://twitter.com/duma_network/"
                target="_blank"
                class="social-icon"
              >
                <img src={svg["icons/twitter"]} alt="Twitter" />
              </a>
              <a
                href="https://www.youtube.com/c/DENMAGDANOV/videos"
                target="_blank"
                class="social-icon"
              >
                <img src={svg["icons/youtube"]} alt="Youtube" />
              </a>
            </div>
            <div class="footer-info">
              <p class="footer-info_text">All rights reserved</p>
              <a
                onclick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                class="arrow-up"
              >
                <img src={svg["arrowUp"]} />
              </a>
            </div>
          </div>
        </div>
      );
    },
  });
  return;
};

export { mainFooter };
