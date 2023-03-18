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

const team = [
  {
    name: "DEN MAGDANOV",
    img: images["team/den"],
    job: "ceo",
    about:
      "Entrepreneur with 11 years of experience in offline & online retail. An Crypto influencer with more than 20 thousand suscribers",
  },
  {
    name: "ROMAN SIDE",
    img: images["team/roman"],
    job: "cto",
    about:
      "President of the Blockchain Developers Association. CEO & founder of Timeus Lab, ZYX Network, Atomic Green",
  },
  {
    name: "MAXIM SINKEVICH",
    img: images["team/maxim"],
    job: "cvo",
    about:
      "CBDM & founder of Timeus Lab & ZYX Network. Experienced entrepreneur in the blockchain industry.",
  },
  {
    name: "ALEXANDER PRAVOSUDOV",
    img: images["team/aleksandr"],
    job: "CIO",
    about:
      "Head of development department at MST Company with more than 7 years of experience (Sberbank, Sberdrug,VTB, Dom.ru, Kinopoisk, Yandex).",
  },
  // {
  //   name: "OGANNES OSIPYAN",
  //   img: images["team/ogannes"],
  //   job: "cm",
  //   flag: images["flags/am"],
  //   about: "President of the Blockchain Developers Association.",
  // },
  // {
  //   name: "IVERI KUDAVA",
  //   img: images["team/ivery"],
  //   job: "bdm",
  //   flag: images["flags/ge"],
  //   about:
  //     "Community manager. Crypto Business Developer. Professional Translator. Huge crypto enthusiast",
  // },
  // {
  //   name: "ALEKSA MIROSLAVSKAYA",
  //   img: images["team/roman"],
  //   job: "bdm",
  //   flag: images["flags/ru"],
  //   about:
  //     "Crypto enthusiast, investor. Has extensive experience working with major exchanges and foreign blockchain markets",
  // },
  // {
  //   name: "ROMAN SIDE",
  //   img: images["team/roman"],
  //   job: "ceo",
  //   flag: images["flags/country"],
  //   about: "President of the Blockchain Developers Association.",
  // },
];

const forExport = function ({ Static, onclick, className }) {
  return (
    <section class="team" id="team">
      <center>
        <h2 class="general-title">Core team</h2>
        <span>from different countries</span>
      </center>
      <div class="team-inner">
        {team.map((item) => {
          return (
            <div class="team-item">
              <img class="team-img" src={item.img} />
              <h5 class="team-name">{item.name}</h5>
              <span class="team-job">
                {item.job}
                <img src={item.flag} />
              </span>
              <p class="team-text">{item.about}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default forExport;
