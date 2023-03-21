import {
    jsx,
    jsxFrag,
    load,
    Data,
    Variable,
    setStorage,
    initReload,
} from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";
import Elements from '@src/elements/export.js';


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
                Static.item = await fn.socket.get({ method: "Research", _id: Variable.dataUrl.params })
                // console.log('=9ebbf7=', Static.item)
                if (Static.item && !Static.item.gallery) {
                    Static.item.gallery = []
                }
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
                                {/* main page */}
                                <section class="main mb-25  ">
                                    <h2 class="general-title mt-25">Edit Research</h2>
                                </section>
                                <div class="personal-form">
                                    <h4>Main gallery</h4>
                                    <div class="form-item pictures">
                                        <div
                                            class="picture"
                                            onclick={() => {
                                                Static.elAddMedia.click()
                                            }}>
                                            <input
                                                type="file"
                                                hidden
                                                Element={($el) => {
                                                    Static.elAddMedia = $el
                                                }}
                                                onchange={async function (e) {
                                                    e.stopPropagation();
                                                    Array.from(this.files).forEach((item) => {
                                                        fn.uploadFile({
                                                            file: item,
                                                            onload: async function () {
                                                                console.log('=81bde2=', "onload")
                                                                if (!this.response) {
                                                                    alert("Have some Error. Try again...")
                                                                    return
                                                                }
                                                                let response = JSON.parse(this.response);
                                                                console.log('=35f155=', response)
                                                                if (response.error || !response.name) {
                                                                    alert("Have some Error. Try again... " + response.error)
                                                                    return
                                                                }
                                                                Static.item.gallery.push(response.name)
                                                                initReload()
                                                            },
                                                            onprogress: async function () {
                                                                console.log('=81bde2=', "onprogress")
                                                            }
                                                        })
                                                        return
                                                        sendFile(
                                                            item,
                                                            "news",
                                                            async function () {

                                                                if (!this.response) {
                                                                    alert("Произошла ошибка Попробуйте еще раз")
                                                                    return
                                                                }
                                                                let response = JSON.parse(this.response);
                                                                Static.forms.image = response.name
                                                                updateRecords(Static, { image: Static.forms.image })
                                                                initReload()
                                                            },
                                                        )
                                                    })
                                                    initReload()
                                                }}
                                            />
                                            <img src={images["card/1"]}></img>
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