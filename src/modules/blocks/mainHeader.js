import {
  jsx,
  jsxFrag,
  Variable,
  load,
  setStorage,
  initReload,
} from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/export.js";

import svg from "@assets/svg/index.js";
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

const burgerMenu = function (action = "toogle") {
  if (action == "toogle") {
    ElBurger.classList.toggle("active");
    ElBurgerBlock.classList.toggle("active");
    return;
  }

  if (action == "hide") {
    ElBurger.classList.remove("active");
    ElBurgerBlock.classList.remove("active");
    return;
  }

  if (action == "show") {
    ElBurger.classList.add("active");
    ElBurgerBlock.classList.add("active");
    return;
  }
};

let ElBurger;
let ElBurgerBlock;

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
              <a
                href="/"
                onclick={(e) => {
                  fn.siteLink(e);
                  burgerMenu("hide");
                }}
              >
                <img src={images["logo"]}></img>
              </a>
            </div>
            <div class="header-menu menu">
              <div
                Element={($el) => {
                  ElBurger = $el;
                }}
                class="menu-icon"
                onclick={function () {
                  burgerMenu();
                }}
              >
                <span></span>
              </div>
              <nav class="header-nav">
                <div
                  Element={($el) => {
                    ElBurgerBlock = $el;
                  }}
                  class="menu-body"
                >
                  <a
                    target="_blank"
                    href="https://t.me/magdanov_bot"
                    class="btn btn-gradient mr-5"
                    onclick={(e) => {
                      burgerMenu("hide");
                    }}
                  >
                    <span>become our partner</span>
                    <img src={images.bot}></img>
                  </a>
                  <ul class="header-list">
                    <li
                      onclick={function () {
                        if (isMobile.any()) {
                          this.classList.toggle("active");
                        }
                      }}
                    >
                      <a
                        href="/projects"
                        class="header-list_item"
                        onclick={(e) => {
                          fn.siteLink(e);
                          burgerMenu("hide");
                        }}
                      >
                        PROJECTS
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
                      <a
                        href="/research"
                        class="header-list_item"
                        onclick={(e) => {
                          fn.siteLink(e);
                          burgerMenu("hide");
                        }}
                      >
                        research
                      </a>
                      <span class="menu-arrow"></span>
                      <ul class="menu-sublist">
                        <li
                          onclick={(e) => {
                            fn.siteLink("/research/seed");
                            burgerMenu("hide");
                          }}
                        >
                          <a class="menu-sublist_item">Seed</a>
                        </li>
                        <li
                          onclick={(e) => {
                            fn.siteLink("/research/private");
                            burgerMenu("hide");
                          }}
                        >
                          <a class="menu-sublist_item">Private</a>
                        </li>
                        <li
                          onclick={(e) => {
                            fn.siteLink("/research/public");
                            burgerMenu("hide");
                          }}
                        >
                          <a class="menu-sublist_item">Public</a>
                        </li>
                        <li
                          onclick={(e) => {
                            fn.siteLink("/research/pre-seed");
                            burgerMenu("hide");
                          }}
                        >
                          <a class="menu-sublist_item">Pre-seed</a>
                        </li>
                        <li
                          onclick={(e) => {
                            fn.siteLink("/research/strategic");
                            burgerMenu("hide");
                          }}
                        >
                          <a class="menu-sublist_item">Strategic</a>
                        </li>
                      </ul>
                    </li>
                    <li
                      onclick={function () {
                        if (isMobile.any()) {
                          this.classList.toggle("active");
                        }
                      }}
                    >
                      <a
                        href="/marketplace"
                        class="header-list_item"
                        onclick={(e) => {
                          fn.siteLink(e);
                          burgerMenu("hide");
                        }}
                      >
                        MARKETPLACE
                      </a>
                    </li>
                    <li>
                      <a
                        href="/academy"
                        class="header-list_item"
                        onclick={(e) => {
                          fn.siteLink(e);
                          burgerMenu("hide");
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
                        <li
                          onclick={(e) => {
                            let timeGo = 10;
                            if (Variable.dataUrl.adress != "index") {
                              fn.siteLink("/");
                              timeGo = 100;
                            }
                            setTimeout(() => {
                              window.scrollTo({
                                top:
                                  document.querySelector("#about").offsetTop -
                                  72,
                                behavior: "smooth",
                              });
                            }, timeGo);
                            burgerMenu("hide");
                          }}
                        >
                          <a class="menu-sublist_item">About Project</a>
                        </li>
                        <li
                          onclick={(e) => {
                            let timeGo = 10;
                            if (Variable.dataUrl.adress != "index") {
                              fn.siteLink("/");
                              timeGo = 100;
                            }
                            setTimeout(() => {
                              window.scrollTo({
                                top:
                                  document.querySelector("#advantages")
                                    .offsetTop - 72,
                                behavior: "smooth",
                              });
                            }, timeGo);
                            burgerMenu("hide");
                          }}
                        >
                          <a class="menu-sublist_item">Advantages</a>
                        </li>
                        <li
                          onclick={(e) => {
                            let timeGo = 10;
                            if (Variable.dataUrl.adress != "index") {
                              fn.siteLink("/");
                              timeGo = 100;
                            }
                            setTimeout(() => {
                              window.scrollTo({
                                top:
                                  document.querySelector("#partners")
                                    .offsetTop - 72,
                                behavior: "smooth",
                              });
                            }, timeGo);
                            burgerMenu("hide");
                          }}
                        >
                          <a class="menu-sublist_item">Partners</a>
                        </li>
                        <li
                          onclick={(e) => {
                            let timeGo = 10;
                            if (Variable.dataUrl.adress != "index") {
                              fn.siteLink("/");
                              timeGo = 100;
                            }
                            setTimeout(() => {
                              window.scrollTo({
                                top:
                                  document.querySelector("#roadmap").offsetTop -
                                  72,
                                behavior: "smooth",
                              });
                            }, timeGo);
                            burgerMenu("hide");
                          }}
                        >
                          <a class="menu-sublist_item">Roadmap</a>
                        </li>
                        <li
                          onclick={(e) => {
                            let timeGo = 10;
                            if (Variable.dataUrl.adress != "index") {
                              fn.siteLink("/");
                              timeGo = 100;
                            }
                            setTimeout(() => {
                              window.scrollTo({
                                top:
                                  document.querySelector("#team").offsetTop -
                                  72,
                                behavior: "smooth",
                              });
                            }, timeGo);
                            burgerMenu("hide");
                          }}
                        >
                          <a class="menu-sublist_item">Team</a>
                        </li>
                        <li
                          onclick={(e) => {
                            let timeGo = 10;
                            if (Variable.dataUrl.adress != "index") {
                              fn.siteLink("/");
                              timeGo = 100;
                            }
                            setTimeout(() => {
                              window.scrollTo({
                                top:
                                  document.querySelector("#social").offsetTop -
                                  72,
                                behavior: "smooth",
                              });
                            }, timeGo);
                            burgerMenu("hide");
                          }}
                        >
                          <a class="menu-sublist_item">Social network</a>
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
                          burgerMenu("hide");
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
                        {/* <li>
                          <a
                            class="menu-sublist_item"
                            onclick={() => {
                              fn.modals.Soon({});
                              burgerMenu("hide");
                            }}
                          >
                            LitePaper
                          </a>
                        </li> */}
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
                        class="btn btn-reg"
                        onclick={() => {
                          fn.modals.Registration({});
                        }}
                      >
                        <span>Registration</span>
                        <img src={images.addUser}></img>
                      </button>
                      <button
                        class="btn btn-reg"
                        onclick={() => {
                          fn.modals.Login({});

                        }}
                      >
                        <span>Login</span>
                        <img src={images.inputUser}></img>
                      </button>
                    </div>
                  ) : Variable.dataUrl.adress == "personal" ? (
                    <div class="header-btns">
                      <button
                        class="btn btn-green"
                        onclick={() => {
                          fn.modals.Transaction({
                            title: "Deposit",
                            text: "Replenishment amount",
                            type: "deposit",
                          });
                          // if (Variable.myInfo.role) {
                          //   fn.modals.Transaction({
                          //     title: "Deposit",
                          //     text: "Replenishment amount",
                          //     type: "deposit",
                          //   });
                          // } else {
                          //   fn.modals.Soon({});
                          // }
                        }}
                      >
                        <span>DEPOSIT</span>
                        <img src={images["icons/deposit"]}></img>
                      </button>
                      <button
                        class="btn btn-bordo"
                        onclick={() => {
                          fn.modals.Transaction({
                            title: "Withdraw",
                            text: "Withdrawal amount",
                            type: "withdraw",
                          });
                          // if (Variable.myInfo.role) {
                          //   fn.modals.Transaction({
                          //     title: "Withdraw",
                          //     text: "Withdrawal amount",
                          //     type: "withdraw",
                          //   });
                          // } else {
                          //   fn.modals.Soon({});
                          // }
                        }}
                      >
                        <span>WITHDRAW</span>
                        <img src={images["icons/withdraw"]}></img>
                      </button>
                    </div>
                  ) : (
                    <button
                      class="btn btn-user mr-10 ml-10 pX-20"
                      onclick={() => {
                        fn.siteLink("/personal/");
                      }}
                    >
                      <span>MY ACCOUNT</span>
                      <img src={images.user}></img>
                    </button>
                  )}
                  {/* <span class="lang" onclick={function () {}}>
                    ENG
                  </span> */}

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
