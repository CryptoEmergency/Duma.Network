import { 
  jsx, 
  jsxFrag, 
  Data 
} 
from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/export.js";
import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";

const forExport = function ({ className }) {
  return (
    <section class="productPA product" id="productPA">
      <div class="product-box">
        <img class="polygonSmall polygon" src={svg.polygonSmall}></img>
        <img class="polygonMax polygon" src={svg.polygonMax}></img>
        <div class="circle-effect circle-effect1"></div>
        <div class="circle-effect circle-effect2"></div>
        <div 
          class="productPA-img product-img"
          After = {($el)=>{
            Data.Static.imagePA = $el;
            Data.Static.height = Data.Static.imagePA.clientHeight;
            Data.Static.width = Data.Static.imagePA.clientWidth;
          }}
          onmousemove={(e)=>{
            const xVal = e.layerX;
            const yVal = e.layerY;
            const xRotation = 20 * ((xVal - Data.Static.width / 2) / Data.Static.width);
            const yRotation = -20 * ((yVal - Data.Static.height / 2) / Data.Static.height);
            const string = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg) `;
            Data.Static.imagePA.style.transform = string;
          }}
          onmouseout={(e)=>{
            Data.Static.imagePA.style.transform = `scale(1) rotateX(0) rotateY(0)`
          }}
          ontouchstart={(e)=>{
            e.preventDefault();
          }}
        >
          <img src={images['products/personalAccount']}></img>
        </div>
        <div class="productM-info product-info">
          <h3 class="product-title mb-20">personal account</h3>
          <p>Monitor and track your assets in real time in a multi-functional office. 
          A handy tool for VCs, investors, startups, communities and experts.
          Everything in one place:</p>
          <ol class="product-list">
            <li>Your portfolios and graphic PNL, all financials, assets, cryptocurrency.</li>
            <li>NFT packaging and unpacking.</li>
            <li>Creating SPV-DAOs and managing them.</li>
            <li>Selling your assets on the marketplace, all orders and accounting.</li>
            <li>Balance replenishment and non-custodial wallet binding.</li>
            <li>Project tracking and notification of updates.</li>
            <li>Adding projects, research, monetization.</li>
            <li>Referral system and profitability history.</li>
          </ol>
          <a 
            target="_blank"
            href="https://duma-network.gitbook.io/duma.network-eng2/solutions/saas-products/personal-account" 
            class="btn btn-green mt-25">More information</a>
        </div>
      </div>
    </section>
  );
};

export default forExport;
// 24.03.2023
