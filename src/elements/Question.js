import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Data,
} from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
let active = false;
const forExport = function ({ className, children, varName, text }) {
  return (
    <div
      class={["question-container", active ? "active" : null]}
      onclick={() => {
        active = !active;
        initReload();
      }}
    >
      <div class="more-icon">
        <img class="question-img" src={svg.question}></img>
      </div>
      <div class="more-info">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default forExport;
