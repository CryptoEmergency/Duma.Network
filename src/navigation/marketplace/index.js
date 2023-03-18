import {
  jsx,
  jsxFrag,
  load,
  Variable,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import Elements from '@src/elements/export.js';

const cardsRecords = [
  {
    name: "DUMA Network",
    rang: 100,
    status: "Active",
    category: "Ecosystem",
    title: "Unite To Earn",
    description: "Is an investment ecosystem that combines a Launchpad, an information resource and an academy.",
    social: [
      { name: "instagram", link: "" },
      { name: "facebook", link: "" },
      { name: "twitter", link: "" },
      { name: "youtube", link: "" }
    ],
    price: 1,
    havePrice: 5000,
    targetPrice: 80000,
    icon: "cookie",
    galery: ["1"]
  }, {
    name: "DUMA2 Network",
    rang: 100,
    status: "Active",
    category: "Ecosystem",
    title: "Unite To Earn",
    description: "Is an investment ecosystem that combines a Launchpad, an information resource and an academy.",
    social: [
      { name: "instagram", link: "" },
      { name: "facebook", link: "" },
      { name: "twitter", link: "" },
      { name: "youtube", link: "" }
    ],
    price: 1,
    havePrice: 5000,
    targetPrice: 80000,
    icon: "cookie",
    galery: ["1"]
  },
  {
    name: "DUMA3 Network",
    rang: 100,
    status: "Active",
    category: "Ecosystem",
    title: "Unite To Earn",
    description: "Is an investment ecosystem that combines a Launchpad, an information resource and an academy.",
    social: [
      { name: "instagram", link: "" },
      { name: "facebook", link: "" },
      { name: "twitter", link: "" },
      { name: "youtube", link: "" }
    ],
    price: 1,
    havePrice: 5000,
    targetPrice: 80000,
    icon: "cookie",
    galery: ["1"]
  }

]
const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.activeTab = "seed";
  load({
    ID,
    fnLoad() {
      if (Variable.dataUrl.params) {
        Static.activeTab = Variable.dataUrl.params;
      }
    },
    fn: () => {
      return (
        <div class="wrapper">
          <div class="main-inner">
            <Elements.Bredcrumbs items={["Marketplace"]} />
            <h2 class="general-title mt-25" style="z-index:2; position:relative;">
              Marketplace
            </h2>
            <Elements.Tabs
              varName={"activeTab"}
              items={[{ title: "Seed", name: "seed" }, { title: "Private", name: "private" }, { title: "Public", name: "public" }]}

            >
              <div>
                <div class="blur">
                  <h2>COMING SOON</h2>
                </div>
                <div class="tabs-content" hidden={Static.activeTab == "seed" ? false : true}>
                  <Elements.cards.Project
                    items={cardsRecords}
                  />
                </div>
                <div class="tabs-content" hidden={Static.activeTab == "private" ? false : true}>
                  <Elements.cards.Project
                    items={[cardsRecords[1], cardsRecords[2]]}
                  />
                </div>
                <div class="tabs-content" hidden={Static.activeTab == "public" ? false : true}>
                  <Elements.cards.Project
                    items={[cardsRecords[2]]}
                  />
                </div>
              </div>
            </Elements.Tabs>
          </div>
        </div>
      );
    },
  });
};

export default start;