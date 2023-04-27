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
      Static.tokens = await fn.socket.get({
        method: "Tokens",
        idUser: Variable.myInfo._id,
        params: { populate: { path: "projectId",  } },
      });
      console.log('=table tokens=',Static.tokens);
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
                {/* main page */}
                <section class="bookmarks main">
                <h2 class="general-title mt-25">Marketplace</h2>
                
                <div class="bookmarks-inner mt-25">
                  
                  {Static.tokens.length ?
                      Static.tokens.map((item) => {
                        return (
                          <div class="bookmarks-item bookmarks-item_token">
                            <div class="user-card">
                              <img
                                class="bookmarks-icon"
                                src={
                                  item.projectId?.icon
                                    ? `/assets/upload/${item.projectId.icon}`
                                    : images["personal/logoProject"]
                                }
                              />
                              <span>{item.projectId?.name}</span>
                            </div>
                            <div class="round">{item.projectId?.tabs}</div>
                            <div class="round">{item.tokens}</div>
                            <div class="price">{item.projectId?.seedRound}$</div>
                            <div class="price">
                              {item.projectId?.have}$/{item.projectId?.target}$
                            </div>

                            <button
                              class="btn btn-transparent"
                              onclick={()=>{
                                if(Variable.myInfo.status == "User"){
                                  fn.modals.Status({});
                                }else{
                                  fn.modals.AddMarket({
                                    project: item.projectId.name,
                                    sumTokens: item.tokens,
                                    projectId: item.projectId._id
                                  });
                                }
                              }}   
                            >
                              send marketplace
                            </button>
                          </div>
                        );
                      }) : 
                      <div class="notFound">
                        <span>Records not found in table</span>
                        <img src={svg.notFound} />
                      </div>
                  }
                </div>
              </section>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
