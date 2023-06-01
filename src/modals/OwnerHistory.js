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


const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.sumToken;
  Static.priceToken;
  Static.amount;
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
                      onchange={function () {
                        Static.priceToken = this.value;
                        console.log('=32f95f=', Static.priceToken * Static.sumToken)
                        Static.amount = Static.priceToken * Static.sumToken;
                      }}
                      oninput={()=>{
                        Static.amount = Static.priceToken * Static.sumToken;
                      }}
                    />
                  </div>
                </div>

              </main>
              <footer class="footer-modal">
                <button class="btn btn-modal">
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
