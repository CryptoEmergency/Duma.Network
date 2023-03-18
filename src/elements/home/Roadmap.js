import {
  jsx,
  jsxFrag,
  load,
  Data,
  Variable,
  setStorage,
  initReload,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const forExport = function ({ Static, onclick, className }) {
  return (
    <section class="roadmap" id="roadmap">
      <h2 class="general-title">Roadmap</h2>
      <div class="roadmap-inner">
        <div class="roadmap-item">
          <h6 class="roadmap-title">Q3 2022</h6>
          <div class="roadmap-desc">
            <p>Idea Generation</p>
            <p>Market Analysis</p>
            <p>WhitePaper v1.0</p>
            <p>Pre-Seed round launch</p>
            <p>Launch of the website and socials</p>
            <p>Team building and expansion</p>
            <p>Finalization of the concept and wrapping</p>
            <p>Launch of the platform development</p>
          </div>
        </div>
        <div class="roadmap-item">
          <h6 class="roadmap-title">Q3 2022</h6>
          <div class="roadmap-desc">
            <p>Personal Account Development</p>
            <p>Registration of the Company</p>
            <p>Start Information Recourse Development</p>
            <p>Search for Investors & Affiliates</p>
            <p>Strategic partnerships</p>
            <p>Launching Landing page</p>
            <p>Launching Subpage on Site</p>
          </div>
        </div>
        <div class="roadmap-item">
          <h6 class="roadmap-title">Q3 2022</h6>
          <div class="roadmap-desc">
            <p>Negotiations with VC & DAO</p>
            <p>Integration of Neural Networks in work</p>
            <p>Launching Social Network & Automatization</p>
            <p>Preparation of sites for attracting traffic</p>
            <p>MVP, Testing</p>
            <p>Launching Personal Account in System</p>
            <p>First Projects on Listing</p>
            <p>First Airdrop</p>
            <p>Alpha Version of The Information Recourse</p>
            <p>Launch of Referral System</p>
            <p>Closing of the PreSeed Round</p>
            <p>Open of the Seed Round</p>
            <p>The First Investment from VC</p>
            <p>Partnership with KOLs and PRs</p>
            <p>Lead Investor Partnership</p>
          </div>
        </div>
        <div class="roadmap-item">
          <h6 class="roadmap-title">Q3 2022</h6>
          <div class="roadmap-desc">
            <p>Closing a Seed Round</p>
            <p>Open of Strategic Round</p>
            <p>Marketing Events</p>
            <p>The Alpha Version of the Ecosystem</p>
            <p>First Fundraisings on the Platform</p>
            <p>Launching Academy Development</p>
            <p>Implementation of Info-Bot</p>
            <p>Negotiations with CEX and DEX platforms</p>
            <p>Closing a Strategic Round</p>
            <p>Launch of Private Round</p>
            <p>NFT collection Developing</p>
            <p>Marketplace and INO development</p>
            <p>Customer and User Scaling</p>
            <p>Mobile application development</p>
            <p>Closing a Private Round</p>
          </div>
        </div>
        <div class="roadmap-item">
          <h6 class="roadmap-title">Q3 2022</h6>
          <div class="roadmap-desc">
            <p>Launch of Public Round on IDO</p>
            <p>Launch of NFT Sale</p>
            <p>Launch DAO, Staking, LP</p>
            <p>Closing a Public Round</p>
            <p>Development of bot-assistant</p>
            <p>First Educational Programs</p>
            <p>Firtst Alpha Mobile Application</p>
            <p>TGE and Listing Listing on CEX and DEX</p>
            <p>Development of P2P Exchanger</p>
            <p>Launch and Testing of the Marketplace</p>
            <p>Educational software integration</p>
            <p>Launch and testing of the Online Academy</p>
            <p>Scaling all directions of the ecosystem</p>
            <p>Holding marketing events</p>
            <p>Launch a Markentlace on Platform</p>
          </div>
        </div>
        <div class="roadmap-item">
          <h6 class="roadmap-title">Q3 2022</h6>
          <div class="roadmap-desc">
            <p>Deployment of the trading platform</p>
            <p>Wallet development</p>
            <p>Promotion of the Online Academy</p>
            <p>Opening affiliate branches</p>
            <p>Emphasis on patner formation</p>
            <p>Active ecosystem and brand PR</p>
            <p>Expanding the community of the entire ecosystem</p>
            <p>Analysis and fine-tuning of the entire system</p>
            <p>Official opening of all ecosystem products</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default forExport;
