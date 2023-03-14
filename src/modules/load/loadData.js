import { Variable } from "@betarost/cemserver/cem.js";

const loadData = async function () {
  Variable.load = false;
  Variable.multiLang = false;
  Variable.preLoad = true;
  Variable.spinner = 500;
};

export { loadData };
