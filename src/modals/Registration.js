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
  Static.email = "";
  Static.password = "";
  Static.elError;
  load({
    ID,
    fnLoad: () => {
      // setTimeout(() => {
      //   fn.modals.close(ID);
      // }, 2500);
    },
    fn: () => {
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div class="wrap-content" id="settingsPage">
              <header class="header-modal">
                <h2 class="general-title mt-0">Registration</h2>
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
                <form action class="form-modal">
                  <div class="form-item">
                    <label for="name" class="form-label">
                      First Name :
                    </label>
                    <input
                      id="name"
                      class="form-input"
                      type="text"
                      placeholder="Enter your name..."
                    ></input>
                  </div>
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
                  <div class="form-item">
                    <label for="confirm" class="form-label">
                      Confirm Password :
                    </label>
                    <input
                      id="confirm"
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
                  If you already have an account, just
                  <a
                    href="#"
                    class="link-modal"
                    onclick={() => {
                      fn.modals.close(ID);
                      fn.modals.Login({});
                    }}
                  >
                    login.
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
