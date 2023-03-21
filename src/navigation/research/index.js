import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Variable,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";

const cardsRecords = [
  {
    galery: ["duma1"],
    icon: "logo-duma",
    name: "DUMA Network",
    status: "Active",
    category: "Platform",
    rank: 101,
    // title: "Unite To Earn",
    description:
      "Invest in startups with flexible amounts & sell assets pre-market entry via our platform. Make informed decisions by studying the research.",
    social: [
      { name: "instagram", link: "" },
      { name: "facebook", link: "" },
      { name: "twitter", link: "" },
      { name: "youtube", link: "" },
    ],
    seedRound: 0.12,
    have: 50000,
    target: 580000,
    partners: true,
  },
  {
    galery: ["cookie"],
    icon: "logo-cookie",
    name: "Cookie 3",
    status: "Listing",
    category: "Service",
    rank: 119,
    // title: "Unite To Earn",
    description:
      "Cookie3 provides insights how to target ADS, personalize content etc.",
    social: [
      { name: "instagram", link: "" },
      { name: "facebook", link: "" },
      { name: "twitter", link: "" },
      { name: "youtube", link: "" },
    ],
    seedRound: 0.25,
    have: 2500000,
    target: 2500000,
  },
  {
    galery: ["veax"],
    icon: "logo-veax",
    name: "VEAX",
    status: "Listing",
    category: "DEX",
    rank: 97,
    // title: "Unite To Earn",
    description:
      "Near blockchain based AMM with classic order-book interface and ability to provide single sided liquidity.",
    social: [
      { name: "instagram", link: "" },
      { name: "facebook", link: "" },
      { name: "twitter", link: "" },
      { name: "youtube", link: "" },
    ],
    seedRound: 0.1,
    have: 1200000,
    target: 1200000,
  },
  {
    galery: ["takerProtokol"],
    icon: "logo-takerProtokol",
    name: "Taker Protocol",
    status: "Listing",
    category: "Ecosystem",
    rank: 61,
    // title: "Unite To Earn",
    description:
      "Liquidity protocol that allows users to liquidate & rent all kinds of novel crypto assets, including encrypted collectibles, metaverse assets, financial papers, synthetic assets.",
    social: [
      { name: "instagram", link: "" },
      { name: "facebook", link: "" },
      { name: "twitter", link: "" },
      { name: "youtube", link: "" },
    ],
    seedRound: 0.1,
    have: 80000,
    target: 80000,
  },
  {
    galery: ["web3"],
    icon: "logo-takerProtokol",
    name: "Taker Protocol",
    status: "Listing",
    category: "Ecosystem",
    rank: 61,
    // title: "Unite To Earn",
    description:
      "Liquidity protocol that allows users to liquidate & rent all kinds of novel crypto assets, including encrypted collectibles, metaverse assets, financial papers, synthetic assets.",
    social: [
      { name: "instagram", link: "" },
      { name: "facebook", link: "" },
      { name: "twitter", link: "" },
      { name: "youtube", link: "" },
    ],
    seedRound: 0.1,
    have: 80000,
    target: 80000,
    blur: true,
  },
  {
    galery: ["2"],
    icon: "logo-takerProtokol",
    name: "Taker Protocol",
    status: "Listing",
    category: "Ecosystem",
    rank: 61,
    // title: "Unite To Earn",
    description:
      "Liquidity protocol that allows users to liquidate & rent all kinds of novel crypto assets, including encrypted collectibles, metaverse assets, financial papers, synthetic assets.",
    social: [
      { name: "instagram", link: "" },
      { name: "facebook", link: "" },
      { name: "twitter", link: "" },
      { name: "youtube", link: "" },
    ],
    seedRound: 0.1,
    have: 80000,
    target: 80000,
    blur: true,
  },
];

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.activeTab = "seed";
  Static.projects = [];
  load({
    ID,
    fnLoad: async () => {
      if (Variable.dataUrl.params) {
        Static.activeTab = Variable.dataUrl.params;
      }
      // Static.projects = await fn.socket.get({
      //   method: "Projects",
      //   params: { filter: {} },
      // });
    },
    fn: () => {
      return (
        <div class="back-secondary">
          <div class="wrapper">
            <div class="main-inner">
              <Elements.Bredcrumbs
                items={[{ title: "Research", link: "/research" }]}
              />
              <h2
                class="general-title mt-25"
                style="z-index:2; position:relative;"
              >
                Research
              </h2>
              <Elements.Tabs
                varName={"activeTab"}
                items={[
                  { title: "Seed", name: "seed" },
                  { title: "Private", name: "private" },
                  { title: "Public", name: "public" },
                ]}
                Static={Static}
              >
                <div
                  class="tabs-content"
                  hidden={Static.activeTab == "seed" ? false : true}
                >
                  <Elements.cards.Project items={cardsRecords} />
                </div>
                <div
                  class="tabs-content"
                  hidden={Static.activeTab == "private" ? false : true}
                >
                  <Elements.cards.Project
                    items={[cardsRecords[1], cardsRecords[2]]}
                  />
                </div>
                <div
                  class="tabs-content"
                  hidden={Static.activeTab == "public" ? false : true}
                >
                  <Elements.cards.Project items={[cardsRecords[2]]} />
                </div>
              </Elements.Tabs>
              {/* <div class="tabs">
                <div class="circle-effect circle-effect1"></div>
                <div class="circle-effect circle-effect2"></div>
                <div
                  class="tabs-controller"
                  style="z-index:5; position:relative;"
                >
                  <input
                    id="tab-1"
                    type="radio"
                    class={[
                      Static.activeTab == "seed" ? "checked-input" : null,
                    ]}
                    name="tab"
                  />
                  <label
                    for="tab-1"
                    class={[
                      Static.activeTab == "seed" ? "checked-label" : null,
                    ]}
                    style="z-index:5; position:relative;"
                    onclick={() => {
                      Static.activeTab = "seed";
                      initReload();
                    }}
                  >
                    Seed
                  </label>
                  <input
                    id="tab-2"
                    type="radio"
                    class={[
                      Static.activeTab == "private" ? "checked-input" : null,
                    ]}
                    name="tab"
                  />
                  <label
                    for="tab-2"
                    class={[
                      Static.activeTab == "private" ? "checked-label" : null,
                    ]}
                    style="z-index:5; position:relative;"
                    onclick={() => {
                      Static.activeTab = "private";
                      initReload();
                    }}
                  >
                    Private
                  </label>
                  <input
                    id="tab-3"
                    type="radio"
                    class={[
                      Static.activeTab == "public" ? "checked-input" : null,
                    ]}
                    name="tab"
                  />
                  <label
                    for="tab-3"
                    class={[
                      Static.activeTab == "public" ? "checked-label" : null,
                    ]}
                    style="z-index:5; position:relative;"
                    onclick={() => {
                      Static.activeTab = "public";
                      initReload();
                    }}
                  >
                    Public
                  </label>
                  <div class="glider"></div>
                </div>
                <div>
                  <div
                    class="tabs-content"
                    hidden={Static.activeTab == "seed" ? false : true}
                  >
                    <Elements.cards.Project items={cardsRecords} />
                  </div>
                  <div
                    class="tabs-content"
                    hidden={Static.activeTab == "private" ? false : true}
                  >
                    <Elements.cards.Project
                      items={[cardsRecords[1], cardsRecords[2]]}
                    />
                  </div>
                  <div
                    class="tabs-content"
                    hidden={Static.activeTab == "public" ? false : true}
                  >
                    <Elements.cards.Project items={[cardsRecords[2]]} />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
