import {
    jsx,
    jsxFrag,
    setStorage,
    Variable,
    load,
    Data,
} from "@betarost/cemserver/cem.js";

import Elements from '@src/elements/export.js';

const start = function (data, ID) {
    Variable.Static.HeaderShow = false
    Variable.Static.FooterShow = false
    load({
        ID,
        fn: () => {
            return (
                <div class="wrapper">
                    <div class="main-inner">
                        <Elements.home.Advantages />
                    </div>
                </div>
            )
        }
    })
};

export default start;