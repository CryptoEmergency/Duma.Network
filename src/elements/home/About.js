import { jsx, jsxFrag, initAfter, Data } from "@betarost/cemserver/cem.js";
import anime from "animejs/lib/anime.es.js";

import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";

let options = {
  opacityIn: [0, 1],
  scaleOut: 3,
  durationIn: 800,
  durationOut: 600,
  delay: 500,
  easing: "easeInExpo",
};

const forExport = function ({ className }) {
  initAfter(() => {
    anime
      .timeline({ loop: true })
      .add({
        targets: ".text-animation .one",
        opacity: options.opacityIn,
        duration: options.durationIn,
      })
      .add({
        targets: ".text-animation .one",
        opacity: 0,
        easing: options.easing,
        duration: options.durationOut,
        delay: options.delay,
      })
      .add({
        targets: ".text-animation .two",
        opacity: options.opacityIn,
        duration: options.durationIn,
      })
      .add({
        targets: ".text-animation .two",
        opacity: 0,
        easing: options.easing,
        duration: options.durationOut,
        delay: options.delay,
      })
      .add({
        targets: ".text-animation .three",
        opacity: options.opacityIn,
        duration: options.durationIn,
      })
      .add({
        targets: ".text-animation .three",
        opacity: 0,
        easing: options.easing,
        duration: options.durationOut,
        delay: options.delay,
      })
      .add({
        targets: ".text-animation .four",
        opacity: options.opacityIn,
        duration: options.durationIn,
      })
      .add({
        targets: ".text-animation .four",
        opacity: 0,
        easing: options.easing,
        duration: options.durationOut,
        delay: options.delay,
      })
      .add({
        targets: ".text-animation .five",
        opacity: options.opacityIn,
        duration: options.durationIn,
      })
      .add({
        targets: ".text-animation .five",
        opacity: 0,
        easing: options.easing,
        duration: options.durationOut,
        delay: options.delay,
      })
      .add({
        targets: ".text-animation .six",
        opacity: options.opacityIn,
        duration: options.durationIn,
      })
      .add({
        targets: ".text-animation .six",
        opacity: options.opacityIn,
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
          {/* <p class="intro-info">
            A tool for investors. Research, analytics, secure contribution with
            any amount, split SAFT and sell through the platform.
          </p> */}
          <p class="intro-info">
          Fund projects step by step through escrow protocol, sell the asset at any time through NFT on the marketplace
          </p>
        </div>
        <div class="device">
          <a href="https://youtu.be/oNQOcFADbNo" target="_blank">
            <img src={images["device1"]} class="device-screen"></img>
            <video
              autoplay={true}
              loop={true}
              preload="metadata"
              playsinline="true"
              muted="true"
              class="device-video"
              width="422"
              height="255"
              oncanplay={function () {
                try {
                  this.muted = true;
                  this.play();
                } catch (error) {
                  console.error(error);
                }
              }}
              Element={($el) => {
                Data.Static.elVideoMain = $el;
              }}
            >
              <source src="/assets/video/duma.mp4" type="video/mp4"></source>
            </video>
          </a>
        </div>
      </div>

      <div class="ecosystem-about">
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
        </h2>
        <div class="ecosystem-box">
          <div class="eco-item">
            <h6 class="eco-title">escrow protocol</h6>
            <div class="eco-item_desc">
              <p class="general-text eco-text">
              Escrow smart contracts allow you to place investor's funds on multi-sig wallets when investing and fund a startup step-by-step on pre-agreed terms. 
              </p>
              <p class="general-text eco-text">
              With the investor's ability to exit the deal or sell the asset on the secondary market.
              </p>
              <p class="general-text eco-text">
              SAFT can be partitioned into NFTs with metadata indicating the end holder of the NFT, and tokens can be further distributed on the protocol.
              </p>
            </div>
          </div>
          <div class="eco-item">
            <h6 class="eco-title">SAFT nft MARKETPLACE</h6>
            <div class="eco-item_mobile">
              <div class="eco-item_desc">
                <p class="general-text eco-text pY-20 ">
                Primary funding for startups and an instant secondary market for any venture capital asset in the vesting. 
                </p>
                <p class="general-text eco-text">
                P2P transactions between venture capital funds, private investors and the community via NFT with metadata about investment and token distribution
                </p>
              </div>
              <img src={images.mobile} class="eco-mobile"></img>
            </div>
            
          </div>
          <div class="eco-item">
            <h6 class="eco-title">RESEARCH HUB</h6>
            <div class="eco-item_desc">
              <p class="general-text eco-text">
              Learn all information and research about the project from AI, platform experts, and third-party analysts. 
              </p>
              <p class="general-text eco-text">
              Choose the best project, save time searching for analys and making decisions.
              </p>
            </div>
          </div>
        </div>
        {/* <p class="ecosystem-text">
          Big opportunities for VC, investors, startups, and communities on one platform.
        </p> */}
        <p class="ecosystem-text ecosystem-text_down">INVEST / SELL / EARN</p>
      </div>
    </section>
  );
};

export default forExport;
// 24.03.2023
