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
      if (!Variable.auth) {
        fn.siteLink("/");
        return;
      }
      Static.records = await fn.socket.get({
        method: "ResearchAnalyst",
        params: { 
          filter: {
            author: Variable.myInfo._id,
          },
          populate: { path: "projectId",  }
        }, 
      });
    },
    fn: () => {
      if (!Variable.auth) {
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
                    { title: "My researches", link: "/personal/researches/" },

                  ]}
                />
                <div class="mY-25 inner-add">
                  <h2 class="general-title mt-0">Add research to the project</h2>

                  <div
                    class="add"
                    onclick={() => {
                      fn.modals.ProjectsList({
                        title: "Projects list",
                      });
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
                                "question-container ml-15",
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
                                  onclick={async () => {
                                    fn.siteLink(
                                      `/personal/edit/research/${item._id}`
                                    );
                                  }}
                                >
                                  <img class="more-list-item_icon mr-5" src={svg.edit} />
                                  <span>Change research</span>
                                </li>
                              </ul>
                            </div>
                            <div class="scheme-img text">
                              <img
                                src={
                                  item.projectId?.icon
                                    ? `/assets/upload/${item.projectId.icon}`
                                    : svg.addImage
                                }
                              ></img>
                            </div>
                            <div class="scheme-card_desc text">
                              <div class="title-research_list mb-15">
                                <span>{item.projectId.name ? item.projectId.name : "New record"}</span>
                                <div class="edit-wrap mr-35">
                                  {item?.moderation ? 
                                    <img class="icon mr-15" src={svg.publish} /> : null
                                  }
                                  <img class="icon" src={
                                    item.status == "Accepted" ? svg['iconsGreen/doneSend'] 
                                    : item.status == "Submitted for moderation" ? svg.process 
                                    : item.status == "Draft" ? svg.draft 
                                    : item.status == "Refused" ? svg.denied 
                                    : item.status == "Modify" ? svg.edit : null
                                  }/>
                                </div>
                              </div>
    
                              <p class="text-list">{item.projectId.description}</p>
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
