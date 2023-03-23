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
                    class="form-input personal-input"
                    placeholder={data.text}
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
              <footer class="footer-modal">
                <button class="btn btn-white">Confirm</button>
              </footer>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default forExport;
