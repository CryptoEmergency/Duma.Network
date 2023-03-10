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

const showError = function (text) {
  Data.Static.elError.style.display = "block";
  Data.Static.elError.innerHTML = text;
  setTimeout(() => {
    Data.Static.elError.style.display = "none";
  }, 5000);
};

const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.elError;
  load({
    ID,
    fnLoad: () => {},
    fn: () => {
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div class="wrap-content" id="settingsPage">
              <header class="header-modal">
                <h2 class="general-title mt-0">Log in to your account</h2>
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
                <div
                  Element={($el) => {
                    Static.elError = $el;
                  }}
                  style="display:none;"
                  class="error-text"
                >
                  error
                </div>
                <form class="form-modal">
                  <div class="form-item">
                    <label for="email" class="form-label">
                      Email :
                    </label>
                    <input
                      id="email"
                      class="form-input"
                      type="email"
                      placeholder="email@xyz.com"
                    ></input>
                  </div>
                  <div class="form-item">
                    <label for="password" class="form-label">
                      Password :
                    </label>
                    <input
                      id="password"
                      class="form-input"
                      type="password"
                      placeholder="xxxxxxxxxx"
                    ></input>
                  </div>
                </form>
              </main>
              <footer class="footer-modal">
                <button class="btn btn-modal">SIGN UP</button>
                <span>
                  Don't have an account yet?
                  <a
                    href="#"
                    class="link-modal"
                    onclick={() => {
                      fn.modals.close(ID);
                      fn.modals.Registration({});
                    }}
                  >
                    Sign up.
                  </a>
                </span>
              </footer>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default forExport;
