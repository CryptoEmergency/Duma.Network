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



const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });

  load({
    ID,
    fnLoad: async () => {
      Static.statuses = await fn.socket.get({
        method: "Statuses",
        // _id: Variable.dataUrl.params,
      });
      Static.selectedStatus = Static.statuses[0].title;
      Static.selectedSum = Static.statuses[0].price;
      Static.statusId = Static.statuses[0]._id;
    },
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
                      Static.statuses.map((item, index)=>{
                        return(
                          <div 
                            class={["statuses-item", "statuses-item_hover", Static.selectedStatus == item.title ? "statuses-item_active" : null]}
                            onclick={function(){
                              if(Static.selectedStatus == item.title){
                                this.classList.toggle('statuses-item_active');
                              }else{
                                Static.selectedStatus = item.title;
                                Static.selectedSum = item.price;
                                Static.statusId = item._id;
                                console.log(Static.statusId);
                              }
                              initReload();
                            }}  
                          >
                            <Elements.Question 
                              textClue={item.question} 
                              switcher={Static.activeQuestion} 
                              key={`s$`}
                            />
                            <div class="status-img">
                              <img src={item.icon ? `/assets/upload/${item.icon}` : null} />
                            </div>
                            <span class="status-text status-name">{item.title}</span>
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
                      type: Static.selectedStatus,
                      idStatus: Static.statusId,
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
