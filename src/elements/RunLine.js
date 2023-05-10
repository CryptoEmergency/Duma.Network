import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Data,
} from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";


const forExport = function ({ className, children, count, records }) {
  Data.Static.widthImg;
  return (
    <div class="line-wrap">
      <div 
        class="line-track"
        // Element={function(){
        //   Data.Static.line=this.offsetWidth;
        // }}  
      >
        {
          records.map((item, index)=>{
            return(
              <div 
                class="line-item"
                Element={($el)=>{
                  Data.Static.courseEl = $el;
                }}  
              >
                <span class="item-text">{item.name}</span>
                <span class="item-price">{item.price}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default forExport;
