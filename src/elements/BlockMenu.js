import {
  jsx,
  jsxFrag,
  load,
  Data,
  Variable,
  setStorage,
  getStorage,
  initReload,
} 
from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";

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



// Data.Static.sidebarShow = false;


const forExport = function ({ Static, onclick, className, }) {
  if (getStorage("sidebarShow")) {
    Data.Static.sidebarShow = getStorage("sidebarShow");
  }
  // if(isMobile()){
  //   Data.Static.sidebarShow = false;
  // }
  return (
    <aside 
      class={["sidebar", 
      Data.Static.sidebarShow ? "sidebar_closed" : null,
    ]}>
      
      <div class={["sidebar-layout",
        Data.Static.sidebarShow ? "sidebar-layout_closed" : null,
      ]}>
        <span 
          class="btn-collapser"
          onclick={()=>{
            Data.Static.sidebarShow = !Data.Static.sidebarShow;
            setStorage("sidebarShow", Data.Static.sidebarShow);
            initReload();
          }}
        >
          <img src={svg.arrowLeft} />
        </span>
        <div class="sidebar-header">
          <div class="nums">
            <span class="num_big">{Variable.myInfo.balance.toFixed(2)}$</span>
            <span class="num_small">+0$</span>
            <span class="num_small"> +0,00%</span>
          </div>
        </div>
        <div class="sidebar-content">
          
          <nav>
            <ul class="sidebar-list">
              <li class={["sidebar-item", 
                  Variable.dataUrl.category == undefined ? "sidebar-item_active" : null,]}>
                <a
                  onclick={() => {
                    fn.siteLink("/personal/");
                  }}
                >
                  <span class="sidebar-icon">
                    <img src={svg["personal/icons/main"]}></img>
                  </span>
                  <span class="sidebar-title">Dashboard</span>
                </a>
              </li>
              {/* <li class={["sidebar-item",
                  Variable.dataUrl.category == "wallet" ? "sidebar-item_active" : null]}>
                <a
                  onclick={() => {
                    fn.siteLink("/personal/wallet/");
                  }}
                >
                  <span class="sidebar-icon">
                    <img src={svg["personal/icons/wallet"]}/>
                  </span>
                  <span class="sidebar-title">Wallet</span>
                </a>
              </li> */}
              {/* <li class={["sidebar-item",
                  Variable.dataUrl.category == "portfolio" ? "sidebar-item_active" : null]}>
                <a
                  onclick={() => {
                    fn.siteLink("/personal/portfolio/");
                  }}
                >
                  <span class="sidebar-icon">
                    <img src={svg["personal/icons/briefcase"]}/>
                  </span>
                  <span class="sidebar-title">Portfolio</span>
                </a>
              </li> */}
              <li class={["sidebar-item",
                  Variable.dataUrl.category == "referral" ? "sidebar-item_active" : null]}>
                <a
                  onclick={() => {
                    fn.siteLink("/personal/referral/");
                  }}
                >
                  <span class="sidebar-icon">
                    <img src={svg["personal/icons/structure"]}/>
                  </span>
                  <span class="sidebar-title">Referral</span>
                </a>
              </li>
              <li class={["sidebar-item",
                  Variable.dataUrl.category == "bookmarks" ? "sidebar-item_active" : null]}>
                <a
                  onclick={() => {
                    fn.siteLink("/personal/bookmarks/");
                  }}
                >
                  <span class="sidebar-icon">
                    <img src={svg["personal/icons/message"]}/>
                  </span>
                  <span class="sidebar-title">Bookmarks</span>
                </a>
              </li>
              <li class={["sidebar-item",
                  Variable.dataUrl.category == "profile" ? "sidebar-item_active" : null]}>
                <a
                  onclick={() => {
                    fn.siteLink("/personal/profile/");
                  }}
                >
                  <span class="sidebar-icon">
                    <img src={svg["personal/icons/profile"]}/>
                  </span>
                  <span class="sidebar-title">Profile</span>
                </a>
              </li>
              <li class={["sidebar-item",
                  Variable.dataUrl.category == "projects" ? "sidebar-item_active" : null]}>
                <a
                  onclick={() => {
                    fn.siteLink("/personal/projects/");
                  }}
                >
                  <span class="sidebar-icon">
                    <img src={svg["personal/icons/project"]}/>
                  </span>
                  <span class="sidebar-title">My projects</span>
                </a>
              </li>
              <li class={["sidebar-item",
                  Variable.dataUrl.category == "researches" ? "sidebar-item_active" : null]}>
                <a
                  onclick={() => {
                    fn.siteLink("/personal/researches/");
                  }}
                >
                  <span class="sidebar-icon">
                    <img src={svg["personal/icons/analyst"]}/>
                  </span>
                  <span class="sidebar-title">My researches</span>
                </a>
              </li>
              <li class={["sidebar-item",
                  Variable.dataUrl.category == "marketplace" ? "sidebar-item_active" : null]}>
                <a
                  onclick={() => {
                    fn.siteLink("/personal/marketplace/");
                  }}
                >
                  <span class="sidebar-icon">
                    <img src={svg["personal/icons/marketplace"]}/>
                  </span>
                  <span class="sidebar-title">My marketplace</span>
                </a>
              </li>
              {
                Variable.myInfo._id == '6461b65d179f315ed7fc663e' ? 
                <li class={["sidebar-item",
                    Variable.dataUrl.category == "historyBank" ? "sidebar-item_active" : null]}>
                  <a
                    onclick={() => {
                      fn.siteLink("/personal/historyBank/");
                    }}
                  >
                    <span class="sidebar-icon">
                      <img src={svg["personal/icons/history"]}/>
                    </span>
                    <span class="sidebar-title">History bank</span>
                  </a>
                </li> : null
              }

              <li class={["sidebar-item",
                  Variable.dataUrl.category == "history" ? "sidebar-item_active" : null]}>
                <a
                  onclick={() => {
                    fn.siteLink("/personal/history/");
                  }}
                >
                  <span class="sidebar-icon">
                    <img src={svg["personal/icons/history"]}/>
                  </span>
                  <span class="sidebar-title">History</span>
                </a>
              </li>

              <li class={["sidebar-item",
                  Variable.dataUrl.category == "historyOwner" ? "sidebar-item_active" : null]}>
                <a
                  onclick={() => {
                    fn.siteLink("/personal/historyOwner/");
                  }}
                >
                  <span class="sidebar-icon">
                    <img src={svg["personal/icons/history"]}/>
                  </span>
                  <span class="sidebar-title">History project</span>
                </a>
              </li>
              
              {Variable.myInfo.role ? 
              <li class={["sidebar-item",
                  Variable.dataUrl.category == "admin" ? "sidebar-item_active" : null]}>
                <a
                  onclick={() => {
                    fn.siteLink("/personal/admin/");
                  }}
                >
                  <span class="sidebar-icon">
                    <img src={svg["personal/icons/setting"]}/>
                  </span>
                  <span class="sidebar-title">Admin</span>
                </a>
              </li>
              : null}
              {Variable.myInfo._id == '6454ef0ef4baaaecaff06672' ? 
              <li class={["sidebar-item",
                  Variable.dataUrl.category == "moderation" ? "sidebar-item_active" : null]}>
                <a
                  onclick={() => {
                    fn.siteLink("/personal/moderation/");
                  }}
                >
                  <span class="sidebar-icon">
                    <img src={svg["personal/icons/moderation"]}/>
                  </span>
                  <span class="sidebar-title">Moderation</span>
                </a>
              </li>
              : null}
              {Variable.myInfo._id == '6461b5b1179f315ed7fc65ce' ? 
              <li class={["sidebar-item",
                  Variable.dataUrl.category == "finance" ? "sidebar-item_active" : null]}>
                <a
                  onclick={() => {
                    fn.siteLink("/personal/finance/");
                  }}
                >
                  <span class="sidebar-icon">
                    <img src={svg["personal/icons/finance"]}/>
                  </span>
                  <span class="sidebar-title">Finance</span>
                </a>
              </li>
              : null}
            </ul>
          </nav>
          <div
            class="sidebar-out"
            onclick={() => {
              setStorage("auth", false);
              setStorage("myInfo", {});
              setStorage("uuid", 0);
              window.location = "/";
            }}
          >
            <span class="sidebar-icon">
              <img src={svg["personal/icons/logout"]}></img>
            </span>
            <span class="sidebar-title">LOGOUT</span>

          </div>
        </div>
        <div class="sidebar-footer">
          <div class="sidebar-btns">
            <button
              class="btn-empty"
              onclick={() => {
                fn.modals.Suggestions({ 
                  title: "Contact us",
                  items: [
                    {
                      title: "Suggest an idea"
                    },
                    {
                      title: "Found an error"
                    }
                  ] 
                });
              }}
            >
              {Data.Static.sidebarShow ? 
                <span class="sidebar-icon">
                  <img src={svg.idea}/> 
                </span>
                : "Contact us" }
            </button>
            {/* <button
              class="btn-empty"
              onclick={() => {
                fn.modals.Suggestions({ title: "Bug report" });
              }}
            >
              {Data.Static.sidebarShow ? 
                <span class="sidebar-icon">
                  <img src={svg.errorIcon}/> 
                </span>
                : "Bug report" }
            </button> */}
            <button
              class="btn-empty"
              onclick={() => {
                fn.modals.Suggestions({ 
                  title: "Cooperation",  
                  items: [
                    {
                      title: "Become our team"
                    },
                    {
                      title: "Become a foundation"
                    },
                    {
                      title: "Become a partner"
                    }
                  ]
                });
              }}
            >
              {Data.Static.sidebarShow ? 
                <span class="sidebar-icon">
                  <img src={svg.team}/> 
                </span>
                : "Cooperation" }
            </button>
          </div>  
        </div>
      </div>

    </aside>
  );
};

export default forExport;
