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

const forExport = function ({ Static, onclick, className }) {
  return (
    <div class="sidebar">
      <div class="nums">
        <span class="num_big">0,00</span>
        <span class="num_small">+0$</span>
        <span class="num_small"> +0,00%</span>
      </div>
      <nav>
        <ul class="sidebar-list">
          <li class="sidebar-item">
            <a
              onclick={() => {
                fn.siteLink("/personal/");
              }}
            >
              <img src={svg["personal/icons/main"]} class="sidebar-icon"></img>
              <span>Dashboard</span>
            </a>
          </li>
          <li class="sidebar-item">
            <a
              onclick={() => {
                fn.siteLink("/personal/wallet/");
              }}
            >
              <img
                src={svg["personal/icons/wallet"]}
                class="sidebar-icon"
              ></img>
              <span class="passive-text">Wallet</span>
            </a>
          </li>
          <li class="sidebar-item">
            <a
              onclick={() => {
                fn.siteLink("/personal/portfolio/");
              }}
            >
              <img
                src={svg["personal/icons/briefcase"]}
                class="sidebar-icon"
              ></img>
              <span class="passive-text">Portfolio</span>
            </a>
          </li>
          <li class="sidebar-item">
            <a
              onclick={() => {
                fn.siteLink("/personal/referral/");
              }}
            >
              <img
                src={svg["personal/icons/structure"]}
                class="sidebar-icon"
              ></img>
              <span class="passive-text">Referral</span>
            </a>
          </li>
          <li class="sidebar-item">
            <a
              onclick={() => {
                fn.siteLink("/personal/bookmarks/");
              }}
            >
              <img
                src={svg["personal/icons/message"]}
                class="sidebar-icon"
              ></img>
              <span class="passive-text">Bookmarks</span>
            </a>
          </li>
          <li class="sidebar-item">
            <a
              onclick={() => {
                fn.siteLink("/personal/profile/");
              }}
            >
              <img
                src={svg["personal/icons/profile"]}
                class="sidebar-icon"
              ></img>
              <span class="passive-text">Profile</span>
            </a>
          </li>
          {Variable.myInfo.role ? (
            <li class="sidebar-item">
              <a
                onclick={() => {
                  fn.siteLink("/personal/admin/");
                }}
              >
                <img
                  src={svg["personal/icons/setting"]}
                  class="sidebar-icon"
                ></img>
                <span class="passive-text">Admin</span>
              </a>
            </li>
          ) : null}
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
        <button
          class="btn-empty"
          onclick={() => {
            fn.modals.Suggestions({});
          }}
        >
          Suggest an idea
        </button>
        <button
          class="btn-empty"
          onclick={() => {
            fn.modals.Suggestions({});
          }}
        >
          Bug report
        </button>
        <button
          class="btn-empty"
          onclick={() => {
            fn.modals.Suggestions({});
          }}
        >
          I want team
        </button>
      </div>
    </div>
  );
};

export default forExport;
