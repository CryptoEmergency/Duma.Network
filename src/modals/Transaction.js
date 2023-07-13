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

const sendEnter = function(e){
  if(e.keyCode == '13'){
    Data.MStatic.btnSubmit.click();
  }
}

const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.valueMoney;

  load({
    ID,
    // fnLoad: async ()=>{
    //   Static.fieldSum.focus();
    // },
    fn: () => {
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div class="wrap-content bug">
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
              <main class="main-modal">
                <div class="form-item">
                  <label for="summ" class="form-label">
                    {data.text}:
                  </label>
                  <input
                    onkeydown={sendEnter}
                    Element={($el)=>{
                      Static.fieldSum = $el;
                    }}
                    id="summ"
                    type="text"
                    class="form-input personal-input"
                    placeholder={data.text}
                    oninput={function () {
                      this.value = this.value.replace(/[^0-9]/g, "");
                      Static.valueMoney = Number(this.value.trim());
                      if (data.type === "withdraw") {
                        Static.valueMoney = -Static.valueMoney;
                      }
                      console.log('=b33c84=', Static.fieldSum.value.length ? "true": "false");
                    }}
                  ></input>
                </div>
              </main>
              <footer
                class={["footer-modal"]}
              >
                <button
                  class={[
                    "btn", 
                    "btn-standart", 
                    "ml-15",
                    // Static.valueMoney ? null : "btn-disabled"
                  ]}
                  Element={($el)=>{
                    Static.btnSubmit = $el;
                  }}
                  onclick={async function () {
                    if(!Static.fieldSum?.value){
                      return
                    }
                    let test = await fn.socket.send({
                      method: "Transaction",
                      params: {
                        sum: Static.valueMoney,
                        type: data.type,
                      },
                    });
                    
                    console.log('=9b967c=',test)

                    // await fn.socket.send({
                    //   method: "Deposit",
                    //   params: {
                    //     _id: Variable.myInfo._id,
                    //     balance: Static.valueMoney,
                    //     type: data.type,
                    //   },
                    // });
                    fn.modals.close(ID);
                    fn.modals.AddBalance(test)
                    initReload("modals");
                  }}
                >
                  {data.title}
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
