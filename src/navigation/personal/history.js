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
  Static.activeTab = "transaction";
  Static.history = [];
  load({
    ID,
    fnLoad: async () => {
      if (!Variable.auth) {
        fn.siteLink("/");
        return;
      }
      Static.history = await fn.socket.get({
        method: "HistoryTransaction",
        params: { 
          filter:  {
            idUser: Variable.myInfo._id,
          }
        },
      });
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
              <Elements.Tabs
                class="tabs-h"
                varName={"activeTab"}
                items={[
                  {
                    title: "Transaction",
                    name: "transaction",
                    onclick: async ()=>{
                      Static.history = await fn.socket.get({
                        method: "HistoryTransaction",
                        params: { 
                          filter:  {
                            idUser: Variable.myInfo._id,
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
                        method: "HistoryMarketplace",
                        params: { 
                          filter:  {
                            idUser: Variable.myInfo._id,
                            type: "investing"
                          },
                          populate: {
                            path: "projectId"
                          }
                        },
                      });
                      console.log('=0660e5=', Static.history)
                      initReload();
                    }
                  },
                  {
                    title: "Sale tokens",
                    name: "sale tokens",
                    onclick: async ()=>{
                      Static.history = await fn.socket.get({
                        method: "HistoryMarketplace",
                        params: { 
                          filter:  {
                            idUser: Variable.myInfo._id,
                            type: "sale tokens"
                          },
                          populate: { path: "projectId" }
                        },
                      });
                      initReload();
                    }
                  },
                  {
                    title: "Withdraw tokens",
                    name: "withdraw tokens",
                    onclick: async ()=>{
                      Static.history = await fn.socket.get({
                        method: "HistoryMarketplace",
                        params: { 
                          filter:  {
                            idUser: Variable.myInfo._id,
                            type: "withdraw tokens"
                          },
                          populate: { path: "projectId" }
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
                        method: "HistoryMarketplace",
                        params: { 
                          filter:  {
                            idUser: Variable.myInfo._id,
                            type: "buy tokens"
                          },
                          populate: { path: "projectId" }
                        },
                      });
                      initReload();
                    }
                  },
                ]}
              >
                
                <table 
                  class="table-history"
                  hidden = {Static.activeTab == "transaction" ? false : true}
                >
                  <thead class="table-pm-header">
                    <tr class="table-history_item table-history_item_transaction">
                      <th>№</th>
                      <th>Operation</th>
                      <th>Date</th>
                      <th>Sum</th>
                    </tr>
                  </thead>
                  <tbody class="table-history-body">
                    {
                      Static.history.map((item, index)=>{
                        return(
                          <div class="table-history_item table-history_item_transaction">
                            <span>{index + 1}</span>
                            <span 
                              class={["ttu", 
                              item.type == "withdraw" ? "text-red" 
                              : item.type == "deposit" ? "text-green" : null
                              ]}
                            >
                              {item.type}
                            </span>
                            {/* <span>{item.date}</span> */}
                            <span>{fn.getDateFormat(item.date, "time")}</span>
                            <span>{item?.sum ? `${Math.abs(item?.sum)}$` : "—"}</span>
                          </div>
                        )
                      })
                    }
                  </tbody>
                </table>
                <table 
                  class="table-history"
                  hidden = {Static.activeTab == "investing" ? false : true}
                >
                  <thead class="table-pm-header">
                    <tr class="table-history_item table-history_item_invest-user">
                      <th>№</th>
                      <th>Operation</th>
                      <th>Date</th>
                      <th>Sum</th>
                      <th>Tokens</th>
                      <th>Project</th>
                    </tr>
                  </thead>
                  <tbody class="table-history-body table-pm-body bookmarks-inner">
                    {
                      Static.history.map((item, index)=>{
                        return(
                          <div class="table-history_item table-history_item_invest-user">
                            <span>{index + 1}</span>
                            <span 
                              class={["ttu", 
                              item.type == "withdraw" ? "text-red" 
                              : item.type == "deposit" ? "text-green" : null
                              ]}
                            >
                              {item.type}
                            </span>
                            {/* <span>{item.date}</span> */}
                            <span>{fn.getDateFormat(item.date, "time")}</span>
                            <span>{item?.sum ? `${Math.abs(item?.sum)}$` : "—"}</span>
                            <span>{item?.tokens}</span>
                            <span>{item.projectId?.name}</span>
                          </div>
                        )
                      })
                    }
                  </tbody>
                </table>
                <table 
                  class="table-history"
                  hidden = {Static.activeTab == "sale tokens" ? false : true}
                >
                  <thead class="table-pm-header">
                    <tr class="table-history_item table-history_item_invest-user">
                      <th>№</th>
                      <th>Operation</th>
                      <th>Date</th>
                      <th>Sum</th>
                      <th>Tokens</th>
                      <th>Project</th>
                    </tr>
                  </thead>
                  <tbody class="table-history-body">
                    {
                      Static.history.map((item, index)=>{
                        return(
                          <div class="table-history_item table-history_item_invest-user">
                            <span>{index + 1}</span>
                            <span 
                              class={["ttu"]}
                            >
                              {item.type}
                            </span>
                            {/* <span>{item.date}</span> */}
                            <span>{fn.getDateFormat(item.date, "time")}</span>
                            <span>{item?.sum ? `${Math.abs(item?.sum)}$` : "—"}</span>
                            <span>{item?.tokens}</span>
                            <span>{item.projectId?.name}</span>
                          </div>
                        )
                      })
                    }
                  </tbody>
                </table>
                <table 
                  class="table-history"
                  hidden = {Static.activeTab == "withdraw tokens" ? false : true}
                >
                  <thead class="table-pm-header">
                    <tr class="table-history_item table-history_item_invest-user">
                      <th>№</th>
                      <th>Operation</th>
                      <th>Date</th>
                      <th>Sum</th>
                      <th>Tokens</th>
                      <th>Project</th>
                    </tr>
                  </thead>
                  <tbody class="table-history-body">
                    {
                      Static.history.map((item, index)=>{
                        return(
                          <div class="table-history_item table-history_item_invest-user">
                            <span>{index + 1}</span>
                            <span 
                              class={["ttu", 
                              item.type == "withdraw" ? "text-red" 
                              : item.type == "deposit" ? "text-green" : null
                              ]}
                            >
                              {item.type}
                            </span>
                            {/* <span>{item.date}</span> */}
                            <span>{fn.getDateFormat(item.date, "time")}</span>
                            <span>{item?.sum ? `${Math.abs(item?.sum)}$` : "—"}</span>
                            <span>{item?.tokens}</span>
                            <span>{item.projectId?.name}</span>
                          </div>
                        )
                      })
                    }
                  </tbody>
                </table>
                <table 
                  class="table-history"
                  hidden = {Static.activeTab == "buy tokens" ? false : true}
                >
                  <thead class="table-pm-header">
                    <tr class="table-history_item table-history_item_invest-user">
                      <th>№</th>
                      <th>Operation</th>
                      <th>Date</th>
                      <th>Sum</th>
                      <th>Tokens</th>
                      <th>Project</th>
                    </tr>
                  </thead>
                  <tbody class="table-history-body">
                    {
                      Static.history.map((item, index)=>{
                        return(
                          <div class="table-history_item table-history_item_invest-user">
                            <span>{index + 1}</span>
                            <span 
                              class={["ttu", 
                              item.type == "withdraw" ? "text-red" 
                              : item.type == "deposit" ? "text-green" : null
                              ]}
                            >
                              {item.type}
                            </span>
                            {/* <span>{item.date}</span> */}
                            <span>{fn.getDateFormat(item.date, "time")}</span>
                            <span>{item?.sum ? `${Math.abs(item?.sum)}$` : "—"}</span>
                            <span>{item?.tokens}</span>
                            <span>{item.projectId?.name}</span>
                          </div>
                        )
                      })
                    }
                  </tbody>
                </table>
              </Elements.Tabs>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
