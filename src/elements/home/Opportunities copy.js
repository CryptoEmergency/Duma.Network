import {
  jsx,
  jsxFrag
} from "@betarost/cemserver/cem.js";

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
            <h6 class="advance-title">
              Simple and straightforward investing
            </h6>
            <p class="duma-text">
              register, choose a project, replenish the balance,
              invest
            </p>
          </div>
          <div class="advance-item advance-item_back--1">
            <h6 class="advance-title">Information resource</h6>
            <p class="duma-text">
              full project descriptions and research, validated
              information from startups and peer reviews
            </p>
          </div>
          <div class="advance-item advance-item_back--2">
            <h6 class="advance-title">SAAS token payment model</h6>
            <p class="duma-text">
              access to additional functionality when paying with
              ecosystem tokens, will form a constant demand for token.
            </p>
          </div>
        </div>
        <div class="advance">
          <div class="advance-item advance-item_back--3">
            <h6 class="advance-title">Choice of any round</h6>
            <p class="duma-text">Seed, Private, Public and others</p>
          </div>
          <div class="advance-item advance-item_back--4">
            <h6 class="advance-title">Ranking Score of projects</h6>
            <p class="duma-text">
              ranking system with a number of scores assessing the
              trustworthiness of the project
            </p>
          </div>
          <div class="advance-item advance-item_back--5">
            <h6 class="advance-title">Expertise and promotion</h6>
            <p class="duma-text">
              an opportunity for KOLs to become the project's
              Ambassador, offers for Influencers and integration of
              experts on the platform
            </p>
          </div>
        </div>
        <div class="advance">
          <div class="advance-item advance-item_back--6">
            <h6 class="advance-title">Open Venture Fund</h6>
            <p class="duma-text">
              opportunity for any VC and Influencer to become a
              partner and organize their own fundraising through our
              platform
            </p>
          </div>
          <div class="advance-item advance-item_back--7">
            <h6 class="advance-title">Virtual Assistant</h6>
            <p class="duma-text">
              the answer to any question when pointing the cursor,
              text and video hints in any section of the ecosystem
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
            <h6 class="advance-title">Startup incubator</h6>
            <p class="duma-text">
              attracting any amount of investment and community,
              comprehensive startup, promotion and development
            </p>
          </div>
          <div class="advance-item advance-item_back--10">
            <h6 class="advance-title">Mobile application</h6>
            <p class="duma-text">
              for convenience and simplicity of using the ecosystem
            </p>
          </div>
          <div class="advance-item advance-item_back--11">
            <h6 class="advance-title">Crypto academy</h6>
            <p class="duma-text">
              learning while using the platform, as well as a section
              with complete teaching on currencies
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default forExport;