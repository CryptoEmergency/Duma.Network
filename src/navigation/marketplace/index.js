import { jsx, jsxFrag, load } from "@betarost/cemserver/cem.js";

const start = function (data, ID) {
  load({
    ID,
    fn: () => {
      return <div>marketplace</div>;
    },
  });
};

export default start;
