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
      Static.tmp = await fn.socket.get({
        method: "ResearchAnalyst",
        params: { filter: {}, populate: { path: "projectId author" } },
      });
      console.log('=98a7b1=',Static.tmp)
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
                  items={[
                    { title: "Moderation", link: "/personal/moderation/" },
                    {
                      title: "Research lists",
                      link: "/personal/moderator/list/research/",
                    },
                  ]}
                />
                <h2 class="general-title mt-0 mb-15">Research list from another users</h2>
                {Static.tmp.map((item, index) => {
                  return (
                    <div class="scheme-cards mb-15">
                      <div class="scheme-card">
                        <div class="scheme-img text">
                          <img
                            src={
                              item.projectId?.icon
                                ? `/assets/upload/${item.projectId.icon}`
                                : images["project/logo/logo"]
                            }
                          ></img>
                        </div>
                        <div class="scheme-card_desc text">
                          <div class="title-research_list mb-15">
                            <span>{item.projectId.name ? item.projectId.name : "New record"}</span>
                            
                            <div class="details">
                              <span>Research status: </span>
                              <span class="text-green ttu bold ml-15">{item?.status}</span>
                            </div>

                            <div class="edit-wrap" style="display: flex; align-items: center;">
                              <div class="switcher mt-0 ">
                                <input
                                  id={`switch-moderation${index}`}
                                  type="checkbox"
                                  checked={item.moderation}
                                  onchange={async () => {
                                    item.moderation = !item.moderation;
                                    await fn.socket.set({
                                      method: "ResearchAnalyst",
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
                              <div
                                class={[
                                  "question-container ml-15",
                                ]}
                                style="position: relative;top: 3px; right: 0;"
                                onclick={function(){
                                  this.classList.toggle('active');
                                  initReload();
                                }}
                              >
                                <div class="more-icon">
                                  <img class="moreInfo" src={svg.moreInfo}></img>
                                </div>
                                <ul class="more-list">
                                  <li 
                                    class="more-list-item"
                                    onclick={async () => {
                                      fn.siteLink(
                                        `/personal/moderator/edit/research/${item._id}`
                                      );
                                    }}
                                  >
                                    <img class="more-list-item_icon mr-5" src={svg.edit} />
                                    <span>Change project</span>
                                  </li>
                                </ul>
                              </div>
                              
                            </div>
                          </div>

                          <p class="text-list">{item.projectId.description}</p>
                          <div class="details mt-15">
                              <div>
                                <span>Research on the project from</span> 
                                <span class="text-green ml-15 ttu bold">{item.author.firstName}</span>
                              </div>
                              <p class="project-rang ml-15">
                                {item.rank.toFixed(2)} points
                                <span class="rang">
                                {
                                    item.rank < 50 ? "low rank" : 
                                    (item.rank >= 50 && item.rank < 100) ? " medium rank" :
                                    (item.rank >= 100) ? "high rank" : null
                                  }
                                </span>
                              </p>
                            </div>
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
