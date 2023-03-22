import {
  jsx,
  jsxFrag,
  load,
  Data,
  setStorage,
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

const formCheck = function () {
  if (!fn.validator.isEmail(Data.Static.email)) {
    showError("Enter the correct Email address");
    return false;
  }

  return true;
};

const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID, initData: "login" });
  load({
    ID,
    fn: () => {
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div class="wrap-content" id="settingsPage">
              <header class="header-modal">
                <h2 class="general-title mt-0">Forgot your password?</h2>
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
                ></div>

                <div class="form-remind">
                  <label for="email" class="form-label">
                    Enter your email :
                  </label>
                  <input
                    class="form-input"
                    type="email"
                    placeholder="email@xyz.com"
                    onchange={function () {
                      Static.email = this.value;
                    }}
                  ></input>
                </div>
              </main>
              <footer class="footer-modal">
                <button
                  class="btn btn-modal"
                  onclick={async function () {
                    this.disabled = true;

                    if (!formCheck()) {
                      this.disabled = false;
                      return;
                    }

                    let response = await fn.socket.send({
                      method: "Login",
                      params: {
                        email: Static.email.trim(),
                      },
                    });

                    if (response.error) {
                      showError(response.error[1]);
                      this.disabled = false;
                      return;
                    }
                  }}
                >
                  Remind password
                </button>

                <span class="duma-text">
                  If you already have an account, just
                  <a
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
