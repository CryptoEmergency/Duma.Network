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
      if (!Variable.auth || !Variable.myInfo.role) {
        fn.siteLink("/");
        return;
      }
      Static.records = await fn.socket.get({
        method: "Research",
        params: { filter: {} },
      });
    },
    fn: () => {
      if (!Variable.auth || !Variable.myInfo.role) {
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
                  items={[
                    { title: "Admin", link: "/personal/admin/" },
                    { title: "Research lists", link: "/personal/admin/list/research/" }
                  ]}
                />
                <div class="mb-25 inner-add">
                  <h2 class="general-title mt-0">Research lists</h2>

                  <div
                    class="add"
                    onclick={async () => {
                      let insert = {
                        tabs: "seed",
                      };
                      let response = await fn.socket.set({
                        method: "Research",
                        action: "insert",
                        params: { insert },
                      });
                      if (!response || !response._id) {
                        alert("error");
                        return;
                      }
                      fn.siteLink(
                        `/personal/admin/edit/research/${response._id}`
                      );
                      // fn.siteLink("/personal/admin/list/research/");
                    }}>
                    +
                  </div>
                </div>
                {Static.records.map((item, index) => {
                  return (
                    <div
                      class="scheme-cards mb-15"
                      onclick={async () => {
                        fn.siteLink(
                          `/personal/admin/edit/research/${item._id}`
                        );
                      }}
                    >
                      <div class="scheme-card">
                        <div class="scheme-img text">
                          <img
                            src={
                              item.icon
                                ? `/assets/upload/${item.icon}`
                                : images["project/logo/logo"]
                            }
                          ></img>
                        </div>
                        <div class="scheme-card_desc text">
                          <span>{item.name ? item.name : "New record"}</span>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
