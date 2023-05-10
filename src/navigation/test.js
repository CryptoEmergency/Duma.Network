import {
  jsx,
  jsxFrag,
  load
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import images from "@assets/images/index.js";
import Elements from '@src/elements/export.js';

const courses = [
  {
    name: "btc",
    price: "7.85"
  },
  {
    name: "eth",
    price: "67"
  },
  {
    name: "usdt",
    price: "6.54"
  },
  {
    name: "usdc",
    price: "8.8"
  },
  {
    name: "bnb",
    price: "9.9"
  },
  {
    name: "usdc",
    price: "1.85"
  },
  {
    name: "xrp",
    price: "3.46"
  },
  {
    name: "ada",
    price: "9.14"
  },
  {
    name: "doge",
    price: "2.2"
  },
  {
    name: "trx",
    price: "67.7"
  },
  {
    name: "atom",
    price: "100"
  },
  {
    name: "leo",
    price: "0.49"
  },
  {
    name: "uni",
    price: "10.01"
  },
  {
    name: "link",
    price: "50.9"
  },
  {
    name: "icp",
    price: "55"
  },
  {
    name: "apt",
    price: "99.9"
  },
];

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  load({
    ID,
    fn: () => {
      return (
        <div class="wrapper">
          <div class="main-inner">
            <Elements.Bredcrumbs items={[{ title: "Test", link: '/test' }]} />
            <h2 class="general-title mt-25" style="z-index:3; position:relative;">
              Running line
            </h2>
            <Elements.RunLine records={courses} count = {5} />

          </div>
        </div>
      );
    },
  });
};

export default start;
