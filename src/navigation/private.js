import {
  jsx,
  jsxFrag,
  setStorage,
  Variable,
  load,
  Data,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const team = [
  {
    name: "DEN MAGDANOV",
    img: images["team/den"],
    job: "ceo",
    flag: images["flags/tr"],
    about:
      "The creator of DÜMA NETWORK, 11 years in business, blogger, investor and crypto enthusiast.Investing in crypto since 2015.",
  },
  {
    name: "ROMAN SIDE",
    img: images["team/roman"],
    job: "ceo",
    flag: images["flags/country"],
    about: "President of the Blockchain Developers Association.",
  },
  {
    name: "MAXIM SINKEVICH",
    img: images["team/maxim"],
    job: "ceo",
    flag: images["flags/country"],
    about:
      "Head of development department at MST Company with more than 7 years of experience (Sberbank, Sberdrug, VTB, Dom.ru, Kinopoisk, Yandex).",
  },
  {
    name: "EUGENE KARR",
    img: images["team/roman"],
    job: "HDD",
    flag: images["flags/ru"],
    about:
      "Senior analyst and partnership development specialist. Experienced investor and crypto-enthusiast.",
  },
  {
    name: "OGANNES OSIPYAN",
    img: images["team/ogannes"],
    job: "cm",
    flag: images["flags/am"],
    about: "President of the Blockchain Developers Association.",
  },
  {
    name: "IVERI KUDAVA",
    img: images["team/ivery"],
    job: "bdm",
    flag: images["flags/ge"],
    about:
      "Community manager. Crypto Business Developer. Professional Translator. Huge crypto enthusiast",
  },
  {
    name: "ALEKSA MIROSLAVSKAYA",
    img: images["team/roman"],
    job: "bdm",
    flag: images["flags/ru"],
    about:
      "Crypto enthusiast, investor. Has extensive experience working with major exchanges and foreign blockchain markets",
  },
  {
    name: "ROMAN SIDE",
    img: images["team/roman"],
    job: "ceo",
    flag: images["flags/country"],
    about: "President of the Blockchain Developers Association.",
  },
];

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });

  load({
    ID,
    fn: () => {
      return (
        <div class="wrapper">
          <div class="main-inner">cvb</div>
        </div>
      );
    },
  });
};

export default start;
