import {
  jsx,
  jsxFrag,
  Variable,
  load,
  setStorage,
} from "@betarost/cemserver/cem.js";

import svg from "@assets/svg/index.js";
import { fn } from "@src/functions/export.js";
import images from "@assets/images/index.js";

const mainHeader = async function () {
  load({
    ID: "mainHeader",
    fn: () => {
      if (Variable.Static.HeaderShow) {
        return (
          <section class="ftco-section">
            <div class="container">
            </div>
          </section>
        );
      } else {
        return <div></div>;
      }
    },
  });
  return;
};

export { mainHeader };
