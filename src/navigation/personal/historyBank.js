import {
  jsx,
  jsxFrag,
  load,
  Data,
  Variable,
  setStorage,
  getStorage,
  initReload,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.activeTab = "subscribe";
  // if (getStorage("activeTab")) {
  //   Static.activeTab = getStorage("activeTab");
  // }
  Static.history = [];
  load({
    ID,
    fnLoad: async () => {
      if (!Variable.auth || Variable.myInfo._id != "6461b65d179f315ed7fc663e") {
        fn.siteLink("/");
        return;
      }
      Static.history = await fn.socket.get({
        method: "HistoryBank",
        params:{
          filter: { type: "subscribe" },
          populate: { path: "idUser" }
        }
      });
      console.log('=history bank=', Static.history)
    },

    fn: () => {
      if (!Variable.auth || Variable.myInfo._id != "6461b65d179f315ed7fc663e") {
        fn.siteLink("/");
        return <div></div>;
      }
      return (
        <div class="wrapper">
          <div class="personal-inner">
            <Elements.BlockMenu />
            <div class="personal-main">
              <Elements.BlockPersonal />
              <h2 class="general-title mY-25">History operation bank</h2>
              <Elements.Tabs
                class="tabs-h"
                varName={"activeTab"}
                items={[
                  {
                    title: "Subscribe",
                    name: "subscribe",
                    onclick: async ()=>{
                      Static.history = await fn.socket.get({
                        method: "HistoryBank",
                        params: { 
                          filter:  {
                            type: "subscribe"
                          }, 
                          populate: {
                            path: "idUser"
                          }
                        },
                      });
                      initReload();
                    }
                  },
                  {
                    title: "Investing",
                    name: "investing",
                    onclick: async ()=>{
                      Static.history = await fn.socket.get({
                        method: "HistoryBank",
                        params: { 
                          filter:  {
                            type: "investing",
                          },
                          populate: { path: "idUser" }
                        },
                      });
                      initReload();
                    }
                  },
                  {
                    title: "Buy tokens",
                    name: "buy tokens",
                    onclick: async ()=>{
                      Static.history = await fn.socket.get({
                        method: "HistoryBank",
                        params: { 
                          filter:  {
                            type: "buy tokens",
                          },
                          populate: { path: "idUser" }
                        },
                      });
                      initReload();
                    }
                  },
                ]}
              >
                <div class="table" hidden = {Static.activeTab == "subscribe" ? false : true}>
                  <table 
                    class="table-history"
                    style="padding: 0 15px">
                    <thead class="table-pm-header">
                      <tr class="table-history_item table-history_item_subscribe">
                        <th>№</th>
                        <th>User</th>
                        <th>Operation</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Sum</th>
                      </tr>
                    </thead>
                    <tbody class="table-history-body">
                      {
                        Static.history.map((item, index)=>{
                          return(
                            <div class="table-history_item table-history_item_subscribe">
                              <span>{index + 1}</span>
                              <div class="list-news">
                                <span>{item.idUser.firstName}</span>
                                <span>{item.idUser.email}</span>
                              </div>
                              <span class="ttu">{item.type}</span>
                              <span>{fn.getDateFormat(item.date, "time")}</span>
                              <span>{item.comment}</span>
                              <span>{item?.sum ? `${Math.abs(item?.sum)}$` : "—"}</span>
                            </div>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
                
                <div class="table" hidden = {Static.activeTab == "buy tokens" ? false : true}>
                  <table class="table-history">
                    <thead class="table-pm-header">
                      <tr class="table-history_item table-history_item_invest">
                        <th>№</th>
                        <th>User</th>
                        <th>Operation</th>
                        <th>Date</th>
                        <th>Bank</th>
                        <th>Sum</th>
                        <th>Tokens</th>
                        <th>Price token</th>
                        <th>Commission</th>
                      </tr>
                    </thead>
                    <tbody class="table-history-body">
                      {
                        Static.history.map((item, index)=>{
                          return(
                            <div class="table-history_item table-history_item_invest">
                              <span>{index + 1}</span>
                              <div class="list-news">
                                
                                <div>
                                  {item.idUser.firstName}
                                  { item.idUser.ref ? 
                                    <span class="ref ttu ml-10">ref</span> : null
                                  }
                                </div>
                                <span>{item.idUser.email}</span>
                              </div>
                              <span class={["ttu"]}>
                                {item.type}
                              </span>
                              <span>{fn.getDateFormat(item.date, "time")}</span>
                              <span>{item?.balanceBank}$</span>
                              <span>{item?.sum ? `${Math.abs(item?.sum)}$` : "—"}</span>
                              <span>{item?.tokens}</span>
                              <span>{item.priceToken}$</span>
                              {/* <span>{item.commission.toFixed(2)}$</span> */}
                              <span>{item.commission}</span>
                            </div>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>

                <div class="table" hidden = {Static.activeTab == "investing" ? false : true}>
                  <table class="table-history">
                    <thead class="table-pm-header">
                      <tr class="table-history_item table-history_item_invest">
                        <th>№</th>
                        <th>User</th>
                        <th>Operation</th>
                        <th>Date</th>
                        <th>Bank</th>
                        <th>Sum</th>
                        <th>Tokens</th>
                        <th>Price token</th>
                        <th>Commission</th>
                      </tr>
                    </thead>
                    <tbody class="table-history-body">
                      {
                        Static.history.map((item, index)=>{
                          return(
                            <div class="table-history_item table-history_item_invest">
                              <span>{index + 1}</span>
                              <div class="list-news">
                                
                                <div>
                                  {item.idUser.firstName}
                                  { item.idUser.ref ? 
                                    <span class="ref ttu ml-10">ref</span> : null
                                  }
                                </div>
                                <span>{item.idUser.email}</span>
                              </div>
                              <span class={["ttu"]}>
                                {item.type}
                              </span>
                              <span>{fn.getDateFormat(item.date, "time")}</span>
                              <span>{item?.balanceBank}$</span>
                              <span>{item?.sum ? `${Math.abs(item?.sum)}$` : "—"}</span>
                              <span>{item?.tokens}</span>
                              <span>{item.priceToken}$</span>
                              {/* <span>{item.commission.toFixed(2)}$</span> */}
                              <span>{item.commission}</span>
                            </div>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>


              </Elements.Tabs>
              
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
