import {
  jsx,
  jsxFrag,
  Variable,
  Data,
  initReload,
} from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const forExport = function ({ Static, onclick, className, item }) {
  return (
    <div class="user-card">
      <div class="user-picture">
        {/* <input
          type="file"
          hidden
          Element={($el) => {
            Data.Static.userIcon = $el;
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
                    alert("Have some Error. Try again... " + response.error);
                    return;
                  }
                  item.icon = response.name;

                  await fn.socket.set({
                    method: "Users",
                    action: "findOneAndUpdate",
                    _id: Variable.myInfo._id,
                    params: {
                      update: { icon: item.icon },
                    },
                  });
                  initReload();
                },
                onprogress: async function (e) {
                  let contentLength;
                  if (e.lengthComputable) {
                    contentLength = e.total;
                  } else {
                    contentLength = parseInt(
                      e.target.getResponseHeader(
                        "x-decompressed-content-length"
                      ),
                      10
                    );
                  }
                  // console.log("onprogress", e.loaded, contentLength);
                },
              });
              return;
            });
          }}
        /> */}
        <img
          src={
            item?.icon
              ? `/assets/upload/${item?.icon}`
              : images["personal/user"]
          }
        />
      </div>
      <div class="user-name">
        <span class="user-name_wel">Welcome</span>
        <span class="user-name_name">{Variable.myInfo.firstName}</span>
      </div>
    </div>
  );
};

export default forExport;
