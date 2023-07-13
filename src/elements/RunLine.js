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
  Data.Static.items = [];
  Data.Static.speed = 1;
  Data.Static.x = 0;
  Data.Static.x2 = Data.Static.widthList;



  //  = Data.Static.carouselList.style.width;
  // records.map((item, index)=>{
  //   console.log('=0a094b=',records[index].name)
  //   Data.Static.items[index].item.push(item)
  //   console.log('=0e17cb=',Data.Static.items)
  // })
  return (
    <div 
      Element={($el)=>{
        Data.Static.carouselSlider = $el;
      }}
      class="line-wrap"
    >
      <div 
        class="line-track"

        Element={function($el){
          Data.Static.carouselList=$el;
        }}  
        After={($el)=>{
          Data.Static.widthList = $el.offsetWidth;
        }}
      >
        {
          records.map((item, index)=>{
            return(
              <div 
                class="line-item"
                Element={($el)=>{
                  // Data.Static.courseEl = $el;
                  Data.Static[`carousel_item${index}`] = $el;
                }}  
              >
                <span class="item-text">{item.name}</span>
                <span class="item-price">{item.price}</span>
              </div>
            )
          })
        }
      </div>
      <div 
        class="line-track"

        Element={function($el){
          Data.Static.carouselList=$el;
        }}  
        After={($el)=>{
          Data.Static.widthList = $el.offsetWidth;
        }}
      >
        {
          records.map((item, index)=>{
            return(
              <div 
                class="line-item"
                Element={($el)=>{
                  // Data.Static.courseEl = $el;
                  Data.Static[`carousel_item${index}`] = $el;
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
