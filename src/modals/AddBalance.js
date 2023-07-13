import {
  jsx,
  jsxFrag,
  load,
  Data,
  setStorage,
  Variable,
  initReload
} from "@betarost/cemserver/cem.js";

import QRCode from "qrcode";

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";

const sendEnter = function (e) {
  if (e.keyCode == '13') {
    Data.MStatic.btnSubmit.click();
  }
}

let time;

const forExport = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  Static.image = null

  let timeMinut = parseInt(Date.now() + 15 - Date.now()) * 60;
  Static.timer = setInterval(function () {
    let seconds = timeMinut % 60;
    let minutes = timeMinut / 60 % 60;
    if (timeMinut <= 0) {
      clearInterval(Static.timer);
      alert("Время закончилось");
    } else {
      document.getElementById("timer").innerHTML = `${Math.trunc(minutes)}:${seconds}`;
    }
    --timeMinut;
  }, 1000)

  load({
    ID,
    fnLoad: async () => {
      Static.generateQR = QRCode.toDataURL("data.address", function (err, url) {
        Static.image = url;
        return
      })

    },
    fn: () => {
      console.log('=fc1a65=', time)
      return (
        <div class="wrap">
          <div class="wrap-body">
            <div class="wrap-content">
              <header class="header-modal">
                <h2 class="general-title mt-0">We accept USDT-ERC 20 and USDT-BEP 20</h2>
                <button
                  class="button-close button-modal"
                  onclick={() => {
                    clearInterval(Static.timer);
                    // document.getElementById("timer").remove()
                    fn.modals.close(ID);
                  }}
                >
                  X
                </button>
              </header>
              <main class="main-modal">
                <div class="referral-invite">
                  <div class="row-block row-block_balance mb-10">
                    <span>Address for replenishment:</span>
                    <div class="cY">
                      <span
                        class="ref-link"
                        style="max-width: 300px;
                              overflow: hidden;
                              text-overflow: ellipsis"
                        Element={($el) => {
                          Static.copyId = $el;
                        }}
                      >{data?.address}</span>
                      <div class="copy-link">
                        <img
                          class="ml-10"
                          src={svg.copy}
                          onclick={function () {
                            window.navigator.clipboard.writeText(Static.copyId.textContent)
                            Static.copySuccessId.hidden = false;
                            setTimeout(() => {
                              Static.copySuccessId.hidden = true
                            }, 1000)
                            initReload();
                          }}
                        />
                        <div
                          class="copy-success"
                          hidden={true}
                          Element={($el) => {
                            Static.copySuccessId = $el;
                          }}
                        >
                          Successfully copied
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row-block row-block_qr">
                  <img src={`${Static.image}`} />
                </div>
                <div class="row-block row-block_timer">
                  <span>Timer for translation</span>
                  <span>15 minutes</span>
                </div>
                <div class="row-block row-block_qr">
                  <h2 id="timer">15:0</h2>
                </div>
              </main>
              <footer class="footer-modal">
                {/* <button
                  class="btn btn-modal"
                  Element={($el) => {
                    Static.btnSubmit = $el;
                  }}
                  onclick={async () => {

                    // await fn.socket.send({
                    //   method: "MarketUser",
                    //   params: {
                    //     projectId: data.projectId,
                    //     tokens: Static.sumToken,
                    //     price: Static.priceToken,
                    //   },
                    // });
                    // fn.modals.close(ID);
                    // fn.modals.Success({
                    //   title: "You have been assigned investor status"
                    // })
                    initReload();
                  }}
                >
                  buy
                </button> */}
              </footer>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default forExport;
