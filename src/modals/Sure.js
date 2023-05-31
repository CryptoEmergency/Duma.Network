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

const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fn: () => {
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div class="wrap-content" id="settingsPage">
              <header class="header-modal">
                <h2 class="general-title mt-0">{data.title}</h2>
                <button
                  class="button-close button-modal"
                  onclick={() => {
                    fn.modals.close(ID);
                  }}
                >
                  X
                </button>
              </header>
                <footer class="footer-modal">
                  <div class="grid-2">
                    <button
                      class="btn btn-green"
                      onclick={async() => {
                        if(Variable.myInfo.balance >= data.sum){
                          await fn.socket.send({
                            method: "Subscribe",
                            params: {
                              type: "subscribe",
                              idStatus: data.idStatus,
                            },
                          });
                          fn.modals.close(ID);
                          fn.modals.Success({
                            title: `You have been assigned ${data.type} status`
                          })
                        }else{
                          fn.modals.close(ID);
                          fn.modals.Transaction({
                            title: "Deposit",
                            text: "Replenishment amount",
                            type: "deposit",
                          });
                        }
                        initReload()
                      }}
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      class="btn btn-bordo"
                      onclick={() => {
                        fn.modals.close(ID);
                      }}
                    >
                      no, not sure
                    </button> 
                  </div>
                  
                </footer> 
            </div>
          </div>
        </div>
      );
    },
  });
};

export default forExport;
