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
import Elements from "@src/elements/export.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });

  load({
    ID,
    fnLoad: async () => {
      if (!Variable.auth || !Variable.myInfo._id == '6454ef0ef4baaaecaff06672') {
        fn.siteLink("/");
        return;
      }
    },
    fn: () => {
      if (!Variable.auth || !Variable.myInfo._id == '6454ef0ef4baaaecaff06672') {
        fn.siteLink("/");
        return <div></div>;
      }
      return (
        <div class="wrapper">
          <div class="personal-inner">
            <Elements.BlockMenu />
            <div class="personal-main">
              <Elements.BlockPersonal />
              <div class="personal-content">
                <Elements.Bredcrumbs
                  items={[{ title: "Moderator", link: "/personal/moderation/" }]}
                />
                <section class="main mb-25  ">
                  <h2 class="general-title mt-25">Moderator Action</h2>
                </section>
                <div class="grid-3">
                  <button
                    class="btn btn-green"
                    onclick={() => {
                      fn.siteLink("/personal/moderator/list/research/");
                    }}
                  >
                    Research Lists
                  </button>
                  <button
                    class="btn btn-green"
                    onclick={async() => {
                      fn.siteLink(`/personal/moderator/list/projects/`);
                    }}
                  >
                    List projects
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
