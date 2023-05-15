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
      Static.itemMarket = [];
      Static.allMarket.forEach((item)=>{
        if(item.projectId._id == Static.item.projectId._id){
          Static.itemMarket.push(item);
        }
      });
      console.log('=964619=', Static.itemMarket)
      Static.activeImg = Static.item.projectId.gallery[0];
      Static.imgPosition = 0;
      Static.currentSlide = 0;
      Static.slideHidden = Static.item.projectId.gallery.length - 4;
      Static.slideHiddenMobile = Static.item.projectId.gallery.length - 1;
      Static.invest;
      Static.investCommission;
      Static.totalInvest;

      
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
                  <span>{Static.item.rank ? Static.item.rank : 0} points</span>
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
                    
                    <div class="card-btns mt-35">
                      <input
                        class="admin-input"
                        placeholder={`min. ${Static.item.seedRound}$`}
                        Element={($el) => {
                          Static.investInput = $el;
                        }}
                        oninput={function () {
                          this.value = this.value.replace(/[^0-9]/g, "");
                          Static.invest = Number(this.value.trim());
                          Static.investCommission = (Static.invest / 100) * 15;
                          Static.totalInvest = Static.invest + Static.investCommission;
                          initReload();
                        }}
                      />
                      <button class="btn btn-black" style="cursor:default;">
                        {Static.totalInvest
                          ? `${Static.totalInvest}$`
                          : `with commission 15%`}
                      </button>
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
                            projectId: Static.item._id,
                            sum: Static.invest,
                          },
                        });
                        
                        Static.item.have += Static.invest;
                        Static.investInput.value = "";
                        Static.invest = "";
                        Static.investCommission = "";
                        Static.totalInvest = "";
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

              {/* <table class="table-m">
                <thead class="table-m-header">
                  <tr class="table-m-item">
                    <th></th>
                    <th>Project</th>
                    <th>Round</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Collect</th>
                    <th>Total</th>
                    <th>BC</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody
                  class="table-m-body"
                  hidden={Static.activeTabM == "all" ? false : true}
                >
                  {Static.records.length ? (
                    Static.records.map((item) => {
                      // console.log("=e46996=", item.projectId.status);
                      // console.log("past", item);
                      return (
                        <tr class="table-m-item">
                          <td class="small-logo">
                            <img
                              src={
                                item.projectId.icon
                                  ? `/assets/upload/${item.projectId.icon}`
                                  : images[`research/logo-duma}`]
                              }
                            />
                          </td>
                          <td>{item.projectId.name}</td>
                          <td>{item.projectId.tabs}</td>
                          <td>{item.projectId.status}</td>
                          <td>{item.projectId.category}</td>
                          <td>
                            {item.projectId.seedRound
                              ? `${item.projectId.seedRound}$`
                              : "—"}
                          </td>
                          <td>
                            {item.priceToken
                              ? `${item.priceToken}$`
                              : "—"}
                          </td>
                          <td>
                            {item.tokens
                              ? `${item.tokens}$`
                              : "—"}
                          </td>
                          <td>
                            <img
                              class="blockchain"
                              src={
                                item.projectId.blockchains?.icon
                                  ? `/assets/upload/${item.projectId.blockchains.icon}`
                                  : svg.binance
                              }
                            />
                          </td>
                          <td>
                            <button 
                              onclick={()=>{
                                fn.siteLink("/marketplace/show/" + item._id);
                              }}
                              class="btn btn-green">
                                MORE INFO
                            </button>
                          </td>
                          <td>
                            <button
                              onclick={()=>{
                                if(Variable.myInfo.status === "User"){
                                  fn.modals.Status({});
                                }
                                fn.siteLink("/researchA/show/" + item.projectId._id);
                              }}
                              class="btn btn-green">
                              RESEARCH
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div class="notFound">
                      <span>Records not found in table</span>
                      <img src={svg.notFound} />
                    </div>
                  )}
                </tbody>
                <tbody
                  class="table-m-body"
                  hidden={Static.activeTabM == "active" ? false : true}
                >
                  {Static.records.length ? (
                    Static.records.map((item) => {
                      // console.log("=e46996=", item.projectId.status);
                      // console.log("past", item);
                      return (
                        <tr class="table-m-item">
                          <td class="small-logo">
                            <img
                              src={
                                item.projectId.icon
                                  ? `/assets/upload/${item.projectId.icon}`
                                  : images[`research/logo-duma}`]
                              }
                            />
                          </td>
                          <td>{item.projectId.name}</td>
                          <td>{item.projectId.tabs}</td>
                          <td>{item.projectId.status}</td>
                          <td>{item.projectId.category}</td>
                          <td>
                            {item.projectId.seedRound
                              ? `${item.projectId.seedRound}$`
                              : "—"}
                          </td>
                          <td>
                            {item.priceToken
                              ? `${item.priceToken}$`
                              : "—"}
                          </td>
                          <td>
                            {item.tokens
                              ? `${item.tokens}$`
                              : "—"}
                          </td>
                          <td>
                            <img
                              class="blockchain"
                              src={
                                item.projectId.blockchains?.icon
                                  ? `/assets/upload/${item.projectId.blockchains.icon}`
                                  : svg.binance
                              }
                            />
                          </td>
                          <td>
                            <button class="btn btn-green">MORE INFO</button>
                          </td>
                          <td>
                            <button class="btn btn-green">RESEARCH</button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div class="notFound">
                      <span>Records not found in table</span>
                      <img src={svg.notFound} />
                    </div>
                  )}
                </tbody>
                <tbody
                  class="table-m-body"
                  hidden={Static.activeTabM == "upcoming" ? false : true}
                >
                  {Static.records.length ? (
                    Static.records.map((item) => {
                      // console.log("=e46996=", item.projectId.status);
                      // console.log("past", item);
                      return (
                        <tr class="table-m-item">
                          <td class="small-logo">
                            <img
                              src={
                                item.projectId.icon
                                  ? `/assets/upload/${item.projectId.icon}`
                                  : images[`research/logo-duma}`]
                              }
                            />
                          </td>
                          <td>{item.projectId.name}</td>
                          <td>{item.projectId.tabs}</td>
                          <td>{item.projectId.status}</td>
                          <td>{item.projectId.category}</td>
                          <td>
                            {item.projectId.seedRound
                              ? `${item.projectId.seedRound}$`
                              : "—"}
                          </td>
                          <td>
                            {item.priceToken
                              ? `${item.priceToken}$`
                              : "—"}
                          </td>
                          <td>
                            {item.tokens
                              ? `${item.tokens}$`
                              : "—"}
                          </td>
                          <td>
                            <img
                              class="blockchain"
                              src={
                                item.projectId.blockchains?.icon
                                  ? `/assets/upload/${item.projectId.blockchains.icon}`
                                  : svg.binance
                              }
                            />
                          </td>
                          <td>
                            <button class="btn btn-green">MORE INFO</button>
                          </td>
                          <td>
                            <button class="btn btn-green">RESEARCH</button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div class="notFound">
                      <span>Records not found in table</span>
                      <img src={svg.notFound} />
                    </div>
                  )}
                </tbody>
                <tbody
                  class="table-m-body"
                  hidden={Static.activeTabM == "past" ? false : true}
                >
                  {Static.records.length ? (
                    Static.records.map((item) => {
                      // console.log("=e46996=", item.projectId.status);
                      // console.log("past", item);
                      return (
                        <tr class="table-m-item">
                          <td class="small-logo">
                            <img
                              src={
                                item.projectId.icon
                                  ? `/assets/upload/${item.projectId.icon}`
                                  : images[`research/logo-duma}`]
                              }
                            />
                          </td>
                          <td>{item.projectId.name}</td>
                          <td>{item.projectId.tabs}</td>
                          <td>{item.projectId.status}</td>
                          <td>{item.projectId.category}</td>
                          <td>
                            {item.projectId.seedRound
                              ? `${item.projectId.seedRound}$`
                              : "—"}
                          </td>
                          <td>
                            {item.priceToken
                              ? `${item.priceToken}$`
                              : "—"}
                          </td>
                          <td>
                            {item.tokens
                              ? `${item.tokens}$`
                              : "—"}
                          </td>
                          <td>
                            <img
                              class="blockchain"
                              src={
                                item.projectId.blockchains?.icon
                                  ? `/assets/upload/${item.projectId.blockchains.icon}`
                                  : svg.binance
                              }
                            />
                          </td>
                          <td>
                            <button class="btn btn-green">MORE INFO</button>
                          </td>
                          <td>
                            <button class="btn btn-green">RESEARCH</button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div class="notFound">
                      <span>Records not found in table</span>
                      <img src={svg.notFound} />
                    </div>
                  )}
                </tbody>

                <div class="btn-block">
                  <button class="btn btn-green">VIEW ALL PROJECTS</button>
                </div>
              </table> */}
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
