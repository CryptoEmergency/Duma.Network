import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const forExport = function ({ className }) {
  return (
    <section class="advantages">
      <div class="circle1"></div>
      <div class="circle2"></div>
      <h2 class="general-title">Opportunities</h2>
      <div class="advantages-inner">
        <div class="advance">
          <div class="advance-item advance-item_back--0">
            <h6 class="advance-title">Open investment model</h6>
            <p class="duma-text">
              Choose a project, study the information, invest, and sell your
              vesting-asset.
            </p>
          </div>
          <div class="advance-item advance-item_back--1">
            <h6 class="advance-title">Screening</h6>
            <p class="duma-text">
              Searching and selecting the best startups for further listing on
              the information hub
            </p>
          </div>
          <div class="advance-item advance-item_back--2">
            <h6 class="advance-title">Earn on the platform</h6>
            <p class="duma-text">
              Invest in early stages and sell your vesting asset on the
              marketplace later
            </p>
          </div>
        </div>
        <div class="advance">
          <div class="advance-item advance-item_back--3">
            <h6 class="advance-title">Choice of any round</h6>
            <p class="duma-text">Seed, Strategic, Private, Public</p>
          </div>
          <div class="advance-item advance-item_back--4">
            <h6 class="advance-title">Personal account</h6>
            <p class="duma-text">
              Extensive functionality with the ability to track your assets and
              analyze profits
            </p>
          </div>
          <div class="advance-item advance-item_back--5">
            <h6 class="advance-title">NFT and their capabilities</h6>
            <p class="duma-text">
              Additional opportunities for NFT platform holders. Closed
              investments, passive income, and networking.
            </p>
          </div>
        </div>
        <div class="advance">
          <div class="advance-item advance-item_back--6">
            <h6 class="advance-title">Research Hub</h6>
            <p class="duma-text">
              Aggregation and moderation of all project information from various
              sources.
            </p>
          </div>
          <div class="advance-item advance-item_back--7">
            <h6 class="advance-title">Startup incubator</h6>
            <p class="duma-text">
              Value for any project: smart money, promotion, community,
              development and advancement
            </p>
          </div>
          <div class="advance-item advance-item_back--8">
            <h6 class="advance-title">Affiliate program</h6>
            <p class="duma-text">
              for leaders and Influencers with an audience
            </p>
          </div>
        </div>
        <div class="advance">
          <div class="advance-item advance-item_back--9">
            <h6 class="advance-title">Protocol</h6>
            <p class="duma-text">
              Safely invest through an escrow smart contract, split and sell
              SAFT on the platform before TGE, increasing the token's value
            </p>
          </div>
          <div class="advance-item advance-item_back--10">
            <h6 class="advance-title">Collaboration</h6>
            <p class="duma-text">
              Different market participants are coming together on our platform
            </p>
          </div>
          <div class="advance-item advance-item_back--11">
            <h6 class="advance-title">Distribution</h6>
            <p class="duma-text">
              Automatic allocation of tokens to investors through our platform
              after the project's TGE.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default forExport;
