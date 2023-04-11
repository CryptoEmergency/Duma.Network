import {
  jsx,
  jsxFrag,
  load,
  Variable,
  initReload,
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
  // Static.activeTab = "seed";
  // Static.tabWidth = 0;
  load({
    ID,
    fnLoad: async () => {
      if (Variable.dataUrl.params) {
        Static.activeTab = Variable.dataUrl.params;
      }
      Static.records = await fn.socket.get({
        method: "Marketplace",
        params: {
          filter: { moderation: true },
          limit: 20,
          populate: { path: "projectId" },
        },
      });
      Static.slides = await fn.socket.get({
        method: "Marketplace",
        params: {
          filter: { moderation: true },
          limit: 3,
          populate: { path: "projectId" },
        },
      });
      Static.projects = await fn.socket.get({
        method: "Research",
        params: { filter: { moderation: true }, limit: 5 },
      });
      console.log("=c5bd41=", Static.records);
    },
    fn: () => {
      return (
        <div class="back-market main-back">
          <div class="wrapper">
            <div class="main-inner">
              <Elements.Bredcrumbs
                items={[{ title: "Marketplace", link: "/marketplace" }]}
              />

              <div class="slider-mCards">
                {Static.slides.map((item, index) => {
                  return (
                    <div
                      class="mCards-item"
                      style={
                        item.projectId.gallery[0]
                          ? `background-image: url('/assets/upload/${item.projectId.gallery[0]}')`
                          : images[`research/duma}`]
                      }
                    >
                      <div class="mCards-item-inner">
                        <div class="mCards-info">
                          <div class="company">
                            <div class="small-logo">
                              <img
                                src={
                                  item.projectId.icon
                                    ? `/assets/upload/${item.projectId.icon}`
                                    : images[`research/logo-duma}`]
                                }
                              />
                            </div>

                            <span class="company-title">
                              {item.projectId.name}
                            </span>
                          </div>
                          <div class="mCards-info_status">
                            <div class="info-bell-m">
                              <img src={svg.bellGrey} class="bell" />
                            </div>
                            <div style="display: flex; align-items:center;">
                              <div class="icon mr-15">
                                <img src={svg.blockchain} />
                              </div>
                              <div class="status">{item.projectId.status}</div>
                            </div>
                            <div class="ecosystem mt-10">
                              {item.projectId.category}
                            </div>
                          </div>
                        </div>

                        <div class="statuses">
                          <span class="circle mr-15">
                            {item.rank ? item.rank : 0}
                          </span>
                          <span class="rang">
                            {item.projectId.rank < 100
                              ? "low rank"
                              : "medium rank"}
                          </span>
                        </div>
                        <p class="text">{item.projectId.description}</p>
                        <div class="card-text">
                          <span class="ttu">
                            {item.projectId.tabs}/ seed round is open
                          </span>
                          {item.projectId.have}$
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div class="m-search">
                <form class="mb-15">
                  <input
                    class="form-input"
                    type="text"
                    placeholder="Search"
                    Element={($el) => {
                      Static.searchM = $el;
                    }}
                  />
                  <span
                    class="input-delete"
                    // Element={($el)=>{
                    //   Static.DelsearchM = $el;
                    // }}
                    onclick={() => {
                      Static.searchM.value = "";
                      initReload();
                    }}
                  >
                    X
                  </span>
                </form>
              </div>

              <div class="filter-m">
                <div class="filter-m-round">
                  <div class="round-m-item round-m-item_active">All</div>
                  <div class="round-m-item">Pre-seed</div>
                  <div class="round-m-item">Seed</div>
                </div>
                <button class="btn btn-green mr-15">Category</button>
                <div class="filter-m-bc">
                  <div class="bc-img">
                    <img src={svg.blockchain} />
                  </div>
                  <div class="bc-img">
                    <img src={svg.blockchain} />
                  </div>
                  <div class="bc-img">
                    <img src={svg.blockchain} />
                  </div>
                  <div class="bc-img">
                    <img src={svg.blockchain} />
                  </div>
                </div>
              </div>

              <div class="table-m">
                <div class="table-m-sort">
                  <button class="btn btn-passive mr-15">Filter</button>
                  <div class="tabs-m-controller">
                    <div class="glider-m"></div>
                    <div class="tab-m-item m-active">All</div>
                    <div class="tab-m-item">Active</div>
                    <div class="tab-m-item">Upcoming</div>
                    <div class="tab-m-item">Past</div>
                  </div>
                </div>
                <div class="table-m-content">
                  <div class="table-m-item">
                    <div></div>
                    <div class="m-active">Project</div>
                    <div>Round</div>
                    <div>Type</div>
                    <div>Category</div>
                    <div>Price</div>
                    <div>Collect</div>
                    <div>Total</div>
                    <div>BC</div>
                    <div></div>
                    <div></div>
                  </div>
                  {Static.records.map((item) => {
                    return (
                      <div class="table-m-item">
                        <div class="small-logo">
                          <img
                            src={
                              item.projectId.icon
                                ? `/assets/upload/${item.projectId.icon}`
                                : images[`research/logo-duma}`]
                            }
                          />
                        </div>
                        <div>{item.projectId.name}</div>
                        <div>{item.projectId.tabs}</div>
                        <div>{item.projectId.status}</div>
                        <div>{item.projectId.category}</div>
                        <div>{item.projectId.seedRound}$</div>
                        <div>{item.projectId.have}$</div>
                        <div>{item.projectId.target}$</div>
                        <div>
                          <img src={svg.blockchain} />
                        </div>
                        <button class="btn btn-green">MORE INFO</button>
                        <button class="btn btn-green">RESEARCH</button>
                      </div>
                    );
                  })}
                </div>
                <div class="btn-block">
                  <button class="btn btn-green">VIEW ALL PROJECTS</button>
                </div>
              </div>

              <h2 class="general-title mY-25">Almost done</h2>

              <Elements.cards.Small
                items={Static.projects}
                className="mCards-small"
              />

              {/*
              <Elements.Tabs
                varName={"activeTab"}
                items={[
                  { title: "Seed", name: "seed" },
                  { title: "Private", name: "private" },
                  { title: "Public", name: "public" },
                ]}
              >
                <div>
                  <div class="blur">
                    <h2>COMING SOON</h2>
                  </div>
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
              </Elements.Tabs> */}
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
