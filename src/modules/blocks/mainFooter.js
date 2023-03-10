import { jsx, jsxFrag, load } from "@betarost/cemserver/cem.js";
import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";

const mainFooter = async function () {
  load({
    ID: "mainFooter",
    fn: () => {
      return (
        <div class="wrapper">
          <div class="footer-inner">
            <div class="footer-logo">
              <a href="/">
                <img src={images["logo"]}></img>
              </a>
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
              <p class="footer-info_text">
                2022 <span class="bold">DÜMA</span>. All rights reserved
              </p>
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
