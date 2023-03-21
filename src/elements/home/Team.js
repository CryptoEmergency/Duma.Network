import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";

import images from "@assets/images/index.js";

const team = [
  {
    name: "DEN",
    lastName: "MAGDANOV",
    img: images["team/den"],
    job: "ceo",
    about:
      "Entrepreneur with 11 years of experience in offline and online retail. An Crypto influencer with more than 20 thousand suscribers",
    link: "https://www.linkedin.com/in/denmagdanov/",
  },
  {
    name: "TOM",
    lastName: "NOSOV",
    img: images["team/tom"],
    job: "cao",
    about:
      "Senior analyst and partnership development specialist. Experienced trader and Business Analyst",
    link: "https://www.linkedin.com/in/tom-nosov/",
  },
  {
    name: "YAN",
    lastName: "KRIVONOSOV",
    img: images["team/yan"],
    job: "cvo",
    about:
      "Founder of the Crypto Emergency development and social network laboratory, CEM blockchain, and decentralized wallet",
    link: "https://www.linkedin.com/in/yan-krivonosov-328584219/",
  },
  {
    name: "IGOR",
    lastName: "IENSHIN",
    img: images["team/igor"],
    job: "CTO",
    about:
      "Senior with 20 years of programming experience. Creator of his own framework for website development and CTO in CEM",
  },
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
              {item.link ? (
                <a href={item.link} target="_blank">
                  <img class="team-img" src={item.img} />
                </a>
              ) : (
                <img class="team-img" src={item.img} />
              )}

              <h5 class="team-name">
                <div>{item.name}</div> <div>{item.lastName}</div>
              </h5>
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
