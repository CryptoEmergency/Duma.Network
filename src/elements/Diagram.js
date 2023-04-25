import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Variable,
  Data,
} 
from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";

const diagrammValues = [
  {},
  {},
  {},
];

const forExport = function ({
  className,
  children,
  varName,
  textClue,
  textCategory,
  items,
  switcher,
  key,
  news,
}) {
  return (
    <div class={["blocks-item", className ? className : null]}>
      {textCategory ? <span class="text-category text">{textCategory}</span> : null}
      <Elements.Question textClue={textClue} switcher={switcher} key={key} />
      <div class="canvas">
        <div class="bag-value">
          <img class="arrow arr-left" src={svg.arrowLeft}></img>
          <div class="nums">
            <span class="num_big">{Variable.myInfo.balance.toFixed(2)}$</span>
            <span class="num_small">+0$</span>
            <span class="num_small"> +0,00%</span>
          </div>
          <img
            class="arrow arr-right"
            src={svg.arrowRight}
          />
        </div>
        <svg class="chart" width="250" height="250" viewBox="0 0 40 40">
          <circle class="unit" r="15.9" cx="50%" cy="50%"></circle>
          <circle class="unit" r="15.9" cx="50%" cy="50%"></circle>
          <circle class="unit" r="15.9" cx="50%" cy="50%"></circle>
        </svg>
      </div>
    </div>
  );
};

export default forExport;
