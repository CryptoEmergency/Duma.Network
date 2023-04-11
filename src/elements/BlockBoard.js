import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Data,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";

const forExport = function ({
  className,
  children,
  varName,
  textClue,
  textCategory,
  items,
  switcher,
  key,
}) {
  return (
    <div class={["blocks-item", className ? className : null]}>
      {textCategory ? (
        <span class="text-category text">{textCategory}</span>
      ) : null}

      <Elements.Question textClue={textClue} switcher={switcher} key={key} />
      {items ? (
        <Elements.cards.Small items={items} className="cards-small" />
      ) : (
        <span class="soon-text">coming soon</span>
      )}
    </div>
  );
};

export default forExport;
