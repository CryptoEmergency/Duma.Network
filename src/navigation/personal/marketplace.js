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
        // idUser: Variable.myInfo._id,
        params: { 
          populate: { 
            path: "projectId",  
          },
          filter: { idUser: Variable.myInfo._id } 
        },
      });
      Static.market = await fn.socket.get({
        method: "MarketUser", 
        params: {
          populate: {
            path: "projectId author",
          },
          filter: { author: Variable.myInfo._id } 
        }
      })
      console.log('=9e5e3f=', Static.market)

      Static.marketAll = await fn.socket.get({
        method: "MarketUser", 
        params: {
          populate: {
            path: "projectId author",
          },
        }
      })
      Static.myMarketOwner = [];
      Static.marketAll.forEach((item)=>{
        if(item.projectId.owner == Variable.myInfo._id){
          Static.myMarketOwner.push(item)

        }
      })
      console.log('=my market owner=', Static.myMarketOwner);
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
                <h2 class="general-title mt-25">Invested projects</h2>
                
                <div class={["bookmarks-inner", "mt-25", Static.tokens.length ? null : "list-notFound"]}>
                  
                  {Static.tokens.length != 0 ?
                      Static.tokens.map((item) => {
                        return (
                          <div class="bookmarks-item bookmarks-item_invested">
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
                            <div class="round">{item.projectId?.round}</div>
                            <div class="round">{item.tokens}</div>
                            {/* <div class="price"></div> */}
                            <div class="price">
                              {item.projectId?.have}$/{item.projectId?.amount}$
                            </div>

                            {item.tokens == 0 ?
                              null : 
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
                            }

                            
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
              <section class="market main"> 
                <h2 class="general-title mt-25">Listed projects for sale in the marketplace</h2>
                <div class="bookmarks-inner mt-25">
                  
                  {
                    Static.myMarketOwner.map((item) => {
                      return (
                        <div class="bookmarks-item bookmarks-item_token">
                          {
                            item.projectId.owner ? 
                            <img
                              class="icon-status"
                              src={svg.owner}
                            /> : null
                          }
                          
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
                          <div class="round">{item.projectId?.round}</div>
                          <div class="round">{item.tokens}</div>
                          <div class="price">{item.priceToken}$</div>
                          <div class="price">
                            {item.projectId?.have}$/{item.projectId?.amount}$
                          </div>

                          <div>Sum:{item.tokens * item.priceToken}$</div>
                        </div>
                      );
                    }) 
                  }

                  
                </div>
                <div class="bookmarks-inner mt-25">
                {Static.market.length != 0 ?
                  Static.market.map((item) => {
                    return (
                      <div class="bookmarks-item bookmarks-item_token">
                        {
                          item.projectId.owner == Variable.myInfo._id ? 
                          <img
                            class="icon-status"
                            src={svg.owner}
                          /> : null
                        }
                        
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
                        <div class="round">{item.projectId?.round}</div>
                        <div class="round">{item.tokens}</div>
                        <div class="price">{item.priceToken}$</div>
                        <div class="price">
                          {item.projectId?.have}$/{item.projectId?.amount}$
                        </div>

                        <div>Sum:{item.tokens * item.priceToken}$</div>
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
