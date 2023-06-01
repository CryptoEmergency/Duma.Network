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
  Static.activeTab = "stay owner";
  Static.historyProjects = [];
  load({
    ID,
    fnLoad: async () => {
      if (!Variable.auth) {
        fn.siteLink("/");
        return;
      }
      Static.historyProjects = await fn.socket.get({
        method: "HistoryOwner",
        params: { 
          filter:  {
            idUser: Variable.myInfo._id,
            type: "owner"
          },
          populate: { path: "projectId" }
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
              <h2 class="general-title mY-25">My projects</h2>
              <Elements.Tabs
                class="tabs-h"
                varName={"activeTab"}
                items={[
                  {
                    title: "Stay owner",
                    name: "stay owner",
                    onclick: async ()=>{
                      Static.historyProjects = await fn.socket.get({
                        method: "HistoryOwner",
                        params: { 
                          filter:  {
                            idUser: Variable.myInfo._id,
                            type: "owner"
                          },
                          populate: { path: "projectId" }
                        },
                      });
                      initReload();
                    }
                  },
                  {
                    title: "Get tokens",
                    name: "get tokens",
                    onclick: async ()=>{
                      Static.historyProjects = await fn.socket.get({
                        method: "HistoryOwner",
                        params: { 
                          filter:  {
                            idUser: Variable.myInfo._id,
                            type: "get tokens"
                          },
                          populate: { path: "projectId" }
                        },
                      });
                      initReload();
                    }
                  },
                  {
                    title: "Investing",
                    name: "investing",
                    onclick: async ()=>{
                      Static.historyProjects = await fn.socket.get({
                        method: "HistoryOwner",
                        params: { 
                          filter:  {
                            idUser: Variable.myInfo._id,
                            type: "investing"
                          },
                          populate: { path: "projectId" }
                        },
                      });
                      initReload();
                    }
                  },
                  {
                    title: "Sale",
                    name: "sale",
                    onclick: async ()=>{
                      Static.historyProjects = await fn.socket.get({
                        method: "HistoryOwner",
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
                    title: "Buy",
                    name: "buy",
                    onclick: async ()=>{
                      Static.historyProjects = await fn.socket.get({
                        method: "HistoryOwner",
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
                  {
                    title: "Withdraw",
                    name: "withdraw",
                    onclick: async ()=>{
                      Static.historyProjects = await fn.socket.get({
                        method: "HistoryOwner",
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
                ]}
              >
                
                <table 
                  class="table-history"
                  hidden = {Static.activeTab == "stay owner" ? false : true}
                >
                  <thead class="table-pm-header">
                    <tr class="table-history_item table-history_item_transaction">
                      <th>№</th>
                      <th>Operation</th>
                      <th>Date</th>
                      <th>Project</th>
                    </tr>
                  </thead>
                  <tbody class="table-history-body">
                    {
                      Static.historyProjects.map((item, index)=>{
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
                            <span>{item.projectId?.name}</span>
                          </div>
                        )
                      })
                    }
                  </tbody>
                </table>
                <table 
                  class="table-history"
                  hidden = {Static.activeTab == "get tokens" ? false : true}
                >
                  <thead class="table-pm-header">
                    <tr class="table-history_item table-history_item_invest-user">
                      <th>№</th>
                      <th>Operation</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Tokens</th>
                      <th>Project</th>
                    </tr>
                  </thead>
                  <tbody class="table-history-body table-pm-body bookmarks-inner">
                    {
                      Static.historyProjects.map((item, index)=>{
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
                            <span>{item?.tokens * item?.priceToken}$</span>
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
                  hidden = {Static.activeTab == "investing" ? false : true}
                >
                  <thead class="table-pm-header">
                    <tr class="table-history_item table-history_item_invest-user">
                      <th>№</th>
                      <th>Operation</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Tokens</th>
                      <th>Project</th>
                    </tr>
                  </thead>
                  <tbody class="table-history-body table-pm-body bookmarks-inner">
                    {
                      Static.historyProjects.map((item, index)=>{
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
                            <span>{item?.tokens * item?.priceToken}$</span>
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
                  hidden = {Static.activeTab == "sale" ? false : true}
                >
                  <thead class="table-pm-header">
                    <tr class="table-history_item table-history_item_invest-user">
                      <th>№</th>
                      <th>Operation</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Tokens</th>
                      <th>Project</th>
                    </tr>
                  </thead>
                  <tbody class="table-history-body table-pm-body bookmarks-inner">
                    {
                      Static.historyProjects.map((item, index)=>{
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
                            <span>{item?.tokens * item?.priceToken}$</span>
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
                  hidden = {Static.activeTab == "buy" ? false : true}
                >
                  <thead class="table-pm-header">
                    <tr class="table-history_item table-history_item_invest-user">
                      <th>№</th>
                      <th>Operation</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Tokens</th>
                      <th>Project</th>
                    </tr>
                  </thead>
                  <tbody class="table-history-body table-pm-body bookmarks-inner">
                    {
                      Static.historyProjects.map((item, index)=>{
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
                            <span>{item?.tokens * item?.priceToken}$</span>
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
                  hidden = {Static.activeTab == "withdraw" ? false : true}
                >
                  <thead class="table-pm-header">
                    <tr class="table-history_item table-history_item_invest-user">
                      <th>№</th>
                      <th>Operation</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Tokens</th>
                      <th>Project</th>
                    </tr>
                  </thead>
                  <tbody class="table-history-body table-pm-body bookmarks-inner">
                    {
                      Static.historyProjects.map((item, index)=>{
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
                            <span>{item?.tokens * item?.priceToken}$</span>
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
