import {
  jsx,
  jsxFrag,
  Variable,
  load,
  setStorage,
} from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
import { fn } from "@src/functions/export.js";
import images from "@assets/images/index.js";

const mainHeader = async function () {
  load({
    ID: "mainHeader",
    fn: () => {
      return (
        <div class="wrapper">
          <div class="header-inner">
            <div class="header-logo">
              <a href="https://duma.network">
                <img src={images["logo"]}></img>
              </a>
            </div>
            <nav class="header-nav">
              <ul class="header-list">
                <li>
                  <a href="#" class="header-list_item">
                    PROJECTS
                  </a>
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
                <li>
                  <a href="#" class="header-list_item">
                    About
                  </a>
                  {/* <ul class="menu-sublist">
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
                  </ul> */}
                </li>
                <li class="header-list_item">
                  <a href="#" class="header-list_item">
                    Documents
                  </a>
                </li>
              </ul>
            </nav>
            <div class="header-btns">
              <button class="btn">INVEST IN PROJECT</button>
              <button class="btn">MY ACCOUNT</button>
              <button class="btn">CONNECT WALLET</button>
            </div>
            <span>EN</span>
          </div>
        </div>
      );
    },
  });
  return;
};

export { mainHeader };
