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
    method: "Marketplace",
    action: "findOneAndUpdate",
    _id: Data.Static.item._id,
    params: { update },
  });
  if (!response || response.error) {
    console.log("=updateRecords= Error", response);
  }
  // console.log("=a0d3c8=", response);
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
          method: "Marketplace",
          _id: Variable.dataUrl.params,
          params: { populate: { path: "projectId" } },
        });
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
                      title: "Marketplace lists",
                      link: "/personal/admin/list/marketplace/",
                    },
                    {
                      title: Static.item.name ? Static.item.name : "New record",
                    },
                  ]}
                />
                <h2 class="general-title mY-25">Edit Marketplace</h2>
                <div class="personal-form">
                  <div class="grid-2">
                    <div class="wrap-logo">
                      <div class="picture">
                        <img
                          width="50"
                          height="50"
                          src={
                            Static.item.projectId.icon
                              ? `/assets/upload/${Static.item.projectId.icon}`
                              : images["research/logo-empty"]
                          }
                        />
                      </div>
                      <h5>
                        {Static.item?.projectId.name
                          ? Static.item?.projectId.name
                          : "Name research"}
                      </h5>
                    </div>
                    <div class="form-div">
                      <label>Status:</label>
                      <div class="dropdown">
                        <button
                          class="dropdown__button"
                          onclick={() => {
                            Static.selectList.statusM.classList.toggle(
                              "dropdown__list--visible"
                            );
                          }}
                        >
                          {Static.item?.status
                            ? Static.item.status
                            : "Select status"}
                        </button>
                        <ul
                          class="dropdown__list"
                          Element={($el) => {
                            Static.selectList.statusM = $el;
                          }}
                        >
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.item.status = "Active";
                              updateValue({
                                key: "status",
                                value: Static.item.status,
                              });
                              Static.selectList.statusM.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            Active
                          </li>
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.item.status = "Upcoming";
                              updateValue({
                                key: "status",
                                value: Static.item.status,
                              });
                              Static.selectList.statusM.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            Upcoming
                          </li>
                          <li
                            class="dropdown__list-item"
                            onclick={() => {
                              Static.item.status = "Past";
                              updateValue({
                                key: "status",
                                value: Static.item.status,
                              });
                              Static.selectList.statusM.classList.remove(
                                "dropdown__list--visible"
                              );
                              initReload();
                            }}
                          >
                            Past
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
