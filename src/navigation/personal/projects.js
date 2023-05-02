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
        params: { filter: { author: Variable.myInfo._id } },
      });
      console.log('=981423=',Static.records)
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
                    { title: "My projects", link: "/personal/projects/" },

                  ]}
                />
                <p class="text">
                  You can fill out information about the project, if the project passes moderation of our platform, then by purchasing an Partner subscription, you will be able to publish the project.
                </p>
                <div class="mY-25 inner-add">
                  <h2 class="general-title mt-0">Add new projects</h2>

                  <div
                    class="add"
                    onclick={async () => {
                      let insert = {
                        name: "New name",
                        status: "Draft",
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
                        `/personal/edit/project/${response._id}`
                      );
                    }}
                  >
                    +
                  </div>
                </div>
                <div class={[Static.records.length ? null : "list-notFound"]}>
                {
                  Static.records.length ? 
                    Static.records.map((item, index) => {
                      return (
                        <div class="scheme-cards mb-15">
                          
                          <div class="scheme-card">
                            <div
                              class={[
                                "question-container",
                              ]}
                              onclick={function(){
                                console.log('=cb8aa4=',Static[`moreList${index}`])
                                // Static[`moreList${index}`].hidden = false;
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
                                  onclick={async()=>{
                                    if(Variable.myInfo.status == "Partner"){
                                      await fn.socket.set({
                                        method: "Projects",
                                        action: "findOneAndUpdate",
                                        params: {
                                          update: { publish: true },
                                          filter: {
                                            _id: item._id
                                          }
                                        }
                                      })
                                      fn.modals.Success({
                                        title: "Your project has been published successfully"
                                      })
                                    }else{
                                      fn.modals.Status({});
                                    }

                                    
                                  }}
                                >
                                  Publish</li>
                                <li class="more-list-item">Change project</li>
                              </ul>
                            </div>
                            <div class="scheme-img text">
                              <img
                                src={
                                  item?.icon
                                    ? `/assets/upload/${item.icon}`
                                    : svg.addImage
                                }
                              ></img>
                            </div>
                            <div class="scheme-card_desc text">
                              <div class="title-research_list mb-15">
                                <span>{item.name ? item.name : "New record"}</span>
                                <div class="edit-wrap mr-20">
                                  {item.publish ? 
                                    <span class="text-green mr-15">Publish</span> : null
                                  }
                                  <span 
                                    class={[
                                      item.status == "Draft" ? "text-red" : null, 

                                    ]}
                                  >
                                    {item.status}
                                  </span>
                                  <img
                                    class="ml-20"
                                    src={svg.edit}
                                    onclick={async () => {
                                      fn.siteLink(
                                        `/personal/edit/project/${item._id}`
                                      );
                                    }}
                                  />
                                </div>
                              </div>
    
                              <p class="text-list">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    }) : 
                    <div class="notFound">
                      <span>Records not found in table</span>
                      <img src={svg.notFound} />
                    </div>
                }
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
