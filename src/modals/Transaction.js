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
  Static.valueMoney;

  load({
    ID,
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
                    id="summ"
                    type="text"
                    class="form-input personal-input"
                    placeholder={data.text}
                    oninput={function () {
                      let value = this.value.replace(/[^0-9]/g, "");
                      Static.valueMoney = Number(
                        // this.innerText.trim()
                        value.trim()
                      );
                      if (data.type === "withdraw") {
                        Static.valueMoney = -Static.valueMoney;
                      }
                      console.log("=92d0be=", Static.valueMoney);
                    }}
                  ></input>
                </div>

                <div class="form-group mt-15">
                  <div class="dropdown">
                    <button
                      class="dropdown__button"
                      onclick={() => {
                        Static.dropList.classList.toggle(
                          "dropdown__list--visible"
                        );
                      }}
                    >
                      Lorem Ipsum
                    </button>
                    <ul
                      class="dropdown__list"
                      Element={($el) => {
                        Static.dropList = $el;
                      }}
                    >
                      <li class="dropdown__list-item" data-value="travel">
                        Lorem Ipsum 1
                      </li>
                      <li class="dropdown__list-item" data-value="lessons">
                        Lorem Ipsum 2
                      </li>
                      <li class="dropdown__list-item" data-value="photo">
                        Lorem Ipsum 3
                      </li>
                      <li class="dropdown__list-item" data-value="sport">
                        Lorem Ipsum 4
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="switcher mt-15">
                  <input id="switch-1" type="checkbox"></input>
                  <label for="switch-1"></label>
                </div>
              </main>
              <footer
                class={["footer-modal", Variable.myInfo.role ? "grid-2" : null]}
              >
                <button
                  class="btn btn-white"
                  onclick={() => {
                    fn.modals.close(ID);
                  }}
                >
                  Confirm
                </button>
                {Variable.myInfo.role ? (
                  <button
                    class="btn btn-standart ml-15"
                    onclick={async function () {
                      await fn.socket.send({
                        method: "Deposit",
                        params: {
                          _id: Variable.myInfo._id,
                          balance: Static.valueMoney,
                          type: data.type,
                        },
                      });
                      initReload();
                    }}
                  >
                    Deposit
                  </button>
                ) : null}
              </footer>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default forExport;
