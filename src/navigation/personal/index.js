import {
  jsx,
  jsxFrag,
  load,
  Data,
  Variable,
  setStorage,
  initReload,
} from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const showError = function (text) {
  Data.Static.elError.style.display = "block";
  Data.Static.elError.innerHTML = text;
  setTimeout(() => {
    Data.Static.elError.style.display = "none";
  }, 3000);
};

const formCheck = function () {
  if (!Data.Static.name.length) {
    showError("Enter the Name!");
    return false;
  }

  if (!Data.Static.rang.length) {
    showError("Enter the Rang!");
    return false;
  }

  if (!Data.Static.status.length) {
    showError("Enter the Status!");
    return false;
  }

  if (!Data.Static.category.length) {
    showError("Enter the Category!");
    return false;
  }

  if (!Data.Static.title.length) {
    showError("Enter the Title!");
    return false;
  }

  if (!Data.Static.text.length) {
    showError("Enter the Text!");
    return false;
  }

  if (!Data.Static.telegram.length) {
    showError("Enter the link Telegram!");
    return false;
  }

  if (!Data.Static.twitter.length) {
    showError("Enter the link Twitter!");
    return false;
  }

  if (!Data.Static.discord.length) {
    showError("Enter the link Discord!");
    return false;
  }

  if (!Data.Static.youtube.length) {
    showError("Enter the link Youtube!");
    return false;
  }

  if (!Data.Static.price.length) {
    showError("Enter the Unit price!");
    return false;
  }

  if (!Data.Static.targetPrice.length) {
    showError("Enter the Total amount!");
    return false;
  }

  return true;
};

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.logoCheck = images["card/logo/cookie"];
  Static.picCheck = images["card/1"];
  Static.arrPicture = [];
  Static.name = "";
  Static.rang = "";
  Static.status = "";
  Static.category = "";
  Static.title = "";
  Static.text = "";
  Static.telegram = "";
  Static.twitter = "";
  Static.discord = "";
  Static.telegram = "";
  Static.youtube = "";
  Static.price = "";
  Static.targetPrice = "";
  Static.submitRecords = false;

  load({
    ID,
    fnLoad: async () => {
      if (!Variable.auth) {
        fn.siteLink("/");
        return;
      }
      console.log(Variable.myInfo);
      // let tmp = await fn.socket.set({ method: "Projects", action: "insert", params: { insert: { name: "Crypto Emergency", rang: 100, status: "Active", category: "Best", title: "Mega super=))", description: "Is an investment ecosystem that combines a Launchpad, an information resource and an academy.", price: 0.64, targetPrice: 10000 } } })
      // console.log('=f5b4ba=', tmp)
    },
    fn: () => {
      if (!Variable.auth) {
        fn.siteLink("/");
        return <div></div>;
      }
      return (
        <div class="wrapper">
          <div class="personal-inner">
            <div class="sidebar">
              {/* <div
                class={["menu-icon", burger ? "active" : null]}
                onclick={function () {
                  burger = !burger;
                  initReload();
                }}
              >
                <span></span>
              </div> */}
              <div class="nums">
                <span class="num_big">17,805</span>
                <span class="num_small">+1,500$</span>
                <span class="num_small"> +4,17%</span>
              </div>
              <nav>
                <ul class="sidebar-list">
                  <li class="sidebar-item">
                    <a
                      onclick={() => {
                        fn.siteLink("/");
                      }}
                    >
                      <img
                        src={svg["personal/icons/main"]}
                        class="sidebar-icon"
                      ></img>
                      <span>Главная</span>
                    </a>
                  </li>
                  <li class="sidebar-item">
                    <a>
                      <img
                        src={svg["personal/icons/wallet"]}
                        class="sidebar-icon"
                      ></img>
                      <span class="passive-text">Кошелек</span>
                    </a>
                  </li>
                  <li class="sidebar-item">
                    <a>
                      <img
                        src={svg["personal/icons/briefcase"]}
                        class="sidebar-icon"
                      ></img>
                      <span class="passive-text">Портфель</span>
                    </a>
                  </li>
                  <li class="sidebar-item">
                    <a>
                      <img
                        src={svg["personal/icons/structure"]}
                        class="sidebar-icon"
                      ></img>
                      <span class="passive-text">Структура</span>
                    </a>
                  </li>
                  <li class="sidebar-item">
                    <a>
                      <img
                        src={svg["personal/icons/message"]}
                        class="sidebar-icon"
                      ></img>
                      <span class="passive-text">Сообщения</span>
                    </a>
                  </li>
                  <li class="sidebar-item">
                    <a>
                      <img
                        src={svg["personal/icons/profile"]}
                        class="sidebar-icon"
                      ></img>
                      <span class="passive-text">Профиль</span>
                    </a>
                  </li>
                  <li class="sidebar-item">
                    <a>
                      <img
                        src={svg["personal/icons/setting"]}
                        class="sidebar-icon"
                      ></img>
                      <span class="passive-text">Настройки</span>
                    </a>
                  </li>
                </ul>
              </nav>
              <span
                class="sidebar-out"
                onclick={() => {
                  setStorage("auth", false);
                  setStorage("myInfo", {});
                  setStorage("uuid", 0);
                  window.location = "/";
                }}
              >
                LOGOUT<img src={svg["personal/icons/logout"]}></img>
              </span>
              <div class="sidebar-btns">
                <button class="btn-empty">ПРЕДЛОЖИТЬ ИДЕЮ</button>
                <button class="btn-empty">Bug report</button>
                <button class="btn-empty">ХОЧУ В КОМАНДУ</button>
              </div>
            </div>
            <div class="personal-main">
              <div class="circle-effect circle-effect1"></div>
              <div class="circle-effect circle-effect2"></div>
              <div class="personal-header">
                <div class="user">
                  <div class="user-card">
                    <img src={images["personal/user"]}></img>
                    <div class="user-name">
                      <span class="user-name_wel">Welcome</span>
                      <span class="user-name_name">
                        {Variable.myInfo.firstName}
                      </span>
                    </div>
                  </div>
                  <span class="upgrade">upgrade</span>
                </div>
                <div class="header-btns">
                  <button class="btn btn-passive">ПОПОЛНИТЬ</button>
                  <button class="btn btn-bordo btn-passive">ВЫВЕСТИ</button>
                </div>
              </div>
              <div class="personal-content">
                {Static.submitRecords ? (
                  <div>Success saved</div>
                ) : (
                  <div class="personal-form">
                    <div
                      Element={($el) => {
                        Static.elError = $el;
                      }}
                      style="display:none;"
                      class="error-text wrap-err"
                    ></div>
                    <h4>Choosing a main picture</h4>
                    <div class="form-item pictures">
                      <div
                        class="picture"
                        onclick={() => {
                          Static.picCheck = images["card/1"];
                          initReload();
                        }}
                      >
                        <input
                          id="pic-1"
                          type="radio"
                          name="picture"
                          checked={Static.picCheck == images["card/1"]}
                        ></input>
                        <label for="pic-1">
                          <img src={images["card/1"]}></img>
                        </label>
                      </div>
                      <div
                        class="picture"
                        onclick={() => {
                          Static.picCheck = images["card/2"];
                          initReload();
                        }}
                      >
                        <input
                          id="pic-2"
                          type="radio"
                          name="picture"
                          checked={Static.picCheck == images["card/2"]}
                        ></input>
                        <label for="pic-2">
                          <img src={images["card/2"]}></img>
                        </label>
                      </div>
                      <div
                        class="picture"
                        onclick={() => {
                          Static.picCheck = images["card/cookie"];
                          initReload();
                        }}
                      >
                        <input
                          id="pic-3"
                          type="radio"
                          name="picture"
                          checked={Static.picCheck == images["card/cookie"]}
                        ></input>
                        <label for="pic-3">
                          <img src={images["card/cookie"]}></img>
                        </label>
                      </div>
                      <div
                        class="picture"
                        onclick={() => {
                          Static.picCheck = images["card/takerProtokol"];
                          initReload();
                        }}
                      >
                        <input
                          id="pic-4"
                          type="radio"
                          name="picture"
                          checked={
                            Static.picCheck == images["card/takerProtokol"]
                          }
                        ></input>
                        <label for="pic-4">
                          <img src={images["card/takerProtokol"]}></img>
                        </label>
                      </div>
                    </div>
                    <h4>Choosing logo</h4>
                    <div class="form-item wrap-logo">
                      <div
                        class="picture"
                        onclick={() => {
                          Static.logoCheck = images["card/logo/cookie"];
                          initReload();
                        }}
                      >
                        <input
                          id="logo-1"
                          type="radio"
                          name="logo"
                          checked={
                            Static.logoCheck == images["card/logo/cookie"]
                          }
                        />
                        <label for="logo-1">
                          <img src={images["card/logo/cookie"]}></img>
                        </label>
                      </div>
                      <div
                        class="picture"
                        onclick={() => {
                          Static.logoCheck = images["card/logo/takerProtokol"];
                          initReload();
                        }}
                      >
                        <input
                          id="logo-2"
                          type="radio"
                          name="logo"
                          checked={
                            Static.logoCheck ==
                            images["card/logo/takerProtokol"]
                          }
                        />
                        <label for="logo-2">
                          <img src={images["card/logo/takerProtokol"]}></img>
                        </label>
                      </div>
                      <div
                        class="picture"
                        onclick={() => {
                          Static.logoCheck = images["card/logo/takerProtokol"];
                          initReload();
                        }}
                      >
                        <input id="logo-3" type="radio" name="logo" />
                        <label for="logo-3">
                          <img src={images["card/logo/veax"]}></img>
                        </label>
                      </div>
                    </div>
                    <div class="grid-2">
                      <div class="form-item">
                        <label class="form-label" id="name">
                          Name:
                        </label>
                        <input
                          class="form-input personal-input"
                          for="name"
                          placeholder="Enter name..."
                          onchange={function () {
                            Static.name = this.value;
                          }}
                        ></input>
                      </div>
                      <div class="form-item">
                        <label for="rang" class="form-label">
                          Enter rang
                        </label>
                        <input
                          id="rang"
                          type="number"
                          maxlength="3"
                          max="3"
                          class="form-input personal-input"
                          placeholder="Example 123"
                          oninput={function () {
                            if (this.value.length > 3 && !isNaN(this.value)) {
                              this.value = this.value.slice(0, 3);
                            }
                          }}
                          onchange={function () {
                            Static.rang = this.value;
                          }}
                        ></input>
                      </div>
                      <div class="form-item">
                        <label for="status" class="form-label">
                          Enter status
                        </label>
                        <input
                          id="status"
                          type="text"
                          class="form-input personal-input"
                          placeholder="Enter status..."
                          onchange={function () {
                            Static.status = this.value;
                          }}
                        ></input>
                      </div>
                      <div class="form-item">
                        <label for="category" class="form-label">
                          Enter category
                        </label>
                        <input
                          id="category"
                          type="text"
                          class="form-input personal-input"
                          placeholder="Enter category..."
                          onchange={function () {
                            Static.category = this.value;
                          }}
                        ></input>
                      </div>
                      <div class="form-item">
                        <label for="title" class="form-label">
                          Title:
                        </label>
                        <input
                          id="title"
                          type="text"
                          class="form-input personal-input"
                          placeholder="Enter title..."
                          onchange={function () {
                            Static.title = this.value;
                          }}
                        ></input>
                      </div>
                    </div>

                    <div class="form-item">
                      <label for="text" class="form-label">
                        Text:
                      </label>
                      <textarea
                        rows="5"
                        id="text"
                        class="personal-input form-input"
                        placeholder="Enter text..."
                        onchange={function () {
                          Static.text = this.value;
                        }}
                      ></textarea>
                    </div>
                    <div class="social-wrap">
                      <div class="form-item social-item">
                        <label for="social-1">
                          <img alt="Telegram" src={svg["icons/telegram"]}></img>
                        </label>
                        <input
                          id="social-1"
                          type="text"
                          class="form-input personal-input"
                          placeholder="Enter link..."
                          onchange={function () {
                            Static.telegram = this.value;
                          }}
                        ></input>
                      </div>
                      <div class="form-item social-item">
                        <label for="social-2">
                          <img alt="Discord" src={svg["icons/discord"]}></img>
                        </label>
                        <input
                          id="social-2"
                          type="text"
                          class="form-input personal-input"
                          placeholder="Enter link..."
                          onchange={function () {
                            Static.discord = this.value;
                          }}
                        ></input>
                      </div>
                      <div class="form-item social-item">
                        <label for="social-3">
                          <img alt="Twitter" src={svg["icons/twitter"]}></img>
                        </label>
                        <input
                          id="social-3"
                          type="text"
                          class="form-input personal-input"
                          placeholder="Enter link..."
                          onchange={function () {
                            Static.twitter = this.value;
                          }}
                        ></input>
                      </div>
                      <div class="form-item social-item">
                        <label for="social-4">
                          <img alt="Youtube" src={svg["icons/youtube"]}></img>
                        </label>
                        <input
                          id="social-4"
                          type="text"
                          class="form-input personal-input"
                          placeholder="Enter link..."
                          onchange={function () {
                            Static.youtube = this.value;
                          }}
                        ></input>
                      </div>
                    </div>
                    <div class="grid-2">
                      <div class="form-item">
                        <label for="price" class="form-label">
                          Unit price
                        </label>
                        <input
                          id="price"
                          type="number"
                          class="form-input personal-input"
                          placeholder="Enter unit price..."
                          onchange={function () {
                            Static.price = this.value;
                          }}
                        ></input>
                      </div>
                      <div class="form-item">
                        <label for="targetPrice" class="form-label">
                          Total amount
                        </label>
                        <input
                          id="targetPrice"
                          type="number"
                          class="form-input personal-input"
                          placeholder="Enter total amount..."
                          onchange={function () {
                            Static.targetPrice = this.value;
                          }}
                        ></input>
                      </div>
                    </div>

                    <button
                      class="btn"
                      onclick={async function () {
                        this.disabled = true;
                        let socials = [];

                        if (!formCheck()) {
                          this.disabled = false;
                          return;
                        }

                        if (Static.telegram) {
                          let tmpObj = {
                            name: "telegram",
                            link: Static.telegram,
                          };
                          socials.push(tmpObj);
                        }

                        if (Static.twitter) {
                          let tmpObj = {
                            name: "twitter",
                            link: Static.twitter,
                          };
                          socials.push(tmpObj);
                        }

                        if (Static.discord) {
                          let tmpObj = {
                            name: "discord",
                            link: Static.discord,
                          };
                          socials.push(tmpObj);
                        }

                        if (Static.youtube) {
                          let tmpObj = {
                            name: "youtube",
                            link: Static.youtube,
                          };
                          socials.push(tmpObj);
                        }

                        let response = await fn.socket.set({
                          method: "Projects",
                          action: "insert",
                          params: {
                            insert: {
                              name: Static.name.trim(),
                              rang: Static.rang.trim(),
                              status: Static.status.trim(),
                              category: Static.category.trim(),
                              title: Static.title.trim(),
                              description: Static.text.trim(),
                              social: socials,
                              price: Static.price.trim(),
                              targetPrice: Static.targetPrice.trim(),
                              galery: Static.picCheck,
                              icon: Static.logoCheck,
                            },
                          },
                        });

                        if (response.error) {
                          showError(response.error[1]);
                          this.disabled = false;
                          return;
                        }
                        Static.submitRecords = true;
                        initReload();
                      }}
                    >
                      Save change
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
