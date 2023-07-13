import { 
  jsx, 
  jsxFrag, 
  Data
} from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/export.js";
import images from "@assets/images/index.js";
import svg from "@assets/svg/index.js";

const forExport = function ({ className }) {
  return (
    <section class="productM product" id="productM">
      <h2 class="general-title mY-50 duma-title">DUMA Products</h2>
      <div class="product-box">
        <img class="polygonSmall polygon" src={svg.polygonSmall}></img>
        <img class="polygonBig polygon" src={svg.polygonBig}></img>
        <img class="polygonMax polygon" src={svg.polygonMax}></img>
        <div class="circle-effect circle-effect1"></div>
        <div class="circle-effect circle-effect2"></div>
        <div 
          class="productM-img product-img"
          After = {($el)=>{
            Data.Static.image = $el;
            Data.Static.height = Data.Static.image.clientHeight;
            Data.Static.width = Data.Static.image.clientWidth;
          }}
          ontouchstart={(e)=>{
            e.preventDefault();
            // Data.Static.image.style.transform = 'none'
          }}
          onmousemove={(e)=>{
            const xVal = e.layerX;
            const yVal = e.layerY;
            const xRotation = 20 * ((xVal - Data.Static.width / 2) / Data.Static.width);
            const yRotation = -20 * ((yVal - Data.Static.height / 2) / Data.Static.height);
            const string = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg) `;
            Data.Static.image.style.transform = string;
          }}
          onmouseout={(e)=>{
            Data.Static.image.style.transform = `scale(1) rotateX(0) rotateY(0)`
          }}
          
        >
          <img src={images['products/marketplace']}></img>
        </div>
        <div class="productM-info product-info">
          <h3 class="product-title mb-20">saft nft marketplace</h3>
          <p>Financing projects through the Marketplace. Where you can find:</p>
          <ol class="product-list">
            <li>An offer on primary financing,</li>
            <li>Project card with complete information, </li>
            <li>Research from various analysts and rating system,</li>
            <li>As well as offers for the resale of assets from funds and private investors.</li>
          </ol>
          <p class="mY-25">Every early investor, after funding a startup, gets an NFT with metadata on funding and token distribution. The investor can place his purchased asset for sale on the marketplace and sell it on a liquid community market.</p>
          <p>Project on the marketplacecome from the research.</p>

          <a
            target="_blank"
            href="https://duma-network.gitbook.io/duma.network-eng2/solutions/saft-marketplace" 
            class="btn btn-green mt-50"
          >
            More information
          </a>
        </div>
      </div>
    </section>
  );
};

export default forExport;
// 24.03.2023
