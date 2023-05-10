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
    method: "Statuses",
    action: "findOneAndUpdate",
    // _id: Data.Static.item._id,
    _id: Data.Static.statusId,
    params: { update },
  });
  if (!response || response.error) {
    console.log("=updateRecords= Error", response);
  }
};

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.statusId = null;
  load({
    ID,
    fnLoad: async () => {
      if (!Variable.auth || !Variable.myInfo.role) {
        fn.siteLink("/");
        return;
      }
      // if (Variable.dataUrl.params) {
      //   Static.item = await fn.socket.get({
      //     method: "Statuses",
      //     // _id: Variable.dataUrl.params,
      //   });

      // }
      Static.statuses = await fn.socket.get({
        method: "Statuses",
        // _id: Variable.dataUrl.params,
      });
      console.log("=Statuses=", Static.statuses);
    },
    fn: () => {
      if (!Variable.auth || !Variable.myInfo.role) {
        fn.siteLink("/");
        return <div></div>;
      }
      // if (!Static.item || !Static.item._id) {
      //   return <div>Not found</div>;
      // }
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
                      title: "Statuses for user",
                      link: "/personal/admin/edit/status/",
                    },
                    // {
                    //   title: Static.item.title
                    //     ? Static.item.title
                    //     : "New record",
                    // },
                  ]}
                />
                <div class="main mY-25">
                  <h2 class="general-title mt-0">Edit status for user</h2>
                </div>
                <div class="personal-form">
                  <div class={["add","ml-15"]}
                    onclick={async() => {
                      Static.statuses.push({});
                      await fn.socket.set({
                        method: "Statuses",
                        action: "insert",
                      });
                      initReload()
                    }}
                  >
                    +
                  </div>
                  <div class="grid-2">
                    {(Static.statuses || []).map((item,index)=>{
                      return(
                        <div class="statuses-item statuses-item_admin">
                          <img
                            onclick={async() => {
                              console.log('=443074=',(Static.statuses[index]))
                              // Static.statuses.splice(Static.statuses.indexOf(item.title), 1);
                              // Static.statusId=Static.statuses[index]._id;
                              updateValue({
                                key: "Static.statuses[index].active",
                                value: false,
                              });
                              initReload();
                            }}
                            class="icon-delete"
                            src={svg["delete_icon"]}
                          />
                          <div class="grid-2 mb-15">
                            <div 
                              class="status-img"
                              onclick={()=>{
                                Static[`statusMedia${index}`].click();
                              }}  
                            >
                              <input
                                type="file"
                                hidden
                                Element={($el) => {
                                  Static[`statusMedia${index}`] = $el;
                                }}
                                onchange={async function (e) {
                                  e.stopPropagation();
                                  Array.from(this.files).forEach((item) => {
                                    fn.uploadFile({
                                      file: item,
                                      onload: async function () {
                                        if (!this.response) {
                                          alert("Have some Error. Try again...");
                                          return;
                                        }
                                        let response = JSON.parse(this.response);
                                        if (response.error || !response.name) {
                                          alert(
                                            "Have some Error. Try again... " +
                                              response.error
                                          );
                                          return;
                                        }
                                        Static.statuses[index].icon = response.name;
                                        Static.statusId=Static.statuses[index]._id;
                                        updateValue({
                                          key: "icon",
                                          value: Static.statuses[index].icon,
                                        });
                                        initReload();
                                      },
                                    });
                                    return;
                                  });
                                }}
                              />
                              <img src={item.icon ? `/assets/upload/${item.icon}` : svg.addImage} />
                            </div>
                            <div>
                            <div
                              class="personal-input text mb-15"
                              contenteditable="plaintext-only"
                              oninput={function () {
                                Static.statuses[index].title = this.innerText.trim();
                                Static.statusId=Static.statuses[index]._id;
                                updateValue({
                                  key: "title",
                                  value: Static.statuses[index].title,
                                });
                              }}
                            >
                              {item?.title ? `${item.title}` : "Status for user"}
                            </div>
                            <div
                              class="personal-input text mb-15"
                              contenteditable="plaintext-only"
                              oninput={function () {
                                Static.statuses[index].price = this.innerText.trim();
                                Static.statusId=Static.statuses[index]._id;
                                updateValue({
                                  key: "price",
                                  value: Static.statuses[index].price,
                                });
                              }}
                            >
                              {item?.price ? `${item.price}` : "0"}
                            </div>
                            </div>
                          </div>
                          <div
                            class="personal-input text"
                            contenteditable="plaintext-only"
                            oninput={function () {
                              Static.statuses[index].desc =this.innerText.trim();
                              Static.statusId=Static.statuses[index]._id;
                              updateValue({
                                key: "desc",
                                value: Static.statuses[index].desc,
                              });
                            }}
                          >
                            {item?.desc ? `${item.desc}` : "Description"}
                          </div>
                        </div> 
                      )
                    })}
                    
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
