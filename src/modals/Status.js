import {
  jsx,
  jsxFrag,
  load,
  Data,
  initReload,
  Variable,

} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";


const statuses = [
  {
    name: "Investor",
    price: "20",
    icon: svg.investor,
    question: "Investor status allows you to invest in projects.",
  },
  {
    name: "Partner",
    price: "50",
    icon: svg.partner,
    question: "Partner status means that you are a partner.",
  },
  {
    name: "VIP",
    price: "100",
    icon: svg.vip,
    question: "VIP status means that you are omnipotent.",
  }
];

const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.selectedStatus = "Investor";
  Static.selectedSum = "20";
  load({
    ID,
    // fnLoad: async () => {

    // },
    fn: () => {
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div class="wrap-content">
              <header class="header-modal">
                <h2 class="general-title mt-0">Choose a subscription type</h2>
                <button
                  class="button-close button-modal"
                  onclick={() => {
                    fn.modals.close(ID);
                  }}
                >
                  X
                </button>
              </header>
              <main class="main-modal">
                  <div class="grid-3">
                    {
                      statuses.map((item, index)=>{
                        return(
                          <div 
                            class={["statuses-item", Static.selectedStatus == item.name ? "statuses-item_active" : null]}
                            onclick={function(){
                              if(Static.selectedStatus == item.name){
                                this.classList.toggle('statuses-item_active');
                              }else{
                                Static.selectedStatus = item.name;
                                Static.selectedSum = item.price;
                              }
                              initReload();
                            }}  
                          >
                            <Elements.Question 
                              textClue={item.question} 
                              switcher={Static.activeQuestion} 
                              key={`s${index}`}
                            />
                            <div class="status-img">
                              <img src={item.icon} />
                            </div>
                            <span class="status-text status-name">{item.name}</span>
                            <span class="status-text status-price">{item.price}$</span>
                          </div>
                        )
                      })
                    }
                  </div>
              </main>
              <footer class="footer-modal">
                <button
                  class="btn btn-white"
                  onclick={() => {
                    fn.modals.close(ID);
                    fn.modals.Sure({
                      title: "Are you sure you want to pay for a subscription?",
                      // type: "subscribe",
                      type: Static.selectedStatus,
                      // comment: `${Static.selectedStatus} status`, 
                      sum: Static.selectedSum,
                    });
                  }}
                >
                  Buy a subscription
                </button>
              </footer>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default forExport;
