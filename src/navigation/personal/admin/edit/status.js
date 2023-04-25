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

const updateValue = async function ({ key, value }) {
  if (Data.Static.timerChange[key]) {
    clearTimeout(Data.Static.timerChange[key]);
    delete Data.Static.timerChange[key];
  }
  Data.Static.timerChange[key] = setTimeout(async () => {
    let update = {};
    update[key] = value;
    updateRecords(update);
  }, 300);
};

const updateRecords = async function (update) {
  let response = await fn.socket.set({
    method: "News",
    action: "findOneAndUpdate",
    _id: Data.Static.item._id,
    params: { update },
  });
  if (!response || response.error) {
    console.log("=updateRecords= Error", response);
  }
};

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });

  load({
    ID,
    fnLoad: async () => {
      if (!Variable.auth || !Variable.myInfo.role) {
        fn.siteLink("/");
        return;
      }
      if (Variable.dataUrl.params) {
        Static.item = await fn.socket.get({
          method: "News",
          _id: Variable.dataUrl.params,
          params: { populate: { path: "projectId" } },
        });
        console.log("=9ebbf7=", Static.item);
      }
    },
    fn: () => {
      if (!Variable.auth || !Variable.myInfo.role) {
        fn.siteLink("/");
        return <div></div>;
      }
      if (!Static.item || !Static.item._id) {
        return <div>Not found</div>;
      }
      return (
        <div class="wrapper">
          <div class="personal-inner">
            <Elements.BlockMenu />
            <div class="personal-main">
              <Elements.BlockPersonal />
              <div class="personal-content">
                <Elements.Bredcrumbs
                  items={[
                    { title: "Admin", link: "/personal/admin/" },
                    {
                      title: "News lists",
                      link: "/personal/admin/list/news/",
                    },
                    {
                      title: Static.item.title
                        ? Static.item.title
                        : "New record",
                    },
                  ]}
                />
                <section class="main mY-25 inner-add">
                  <h2 class="general-title mt-0">Edit New</h2>
                  <label
                    style={
                      Static.item.moderation ? "color:green;" : "color:red;"
                    }
                  >
                    {Static.item.moderation ? "Show" : "Hidden"}
                  </label>
                  <div class="switcher mt-0 ">
                    <input
                      id="switch-moderation"
                      type="checkbox"
                      checked={Static.item.moderation}
                      onchange={() => {
                        Static.item.moderation = !Static.item.moderation;
                        updateValue({
                          key: "moderation",
                          value: Static.item.moderation,
                        });
                        initReload();
                      }}
                    ></input>
                    <label for="switch-moderation"></label>
                  </div>
                </section>
                
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
