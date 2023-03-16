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
                href="https://discord.gg/8wg2pDGHgj"
                target="_blank"
                class="social-icon"
              >
                <img src={svg["icons/discord"]} />
              </a>
              <a
                href="https://t.me/duma_network"
                target="_blank"
                class="social-icon"
              >
                <img src={svg["icons/telegram"]} />
              </a>
              <a
                href="https://twitter.com/duma_network"
                target="_blank"
                class="social-icon"
              >
                <img src={svg["icons/twitter"]} />
              </a>
              <a
                href="https://www.youtube.com/@DENMAGDANOV/featured"
                target="_blank"
                class="social-icon"
              >
                <img src={svg["icons/youtube"]} />
              </a>
            </div>
            <div class="footer-info">
              <p class="footer-info_text">All rights reserved</p>
              <a class="arrow-up">
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
