import { jsx, jsxFrag, Data } from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";

let x1, y1 = null;

const invest = [
  {
    image: svg["investing/coin"],
    alt: 'investing',
    text: 'Invest with any checks and sell the asset at any time.',
  },
  {
    image: svg["investing/door"],
    alt: 'investing',
    text: 'Learn all the information & research about startups.',
  },
  {
    image: svg["investing/key"],
    alt: 'investing',
    text: 'Use escrow protocol for secure investment & distribution.',
  },
  {
    image: svg["investing/picture"],
    alt: 'investing',
    text: 'Get NFT with metadata about the investment deal.',
  },
  {
    image: svg["investing/bonus"],
    alt: 'investing',
    text: 'Create your own DAO gatherings with your community.',
  },
];

const forExport = function ({ className }) {
  return (
    <section id="advantages" class="advantages">
      <div class="circle1"></div>
      <div class="investing">
        <center style="position: relative; z-index: 2;">
          <h2 class="general-title">Advantages</h2>
          <span>For different market participants.</span>
        </center>
        
        <div 
          class="invest-inner"
          Element={($el)=>{
            Data.Static.investCarousel = $el;
          }}
          ontouchstart={(e)=>{
            const firstTouch = e.touches[0];
            x1 = firstTouch.clientX;
            y1 = firstTouch.clientY;
          }}
          ontouchmove={(e)=>{
            if(!x1 || !y1) return false;
            let x2 = e.touches[0].clientX;
            let y2 = e.touches[0].clientY;
            let xDiff = x2 - x1;
            let yDiff = y2 - y1;
            if(Math.abs(xDiff) > Math.abs(yDiff)){
              if(xDiff > 0){
                Data.Static.investCarousel.scrollLeft -= Data.Static.investSlide.offsetWidth + 15;
              }else{
                Data.Static.investCarousel.scrollLeft += Data.Static.investSlide.offsetWidth + 15;
              }
            }
            x1 = null;
            y1 = null;
          }}
        >
          <div class="invest-item invest-item_mobile">
            <img src={svg["contract"]} />
            <p class="duma-text">Use escrow protocol for secure investment & distribution.</p>
          </div>
          {
            invest.map((item)=>{
              return(
                <div 
                  class="invest-item"
                  Element={($el)=>{
                    Data.Static.investSlide = $el;
                  }}
                >
                  <img src={item.image} alt={item.alt} />
                  <p class="duma-text">{item.text}</p>
                </div>
              )
            })
          }
        </div>
      </div>
      <div class="contract">
        <div class="contract-desc">
          <img src={svg["contract"]} class="contract-img" />
          <span>
            Financing projects and the SAFT secondary market on one platform,
            opening limitless possibilities for all market participants.
          </span>
        </div>
        <a
          target="_blank"
          href="https://linktr.ee/duma_network"
          class="btn btn-green"
        >
          More INFORMATION
        </a>
      </div>
      <a
        target="_blank"
        href="https://linktr.ee/duma_network"
        class="btn btn-green invest-btn mt-25"
      >
        More INFORMATION
      </a>
    </section>
  );
};

export default forExport;
// 24.03.2023