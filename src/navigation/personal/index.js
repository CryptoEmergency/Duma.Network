import {
  jsx,
  jsxFrag,
  load,
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
  }, 5000);
};

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.logoCheck = images["card/logo/cookie"];
  Static.picCheck = images["card/1"];
  Static.arrPicture = [];
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
                <button class="btn-empty">БАГРЕПОРТ</button>
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
                <form class="personal-form">
                  <h4>Choosing a main picture</h4>
                  <div class="form-item pictures">
                    <div
                      class="picture"
                      onclick={() => {
                        Static.picCheck = images["card/1"];
                        initReload();
                      }}
                    >
                      <input id="pic-1" type="radio" name="picture"></input>
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
                      <input id="pic-2" type="radio" name="picture"></input>
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
                      <input id="pic-3" type="radio" name="picture"></input>
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
                      <input id="pic-4" type="radio" name="picture"></input>
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
                      <input id="logo-1" type="radio" name="logo" />
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
                      <input id="logo-2" type="radio" name="logo" />
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
                        type="text"
                        class="form-input personal-input"
                        placeholder="Enter rang..."
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
                        type="text"
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
                        type="text"
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
                    type="submit"
                    onclick={async function () {
                      let socials = [];
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

                      await fn.socket.set({
                        method: "Projects",
                        action: "insert",
                        params: {
                          insert: {
                            name: Static.name,
                            rang: Static.rang,
                            status: Static.status,
                            category: Static.category,
                            title: Static.title,
                            description: Static.text,
                            social: socials,
                            price: Static.price,
                            targetPrice: Static.targetPrice,
                            galery: Static.picCheck,
                            icon: Static.logoCheck,
                          },
                        },
                      });

                      initReload();
                    }}
                  >
                    Save change
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
