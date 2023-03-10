import { jsx, jsxFrag, load } from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
const start = function (data, ID) {
  load({
    ID,
    fn: () => {
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
                    <a>
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
                      <span>Кошелек</span>
                    </a>
                  </li>
                  <li class="sidebar-item">
                    <a>
                      <img
                        src={svg["personal/icons/briefcase"]}
                        class="sidebar-icon"
                      ></img>
                      <span>Портфель</span>
                    </a>
                  </li>
                  <li class="sidebar-item">
                    <a>
                      <img
                        src={svg["personal/icons/structure"]}
                        class="sidebar-icon"
                      ></img>
                      <span>Структура</span>
                    </a>
                  </li>
                  <li class="sidebar-item">
                    <a>
                      <img
                        src={svg["personal/icons/message"]}
                        class="sidebar-icon"
                      ></img>
                      <span>Сообщения</span>
                    </a>
                  </li>
                  <li class="sidebar-item">
                    <a>
                      <img
                        src={svg["personal/icons/profile"]}
                        class="sidebar-icon"
                      ></img>
                      <span>Профиль</span>
                    </a>
                  </li>
                  <li class="sidebar-item">
                    <a>
                      <img
                        src={svg["personal/icons/setting"]}
                        class="sidebar-icon"
                      ></img>
                      <span>Настройки</span>
                    </a>
                  </li>
                </ul>
              </nav>
              <span class="sidebar-out">
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
                      <span class="user-name_name">USER</span>
                    </div>
                  </div>
                  <span class="upgrade">АПГРЕЙД</span>
                </div>
                <div class="header-btns">
                  <button class="btn">ПОПОЛНИТЬ</button>
                  <button class="btn btn-bordo">ВЫВЕСТИ</button>
                </div>
              </div>
              <div class="personal-content">...</div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
