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
      if (!Variable.Static.HeaderShow) {
        return <div></div>;
      }
      return (
        <div class="wrapper">
          <div class={["header-inner", isMobile.any() ? "__touch" : "__pc"]}>
            <div class="header-logo">
              <a href="/">
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
                  <a
                    target="_blank"
                    href="https://t.me/magdanov_bot"
                    class="btn btn-gradient mr-5"
                  >
                    become our partner
                  </a>
                  <ul class="header-list">
                    <li
                      onclick={function () {
                        if (isMobile.any()) {
                          this.classList.toggle("active");
                        }
                        initReload();
                      }}
                    >
                      <a
                        href="/marketplace"
                        class="header-list_item"
                        onclick={(e) => {
                          fn.siteLink(e);
                          burger = !burger;
                        }}
                      >
                        MARKETPLACE
                      </a>
                      <span class="menu-arrow"></span>
                      <ul class="menu-sublist">
                        <li>
                          <a
                            href="/marketplace/seed"
                            class="menu-sublist_item"
                            onclick={(e) => {
                              fn.siteLink(e);
                              burger = !burger;
                            }}
                          >
                            Seed
                          </a>
                        </li>
                        <li>
                          <a
                            href="/marketplace/private"
                            class="menu-sublist_item"
                            onclick={(e) => {
                              fn.siteLink(e);
                            }}
                          >
                            Private
                          </a>
                        </li>
                        <li>
                          <a
                            href="/marketplace/public"
                            class="menu-sublist_item"
                            onclick={(e) => {
                              fn.siteLink(e);
                            }}
                          >
                            Public
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li
                      onclick={function () {
                        if (isMobile.any()) {
                          this.classList.toggle("active");
                        }
                        initReload();
                      }}
                    >
                      <a
                        href="/research"
                        class="header-list_item"
                        onclick={(e) => {
                          fn.siteLink(e);
                          burger = !burger;
                        }}
                      >
                        research
                      </a>
                      <span class="menu-arrow"></span>
                      <ul class="menu-sublist">
                        <li>
                          <a
                            href="/research/seed"
                            class="menu-sublist_item"
                            onclick={(e) => {
                              fn.siteLink(e);
                              burger = !burger;
                            }}
                          >
                            Seed
                          </a>
                        </li>
                        <li>
                          <a
                            href="/research/private"
                            class="menu-sublist_item"
                            onclick={(e) => {
                              fn.siteLink(e);
                            }}
                          >
                            Private
                          </a>
                        </li>
                        <li>
                          <a
                            href="/research/public"
                            class="menu-sublist_item"
                            onclick={(e) => {
                              fn.siteLink(e);
                            }}
                          >
                            Public
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        href="/academy"
                        class="header-list_item"
                        onclick={(e) => {
                          fn.siteLink(e);
                        }}
                      >
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
                      <a href="" class="header-list_item">
                        About
                      </a>
                      <span class="menu-arrow"></span>
                      <ul class="menu-sublist">
                        <li>
                          <a
                            class="menu-sublist_item"
                            onclick={(e) => {
                              window.scrollTo({
                                top:
                                  document.querySelector("#about").offsetTop -
                                  72,
                                behavior: "smooth",
                              });
                              burger = !burger;
                            }}
                          >
                            About Project
                          </a>
                        </li>
                        <li>
                          <a
                            class="menu-sublist_item"
                            onclick={(e) => {
                              window.scrollTo({
                                top:
                                  document.querySelector("#advantages")
                                    .offsetTop - 72,
                                behavior: "smooth",
                              });
                              burger = !burger;
                            }}
                          >
                            Advantages
                          </a>
                        </li>
                        <li>
                          <a
                            class="menu-sublist_item"
                            onclick={(e) => {
                              window.scrollTo({
                                top:
                                  document.querySelector("#partners")
                                    .offsetTop - 72,
                                behavior: "smooth",
                              });
                              burger = !burger;
                            }}
                          >
                            Partners
                          </a>
                        </li>
                        <li>
                          <a
                            class="menu-sublist_item"
                            onclick={(e) => {
                              window.scrollTo({
                                top:
                                  document.querySelector("#roadmap").offsetTop -
                                  72,
                                behavior: "smooth",
                              });
                              burger = !burger;
                            }}
                          >
                            Roadmap
                          </a>
                        </li>
                        <li>
                          <a
                            class="menu-sublist_item"
                            onclick={(e) => {
                              window.scrollTo({
                                top:
                                  document.querySelector("#team").offsetTop -
                                  72,
                                behavior: "smooth",
                              });
                              burger = !burger;
                            }}
                          >
                            Team
                          </a>
                        </li>
                        <li>
                          <a
                            class="menu-sublist_item"
                            onclick={(e) => {
                              window.scrollTo({
                                top:
                                  document.querySelector("#social").offsetTop -
                                  72,
                                behavior: "smooth",
                              });
                              burger = !burger;
                            }}
                          >
                            Social network
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li
                      onclick={function () {
                        if (isMobile.any()) {
                          this.classList.toggle("active");
                        }
                        initReload();
                      }}
                    >
                      <a
                        href=""
                        class="header-list_item"
                        onclick={(e) => {
                          fn.siteLink(e);
                          burger = !burger;
                        }}
                      >
                        documents
                      </a>
                      <span class="menu-arrow"></span>
                      <ul class="menu-sublist">
                        <li>
                          <a
                            target="_blank"
                            href="https://docsend.com/view/28ucnckiqwus6du4"
                            class="menu-sublist_item"
                          >
                            PitchDeck
                          </a>
                        </li>
                        <li>
                          <a href="" class="menu-sublist_item">
                            LitePaper
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            href="https://duma-network.gitbook.io/duma.network-eng/"
                            class="menu-sublist_item"
                          >
                            DataRoom
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            href="https://docs.google.com/spreadsheets/d/1nqkFs_Fj4k20tnVwkx_hUfPAsPY8KVC4ZnwR2kvaug8/edit#gid=0"
                            class="menu-sublist_item"
                          >
                            Tokenomics
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  {!Variable.auth ? (
                    <div class="header-btns">
                      <button
                        class="btn"
                        onclick={() => {
                          fn.modals.Registration({});
                        }}
                      >
                        Registration
                      </button>
                      <button
                        class="btn"
                        onclick={() => {
                          fn.modals.Login({});
                        }}
                      >
                        Login
                      </button>
                    </div>
                  ) : (
                    <div class="header-btns">
                      <button
                        class="btn"
                        onclick={() => {
                          fn.siteLink("/personal/");
                        }}
                      >
                        My Account
                      </button>
                      <button class="btn btn-passive">Connect wallet</button>
                    </div>
                  )}

                  <span onclick={function () {}}>ENG</span>
                  {/* <span
                    style="margin-left: 20px;cursor: pointer; width:15px; height: 15px; background: #73993B;border-radius: 50%;"
                    onclick={() => {
                      if (document.documentElement.hasAttribute("theme")) {
                        document.documentElement.removeAttribute("theme");
                      } else {
                        document.documentElement.setAttribute("theme", "test");
                      }
                    }}
                  ></span> */}
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
