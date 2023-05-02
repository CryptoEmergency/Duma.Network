import {
  jsx,
  jsxFrag,
  load,
  Data,
  initReload,
  Variable,
  getStorage,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";

const showError = function (text) {
  Data.MStatic.elError.style.display = "block";
  Data.MStatic.elError.innerHTML = text;
  setTimeout(() => {
    Data.MStatic.elError.style.display = "none";
  }, 5000);
};

const formCheck = function () {
  if (!Data.MStatic.firstName.length) {
    showError("Enter the First Name");
    return false;
  }

  if (!fn.validator.isEmail(Data.MStatic.email)) {
    showError("Enter the correct Email address");
    return false;
  }

  if (!Data.MStatic.pass.length) {
    showError("Enter the password");
    return false;
  }

  if (!Data.MStatic.repass.length) {
    showError("Enter the password repeat");
    return false;
  }

  if (Data.MStatic.pass != Data.MStatic.repass) {
    showError("Passwords don't match");
    return false;
  }

  return true;
};

const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID, initData: "registration" });
  Static.refId = getStorage("ref");
  load({
    ID,
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
                ></div>
                <form action class="form-modal">
                  <div class="form-item">
                    <label for="name" class="form-label">
                      First Name :
                    </label>
                    <input
                      class="form-input"
                      type="text"
                      placeholder="Enter your name..."
                      onchange={function () {
                        Static.firstName = this.value;
                      }}
                    ></input>
                  </div>
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
                  <div class="form-item">
                    <label for="confirm" class="form-label">
                      Confirm Password :
                    </label>
                    <input
                      class="form-input"
                      type="password"
                      placeholder="xxxxxxxxxx"
                      onchange={function () {
                        Static.repass = this.value;
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
                      method: "Registration",
                      params: {
                        email: Static.email.trim(),
                        pass: Static.pass.trim(),
                        firstName: Static.firstName.trim(),
                        ref: getStorage("ref"),
                      },
                    });

                    if (response.error) {
                      showError(response.error[1]);
                      this.disabled = false;
                      return;
                    }

                    fn.modals.close(ID);
                    fn.modals.Login({});
                  }}
                >
                  SIGN UP
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
