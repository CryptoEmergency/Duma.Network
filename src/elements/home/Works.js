import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import images from "@assets/images/index.js";



const forExport = function ({ className }) {
  return (
    <section class="works" id="works">
      <div class="circle-effect circle-effect1"></div>
      <h2 class="general-title mY-50">How it works?</h2>
      <div class="flex-middleXY">
        <a 
          href="https://duma-network.gitbook.io/duma.network-eng2/"
          target="_blank"
          class="btn btn-green"
        >
          More information
        </a>
      </div>
      <div class="works-img">
        <img 
          src={images['products/works']}
          onclick={()=>{
            fn.modals.Show({
              image: images['products/works'],
            })
          }}
        ></img>
      </div>
    </section>
  );
};

export default forExport;
// 24.03.2023
