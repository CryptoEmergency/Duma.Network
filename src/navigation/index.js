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
              <div class="intro-desc">
                <h1 class="intro-title">DÜMA NETWORK</h1>
                <h2 class="intro-title_second">Unite To Earn</h2>
                <p class="intro-info">
                  Is an investment ecosystem that combines a Launchpad, an
                  information resource and an academy.
                </p>
              </div>
              <img src={images["device"]}></img>
            </section>
            <section class="ecosystem">
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
                    collect all the information about the startup in one place,
                    assigning points to each section of information and forming
                    a final rating of trustworthiness for the project. This
                    allows the investor to research the project without having
                    to go to third-party resources.
                  </p>
                </div>
                <div class="eco-item">
                  <h6 class="eco-title">ACADEMY</h6>
                  <p class="eco-text">
                    Crypto Academy and Information Assistant will allow you to
                    get information about any element or item on the platform,
                    providing text and video hints, natively educating the user
                    when he needs this information.
                  </p>
                </div>
              </div>
              <p class="ecosystem-text ecosystem-text1">
                So the ecosystem user doesn't have to go to other resources to
                find answers to their questions. We focus their attention on the
                ecosystem projects, increasing conversion rates.
              </p>
              <p class="ecosystem-text ecosystem-text2">
                We simplify and automate processes, provide quality service and
                comprehensive solutions for all market participants.
              </p>
            </section>
            <section class="investing">
              <center>
                <h2 class="general-title">Investing</h2>
                <span>
                  The benefits of investing now on the Pre Seed round:
                </span>
              </center>
              <div class="invest-box">
                <div class="invest-item"></div>
              </div>
            </section>
          </div>
        </div>
      );
    },
  });
};

export default start;
