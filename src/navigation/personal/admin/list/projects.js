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
        method: "Projects",
        params: { populate: { path: "author" } },
      });
      console.log('=28583e=',Static.records)
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
                      title: "Projects lists",
                      link: "/personal/admin/list/projects/",
                    },
                  ]}
                />
                <div class="mb-25 inner-add">
                  <h2 class="general-title mt-0">Projects list</h2>

                  {/* <div
                    class="add"
                    onclick={async () => {
                      let insert = {
                        tabs: "pre-seed",
                      };
                      let response = await fn.socket.set({
                        method: "Projects",
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
                    }}
                  >
                    +
                  </div> */}
                </div>
                {Static.records.map((item, index) => {
                  return (
                    <div class="scheme-cards mb-15">
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
                          <div class="title-research_list mb-15">
                            <span>{item.name ? item.name : "New record"}</span>
                            <div class="edit-wrap">
                              {item.publish ?
                                <span class="text-green mr-15" >Publish</span> :  false
                              }
                              <span class="mr-15">{item.status}</span>
                              <img
                                src={svg.edit}
                                onclick={async () => {
                                  fn.siteLink(
                                    `/personal/admin/edit/projects/${item._id}`
                                  );
                                }}
                              />
                              <div class="switcher mt-0 ">
                                <input
                                  id={`switch-moderation${index}`}
                                  type="checkbox"
                                  checked={item.moderation}
                                  onchange={async () => {
                                    item.moderation = !item.moderation;
                                    await fn.socket.set({
                                      method: "Projects",
                                      action: "findOneAndUpdate",
                                      _id: item._id,
                                      params: {
                                        update: { moderation: item.moderation },
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

                          <p class="text-list">{item.description}</p>
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
