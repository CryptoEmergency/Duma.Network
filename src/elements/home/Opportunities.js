import { jsx, jsxFrag, Data } from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";

const items = [
  {
    title: 'Open investment model',
    text: 'Invest in the primary market, or buy shares from early investors in the secondary market.'
  },
  {
    title: 'Choose any rounds',
    text: 'Large selection of early-stage startups in any invetsment round.',
  },
  {
    title: 'Research Hub',
    text: 'Real-time asset control, graphical portfolio and extensive features for all users.',
  },
  {
    title: 'Escrow Protocol',
    text: 'Place your investment in a multisig wallet, fund your startup in stages, and exit from deal at any time or sell your venture capital asset.',
  },
  {
    title: 'Startup listing',
    text: 'Searching and selecting the best startups for further listing on the information hub.'
  },
  {
    title: 'Personal account',
    text: 'Real-time asset control, graphical portfolio and extensive features for all different users.'
  },
  {
    title: 'SPV DAO',
    text: 'Creation of special purpose vehicle DAO for each investment with NFT access keys.',
  },
  {
    title: 'Affiliate program',
    text: 'Additional monetization opportunities for Influencers.',
  },
  {
    title: 'Earn on the platform',
    text: 'Invest in early stages startups & sell your vesting asset on the marketplace later.',
  },
  {
    title: 'NFT and application',
    text: 'DUMA NFT holders get access to closed sales, extra features, research & reduced commissions.',
  },
  {
    title: 'Selling SAFT',
    text: 'We can help you sell your venture capital assets in the secondary market at any time.',
  },
  {
    title: 'Distribution',
    text: 'Post-TGE distribution of startup tokens via protocol, for investors who hold NFTs with metadata.'
  }
]

let x1, y1 = null;

const forExport = function ({ className }) {
  return (
    <section class="opportunities">
      {/* <img class="polygonSmall polygon" src={svg.polygonSmall}></img>
      <img class="polygonBig polygon" src={svg.polygonBig}></img> */}
      {/* <div class="circle1"></div> */}
      <div class="circle-effect circle-effect1"></div>
      <h2 class="general-title">Opportunities</h2>
      <div 
        class="advantages-inner"
        Element={($el)=>{
          Data.Static.advanceCarousel = $el;
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
                Data.Static.advanceCarousel.scrollLeft -= Data.Static.advanceSlide.offsetWidth + 15;
              }else{
                Data.Static.advanceCarousel.scrollLeft += Data.Static.advanceSlide.offsetWidth + 15;
              }
            }
            x1 = null;
            y1 = null;
        }}
      >
        {
          items.map((item, index)=>{
            return(
              <div 
                class={["advance-item", `advance-item_back--${index}`]}
                Element={($el)=>{
                  Data.Static.advanceSlide = $el;
                }}
              >
                <h6 class="advance-title">{item.title}</h6>
                <p class="duma-text">{item.text}</p>
              </div>
            )
          })
        }
      </div>
    </section>
  );
};

export default forExport;
// 24.03.2023