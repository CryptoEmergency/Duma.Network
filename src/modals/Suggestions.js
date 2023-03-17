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
                <h2 class="general-title mt-0">Your suggestions</h2>
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
                  <textarea
                    rows="5"
                    id="text"
                    class="personal-input form-input"
                    placeholder="Enter text..."
                  ></textarea>
                  <div class="attach mt-15">
                    <input
                      type="file"
                      hidden="hidden"
                      onchange={function () {
                        if (this.value) {
                          Static.uploadText.innerText = this.value.match(
                            /[\/\\]([\w\d\s\.\-(\)]+)$/
                          )[1];
                        } else {
                          Static.uploadText.innerText = "Файл не выбран";
                        }
                      }}
                      Element={($el) => {
                        Static.input = $el;
                      }}
                    ></input>
                    <button
                      class="btn btn-white"
                      onclick={() => {
                        Static.input.click();
                      }}
                    >
                      Attach
                    </button>
                    <span
                      class="ml-15"
                      Element={($el) => {
                        Static.uploadText = $el;
                      }}
                    >
                      up to 5 screenshots
                    </span>
                  </div>
                </div>
              </main>
              <footer class="footer-modal">
                <button class="btn btn-white">send</button>
              </footer>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default forExport;
