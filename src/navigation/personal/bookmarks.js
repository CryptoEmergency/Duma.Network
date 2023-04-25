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
      Static.tmp = await fn.socket.get({
        method: "Bookmarks",
        params: { populate: { path: "projectId" } },
      });
      console.log("=65766d=", Static.tmp);
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

              {/* main page */}
              <section class="bookmarks main">
                <h2 class="general-title mt-25">Bookmarks</h2>
                
                {/* <div class="bookmarks-inner mt-25">
                  
                  {Static.tmp.length ?
                      Static.tmp.map((item) => {
                        return (
                          <div class="bookmarks-item">
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
                            <div class="round">round</div>
                            <div class="price">price token</div>
                            <div class="price">
                              {item.projectId?.have}$/{item.projectId?.target}$
                            </div>
                            <div>date tge</div>
                            <div class="text-underline">lead investor</div>
                            <div>{item.projectId?.category}</div>
                            <button class="btn btn-transparent">more</button>
                          </div>
                        );
                      }) : 
                      <div class="notFound">
                        <span>Records not found in table</span>
                        <img src={svg.notFound} />
                      </div>
                  }
                </div> */}
              </section>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
