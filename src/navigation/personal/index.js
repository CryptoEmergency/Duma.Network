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

const pictures = [
  {
    main: images["card/1"],
    logo: images["card/logo/cookie"],
  },
  {
    main: images["card/2"],
    logo: images["card/logo/takerProtokol"],
  },
  {
    main: images["card/cookie"],
    logo: images["card/logo/veax"],
  },
  {
    main: images["card/takerProtokol"],
    logo: images["card/logo/cookie"],
  },
  {
    main: images["card/veax"],
    logo: images.logo,
  },
];

const socials = [
  {
    name: "Telegram",
    src: svg["icons/telegram"],
  },
  {
    name: "Discord",
    src: svg["icons/discord"],
  },
  {
    name: "Twitter",
    src: svg["icons/twitter"],
  },
  {
    name: "Youtube",
    src: svg["icons/youtube"],
  },
];
let mainCard,
  logoCard = false;
const start = function (data, ID) {
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
                    {pictures.map((item, index) => {
                      return (
                        <div class="picture">
                          <input id={`pic-${index}`} type="checkbox"></input>
                          <label for={`pic-${index}`}>
                            <img src={item.main}></img>
                          </label>
                        </div>
                        // <div
                        //   class={[
                        //     "picture",
                        //     item.hidden ? "picture_active" : null,
                        //   ]}
                        //   onclick={() => {
                        //     pictures.forEach((el, i) => {
                        //       index === i ? (item.hidden = !item.hidden) : null;
                        //     });
                        //     initReload();
                        //   }}
                        // >
                        //   <img src={item.main}></img>
                        // </div>
                      );
                    })}
                  </div>
                  <div class="form-item">
                    <label for="title" class="form-label">
                      Title:
                    </label>
                    <input
                      id="title"
                      type="text"
                      class="form-input"
                      placeholder="Enter title..."
                    ></input>
                  </div>
                  <h4>Choosing logo</h4>
                  <div class="form-item wrap-logo">
                    {pictures.map((item, index) => {
                      return (
                        <div class="picture">
                          <input id={`logo-${index}`} type="checkbox"></input>
                          <label for={`logo-${index}`}>
                            <img src={item.logo}></img>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  {/* <div class="form-item wrap-logo">
                    {pictures.map((item) => {
                      return (
                        <div
                          class={[
                            "picture",
                            item.hidden ? "picture_active" : null,
                          ]}
                          onclick={() => {
                            pictures.forEach((el, i) => {
                              index === i ? (item.hidden = !item.hidden) : null;
                            });
                            initReload();
                          }}
                        >
                          <img src={item.logo}></img>
                        </div>
                      );
                    })}
                  </div> */}
                  <div class="form-item">
                    <label for="rang" class="form-label">
                      Enter rang
                    </label>
                    <input
                      id="rang"
                      type="text"
                      class="form-input"
                      placeholder="Enter rang..."
                    ></input>
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
                    ></textarea>
                  </div>
                  <div class="social-wrap">
                    {socials.map((item, index) => {
                      return (
                        <div class="form-item social-item">
                          <label for={`social-${index}`}>
                            <img alt={item.alt} src={item.src}></img>
                          </label>
                          <input
                            id={`social-${index}`}
                            type="text"
                            class="form-input personal-input"
                            placeholder="Enter link..."
                          ></input>
                        </div>
                      );
                    })}
                  </div>
                  <div class="form-item">
                    <label for="procent" class="form-label">
                      Procent %
                    </label>
                    <input
                      id="procent"
                      type="text"
                      class="form-input"
                      placeholder="Enter procent..."
                    ></input>
                  </div>
                  <div class="form-item">
                    <label for="price" class="form-label">
                      Price
                    </label>
                    <input
                      id="price"
                      type="text"
                      class="form-input"
                      placeholder="Enter price..."
                    ></input>
                  </div>
                  {/* <div class="form-item social-checkbox">
                    {socials.map((item, index) => {
                      return (
                        <div class="checkbox">
                          <input
                            id={`checkbox-${index}`}
                            type="checkbox"
                          ></input>
                          <label for={`checkbox-${index}`}>
                            <img
                              class="icon"
                              alt={item.alt}
                              src={item.src}
                            ></img>
                          </label>
                        </div>
                      );
                    })}
                  </div> */}
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
