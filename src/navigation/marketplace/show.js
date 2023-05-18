import {
  jsx,
  jsxFrag,
  load,
  Data,
  Variable,
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
      if (Variable.dataUrl.params) {
        Static.item = await fn.socket.get({
          method: "MarketUser",
          _id: Variable.dataUrl.params,
          params: { populate: { path: "projectId author" } },
        });
      }
      console.log('=Item=',Static.item)

      Static.allMarket = await fn.socket.get({
        method: "MarketUser",
        // _id: Variable.dataUrl.params,
        // projectId._id: ,
        // "projectId._id":  Static.item.projectId._id,
        params: { 
          // filter: { "projectId._id":  Static.item.projectId._id},
          populate: { 
            path: "projectId author" 
          } 
        },
      });
      Static.itemsMarket = [];
      Static.allMarket.forEach((item)=>{
        if(item.projectId._id == Static.item.projectId._id){
          Static.itemsMarket.push(item);
        }
      });
      console.log('=3256bd=', Static.itemsMarket)
      Static.activeImg = Static.item.projectId.gallery[0];
      Static.imgPosition = 0;
      Static.currentSlide = 0;
      Static.slideHidden = Static.item.projectId.gallery.length - 4;
      Static.slideHiddenMobile = Static.item.projectId.gallery.length - 1;
      Static.invest;
      Static.investCommission;
      Static.totalInvest;
      Static.countToken;
    },
    fn: () => {
      // console.log("=0e0048=", Static.item);
      if (!Static.item || !Static.item._id) {
        return <div>Not found</div>;
      }
      return (
        <div class="back-secondary">
          <div class="wrapper">
            <div class="main-inner">
              <Elements.Bredcrumbs
                items={[
                  { title: "Marketplace", link: "/marketplace" },
                  { title: Static.item.projectId.name },
                ]}
              />
              <section class="card-project" id="cardProject">
                <div class="project-name">
                  <div class="company">
                    <img
                      src={
                        Static.item.projectId.icon
                          ? `/assets/upload/${Static.item.projectId.icon}`
                          : images[`research/logo-duma}`]
                      }
                    ></img>
                    <h2 class="company-title">{Static.item.projectId.name}</h2>
                  </div>
                  <div class="statuses">
                    <div class="icon">
                      <img
                        class="blockchain"
                        src={
                          Static.item.projectId?.blockchains?.icon
                            ? `/assets/upload/${Static.item.projectId.blockchains.icon}`
                            : svg.binance
                        }
                      />
                    </div>
                    <div class="status">{Static.item.status}</div>
                    <div class="ecosystem">{Static.item.projectId.category}</div>
                  </div>
                </div>
                <Elements.Gallery
                  items={Static.item.projectId.gallery}
                ></Elements.Gallery>
                <div class="project-rang" style="position: relative;">
                  <span>{`${Static.item.projectId.have}$ / ${Static.item.projectId.amount}$`}</span>
                  <span class="rang">
                    {
                      Static.item.rank < 50 ? "low rank" : 
                      (Static.item.rank >= 50 && Static.item.rank < 100) ? " medium rank" :
                      (Static.item.rank >= 100) ? "high rank" : null
                    }
                  </span>
                  <div class="user-card mb-15 research-user">
                    <div class="user-picture mr-15">
                      <img src={Static.item.author?.icon ? 
                        `/assets/upload/${Static.item.author?.icon}` : svg.user} />
                      <div class="user-status">
                        {Static.item.author?.status}
                      </div>
                    </div>
                    <div class="user-info">
                      <span class="text-green">Author</span>
                      <div class="user-name">{Static.item.author?.firstName}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="about-project">
                    <div
                      class="info-bell"
                      onclick={async () => {
                        await fn.socket.set({
                          method: "Bookmarks",
                          action: "findOneAndUpdate",
                          params: {
                            update: { active: !Static.item.bookmarks },
                            filter: {
                              projectId: Static.item._id,
                              author: Variable.myInfo._id,
                            },
                          },
                        });
                        Static.item.bookmarks = !Static.item.bookmarks;
                        initReload();
                      }}
                    >
                      {Static.item.projectId.bookmarks ? (
                        <img src={svg.bellGreen} class="bell" />
                      ) : (
                        <img src={svg.bellWhite} class="bell" />
                      )}
                    </div>
                    <div class="grid-2">
                      <div class="card-text">
                        <span class="ttu line-green">Available</span>
                        {Variable.myInfo.balance.toFixed(2)}$
                      </div>
                      <span class="rang">{Static.item.tokens} tokens</span>
                    </div>
                    

                    <div class="card-text">
                      <span class="ttu line-green">Price per token</span>
                      {Static.item.priceToken}$
                    </div>

                    <div class="card-btns mY-15">
                      <div class="input-notation">
                        <div class="input-prefix">
                           <label for="quantity">Quantity</label>
                        </div>
                        <input
                          id="quantity"
                          class="input"
                          Element={($el) => {
                            Static.investInput = $el;
                          }}
                          oninput={function () {
                            this.value = this.value.replace(/[^0-9]/g, "");
                            Static.invest = Number(this.value.trim());
                            Static.investCommission = (Static.invest / 100) * 15;
                            Static.totalInvest = Static.invest + Static.investCommission;
                            Static.countToken = (Static.invest / Static.item.priceToken);
                            initReload();
                          }}
                        />
                        <div class="input-suffix">$</div>
                      </div>
                      <button class="btn btn-black" style="cursor:default;">
                        {Static.totalInvest
                          ? `${Static.totalInvest}$`
                          : `with commission 15%`}
                      </button>
                    </div>
                    <div class="card-text">
                      <span class="ttu line-green">Get project tokens</span>
                      {Static?.countToken ? Static?.countToken : 0}
                    </div>
                    <button
                      class={[
                        "btn",
                        "btn-green",
                        "mt-10",
                        Static.totalInvest &&
                        Static.totalInvest < Variable.myInfo.balance
                          ? null
                          : "btn-disabled",
                      ]}
                      onclick={async function () {
                        if (!Variable.auth) {
                          fn.modals.Login({});
                          return;
                        }
                        if (
                          Variable.myInfo.balance < Static.invest ||
                          typeof(Static.invest) === "undefined"
                        ) {
                          fn.modals.Transaction({
                            title: "Deposit",
                            text: "Replenishment amount",
                            type: "deposit",
                          });
                          return;
                        }
                        if (Static.totalInvest > Variable.myInfo.balance) {
                          fn.modals.Transaction({
                            title: "Deposit",
                            text: "Replenishment amount",
                            type: "deposit",
                          });
                          return;
                        }
                        await fn.socket.send({
                          method: "Invest",
                          params: {
                            projectId: Static.item.projectId._id,
                            sum: Static.invest,
                            id: Variable.dataUrl.params,
                          },
                        });
                        
                        Static.item.have += Static.invest;
                        Static.investInput.value = "";
                        Static.invest = "";
                        Static.investCommission = "";
                        Static.totalInvest = "";
                        Static.countToken = "";
                        fn.modals.Success({
                          title: `You have successfully invested in the project ${Static.item.name}`
                        })
                        initReload();
                      }}
                    >
                      BECOME OUR PARTNER
                    </button>
                    
                    

                   

                 
                  </div>
                </div>
              </section>

              <section class="scheme-cards mY-15">
                {Static.itemsMarket.map((item, index)=>{
                  return(
                    <div>
                      {item.author._id == '6461b5b1179f315ed7fc65ce' ?
                        null :
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
                                <span>Price per token: {item.priceToken}</span>

                                <span>Tokens: {item.tokens}</span>
                                
                              </div>

                              <button 
                                class="btn btn-green"
                                onclick={()=>{
                                  fn.modals.BuyTokens({
                                    // title: 
                                    projectId: item.projectId._id,
                                    id: item._id
                                  })
                                }}
                              >
                                Buy tokens
                              </button>

                              <div class="user-card mb-15 research-user">
                                <div class="user-picture mr-15">
                                  <img src={item.author?.icon ? 
                                    `/assets/upload/${item.author?.icon}` : svg.user} />
                                  <div class="user-status">
                                    {item.author?.status}
                                  </div>
                                </div>
                                <div class="user-info">
                                  <span class="text-green">Author</span>
                                  <div class="user-name">{item.author?.firstName}</div>
                                </div>
                              </div>
                            </div>
                            
                            
                            

                          
                          </div>
                        </div>
                      }
                    </div>
                    
                  )
                })}
                
              </section>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
