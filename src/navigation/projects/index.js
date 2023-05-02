import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Variable,
  setStorage,
  getStorage,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import Elements from "@src/elements/export.js";



const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });

  Static.projects = [];
  load({
    ID,
    fnLoad: async () => {
      Static.projects = await fn.socket.get({
        method: "Projects",
        params: { filter: { moderation: true, publish: true } },
      });
      console.log('=2b5c3c=', Static.projects);
    },
    fn: () => {
      return (
        <div class="back-secondary">
          <div class="wrapper">
            <div class="main-inner">
              <Elements.Bredcrumbs
                items={[{ title: "Projects", link: "/projets" }]}
              />
              <h2
                class="general-title mt-25"
                style="z-index:2; position:relative;"
              >
                Projects
              </h2>
              <div class="tabs-content">
                <Elements.cards.Project items={Static.projects} />
              </div>
              <div class="circle-effect circle-effect1"></div>
              <div class="circle-effect circle-effect2"></div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
