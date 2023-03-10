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

  if (!Data.Static.pass.length) {
    showError("Enter the password");
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
                </div>
                <form class="form-modal">
                  <div class="form-item">
                    <label for="email" class="form-label">
                      Email :
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
                  <div class="form-item">
                    <label for="password" class="form-label">
                      Password :
                    </label>
                    <input
                      class="form-input"
                      type="password"
                      placeholder="xxxxxxxxxx"
                      onchange={function () {
                        Static.pass = this.value;
                      }}
                    ></input>
                  </div>
                </form>
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
                        pass: Static.pass.trim(),
                      },
                    });

                    if (response.error) {
                      showError(response.error[1]);
                      this.disabled = false;
                      return;
                    }

                    setStorage("myInfo", response);
                    setStorage("auth", true);
                    Variable.myInfo = response;
                    Variable.auth = true;
                    fn.modals.close(ID);
                    fn.siteLink("/personal/");

                  }}
                >SIGN UP</button>
                <span>
                  Don't have an account yet?
                  <a
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
