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
        method: "MarketUser",
        params: {
          filter: {  },
          // limit: 20,
          populate: {
            path: "projectId",
          },
        },
      });
      console.log("=a07a6c=", Static.records);
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
                    {
                      title: "Marketplace lists",
                      link: "/personal/admin/list/marketplace/",
                    },
                  ]}
                />
                <div class="mb-25 inner-add">
                  <h2 class="general-title mt-0">Marketplace lists</h2>
                </div>
                {Static.records.map((item, index) => {
                  return (
                    <div class="scheme-cards mb-15">
                      <div class="scheme-card">
                        <div class="scheme-img text">
                          <img
                            src={
                              item.projectId.icon
                                ? `/assets/upload/${item.projectId.icon}`
                                : images["project/logo/logo"]
                            }
                          ></img>
                        </div>
                        <div class="scheme-card_desc text">
                          <div class="title-research_list mb-15">
                            <span>
                              {item.projectId.name
                                ? item.projectId.name
                                : "New record"}
                            </span>
                            <div class="edit-wrap">
                              <div class="checkbox mr-15">
                                <input
                                  id={`checkbox-${index}`}
                                  type="checkbox"
                                  checked={item.preferred}
                                  onchange={async () => {
                                    item.preferred = !item.preferred;
                                    await fn.socket.set({
                                      // method: "Marketplace",
                                      method: "MarketUser",
                                      action: "findOneAndUpdate",
                                      _id: item._id,
                                      params: {
                                        update: {
                                          preferred: item.preferred,
                                        },
                                      },
                                    });
                                    initReload();
                                  }}
                                ></input>
                                <label for={`checkbox-${index}`}>
                                  <img class="icon-done" src={svg.done}></img>
                                </label>
                              </div>
                              <div class="switcher mt-0 ">
                                <input
                                  id={`switch-moderation${index}`}
                                  type="checkbox"
                                  checked={item.moderation}
                                  onchange={async () => {
                                    item.moderation = !item.moderation;
                                    await fn.socket.set({
                                      // method: "Marketplace",
                                      method: "MarketUser",
                                      action: "findOneAndUpdate",
                                      _id: item._id,
                                      params: {
                                        update: {
                                          moderation: item.moderation,
                                        },
                                      },
                                    });
                                    initReload();
                                  }}
                                ></input>
                                <label
                                  for={`switch-moderation${index}`}
                                ></label>
                              </div>
                            </div>
                          </div>

                          <p class="text-list">{item.projectId.description}</p>
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
