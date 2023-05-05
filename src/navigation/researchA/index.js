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
        method: "ResearchAnalyst",
        // params: { filter: { moderation: true } },
        params: { filter: { moderation: true,  } },
      });
      // console.log("=92f11b=", tmp);



    },
    fn: () => {

      return (
        <div class="back-secondary">
          <div class="wrapper">
            <div class="main-inner">
              <Elements.Bredcrumbs
                items={[{ title: "Research", link: "/researchA" }]}
              />
              <h2
                class="general-title mt-25"
                style="z-index:2; position:relative;"
              >
                Research
              </h2>
              <Elements.cards.CardResearch items={Static.projects} />
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
