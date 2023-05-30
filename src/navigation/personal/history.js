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
  if (getStorage("activeTab")) {
    Static.activeTab = getStorage("activeTab");
  }
  Static.history = [];
  load({
    ID,
    fnLoad: async () => {
      if (!Variable.auth) {
        fn.siteLink("/");
        return;
      }
      // Static.historyTransaction = await fn.socket.get({
      //   method: "HistoryTransaction",
      //   params: { 
      //     filter:  {
      //       idUser: Variable.myInfo._id,
      //     }
      //   },
      // });
      // Static.historyMarketplace = await fn.socket.get({
      //   method: "HistoryMarketplace",
      //   params: { 
      //     filter:  {
      //       idUser: Variable.myInfo._id,
      //     }
      //   },
      // });
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
                    title: "Marketplace",
                    name: "marketplace",
                    onclick: async ()=>{
                      Static.history = await fn.socket.get({
                        method: "HistoryMarketplace",
                        params: { 
                          filter:  {
                            idUser: Variable.myInfo._id,
                          }
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
                      {/* <th></th> */}
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
                  hidden = {Static.activeTab == "marketplace" ? false : true}
                >
                  <thead class="table-pm-header">
                    <tr class="table-history_item">
                      {/* <th></th> */}
                      <th>Operation</th>
                      <th>Date</th>
                      <th>Sum</th>
                      <th>Tokens</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody class="table-history-body table-pm-body bookmarks-inner">
                    {
                      Static.history.map((item, index)=>{
                        return(
                          <div class="table-history_item">
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
