import {
  jsx,
  jsxFrag
} from "@betarost/cemserver/cem.js";

import images from "@assets/images/index.js";

const team = [
  {
    name: "DEN",
    lastName: "MAGDANOV",
    img: images["team/den"],
    job: "ceo",
    about: "Entrepreneur with 11 years of experience in offline and online retail. An Crypto influencer with more than 20 thousand suscribers",
    link: "https://www.linkedin.com/in/denmagdanov/"
  },
  {
    name: "TOM",
    lastName: "NOSOV",
    img: images["team/tom"],
    job: "cao",
    about: "Senior analyst and partnership development specialist. Experienced trader and Business Analyst",

  },
  {
    name: "MAXIM",
    lastName: "SINKEVICH",
    img: images["team/maxim"],
    job: "cvo",
    about: "CBDM and founder of Timeus Lab and ZYX Network. Experienced entrepreneur in the blockchain industry.",
    link: "https://www.linkedin.com/in/maxim-senkevich/"
  },
  {
    name: "ALEXANDER",
    lastName: "PRAVOSUDOV",
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

const forExport = function ({ className }) {
  return (
    <section class="team" id="team">
      <center>
        <h2 class="general-title">Core team</h2>
        {/* <span>from different countries</span> */}
      </center>
      <div class="team-inner">
        {team.map((item) => {
          return (
            <div class="team-item">
              {
                item.link
                  ?
                  <a
                    href={item.link}
                    target="_blank"
                  >
                    <img class="team-img" src={item.img} />
                  </a>
                  :
                  <img class="team-img" src={item.img} />
              }

              <h5 class="team-name"><div>{item.name}</div> <div>{item.lastName}</div></h5>
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