import { jsx, jsxFrag, initAfter } from "@betarost/cemserver/cem.js";

import images from "@assets/images/index.js";
import anime from "animejs/lib/anime.es.js";
import svg from "@assets/svg/index.js";

let options = {
  // targets: $el,

  opacityIn: [0, 1],
  // scaleIn: [0.2, 1],
  scaleOut: 3,
  durationIn: 800,
  durationOut: 600,
  delay: 500,
  easing: "easeInExpo",
  // trans,
  // easing: "linear",
  // transalteY:
};

const forExport = function ({ className }) {
  initAfter(() => {
    anime
      .timeline({ loop: true })
      .add({
        targets: ".text-animation .one",
        opacity: options.opacityIn,
        // scale: options.scaleIn,
        duration: options.durationIn,
      })
      .add({
        targets: ".text-animation .one",
        opacity: 0,
        // scale: options.scaleOut,
        easing: options.easing,
        duration: options.durationOut,
        delay: options.delay,
      })
      .add({
        targets: ".text-animation .two",
        opacity: options.opacityIn,
        // scale: options.scaleIn,
        duration: options.durationIn,
      })
      .add({
        targets: ".text-animation .two",
        opacity: 0,
        // scale: options.scaleOut,
        easing: options.easing,
        duration: options.durationOut,
        delay: options.delay,
      })
      .add({
        targets: ".text-animation .three",
        opacity: options.opacityIn,
        // scale: options.scaleIn,
        duration: options.durationIn,
      })
      .add({
        targets: ".text-animation .three",
        opacity: 0,
        // scale: options.scaleOut,
        easing: options.easing,
        duration: options.durationOut,
        delay: options.delay,
      })
      .add({
        targets: ".text-animation .four",
        opacity: options.opacityIn,
        // scale: options.scaleIn,
        duration: options.durationIn,
      })
      .add({
        targets: ".text-animation .four",
        opacity: 0,
        // scale: options.scaleOut,
        easing: options.easing,
        duration: options.durationOut,
        delay: options.delay,
      })
      .add({
        targets: ".text-animation .five",
        opacity: options.opacityIn,
        // scale: options.scaleIn,
        duration: options.durationIn,
      })
      .add({
        targets: ".text-animation .five",
        opacity: 0,
        // scale: options.scaleOut,
        easing: options.easing,
        duration: options.durationOut,
        delay: options.delay,
      })
      .add({
        targets: ".text-animation .six",
        opacity: options.opacityIn,
        // scale: options.scaleIn,
        duration: options.durationIn,
      })
      .add({
        targets: ".text-animation .six",
        // opacity: 0,
        opacity: options.opacityIn,
        // scale: options.scaleOut,
        easing: options.easing,
        duration: options.durationOut,
        delay: options.delay,
      });
  });
  return (
    <section class="intro" id="about">
      <div class="intro-inner">
        <div class="intro-desc">
          <h1 class="intro-title">DUMA.NETWORK</h1>
          <p class="intro-info">
            A tool for investors. Research, analytics, secure contribution with
            any amount, split SAFT and sell through the platform.
          </p>
        </div>
        <div class="device">
          <a>
            <img src={images["device"]}></img>
            <video
              autoplay
              loop
              class="device-video"
              width="422"
              height="255"
              // poster="/assets/image/videoPoster.png"
            >
              <source src="/assets/video/duma.mp4" type="video/mp4"></source>
            </video>
            {/* <iframe
              class="device-video"
              width="422"
              height="245"
              src="https://www.youtube.com/embed/oNQOcFADbNo"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe> */}
          </a>
        </div>
      </div>

      <div class="ecosystem">
        <img class="polygonSmall polygon" src={svg.polygonSmall}></img>
        <img class="polygonBig polygon" src={svg.polygonBig}></img>

        <h2 class="ecosystem-title" style="display:flex;">
          ALL IN ONE -
          <div class="text-animation">
            <span class="one">CHOOSE</span>
            <span class="two">RESEARCH</span>
            <span class="three">STUDY</span>
            <span class="four">INVEST</span>
            <span class="five">SELL</span>
            <span class="six">EARN</span>
          </div>
          {/* CHOOSE, RESEARCH, STUDY, INVEST, SELL, EARN. */}
        </h2>
        <div class="grid-3 ecosystem-box">
          <div class="eco-item">
            <h6 class="eco-title">RESEARCH HUB</h6>
            <div class="eco-item_desc">
              <p class="general-text eco-text">
                We perform startup screening and research from our analysts and
                create a rating evaluation so that users don't waste time
                searching for this information on other resources.
              </p>
              <p class="general-text eco-text">
                The analytical section contains an alternative evaluation of
                startups from third-party experts using the SAAS model.
              </p>
            </div>
          </div>
          <div class="eco-item">
            <h6 class="eco-title">protocol</h6>
            <div class="eco-item_desc">
              <p class="general-text eco-text">
                An Escrow smart contract is designed to secure an investor's
                funds and allow for staged financing of a startup based on
                pre-agreed conditions.
              </p>
              <p class="general-text eco-text">
                The SAFT can be divided into NFTs with metadata indicating the
                final beneficiary, and tokens can be further distributed through
                a protocol.
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
                Buy SAFT assets from early venture investors who are selling
                their vested assets.
              </p>
              <p class="general-text eco-text">
                Invest in early rounds, sell SAFT and increase the token value
                before TGE.
              </p>
            </div>
          </div>
        </div>
        <p class="ecosystem-text">
          All information and opportunities for funds, investors, startups, and
          communities on one platform.
        </p>
        <p class="ecosystem-text">No more need for third-party resources</p>
      </div>
    </section>
  );
};

export default forExport;
