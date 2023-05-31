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
  news,
}) {
  return (
    <div class={["blocks-item", className ? className : null]}>
      {textCategory ? <span class="text-category text">{textCategory}</span> : null}
      <Elements.Question textClue={textClue} switcher={switcher} key={key} />
      {/* <span class="soon-text">coming soon</span> */}
      {items ? 
        <div>
          <Elements.cards.Small items={items} className="cards-small" />
          <div>{children}</div>
        </div> : null
      }

       { news ? 
        <div class="list-news pt-25">
          {news.map((item)=>{
            return(
              <div class="new">
                <span class="text-green">{item.title}:</span>
                <span class="bounding-text">{item.text}</span>
              </div>
            )
          }) }
        </div>
        : null}
      
    </div>
  );
};

export default forExport;
