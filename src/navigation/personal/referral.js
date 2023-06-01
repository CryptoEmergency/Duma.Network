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

// const countTotalSum = function(item, infoRef){
//   // console.log('=2c31cd=',infoRef)
//   let total = 0;

//   infoRef.forEach((el)=>{
//     if(item._id == el.idUser._id){
//       total += el.sum;
//     }
//   })
//   // console.log('=b9b809=',countInvestRef)
//   return total;
// }

// const countTotalProjects = function(item, infoRef){
//   let totalProjects = 0;
//   console.log('=9d6d13=',item)

//   infoRef.forEach((el)=>{
//     console.log('=486778=',el)
//     if(item._id == el.idUser._id){
//       total += el.sum;

//     }
//   })
//   return totalProjects
// }


const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.activeQuestion = {};
  load({
    ID,
    fnLoad: async () => {
      if (!Variable.auth) {
        fn.siteLink("/");
        return;
      }
      Static.myUserInfo = await fn.socket.get({
        method: "Users",
        params: { filter: { _id: Variable.myInfo._id } },
      });  
      Static.myRef = await fn.socket.get({
        method: "HistoryReferral",
        params: {
          filter: { ref: Variable.myInfo._id },
          populate: { path: "idUser" },
          // limit: 5,
        },
      });
      Static.myRefInvest = [];
      Static.myRef.forEach((item)=>{
        if(item.refSum != 0){
          Static.myRefInvest.push(item);
        }
      })

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
              <div class="circle-effect circle-effect1"></div>
              <div class="circle-effect circle-effect2"></div>
              <Elements.BlockPersonal />
              <div class="personal-content">
                {/* main page */}
                <section class="main mb-25  ">
                  <h2 class="general-title mt-25">Referral</h2>
                  <div class="main-blocks referral mt-20">
                    <div class="blocks-item">                     
                      <span class="text-category text">Referral data</span>
                      <div class="referral-invite">
                        
                        <div class="row-block mb-10">
                          <span>ID</span>
                          <div class="cY">
                            <span 
                              class="ref-link"
                              Element={($el)=>{
                                Static.copyId = $el;
                              }}
                            >{Variable.myInfo._id}</span>
                            <div class="copy-link">
                              <img 
                                class="ml-10" 
                                src={svg.copy}
                                onclick={function(){
                                  window.navigator.clipboard.writeText(Static.copyId.textContent)
                                  Static.copySuccessId.hidden = false;
                                  setTimeout(()=>{
                                    Static.copySuccessId.hidden = true
                                  }, 1000)
                                  initReload();
                                }}
                              />
                              <div
                                class="copy-success"
                                hidden={true}
                                Element={($el)=>{
                                  Static.copySuccessId = $el;
                                }}
                              >
                                Successfully copied
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row-block">
                          <span>Link</span>
                          <div class="cY">
                            <span 
                              class="ref-link"
                              Element={($el)=>{
                                Static.copyRefLink = $el;
                              }}
                            >
                              https://duma.network/ref/{Variable.myInfo._id}
                            </span>
                            <div class="copy-link">
                              <img 
                                class="ml-10" 
                                src={svg.copy}
                                onclick={function(){
                                  window.navigator.clipboard.writeText(Static.copyRefLink.textContent)
                                  Static.copySuccessLink.hidden = false;
                                  setTimeout(()=>{
                                    Static.copySuccessLink.hidden = true
                                  }, 1000)
                                  initReload();
                                }}
                              />
                              <div
                                class="copy-success"
                                hidden={true}
                                Element={($el)=>{
                                  Static.copySuccessLink = $el;
                                }}
                              >
                                Successfully copied
                              </div>
                            </div>
                            
                          </div>
                        </div>
                        <button class="btn btn-white mY-10">
                          invite friends
                        </button>
                        <span class="text">Link to the description</span>
                        
                        
                      </div>

                    </div>
                    <div class="blocks-item">
                      <Elements.Question 
                        textClue="Graphic display of referral accruals." 
                        switcher={Static.activeQuestion} 
                        key="r2" 
                      />
                      <span class="text-category text">
                        Graphical PNL
                      </span>
                    </div>
                    <div class="blocks-item">
                      <Elements.Question 
                        textClue="Referral Earnings block for users actively developing the platform and having an audience. In the block, you can find information about each investor, the number of projects they invested in, and the amount they invested." 
                        switcher={Static.activeQuestion} 
                        key="r3" 
                      />
                      <span class="text-category text">Referral accruals</span>
                      <div class="grid-3 pY-20">
                        <div>
                          <div class="nums-col">
                            <span class="num_big">{Static.myUserInfo[0].balanceRef.toFixed(2)}$</span>
                            <span class="num_small">+0$</span>
                            <span class="num_small"> +0,00%</span>
                          </div>
                          <button class="btn btn-white mt-15">more</button>
                        </div>
                        <div class="grid-2">
                          <div class="ref-general">
                            <span class="num_big">{Static.myRef.length}</span>
                            <span class="text">Total refferals</span>
                          </div>
                          <div class="ref-general">
                            <span class="num_big">
                              {Static.myRefInvest.length}
                              
                            </span>
                            <span class="text">Confirmed</span>
                          </div>
                        </div>
                        
                        {/* <img src={images["personal/circleGraph"]}></img> */}
                        <div class="canvas">
                          <svg class="chart" width="150" height="150" viewBox="0 0 40 40">
                            <circle class="unit" r="15.9" cx="50%" cy="50%"></circle>
                            <circle class="unit" r="15.9" cx="50%" cy="50%"></circle>
                            <circle class="unit" r="15.9" cx="50%" cy="50%"></circle>
                          </svg>
                        </div>
                      </div>
                      { 
                        Static.myRefInvest.length ? 
                        <div class="block-table">
                          <div class="block-table_row subtitle">
                            <span>№</span>
                            <span>E-mail</span>
                            <span>Invest total</span>
                            <span>Referral</span>
                          </div>
                          {
                            Static.myRefInvest.map((item, index)=>{
                              return(
                                <div class="block-table_row">
                                  <span>{index + 1}</span>
                                  <span>
                                    {item.idUser.email}
                                  </span>
                                  <span>{item?.invest}</span>
                                  <span>{item?.refSum.toFixed(2)}$</span>
                                </div>
                              )
                            })
                          }
                        </div> : null
                      }
                      
                    </div>
                    <div class="blocks-item platform">
                      <div class="blur">
                        <h2>coming soon</h2>
                      </div>
                      <span class="text-category text">
                        Closed sections of the platform that can be opened for
                        referral accruals
                      </span>
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
