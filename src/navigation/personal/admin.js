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

            // let tmp = await fn.socket.set({ method: "Projects", action: "insert", params: { insert: { name: "Crypto Emergency", rang: 100, status: "Active", category: "Best", title: "Mega super=))", description: "Is an investment ecosystem that combines a Launchpad, an information resource and an academy.", price: 0.64, targetPrice: 10000 } } })
            // console.log('=f5b4ba=', tmp)
        },
        fn: () => {
            if (!Variable.auth || !Variable.myInfo.role) {
                fn.siteLink("/");
                return <div></div>;
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
                                    <h2 class="general-title mt-25">Admin Action</h2>
                                </section>
                                <div class="mb-10">
                                    <button class="btn btn-green"
                                        onclick={() => {
                                            fn.siteLink("/personal/admin/list/research/");
                                        }
                                        }>Research Lists</button>
                                </div>
                                {/* <div>
                                    <button class="btn btn-green">Daily Reward</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            );
        },
    });
};

export default start;
