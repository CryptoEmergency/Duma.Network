import {
  jsx,
  jsxFrag,
  Variable,
  load,
  setStorage,
  initReload,
} from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
import { fn } from "@src/functions/export.js";
import images from "@assets/images/index.js";

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  IOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.IOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

let burger = false;

const mainHeader = async function () {
  load({
    ID: "mainHeader",
    fn: () => {
      return (
        <div class="wrapper">
          <div class={["header-inner", isMobile.any() ? "__touch" : "__pc"]}>
            <div class="header-logo">
              <a href="https://duma.network">
                <img src={images["logo"]}></img>
              </a>
            </div>
            <div class="header-menu menu">
              <div
                class={["menu-icon", burger ? "active" : null]}
                onclick={function () {
                  burger = !burger;
                  initReload();
                }}
              >
                <span></span>
              </div>
              <nav class="header-nav">
                <div class={["menu-body", burger ? "active" : null]}>
                  <ul class="header-list">
                    <li
                      onclick={function () {
                        if (isMobile.any()) {
                          this.classList.toggle("active");
                        }
                        initReload();
                      }}
                    >
                      <a href="#" class="header-list_item">
                        PROJECTS
                      </a>
                      <span class="menu-arrow"></span>
                      <ul class="menu-sublist">
                        <li>
                          <a href="/seed" class="menu-sublist_item">
                            Seed
                          </a>
                        </li>
                        <li>
                          <a href="/private" class="menu-sublist_item">
                            Private
                          </a>
                        </li>
                        <li>
                          <a href="/public" class="menu-sublist_item">
                            Public
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#" class="header-list_item">
                        Products
                      </a>
                    </li>
                    <li>
                      <a href="#" class="header-list_item">
                        Academy
                      </a>
                    </li>
                    <li
                      onclick={function () {
                        if (isMobile.any()) {
                          this.classList.toggle("active");
                        }
                        initReload();
                      }}
                    >
                      <a href="#" class="header-list_item">
                        About
                      </a>
                      <span class="menu-arrow"></span>
                      <ul class="menu-sublist">
                        <li>
                          <a href="#" class="menu-sublist_item">
                            About Project
                          </a>
                        </li>
                        <li>
                          <a href="#" class="menu-sublist_item">
                            Advantages
                          </a>
                        </li>
                        <li>
                          <a href="#" class="menu-sublist_item">
                            Partners
                          </a>
                        </li>
                        <li>
                          <a href="#" class="menu-sublist_item">
                            Tokenomics
                          </a>
                        </li>
                        <li>
                          <a href="#" class="menu-sublist_item">
                            Roadmap
                          </a>
                        </li>
                        <li>
                          <a href="#" class="menu-sublist_item">
                            Team
                          </a>
                        </li>
                        <li>
                          <a href="#" class="menu-sublist_item">
                            Social network
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li class="header-list_item">
                      <a href="#" class="header-list_item">
                        Documents
                      </a>
                    </li>
                  </ul>
                  <div class="header-btns">
                    <button class="btn">INVEST IN PROJECT</button>
                    <button class="btn">MY ACCOUNT</button>
                    <button class="btn">CONNECT WALLET</button>
                  </div>
                  <span>EN</span>
                </div>
              </nav>
            </div>
          </div>
        </div>
      );
    },
  });
  return;
};

export { mainHeader };
