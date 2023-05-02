import {
  jsx,
  jsxFrag,
  load,
  initReload,
  Data,
  setStorage,
} from "@betarost/cemserver/cem.js";

const forExport = function ({ className, children, varName, items }) {

  return (
    <table className="table-main">
      <thead>
        <tr class={[className]}></tr>
      </thead>
      <tbody>
        <tr class={[className]}></tr>
      </tbody>
    </table>
  );
};

export default forExport;

