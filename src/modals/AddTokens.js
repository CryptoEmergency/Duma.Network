import {
  jsx,
  jsxFrag,
  load,
  Data,
  setStorage,
  Variable,
  initReload
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";

const sendEnter = function(e){
  if(e.keyCode == '13'){
    Data.MStatic.btnSubmit.click();
  }
}

const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fnLoad: async () => {
      Static.sumToken;
      Static.priceToken;
      Static.amount;
    },
    fn: () => {
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div class="wrap-content">
              <header class="header-modal">
                <h2 class="general-title mt-0">Accrual of tokens and publication of the project on the marketplace</h2>
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
                  <div class="form-item">
                    <span class="form-label">
                      Selected project :
                    </span>
                    <div class="form-input">
                      {data.projectName}
                    </div>
                  </div>
                  <div class="form-item">
                    <label for="tokens" class="form-label">
                      Amount of tokens :
                    </label>
                    <input
                      class="form-input"
                      type="text"
                      id="tokens"
                      placeholder="Enter the amount of tokens..."
                      onkeydown={sendEnter}
                      onchange={function () {
                        Static.sumToken = this.value;
                      }}
                    />
                  </div>
                  <div class="form-item">
                    <label for="priceToken" class="form-label">
                      Price per token
                    </label>
                    <input
                      class="form-input"
                      type="text"
                      id="priceToken"
                      placeholder="Enter the price for one token"
                      onkeydown={sendEnter}
                      onchange={function () {
                        Static.priceToken = this.value;
                      }}
                    />
                  </div>
                </div>
                <div class="grid-2 mt-15">
                  <div class="input-notation">
                    <div class="input-prefix">
                        <label for="amount">Amount of fees</label>
                    </div>
                    <input
                      id="amount"
                      class="input"
                      placeholder="Enter the fee amount..."
                      Element={($el) => {
                        Static.investInput = $el;
                      }}
                   
                      onchange={function(){
                        Static.amount = this.value;
                      }}
                    />
                    <div class="input-suffix">$</div>
                  </div>
                  <div class="input-notation">
                    <div class="input-prefix">
                      Initial fee amount 0$
                    </div>
                  </div>
                </div>
              </main>
              <footer class="footer-modal">
                <button
                  class="btn btn-modal"
                  Element={($el)=>{
                    Static.btnSubmit = $el;
                  }}
                  onclick={async()=>{
                    await fn.socket.send({
                      method: "TokenMarket",
                      params: {
                        projectId: data.projectId,
                        tokens:  Static.sumToken,
                        price: Static.priceToken,
                        amount: Static.amount,
                      },
                    });
                    fn.modals.close(ID);
                    fn.modals.Success({
                      title: "You have been assigned investor status"
                    })
                    initReload();
                  }}
                >
                  public
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
