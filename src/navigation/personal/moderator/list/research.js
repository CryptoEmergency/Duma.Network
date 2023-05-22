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
      Static.records = await fn.socket.get({
        method: "ResearchAnalyst",
        params: { filter: {}, populate: { path: "projectId author" } },
      });
      console.log('=98a7b1=',Static.records);
      Static.accepted = [];
      Static.moderation = [];
      Static.refused = [];
      Static.modify = [];
      Static.records.forEach((item)=>{
        if(item.status == "Accepted"){
          Static.accepted.push(item);
        }
      });
      Static.records.forEach((item)=>{
        if(item.status == "Submitted for moderation"){
          Static.moderation.push(item);
        }
      });
      Static.records.forEach((item)=>{
        if(item.status == "Refused"){
          Static.refused.push(item);
        }
      });
      Static.records.forEach((item)=>{
        if(item.status == "Modify"){
          Static.modify.push(item);
        }
      });
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

                <div class="accordeon">
                  <div class="accordeon-item">
                    <div
                      class="accordeon-header"
                      onclick={() => {
                        Static.listAccepted.classList.toggle("content-show");
                        initReload();
                      }}
                    >
                      <h5 class="accordeon-header_title">
                        Accepted projects
                        {Static.accepted.length ? (
                          <span>{Static.accepted.length}</span>
                        ) : <span>0</span>}
                      </h5>
                    </div>
                    <ul
                      class={["accordeon-list", "accordeon-list_project"]}
                      Element={($el) => {
                        Static.listAccepted = $el;
                      }}
                    >
                      {Static.accepted.map((item, index) => {
                        return (
                          <li
                            class={["list-item", "list-item_project"]}>
                            
                            <div class="user-picture">
                              <img src={item.projectId.icon ? `/assets/upload/${item.projectId.icon}`: images["project/logo/logo"]} />
                            </div>
                            <div class="list-item_project-info">
                              <div class="title-research_list">
                                <span>{item.projectId.name}</span>
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
                                        <span>Change research</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              <p class="text-list mt-10">{item.description}</p>
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
                          </li>
                        );
                      })}
                    </ul>
                    {/* <center>
                      <button class="btn btn-green mt-15">
                        Show more
                      </button>
                    </center> */}
                    
                  </div>
                  <div class="accordeon-item">
                    <div
                      class="accordeon-header"
                      onclick={() => {
                        Static.listModeration.classList.toggle("content-show");
                        initReload();
                      }}
                    >
                      <h5 class="accordeon-header_title">
                        Moderation projects
                        {Static.moderation.length ? (
                          <span>{Static.moderation.length}</span>
                        ) : <span>0</span>}
                      </h5>
                    </div>
                    <ul
                      class={["accordeon-list", "accordeon-list_project"]}
                      Element={($el) => {
                        Static.listModeration = $el;
                      }}
                    >
                      {Static.moderation.map((item, index) => {
                        return (
                          <li
                            class={["list-item", "list-item_project"]}>
                            
                            <div class="user-picture">
                              <img src={item.projectId.icon ? `/assets/upload/${item.projectId.icon}`: images["project/logo/logo"]} />
                            </div>
                            <div class="list-item_project-info">
                              <div class="title-research_list">
                                <span>{item.projectId.name}</span>
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
                                        <span>Change research</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              <p class="text-list mt-10">{item.description}</p>
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
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div class="accordeon-item">
                    <div
                      class="accordeon-header"
                      onclick={() => {
                        Static.listModify.classList.toggle("content-show");
                        initReload();
                      }}
                    >
                      <h5 class="accordeon-header_title">
                        Modify projects
                        {Static.modify.length ? (
                          <span>{Static.modify.length}</span>
                        ) : <span>0</span>}
                      </h5>
                    </div>
                    <ul
                      class={["accordeon-list", "accordeon-list_project"]}
                      Element={($el) => {
                        Static.listModify = $el;
                      }}
                    >
                      {Static.modify.map((item, index) => {
                        return (
                          <li
                            class={["list-item", "list-item_project"]}>
                            
                            <div class="user-picture">
                              <img src={item.projectId.icon ? `/assets/upload/${item.projectId.icon}`: images["project/logo/logo"]} />
                            </div>
                            <div class="list-item_project-info">
                              <div class="title-research_list">
                                <span>{item.projectId.name}</span>
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
                                        <span>Change research</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              <p class="text-list mt-10">{item.description}</p>
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
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div class="accordeon-item">
                    <div
                      class="accordeon-header"
                      onclick={() => {
                        Static.listRefused.classList.toggle("content-show");
                        initReload();
                      }}
                    >
                      <h5 class="accordeon-header_title">
                        Refused projects
                        {Static.refused.length ? (
                          <span>{Static.refused.length}</span>
                        ) : <span>0</span>}
                      </h5>
                    </div>
                    <ul
                      class={["accordeon-list", "accordeon-list_project"]}
                      Element={($el) => {
                        Static.listRefused = $el;
                      }}
                    >
                      {Static.refused.map((item, index) => {
                        return (
                          <li
                            class={["list-item", "list-item_project"]}>
                            
                            <div class="user-picture">
                              <img src={item.projectId.icon ? `/assets/upload/${item.projectId.icon}`: images["project/logo/logo"]} />
                            </div>
                            <div class="list-item_project-info">
                              <div class="title-research_list">
                                <span>{item.projectId.name}</span>
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
                                        <span>Change research</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              <p class="text-list mt-10">{item.description}</p>
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
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* {Static.tmp.map((item, index) => {
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
                })} */}
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
