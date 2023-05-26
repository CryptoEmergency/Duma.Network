import {
  jsx,
  jsxFrag,
  load,
  Data,
  initReload,
  Variable,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";

const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fn: () => {
      console.log('=e18a85=', data.projectId)
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div class="wrap-content" id="settingsPage">
              
              <header class="header-modal">
                <h2 class="general-title mt-0">{data.title}</h2>
                <button
                  class="button-close button-modal"
                  onclick={() => {
                    fn.modals.close(ID);
                  }}
                >
                  X
                </button>
              </header>
              {
                data.type == "project" ? 
                <footer class="footer-modal">
                  <div class="grid-2">
                    <button
                      class="btn btn-green"
                      onclick={async() => {
                        fn.modals.close(ID);
                        
                        await fn.socket.set({
                          method: "Projects",
                          action: "findOneAndUpdate",
                          params: {
                            update: { status: "Modify" },
                            filter: {
                              _id: data.idProject,
                            }
                          },
                        });
                        await fn.socket.send({
                          method: "SendTelegram",
                          params: {
                            type: "mProjectModify",
                            idProject: data.idProject,
                            author: data.author
                          },
                        });
                        fn.modals.Success({
                          title: "The project has been successfully submitted for revision"
                        });
                        fn.siteLink(
                          `/personal/moderator/list/projects/`
                        );

                        initReload()
                      }}
                    >
                    Modify
                    </button>
                    <button
                      class="btn btn-bordo"
                      onclick={async() => {
                        fn.modals.close(ID);
                        await fn.socket.set({
                          method: "Projects",
                          action: "findOneAndUpdate",
                          params: {
                            update: { status: "Refused" },
                            filter: {
                              _id: data.idProject,
                            }
                          },
                        });
                        await fn.socket.send({
                          method: "SendTelegram",
                          params: {
                            type: "mProjectRefused",
                            idProject: data.idProject,
                            author: data.author
                          },
                        });
                        fn.modals.Success({
                          title: "The project was rejected without the possibility of revision"
                        });
                        fn.siteLink(
                          `/personal/moderator/list/projects/`
                        );
                      }}
                    >
                      Refused
                    </button> 
                  </div>
                </footer> : 
                <footer class="footer-modal">
                  <div class="grid-2">
                    <button
                      class="btn btn-green"
                      onclick={async() => {
                        fn.modals.close(ID);
                        
                        await fn.socket.set({
                          method: "ResearchAnalyst",
                          action: "findOneAndUpdate",
                          params: {
                            update: { status: "Modify" },
                            filter: {
                              _id: data.idResearch,
                            }
                          },
                        });
                        await fn.socket.send({
                          method: "SendTelegram",
                          params: {
                            type: "mResearchModify",
                            idProject: data.projectId,
                            idResearch: data.idResearch,
                            author: data.author
                          },
                        });
                        fn.modals.Success({
                          title: "The research has been successfully submitted for revision"
                        });
                        fn.siteLink(
                          `/personal/moderator/list/research/`
                        );

                        initReload()
                      }}
                    >
                    Modify
                    </button>
                    <button
                      class="btn btn-bordo"
                      onclick={async() => {
                        fn.modals.close(ID);
                        await fn.socket.set({
                          method: "ResearchAnalyst",
                          action: "findOneAndUpdate",
                          params: {
                            update: { status: "Refused" },
                            filter: {
                              _id: data.idResearch,
                            }
                          },
                        });
                        await fn.socket.send({
                          method: "SendTelegram",
                          params: {
                            type: "mResearchRefused",
                            idProject: data.projectId,
                            idResearch: data.idResearch,
                            author: data.author
                          },
                        });
                        fn.modals.Success({
                          title: "The research was rejected without the possibility of revision"
                        });
                        fn.siteLink(
                          `/personal/moderator/list/research/`
                        );
                      }}
                    >
                      Refused
                    </button> 
                  </div>
              </footer>
              }
              
            </div>
          </div>
        </div>
      );
    },
  });
};

export default forExport;
