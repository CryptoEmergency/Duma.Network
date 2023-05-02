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
  load({
    ID,
    fnLoad: async () => {
      Static.tokens = await fn.socket.get({ 
        method: "Tokens", 
        idUser: Variable.myInfo._id,
        params: { populate: { path: "projectId",  } }, 
      });
      Static.sumToken;
      Static.priceToken;
      console.log('=modal marketplace=',Static.tokens)
    },
    fn: () => {
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div class="wrap-content">
              <header class="header-modal">
                <h2 class="general-title mt-0">Publish on the marketplace page</h2>
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
                      Choose a project :
                    </span>
                    <div class="form-input">
                      {data.project}
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
                      placeholder={`${data.sumTokens} tokens`}
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
                      placeholder="10$"
                      onchange={function () {
                        Static.priceToken = this.value;
                      }}
                    />
                  </div>
                </div>
              </main>
              <footer class="footer-modal">
                <button
                  class="btn btn-modal"
                  onclick={async()=>{
                    await fn.socket.send({
                      method: "MarketUser",
                      params: {
                        projectId: data.projectId,
                        tokens:  Static.sumToken,
                        price: Static.priceToken,
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
