import {
  jsx,
  jsxFrag,
  Variable,
  load,
  initAfter,
  initReload,
  Data,
  initOne,

} from '@betarost/cemserver/cem.js';

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const banners = [
  {
    alt: "Crypto Emergency",
    src: images['slider/1']
  },
  {
    alt: "Cem Assistant",
    src: images['slider/2']
  },
  {
    alt: "CEM Wallet",
    src: images['slider/3']
  },
  {
    alt: "CEMD",
    src: images['slider/4']
  },
  {
    alt: "DUMA",
    src: images['slider/5']
  },
  {
    alt: "CEM",
    src: images['slider/6']
  },
]

let isDragging = false;
let startX, startScrollLeft, timeoutId;

let slides = banners;

const replicateArray = (array, n) => {
  let arrays = Array.apply(null, new Array(n));
  array = arrays.map(function(){ return array });

  return [].concat.apply([], arrays)
}

const dragStart = (e) => {
  // Records the initial cursor and scroll position of the carousel
  isDragging = true;
  Data.sliderCarousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = Data.sliderCarousel.scrollLeft;
}

const dragging = (e) => {
  if(!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  Data.sliderCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = (e) => {
  isDragging = false;
  Data.sliderCarousel.classList.remove("dragging");
}

// const autoPlay = () => {
//   timeoutId = setTimeout(()=>{
//     Data.sliderCarousel.scrollLeft += Data.widthSlide
//     // infinityScroll()
//   }, 2500)
//   initReload()
// }

const infinityScroll = (e) => {
  if(Data.sliderCarousel.scrollLeft === 0){
    console.log('=6a004e=', "begin")
    // slides = [...banners];

    // let slidePerView = Math.round(Data.widthSliderCarousel / Data.widthSlide);
    // Data.sliderCarousel.scrollLeft = Data.sliderCarousel.scrollWidth - (2 * Data.widthSliderCarousel)
    // sliderChildrens.slice(-slidePerView).reverse().forEach( slide =>{
    //   // Data.sliderCarousel.insertAdjacentHTML("afterbegin", slide.outerHTML)
    //   sliderChildrens.unshift(slide)
    // })
  // initReload()

  }else if(Math.ceil(Data.sliderCarousel.scrollLeft) === Data.sliderCarousel.scrollWidth - Data.widthSliderCarousel){
    console.log('=eccfbf=', "end")
    // Data.sliderCarousel.scrollLeft = 0
    // let slidePerView = Math.round(Data.widthSliderCarousel / Data.widthSlide);
    
    // Data.sliderCarousel.scrollLeft = Data.widthSliderCarousel;
    // sliderChildrens.slice(0, slidePerView).forEach( slide =>{
    //   // Data.sliderCarousel.insertAdjacentHTML("afterbegin", slide.outerHTML)
    //   sliderChildrens.push(slide)
    // })
  // initReload()

  }
  clearTimeout(timeoutId)
  console.log('=caa1f6=', "scrolling event")
  // initReload()
}


const forExport = function ({}) {
  // autoPlay()
  

  return (
      <div class="slider-wrap">
        <div 
          class="slider-button slider-button_prev"
          role="button"
          aria-label="Previos slide"
          onclick={()=>{
            Data.sliderCarousel.scrollLeft += Data.widthSlide;
            infinityScroll()
          }}
        >
          <img src={svg.arrowRight}></img>
        </div>
        <div
          onmousedown={(e)=>{
            dragStart(e)
          }} 
          onmousemove={(e)=>{
            dragging(e)
          }}
          onmouseup={(e)=>{
            dragStop(e)
          }}
          onscroll={(e)=>{
            infinityScroll()
          }}
          class="slider-carousel" 
          After={($el) =>{
            Data.sliderCarousel = $el;
            Data.widthSliderCarousel = $el.offsetWidth;
            
          }}
          
        >
          {

            slides.map((item, index)=>{
              return(
              <img 
                class="slider-slide" 
                src={item.src} 
                alt={item.alt} 
                draggable="false"
                After={($el)=>{
                  Data.widthSlide = $el.offsetWidth;
                  widthSlide = $el.offsetWidth;
                }}  
              >
              </img>
              )
            })
          }
        </div>
        <div 
          class="slider-button slider-button_next"
          role="button"
          aria-label="Next slide"
          onclick={()=>{
            Data.sliderCarousel.scrollLeft += -Data.widthSlide;
          }}
        >
          <img src={svg.arrowLeft}></img>
        </div>
      </div>
       
               
  )
}

export default forExport