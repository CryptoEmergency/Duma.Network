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
        
        params: { 
          populate: { path: "projectId" },
          filter:  {
            idUser: Variable.myInfo._id,
          }
        },
      });
      Static.historyTransaction = await fn.socket.get({
        method: "HistoryTransaction",
        // params: { 
        //   populate: { path: "projectId" },
        //   filter:  {
        //     idUser: Variable.myInfo._id,
        //   }
        // },
      });
      console.log('=HistoryTransaction=', Static.historyTransaction)
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
                <section class="main mb-25  ">
                  <h2 class="general-title mt-25">Wallet</h2>
                  <div class="main-blocks mt-20">
                    <div class="blocks-item wallet">
                      <div class="bag-value">
                        <span class="text">Nums</span>
                        <img class="arrow arr-left" src={svg.arrowLeft}></img>
                        <div class="nums">
                          <span class="num_big">{Variable.myInfo.balance.toFixed(2)}$</span>
                          <span class="num_small">+0$</span>
                          <span class="num_small"> +0,00%</span>
                        </div>
                        <img class="arrow arr-right" src={svg.arrowRight}></img>
                      </div>
                      <div class="wallet-btns">
                        <button class="btn btn-white">Invest</button>
                        <button class="btn btn-white">Buy</button>
                        <button class="btn btn-white">Sell</button>
                        <button class="btn btn-white">Input</button>
                        <button class="btn btn-white">Output</button>
                        <button class="btn btn-white">Exchange</button>
                      </div>
                    </div>
                    <div class="blocks-item reward">
                      <div class="reward-inner">
                        <div class="row-block block-title">
                          <span>Reward</span>
                          <span class="text-green">15,530$ (+4,17%)</span>
                        </div>
                        <div class="row-block">
                          <span>Refs</span>
                          <span class="text-green cY">
                            +1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                        <div class="row-block">
                          <span>Tokens that come by distribution</span>
                          <span class="text-green cY">
                            +1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                        <div class="row-block">
                          <span>Passive income</span>
                          <span class="text-green cY">
                            +1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                        <div class="row-block">
                          <span>Staking accruals</span>
                          <span class="text-green cY">
                            +1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                        <div class="row-block">
                          <span>Profit</span>
                          <span class="text-green cY">
                            +1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="blocks-item lock">
                      <div class="reward-inner">
                        <div class="row-block block-title">
                          <span>Lock </span>
                          <span class="text-red">15,530$</span>
                        </div>
                        <div class="row-block">
                          <span>Blocked money in projects</span>
                          <span class="text-red cY">
                            1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                        <div class="row-block">
                          <span>Lock in Staking</span>
                          <span class="text-red cY">
                            1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                        <div class="row-block">
                          <span>Marketplace offers</span>
                          <span class="text-red cY">
                            1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                        <div class="row-block">
                          <span>Orders on the platform</span>
                          <span class="text-red cY">
                            1,500$
                            <img class="icon-points" src={svg.points}></img>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="blocks-item news" style="height: 400px;">
                      <span class="text-category text">Tokens</span>
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
                                <div class="price">{item.tokens}</div>
                                <div class="price">{item.projectId.seedRound}$</div>
                                <div>{item.projectId?.have}$/{item.projectId?.target}$</div>
                                {/* <div class="text-underline">lead investor</div> */}
                                {/* <div>{item.projectId?.category}</div> */}
                                <button
                                  onclick={(e)=>{
                                    fn.siteLink("/research/show/" + item.projectId._id);
                                  }}   
                                  class="btn btn-transparent">
                                    more
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

                    </div>
                    <div class="blocks-item history" style="height: 400px;">
                      <span class="text-category text">History Transaction</span>
                      <div class="bookmarks-inner mt-25">
                  
                        {Static.historyTransaction.length ?
                          Static.historyTransaction.map((item) => {
                            return (
                              <div class="bookmarks-item bookmarks-item_token">
                                {/* <div class="user-card">
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
                                <div class="price">{item.tokens}</div>
                                <div class="price">{item.projectId.seedRound}$</div>
                                <div>{item.projectId?.have}$/{item.projectId?.target}$</div>
                                <button
                                  onclick={(e)=>{
                                    fn.siteLink("/research/show/" + item.projectId._id);
                                  }}   
                                  class="btn btn-transparent">
                                    more
                                </button> */}
                                <span 
                                  class={["ttu", "bold", 
                                  item.type == "deposit" ? "text-green" : "text-red"
                                ]}
                                >
                                  {item.type}
                                </span>
                                <span>{item.date}</span>
                                <span>{item.sum}$</span>
                                
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
