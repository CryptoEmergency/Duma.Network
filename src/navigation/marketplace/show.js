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

const showError = function (text) {
  Data.MStatic.elError.style.display = "block";
  Data.MStatic.elError.innerHTML = text;
  setTimeout(() => {
    Data.MStatic.elError.style.display = "none";
  }, 5000);
};

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fnLoad: async () => {
      if (Variable.dataUrl.params) {
        Static.item = await fn.socket.get({
          method: "MarketUser",
          _id: Variable.dataUrl.params,
          params: { 
            populate: [{ 
              path: "author"
            },
            { 
              path: "projectId",
              populate: {
                path: "owner"
              }  
            }
          ]
          },
        });
      }
      Static.allMarket = await fn.socket.get({
        method: "MarketUser",
        params: { 
          filter: { projectId: Static.item.projectId._id },
          populate: { 
            path: "projectId author" 
          } 
        },
      });
      console.log('=6506e4=', Static.allMarket)
      Static.itemsMarket = [];
      // Static.allMarket.forEach((item)=>{
      //   if(item.projectId._id == Static.item.projectId._id){
      //     Static.itemsMarket.push(item);
      //   }
      // });
      Static.allMarket.forEach((item)=>{
        if(item.tokens != 0){
          Static.itemsMarket.push(item);
        }
      });
      Static.activeImg = Static.item.projectId.gallery[0];
      Static.imgPosition = 0;
      Static.currentSlide = 0;
      Static.slideHidden = Static.item.projectId.gallery.length - 4;
      Static.slideHiddenMobile = Static.item.projectId.gallery.length - 1;
      Static.invest = "";
      Static.investCommission = "";
      Static.totalInvest = "";
      Static.countToken = "";
      Static.acceptedInvest = Static.item.projectId.amount - Static.item.projectId.have;
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
                      <img src={Static.item.projectId.owner?.icon ? 
                        `/assets/upload/${Static.item.projectId.owner?.icon}` : svg.user} />
                      <div class="user-status">
                        {Static.item.projectId.owner?.status}
                      </div>
                    </div>
                    <div class="user-info">
                      <span class="text-green">Owner</span>
                      <div class="user-name">{Static.item.projectId.owner?.firstName}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="about-project">
                    <div
                      Element={($el) => {
                        Static.elError = $el;
                      }}
                      style="display:none;"
                      class="error-text"
                    ></div>
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
                        {/* {Variable.myInfo.balance.toFixed(2)}$ */}
                        {Variable.myInfo.balance}$
                      </div>
                      <span class="rang">{Static.item.tokens} tokens</span>
                    </div>
                    

                    <div class="card-text">
                      <span class="ttu line-green">Price per token</span>
                      {Static.item.priceToken}$
                    </div>
                    {
                      Static.item.projectId.have === Static.item.projectId.amount ? 
                      <div class="project-rang">
                        <span class="ttu mr-10">{Static.item.projectId.round}</span> the round is over
                      </div> : 
                      <div>
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
                                
                                let value = this.value.replace(/[^0-9]/g, "");
                                if(value < 0 ){
                                  this.value = 0;
                                }else if(value > Static.acceptedInvest){
                                  this.value = Static.acceptedInvest;
                                }else{
                                  this.value = value;
                                }
                                Static.invest = Number(this.value.trim());
                                Static.investCommission = (Static.invest / 100) * 15;
                                Static.totalInvest = Static.invest + Static.investCommission;
                                Static.countToken = (Static.invest / Static.item.priceToken);
                                initReload();
                              }}
                            >{Static.invest}</input>
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
                            this.disabled = true;
                            if (!Variable.auth) {
                              fn.modals.Login({});
                              return;
                            }
                            if(Static.invest < 10){
                              fn.modals.Moderator({
                                text: "The allowed investment amount is $10"
                              })
                              return
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
                            let response = await fn.socket.send({
                              method: "Invest",
                              params: {
                                projectId: Static.item.projectId._id,
                                sum: Static.invest,
                                id: Variable.dataUrl.params,
                              },
                            });
                            
                            if (response.error) {
                              // showError(response.error[1]);
                              showError(`Maximum amount of tokens ${Static.item.projectId.tokens}`)
                              this.disabled = false;
                              return;
                            }

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
                    }
                    
                    
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
                              {
                                item.author._id == Variable.myInfo._id ? 
                                null : 
                                <button 
                                  class="btn btn-green"
                                  onclick={()=>{
                                    fn.modals.BuyTokens({
                                      projectId: item.projectId._id,
                                      id: item._id
                                    })
                                  }}
                                >
                                  Buy tokens
                                </button>
                              }
                              

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
