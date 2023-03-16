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
            if (!Variable.auth) {
                fn.siteLink("/");
                return;
            }
        },
        fn: () => {
            if (!Variable.auth) {
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
                                    <h2 class="general-title mt-25">Referral</h2>
                                    <div class="main-blocks mt-20">
                                        <div class="blocks-item news">
                                            <span class="text-category text">
                                                You will be interested
                                            </span>
                                            <span class="soon-text">coming soon</span>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    })
};

export default start;