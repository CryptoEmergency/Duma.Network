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
  Static.showAdd = true;
  load({
    ID,
    fnLoad: async () => {
      if (!Variable.auth || !Variable.myInfo._id == '6461b5b1179f315ed7fc65ce') {
        fn.siteLink("/");
        return;
      }
      Static.items = await fn.socket.get({ 
        method: "Projects",
        params: {
          // filter: { owner },
          limit: 10,
          populate: { path: "owner" },
        }, 
      });
      Static.projectsOwner = [];
      Static.items.forEach((item)=>{
        if(item.owner){
          Static.projectsOwner.push(item);
        }
      });
    },
    fn: () => {
      if (!Variable.auth || !Variable.myInfo._id == '6461b5b1179f315ed7fc65ce') {
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
                  items={[{ title: "Owner project", link: "/personal/finance/" }]}
                />
                <section class="main mb-25  ">
                  <h2 class="general-title mt-25">Appointment of the project owner</h2>
                </section>
                <div class="grid-3">
                  {/* {
                    Static.items === Static.projectsOwner ? 
                    <button
                      class="btn btn-green"
                      onclick={() => {
                        fn.modals.Owner({
                          title: "Choose the owner for project",
                        });
                      }}
                    >
                      Choose the owner
                    </button> : null
                  } */}
                  <button
                    class="btn btn-green"
                    onclick={() => {
                      fn.modals.Owner({
                        title: "Choose the owner for project",
                      });
                    }}
                  >
                    Choose the owner
                  </button>
                  
                </div>
                <div class={["mt-15", Static.projectsOwner.length ? null : "list-notFound"]}>
                  {
                    Static.projectsOwner.length ? 
                      Static.projectsOwner.map((item, index) => {
                        return (
                          <div class="scheme-cards mb-15">
                            
                            <div class="scheme-card">
                              {/* <div
                                class={[
                                  "question-container ml-15",
                                ]}
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
                                        `/personal/edit/project/${item._id}`
                                      );
                                    }}
                                  >
                                    <img class="more-list-item_icon mr-5" src={svg.edit} />
                                    <span>Change project</span>
                                  </li>
                                </ul>
                              </div> */}
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
                                  <div class="user-card mb-15">
                                    <div class="user-picture mr-15">
                                      <img src={item.owner?.icon ? 
                                        `/assets/upload/${item.owner?.icon}` : svg.user} />
                                      <div class="user-status">
                                        {item.owner?.status}
                                      </div>
                                    </div>
                                    <div class="user-info">
                                      <span class="text-green">Owner</span>
                                      <div class="user-name">{item.owner?.firstName}</div>
                                    </div>
                                </div>
                                </div>
      
                                <p class="text-list">{item.description}</p>
                                {
                                  item.tokenPlatform ? 
                                  null
                                  : 
                                  <button
                                    class="btn btn-green mt-10"
                                    onclick={() => {
                                      fn.modals.AddTokens({
                                        projectName: item.name,
                                        projectId: item._id,
                                      });
                                    }}
                                  >
                                    Add tokens to the project
                                  </button>
                                }
                                
                                {/* <div>{item?.tokens}</div> */}
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
