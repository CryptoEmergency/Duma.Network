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
    gallery: ["6967b4f4ab50f3d13a1513b4dcff4687.png"],
    icon: "f8381d2fb05228d348d7c0073836169d.png",
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
    gallery: ["a1c6c3d014afe4922d9416f93723d919.png"],
    icon: "b397d4086727e996f8d2cd28492c24f4.png",
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
    gallery: ["b1587a35a8889f44d3d22cf2a47d765e.png"],
    icon: "97e3f196d176af420b46c166030efea2.png",
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
    gallery: ["425ec4734f5e6ef55d11cd7d5ec6e5fd.png"],
    icon: "8317620f33712e1660d841dc89ef9d43.png",
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
    gallery: ["de898de39c653fafaaaf9ef3f929c227.png"],
    icon: "8317620f33712e1660d841dc89ef9d43.png",
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
    gallery: ["b514a7094383fc34b5a7b7e9be5cbf1f.png"],
    icon: "8317620f33712e1660d841dc89ef9d43.png",
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
      let tmp = await fn.socket.get({
        method: "Research",
        // params: { filter: { moderation: true } },
        params: { filter: { tabs: Static.activeTab } },
      });
      if (tmp && tmp[0]) {
        Static.projects = tmp
      } else {
        Static.projects = cardsRecords
      }
    },
    fn: () => {
      if (!Static.projects || !Static.projects[0]) {
        Static.projects = [cardsRecords[4], cardsRecords[5]]
      }
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
                  {
                    title: "Seed", name: "seed", onclick: async () => {
                      Static.projects = await fn.socket.get({ method: "Research", params: { filter: { tabs: Static.activeTab } } });
                      initReload()
                    }
                  },
                  {
                    title: "Private", name: "private", onclick: async () => {
                      Static.projects = await fn.socket.get({ method: "Research", params: { filter: { tabs: Static.activeTab } } });
                      initReload()
                    }
                  },
                  {
                    title: "Public", name: "public", onclick: async () => {
                      Static.projects = await fn.socket.get({ method: "Research", params: { filter: { tabs: Static.activeTab } } });
                      initReload()
                    }
                  },
                ]}
                Static={Static}
              >
                <div
                  class="tabs-content"
                  hidden={Static.activeTab == "seed" ? false : true}
                >
                  <Elements.cards.Project items={Static.projects} />
                </div>
                <div
                  class="tabs-content"
                  hidden={Static.activeTab == "private" ? false : true}
                >
                  <Elements.cards.Project
                    items={Static.projects}
                  />
                </div>
                <div
                  class="tabs-content"
                  hidden={Static.activeTab == "public" ? false : true}
                >
                  <Elements.cards.Project items={Static.projects} />
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
