import {
  jsx,
  jsxFrag,
  load,
  Data,
  Variable,
  initReload,
} from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";


const mapPoints = {
  problem: {
    name: "Problem",
    maxPoint: 10
  },
  product: {
    name: "Product",
    maxPoint: 0
  },
  solution: {
    name: "Solution",
    maxPoint: 0
  },
  investors: {
    name: "Investors",
    maxPoint: 0
  }
  ,
  SeedRound: {
    name: "Seed Round",
    maxPoint: 0,
    noPoints: true
  }
}

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fnLoad: async () => {
      if (Variable.dataUrl.params) {
        Static.item = await fn.socket.get({
          method: "Research",
          _id: Variable.dataUrl.params,
        });
      }
      if (!Static.item.socials || !Static.item.socials[0]) {
        Static.item.socials = [];
      }
    },
    fn: () => {
      // console.log("=0e0048=", Static.item);
      if (!Static.item || !Static.item._id) {
        return <div>Not found</div>;
      }
      return (
        <div class="back-secondary">
          <div class="wrapper">
            <div class="main-inner">
              <Elements.Bredcrumbs
                items={[
                  { title: "Research", link: "/research" },
                  { title: Static.item.name },
                ]}
              />
              <section class="card-project">
                <div class="project-name">
                  <div class="company">
                    <img
                      src={
                        Static.item.icon
                          ? `/assets/upload/${Static.item.icon}`
                          : images[`research/logo-duma}`]
                      }
                    ></img>
                    <span class="company-title">{Static.item.name}</span>
                  </div>
                  <div class="statuses">
                    <div class="icon">
                      <img src={svg.binance}></img>
                    </div>
                    <div class="status">{Static.item.status}</div>
                    <div class="ecosystem">{Static.item.category}</div>
                  </div>
                </div>
                <div class="card-project-img">
                  <img
                    src={
                      Static.item.gallery[0]
                        ? `/assets/upload/${Static.item.gallery[0]}`
                        : images[`research/duma}`]
                    }
                  ></img>
                </div>
                <div class="project-rang">
                  <span>{Static.item.rank ? Static.item.rank : 0} points</span>
                  <span class="rang">
                    {Static.item.rank < 100 ? "low rank" : "medium rank"}
                  </span>
                </div>
                <div>
                  <div class="about-project">
                    <div class="info-bell">
                      <img src={svg["iconsGreen/bell"]} class="bell"></img>
                    </div>
                    <h2>PRE SEED ROUND IS OPEN</h2>
                    <p class="text">{Static.item.description}</p>
                    <div class="socials mt-15 mb-15">
                      {(Static.item.socials || []).map((element) => {
                        if (element.link && element.link.length > 0) {
                          return (
                            <a target="_blank" href={element.link}>
                              <img
                                alt={element.name}
                                src={svg[`socials/${element.name}-green`]}
                                class="icon-green"
                              ></img>
                            </a>
                          );
                        } else {
                          return (
                            <img
                              alt={element.name}
                              src={svg[`socials/${element.name}-grey`]}
                              class="icon-green"
                            ></img>
                          );
                        }
                      })}
                    </div>
                    <div class="progressBlock">
                      <div
                        style={
                          !Static.item.have || !Static.item.target
                            ? `width: calc(0%)`
                            : Static.item.have >= Static.item.target
                              ? `width: calc(100%)`
                              : `width: calc(100% * ${Static.item.have / Static.item.target
                              })`
                        }
                        class="progressBlock-column"
                      ></div>
                    </div>
                    <span class="summ">
                      {Static.item.have}$/{Static.item.target}$
                    </span>
                    <div class="card-btns">
                      <button class="btn btn-black">
                        min. {Static.item.seedRound}$
                      </button>
                      <button class="btn btn-black">without comission</button>
                    </div>
                    <button class="btn btn-green mt-10">
                      BECOME OUR PARTNER
                    </button>
                  </div>
                </div>
              </section>

              <section class="project-scheme">
                <div class="scheme-sidebar">
                  {
                    Object.keys(mapPoints).map((key) => {
                      return (
                        <div
                          class="scheme-sidebar_item text"
                          onclick={(e) => {
                            let timeGo = 10;
                            setTimeout(() => {
                              window.scrollTo({
                                top:
                                  document.querySelector(`#${key}`).offsetTop - 72,
                                behavior: "smooth",
                              });
                            }, timeGo);
                          }}>
                          <span>{mapPoints[key].name}</span>
                          {
                            !mapPoints[key].noPoints
                              ?
                              <span class="text-green">
                                {Static.item?.rankList[key]}{mapPoints[key].maxPoint ? `/${mapPoints[key].maxPoint}` : null} points
                              </span>
                              :
                              null
                          }
                        </div>
                      )
                    })
                  }
                </div>
                <div class="scheme-cards">

                  <div class="scheme-card" id="problem">
                    <div class="scheme-sidebar_item text">
                      <span>Problem</span>
                      <span class="text-green">
                        {Static.item.rankList.problem}{mapPoints.problem.maxPoint ? `/${mapPoints.problem.maxPoint}` : null} points
                      </span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.problem, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card" id="product">
                    <div class="scheme-sidebar_item text">
                      <span>Product</span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.product, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card" id="solution">
                    <div class="scheme-sidebar_item text">
                      <span>Solution</span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.solution, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Investors</span>
                      <span class="text-green">
                        {Static.item.rankList.investors} points
                      </span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.investors, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>

                  <div class="scheme-card">
                    <div class="scheme-sidebar_item text">
                      <span>Documentation</span>
                      <span class="text-green">
                        {Static.item.rankList.documentation} points
                      </span>
                    </div>
                    <div class="scheme-card_desc text">
                      {fn.editText(Static.item.documentation, {
                        paragraph: true,
                        html: true,
                      })}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
