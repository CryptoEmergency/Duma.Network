import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Data,
} from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
// let active = false;
const forExport = function ({
  className,
  children,
  varName,
  textClue,
  switcher,
  key,
}) {
  if (switcher && !switcher[key]) {
    switcher[key] = false;
  }
  return (
    <div
      class={[
        "question-container",
        switcher && switcher[key] ? "active" : null,
      ]}
      onclick={() => {
        if (switcher) {
          switcher[key] = !switcher[key];
          initReload();
        }
      }}
    >
      <div class="more-icon">
        <img class="question-img" src={svg.question}></img>
      </div>
      <div class="more-info">
        <p>{textClue}</p>
      </div>
    </div>
  );
};

export default forExport;
