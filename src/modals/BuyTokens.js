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
      Static.item = await fn.socket.get({ 
        method: "MarketUser", 
        _id: data.id,
        params: { populate: { path: "projectId author", } }, 
      });
      console.log('=item=', Static.item)

      Static.invest;
      Static.investCommission;
      Static.totalInvest;
      Static.countToken;
      Static.acceptedInvest = Static.item.tokens * Static.item.priceToken;
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
                <div class="about-project">
                  <div
                    Element={($el) => {
                      Static.elError = $el;
                    }}
                    style="display:none;"
                    class="error-text"
                  ></div>
                  <div class="grid-2">
                    <div class="card-text">
                      <span class="ttu line-green">Available</span>
                      {Variable.myInfo.balance.toFixed(2)}$
                    </div>
                    <span class="rang">
                      {Static.item.tokens} tokens
                    </span>
                  </div>
                  <div class="grid-2">
                    <div class="card-text">
                      <span class="ttu line-green">Price per token</span>
                      {Static.item.priceToken}$
                    </div>
                    <span class="rang">
                      {/* Maximum invest {(Static.acceptedInvest).toFixed(2)}$ */}
                      Maximum invest {Static.acceptedInvest}$
                    </span>
                  </div>
                  

                  <div class="card-btns mY-15">
                    <div class="input-notation">
                      <div class="input-prefix">
                          <label for="quantity">Quantity</label>
                      </div>
                      <input
                        id="quantity"
                        class="input"
                        Element={($el) => {
                          Static.investInput = $el;
                        }}
                        oninput={function () {
                          let value = this.value.replace(/[^0-9]/g, "");
                          if(value < 0){
                            this.value = 0;
                          }else if(value > Static.acceptedInvest){
                            this.value = Static.acceptedInvest;
                          }else{
                            this.value = value;
                          }

                          Static.invest = Number(this.value.trim());
                          Static.investCommission = (Static.invest / 100) * 15;
                          Static.totalInvest = Static.invest + Static.investCommission;
                          Static.countToken = (Static.invest / Static.item.priceToken);
                          initReload();
                        }}
                      />
                      <div class="input-suffix">$</div>
                    </div>
                    <button class="btn btn-black" style="cursor:default;">
                      {Static.totalInvest
                        ? `${Static.totalInvest}$`
                        : `with commission 15%`}
                    </button>
                  </div>
                  <div class="card-text">
                    <span class="ttu line-green">Get project tokens</span>
                    {Static?.countToken ? Static?.countToken : 0}
                  </div>
          
                </div>
              </main>
              <footer class="footer-modal">
                <button
                  class={[
                    "btn",
                    "btn-green",
                    "mt-10",
                    Static.totalInvest &&
                    Static.totalInvest < Variable.myInfo.balance
                      ? null
                      : "btn-disabled",
                  ]}
                  onclick={async function () {
                    this.disabled = true;
                    if (!Variable.auth) {
                      fn.modals.Login({});
                      return;
                    }
                    if(Static.invest < 10){
                      fn.modals.Moderator({
                        text: "The allowed investment amount is $10"
                      })
                      return
                    }
                    if (
                      Variable.myInfo.balance < Static.invest ||
                      typeof(Static.invest) === "undefined"
                    ) {
                      fn.modals.Transaction({
                        title: "Deposit",
                        text: "Replenishment amount",
                        type: "deposit",
                      });
                      return;
                    }
                    if (Static.totalInvest > Variable.myInfo.balance) {
                      fn.modals.Transaction({
                        title: "Deposit",
                        text: "Replenishment amount",
                        type: "deposit",
                      });
                      return;
                    }
                    let response = await fn.socket.send({
                      method: "BuyToken",
                      params: {
                        projectId: Static.item.projectId._id,
                        sum: Static.invest,
                        id: Static.item._id,
                        author: Static.item.author._id,
                      },
                    });
                    
                    if (response.error) {
                      showError(response.error[1]);
                      // showError(`Maximum amount of tokens ${Static.item.projectId.tokens}`)
                      this.disabled = false;
                      return;
                    }

                    Static.item.have += Static.invest;
                    Static.investInput.value = "";
                    Static.invest = "";
                    Static.investCommission = "";
                    Static.totalInvest = "";
                    Static.countToken = "";
                    fn.modals.close(ID);
                    fn.modals.Success({
                      title: `You have successfully invested in the project ${Static.item.name}`
                    })
                    initReload();
                  }}
                >
                  BECOME OUR PARTNER
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
