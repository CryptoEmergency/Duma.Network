import {
  jsx,
  jsxFrag,
  load,
  Data,
  Variable,
  initReload,
} from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fnLoad: async () => {
      if (Variable.dataUrl.params) {
        Static.item = await fn.socket.get({
          method: "Research",
          _id: Variable.dataUrl.params,
          params: { populate: { path: "fonds" } },
        });
      }
      if (!Static.item.socials || !Static.item.socials[0]) {
        Static.item.socials = [];
      }
      Static.activeImg = Static.item.gallery[0];
      Static.imgPosition = 0;
      Static.currentSlide = 0;
      Static.slideHidden = Static.item.gallery.length - 4;
    },
    fn: () => {
      console.log("=0e0048=", Static.item);
      if (!Static.item || !Static.item._id) {
        return <div>Not found</div>;
      }
      return (
        <div class="back-secondary">
          <div class="wrapper">
            <div class="main-inner">
              <Elements.Bredcrumbs
                items={[
                  { title: "Research", link: "/research" },
                  { title: Static.item.name },
                ]}
              />
              <div>Marketplace...</div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
