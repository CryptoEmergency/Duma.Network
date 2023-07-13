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
    <section class="productR product" id="productR">
      <div class="productR-box">
        <img class="polygonSmall polygon" src={svg.polygonSmall}></img>
        <img class="polygonBig polygon" src={svg.polygonBig}></img>
        <img class="polygonMax polygon" src={svg.polygonMax}></img>
        <div class="circle-effect circle-effect2"></div>
        <div class="productR-info product-info">
          <h3 class="product-title mb-20">research hub</h3>
          <p class="mb-25">A section where you can find pages of research projects from AI, platform analysts, and third-party analysts who monetize their expertise on the platform.</p>
          <p>The rating system, reviews and voting for projects, allows you to make a faster decision about the prospects of an investment asset without using other resources for analysis.</p>

          <a 
            target="_blank"
            href="https://duma-network.gitbook.io/duma.network-eng2/solutions/research-hub" 
            class="btn btn-green mt-50">More information</a>
        </div>
        <div 
          class="productR-img product-img"
          After = {($el)=>{
            Data.Static.imageR = $el;
            Data.Static.height = Data.Static.imageR.clientHeight;
            Data.Static.width = Data.Static.imageR.clientWidth;
          }}
          onmousemove={(e)=>{
            const xVal = e.layerX;
            const yVal = e.layerY;
            const xRotation = 20 * ((xVal - Data.Static.width / 2) / Data.Static.width);
            const yRotation = -20 * ((yVal - Data.Static.height / 2) / Data.Static.height);
            const string = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg) `;
            Data.Static.imageR.style.transform = string;
          }}
          onmouseout={(e)=>{
            Data.Static.imageR.style.transform = `scale(1) rotateX(0) rotateY(0)`
          }}
          ontouchstart={(e)=>{
            e.preventDefault();
          }}
        >
          <img src={images['products/research1']}></img>
        </div>
      </div>
    </section>
  );
};

export default forExport;
// 24.03.2023
