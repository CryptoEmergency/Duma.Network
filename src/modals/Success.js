import {
  jsx,
  jsxFrag,
  load,
  Data,
  initReload,
  Variable,

} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from "@src/elements/export.js";


const statuses = [
  {
    name: "Investor",
    price: "20",
    icon: svg.investor,
    question: "Investor status allows you to invest in projects.",
  },
  {
    name: "Partner",
    price: "50",
    icon: svg.partner,
    question: "Partner status means that you are a partner.",
  },
  {
    name: "VIP",
    price: "100",
    icon: svg.vip,
    question: "VIP status means that you are omnipotent.",
  }
];

const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.selectedStatus = "Investor";
  Static.selectedSum = "20";
  load({
    ID,
    fnLoad: () => {
      setTimeout(() => {
        fn.modals.close(ID);
      }, 2500);
    },
    fn: () => {
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div 
              class="success-send"
              Element={($el)=>{
                Static.sendSuccess = $el;
              }}  
            >
              <div class="success-send_inner">
                <img src={svg['iconsGreen/doneSend']} />
                <h5 class="ml-15">{data.title}</h5>
              </div>
              
            </div>
          </div>
        </div>
      );
    },
  });
};

export default forExport;
