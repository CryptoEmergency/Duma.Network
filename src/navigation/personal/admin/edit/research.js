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
import Elements from '@src/elements/export.js';

const updateValue = async function ({ key, value }) {
    if (Data.Static.timerChange[key]) {
        clearTimeout(Data.Static.timerChange[key]);
        delete Data.Static.timerChange[key]
    }
    Data.Static.timerChange[key] = setTimeout(async () => {
        let update = {}
        update[key] = value
        updateRecords(update)
    }, 300);
}

const updateRecords = async function (update) {
    let response = await fn.socket.set({ method: "Research", action: "findOneAndUpdate", _id: Data.Static.item._id, params: { update } })
    if (!response || response.error) {
        console.log('=updateRecords= Error', response)
    }
}

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID });

    Static.forms = {}
    Static.forms.socials = {
        youtube: {},
        facebook: {},
        twitter: {},
        discord: {},
        instagram: {},
        tiktok: {},
        twitch: {},
        vk: {},
        telegram: {},
        github: {},
        linkedin: {},
    }
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

                if (!Static.item.socials) {
                    Static.item.socials = []
                }

                for (let item of Static.item.socials) {
                    Static.forms.socials[item.name] = item
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
                                <section class="main mb-25 inner-add">
                                    <h2 class="general-title mt-0">Edit Research</h2>
                                    <label style={Static.item.moderation ? "color:green;" : "color:red;"}>{Static.item.moderation ? "Show" : "Hidden"}</label>
                                    <div class="switcher mt-0 ">
                                        <input
                                            id="switch-moderation"
                                            type="checkbox"
                                            checked={Static.item.moderation}
                                            onchange={() => {
                                                Static.item.moderation = !Static.item.moderation
                                                updateValue({ key: "moderation", value: Static.item.moderation })
                                                initReload()
                                            }}
                                        ></input>
                                        <label for="switch-moderation"></label>
                                    </div>
                                </section>
                                <div class="personal-form">


                                    <div class="grid-2">

                                        <div class="form-item wrap-logo">
                                            <div class="picture">
                                                <input
                                                    type="file"
                                                    hidden
                                                    Element={($el) => {
                                                        Static.elAddIcon = $el
                                                    }}
                                                    onchange={async function (e) {
                                                        e.stopPropagation();
                                                        Array.from(this.files).forEach((item) => {
                                                            fn.uploadFile({
                                                                file: item,
                                                                onload: async function () {
                                                                    // console.log('=81bde2=', "onload")
                                                                    if (!this.response) {
                                                                        alert("Have some Error. Try again...")
                                                                        return
                                                                    }
                                                                    let response = JSON.parse(this.response);
                                                                    // console.log('=35f155=', response)
                                                                    if (response.error || !response.name) {
                                                                        alert("Have some Error. Try again... " + response.error)
                                                                        return
                                                                    }
                                                                    Static.item.icon = response.name
                                                                    updateValue({ key: "icon", value: Static.item.icon })
                                                                    initReload()
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
                                                                    console.log("onprogress", e.loaded, contentLength)
                                                                }
                                                            })
                                                            return
                                                        })
                                                    }}
                                                />
                                                <img
                                                    src={Static.item.icon ? `/assets/upload/${Static.item.icon}` : images["research/logo-empty"]}
                                                    onclick={() => {
                                                        Static.elAddIcon.click()
                                                    }}
                                                ></img>
                                            </div>
                                            <div class="form-div">
                                                {/* <label>
                                                    Name:
                                                </label> */}
                                                <div
                                                    class="form-input personal-input"
                                                    contenteditable="true"
                                                    oninput={function () {
                                                        Static.item.name = this.innerText.trim()
                                                        updateValue({ key: "name", value: Static.item.name })
                                                    }}>
                                                    {Static.item.name}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-div">
                                            <label>
                                                Total rank:
                                            </label>
                                            <div
                                                class="form-input personal-input"
                                            >
                                                {Static.item.rank} (Auto calculate)
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-3">
                                        <div class="form-div">
                                            <label>
                                                Tabs:
                                            </label>
                                            <div class="dropdown">
                                                <button
                                                    class="dropdown__button"
                                                    onclick={() => {
                                                        Static.selectList.tabs.classList.toggle("dropdown__list--visible");
                                                    }}>
                                                    {Static.item.tabs}
                                                </button>
                                                <ul
                                                    class="dropdown__list"
                                                    Element={($el) => {
                                                        Static.selectList.tabs = $el;
                                                    }}>
                                                    <li
                                                        class="dropdown__list-item"
                                                        onclick={() => {
                                                            Static.item.tabs = "seed"
                                                            updateValue({ key: "tabs", value: Static.item.tabs })
                                                            Static.selectList.tabs.classList.remove("dropdown__list--visible");
                                                            initReload()
                                                        }}>
                                                        seed
                                                    </li>
                                                    <li
                                                        class="dropdown__list-item"
                                                        onclick={() => {
                                                            Static.item.tabs = "pre-seed"
                                                            updateValue({ key: "tabs", value: Static.item.tabs })
                                                            Static.selectList.tabs.classList.remove("dropdown__list--visible");
                                                            initReload()
                                                        }}>
                                                        pre-seed
                                                    </li>
                                                    <li
                                                        class="dropdown__list-item"
                                                        onclick={() => {
                                                            Static.item.tabs = "strategic"
                                                            updateValue({ key: "tabs", value: Static.item.tabs })
                                                            Static.selectList.tabs.classList.remove("dropdown__list--visible");
                                                            initReload()
                                                        }}>
                                                        strategic
                                                    </li>
                                                    <li
                                                        class="dropdown__list-item"
                                                        onclick={() => {
                                                            Static.item.tabs = "public"
                                                            updateValue({ key: "tabs", value: Static.item.tabs })
                                                            Static.selectList.tabs.classList.remove("dropdown__list--visible");
                                                            initReload()
                                                        }}>
                                                        public
                                                    </li>
                                                    <li
                                                        class="dropdown__list-item"
                                                        onclick={() => {
                                                            Static.item.tabs = "private"
                                                            updateValue({ key: "tabs", value: Static.item.tabs })
                                                            Static.selectList.tabs.classList.remove("dropdown__list--visible");
                                                            initReload()
                                                        }}>
                                                        private
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="form-div">
                                            <label>
                                                Status:
                                            </label>
                                            <div class="dropdown">
                                                <button
                                                    class="dropdown__button"
                                                    onclick={() => {
                                                        Static.selectList.status.classList.toggle("dropdown__list--visible");
                                                    }}>
                                                    {Static.item.status}
                                                </button>
                                                <ul
                                                    class="dropdown__list"
                                                    Element={($el) => {
                                                        Static.selectList.status = $el;
                                                    }}>
                                                    <li
                                                        class="dropdown__list-item"
                                                        onclick={() => {
                                                            Static.item.status = "Active"
                                                            updateValue({ key: "status", value: Static.item.status })
                                                            Static.selectList.status.classList.remove("dropdown__list--visible");
                                                            initReload()
                                                        }}>
                                                        Active
                                                    </li>
                                                    <li
                                                        class="dropdown__list-item"
                                                        onclick={() => {
                                                            Static.item.status = "Listing"
                                                            updateValue({ key: "status", value: Static.item.status })
                                                            Static.selectList.status.classList.remove("dropdown__list--visible");
                                                            initReload()
                                                        }}>
                                                        Listing
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="form-div">
                                            <label>
                                                Category:
                                            </label>
                                            <div class="dropdown">
                                                <button
                                                    class="dropdown__button"
                                                    onclick={() => {
                                                        Static.selectList.category.classList.toggle("dropdown__list--visible");
                                                    }}>
                                                    {Static.item.category}
                                                </button>
                                                <ul
                                                    class="dropdown__list"
                                                    Element={($el) => {
                                                        Static.selectList.category = $el;
                                                    }}>
                                                    <li
                                                        class="dropdown__list-item"
                                                        onclick={() => {
                                                            Static.item.category = "Platform"
                                                            updateValue({ key: "category", value: Static.item.category })
                                                            Static.selectList.category.classList.remove("dropdown__list--visible");
                                                            initReload()
                                                        }}>
                                                        Platform
                                                    </li>
                                                    <li
                                                        class="dropdown__list-item"
                                                        onclick={() => {
                                                            Static.item.category = "Ecosystem"
                                                            updateValue({ key: "category", value: Static.item.category })
                                                            Static.selectList.category.classList.remove("dropdown__list--visible");
                                                            initReload()
                                                        }}>
                                                        Ecosystem
                                                    </li>
                                                    <li
                                                        class="dropdown__list-item"
                                                        onclick={() => {
                                                            Static.item.category = "Service"
                                                            updateValue({ key: "category", value: Static.item.category })
                                                            Static.selectList.category.classList.remove("dropdown__list--visible");
                                                            initReload()
                                                        }}>
                                                        Service
                                                    </li>
                                                    <li
                                                        class="dropdown__list-item"
                                                        onclick={() => {
                                                            Static.item.category = "DEX"
                                                            updateValue({ key: "category", value: Static.item.category })
                                                            Static.selectList.category.classList.remove("dropdown__list--visible");
                                                            initReload()
                                                        }}>
                                                        DEX
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-item">
                                        <label>
                                            Description:
                                        </label>
                                        <div
                                            style="min-height:100px;"
                                            class="form-input personal-input"
                                            contenteditable="true"
                                            oninput={function () {
                                                Static.item.description = this.innerText.trim()
                                                updateValue({ key: "description", value: Static.item.description })
                                            }}>
                                            {Static.item.description}
                                        </div>
                                    </div>

                                    <div class="grid-3">
                                        <div class="form-div">
                                            <label>
                                                Seed round:
                                            </label>
                                            <div
                                                class="form-input personal-input"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.seedRound = Number(this.innerText.trim())
                                                    if (Static.item.seedRound || Static.item.seedRound >= 0) {
                                                        updateValue({ key: "seedRound", value: Static.item.seedRound })
                                                    }
                                                }}>
                                                {Static.item.seedRound}
                                            </div>
                                        </div>
                                        <div class="form-div">
                                            <label>
                                                Invest:
                                            </label>
                                            <div
                                                class="form-input personal-input"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.have = Number(this.innerText.trim())
                                                    if (Static.item.have || Static.item.have >= 0) {
                                                        updateValue({ key: "have", value: Static.item.have })
                                                    }
                                                }}>
                                                {Static.item.have}
                                            </div>
                                        </div>
                                        <div class="form-div">
                                            <label>
                                                Target invest:
                                            </label>
                                            <div
                                                class="form-input personal-input"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.target = Number(this.innerText.trim())
                                                    if (Static.item.target || Static.item.target >= 0) {
                                                        updateValue({ key: "target", value: Static.item.target })
                                                    }
                                                }}>
                                                {Static.item.target}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="" style="display:flex;">
                                        {Object.keys(Static.forms.socials).map((item) => {
                                            return (
                                                <div
                                                    class={[
                                                        "create_social_icon",
                                                        Static.channelNewSocial == item ? "create_social_icon_active" : Static.forms.socials[item].link && Static.forms.socials[item].link.length ? "create_social_icon_have" : null
                                                    ]}
                                                    onclick={(e) => {
                                                        e.preventDefault();
                                                        Static.channelNewSocial = item;
                                                        Static.viewForm = true
                                                        Static.elSocialInput.innerText = Static.forms.socials[item].link
                                                        // Static.forms.social[item].url = "";
                                                        // Static.linkNewSocial = "";
                                                        // for (let item2 of Static.item.social) {
                                                        //     if (item2.channel == Static.channelNewSocial) {
                                                        //         Static.forms.social[item].url = item2.url;
                                                        //         Static.linkNewSocial = item2.url;
                                                        //     }
                                                        // }
                                                        initReload();
                                                    }}
                                                >
                                                    <div class="create_social_icon_inner">
                                                        <img src={svg[`socials/${item}`]} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                    <div
                                        hidden={!Static.viewForm}
                                        class="form-input personal-input"
                                        contenteditable="true"
                                        Element={(el) => {
                                            Static.elSocialInput = el
                                        }}
                                        // innerText={Static.forms.socials[Static.channelNewSocial]?.link}
                                        oninput={function () {
                                            Static.forms.socials[Static.channelNewSocial].link = this.innerText.trim()
                                            let tmpSocials = []
                                            for (let key in Static.forms.socials) {
                                                tmpSocials.push({ name: key, link: Static.forms.socials[key].link })
                                            }
                                            Static.item.socials = tmpSocials
                                            updateValue({ key: "socials", value: Static.item.socials })
                                        }}
                                    >
                                        {/* {Static.forms.socials[Static.channelNewSocial]?.link} */}
                                    </div>
                                    <h4>Upload gallery</h4>
                                    <div class="form-item pictures">
                                        <div class="picture" >
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
                                                                // console.log('=81bde2=', "onload")
                                                                if (!this.response) {
                                                                    alert("Have some Error. Try again...")
                                                                    return
                                                                }
                                                                let response = JSON.parse(this.response);
                                                                // console.log('=35f155=', response)
                                                                if (response.error || !response.name) {
                                                                    alert("Have some Error. Try again... " + response.error)
                                                                    return
                                                                }
                                                                Static.item.gallery.push(response.name)
                                                                updateValue({ key: "gallery", value: Static.item.gallery })
                                                                // let tmp = await fn.socket.set({ method: "Research", action: "findOneAndUpdate", _id: Static.item._id, params: { update: { gallery: Static.item.gallery } } })
                                                                initReload()
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
                                                                console.log("onprogress", e.loaded, contentLength)
                                                            }
                                                        })
                                                        return
                                                    })
                                                }}
                                            />
                                            <img
                                                src={images["card/1"]}
                                                onclick={() => {
                                                    Static.elAddMedia.click()
                                                }}
                                            ></img>
                                        </div>
                                        {
                                            Static.item.gallery.map((item, index) => {
                                                return (
                                                    <div class="picture">
                                                        <img src={`/assets/upload/${item}`}></img>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <div class="scheme-card">
                                        <div class="scheme-sidebar_item text">
                                            <span>Problem</span>
                                            <div
                                                class="form-input personal-input text-green"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.rankList.problem = Number(this.innerText.trim())
                                                    if (Static.item.rankList.problem || Static.item.rankList.problem >= 0) {
                                                        updateValue({ key: "rankList.problem", value: Static.item.rankList.problem })
                                                    }
                                                }}>
                                                {Static.item.rankList.problem}
                                            </div>
                                            <span class="text-green">Max. 10</span>
                                        </div>
                                        <div
                                            class="scheme-card_desc text"
                                            contenteditable="plaintext-only"
                                            oninput={function () {
                                                Static.item.problem = this.innerText.trim()
                                                updateValue({ key: "problem", value: Static.item.problem })
                                            }}>
                                            {Static.item.problem}
                                        </div>
                                    </div>

                                    <div class="scheme-card">
                                        <div class="scheme-sidebar_item text">
                                            <span>Product</span>
                                            <div
                                                class="form-input personal-input text-green"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.rankList.product = Number(this.innerText.trim())
                                                    if (Static.item.rankList.product || Static.item.rankList.product >= 0) {
                                                        updateValue({ key: "rankList.product", value: Static.item.rankList.product })
                                                    }
                                                }}>
                                                {Static.item.rankList.product}
                                            </div>
                                            {/* <span class="text-green">Max. 10</span> */}
                                        </div>
                                        <div
                                            class="scheme-card_desc text"
                                            contenteditable="plaintext-only"
                                            oninput={function () {
                                                Static.item.product = this.innerText.trim()
                                                updateValue({ key: "product", value: Static.item.product })
                                            }}>
                                            {Static.item.product}
                                        </div>
                                    </div>

                                    <div class="scheme-card">
                                        <div class="scheme-sidebar_item text">
                                            <span>Solution</span>
                                            <div
                                                class="form-input personal-input text-green"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.rankList.solution = Number(this.innerText.trim())
                                                    if (Static.item.rankList.solution || Static.item.rankList.solution >= 0) {
                                                        updateValue({ key: "rankList.solution", value: Static.item.rankList.solution })
                                                    }
                                                }}>
                                                {Static.item.rankList.solution}
                                            </div>
                                            {/* <span class="text-green">Max. 10</span> */}
                                        </div>
                                        <div
                                            class="scheme-card_desc text"
                                            contenteditable="plaintext-only"
                                            oninput={function () {
                                                Static.item.solution = this.innerText.trim()
                                                updateValue({ key: "solution", value: Static.item.solution })
                                            }}>
                                            {Static.item.solution}
                                        </div>
                                    </div>

                                    <div class="scheme-card">
                                        <div class="scheme-sidebar_item text">
                                            <span>Investors</span>
                                            <div
                                                class="form-input personal-input text-green"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.rankList.investors = Number(this.innerText.trim())
                                                    if (Static.item.rankList.investors || Static.item.rankList.investors >= 0) {
                                                        updateValue({ key: "rankList.investors", value: Static.item.rankList.investors })
                                                    }
                                                }}>
                                                {Static.item.rankList.investors}
                                            </div>
                                            <span class="text-green">Max. 4</span>
                                        </div>
                                        <div
                                            class="scheme-card_desc text"
                                            contenteditable="plaintext-only"
                                            oninput={function () {
                                                Static.item.investors = this.innerText.trim()
                                                updateValue({ key: "investors", value: Static.item.investors })
                                            }}>
                                            {Static.item.investors}
                                        </div>
                                    </div>

                                    <div class="scheme-card">
                                        <div class="scheme-sidebar_item text">
                                            <span>Documentation</span>
                                            <div
                                                class="form-input personal-input text-green"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.rankList.documentation = Number(this.innerText.trim())
                                                    if (Static.item.rankList.documentation || Static.item.rankList.documentation >= 0) {
                                                        updateValue({ key: "rankList.documentation", value: Static.item.rankList.investors })
                                                    }
                                                }}>
                                                {Static.item.rankList.documentation}
                                            </div>
                                            <span class="text-green">Max. 10</span>
                                        </div>
                                        <div
                                            class="scheme-card_desc text"
                                            contenteditable="plaintext-only"
                                            oninput={function () {
                                                Static.item.documentation = this.innerText.trim()
                                                updateValue({ key: "documentation", value: Static.item.documentation })
                                            }}>
                                            {Static.item.documentation}
                                        </div>
                                    </div>

                                    <div class="scheme-card">
                                        <div class="scheme-sidebar_item text">
                                            <span>Social</span>
                                            <div
                                                class="form-input personal-input text-green"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.rankList.social = Number(this.innerText.trim())
                                                    if (Static.item.rankList.social || Static.item.rankList.social >= 0) {
                                                        updateValue({ key: "rankList.social", value: Static.item.rankList.investors })
                                                    }
                                                }}>
                                                {Static.item.rankList.social}
                                            </div>
                                            <span class="text-green">Max. 10</span>
                                        </div>
                                        <div
                                            class="scheme-card_desc text"
                                            contenteditable="plaintext-only"
                                            oninput={function () {
                                                Static.item.social = this.innerText.trim()
                                                updateValue({ key: "social", value: Static.item.social })
                                            }}>
                                            {Static.item.social}
                                        </div>
                                    </div>

                                    <div class="scheme-card">
                                        <div class="scheme-sidebar_item text">
                                            <span>Launchpad</span>
                                            <div
                                                class="form-input personal-input text-green"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.rankList.launchpad = Number(this.innerText.trim())
                                                    if (Static.item.rankList.launchpad || Static.item.rankList.launchpad >= 0) {
                                                        updateValue({ key: "rankList.launchpad", value: Static.item.rankList.investors })
                                                    }
                                                }}>
                                                {Static.item.rankList.launchpad}
                                            </div>
                                            <span class="text-green">Max. 10</span>
                                        </div>
                                        <div
                                            class="scheme-card_desc text"
                                            contenteditable="plaintext-only"
                                            oninput={function () {
                                                Static.item.launchpad = this.innerText.trim()
                                                updateValue({ key: "launchpad", value: Static.item.launchpad })
                                            }}>
                                            {Static.item.launchpad}
                                        </div>
                                    </div>

                                    <div class="scheme-card">
                                        <div class="scheme-sidebar_item text">
                                            <span>CEX/DEX</span>
                                            <div
                                                class="form-input personal-input text-green"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.rankList.cexDex = Number(this.innerText.trim())
                                                    if (Static.item.rankList.cexDex || Static.item.rankList.cexDex >= 0) {
                                                        updateValue({ key: "rankList.cexDex", value: Static.item.rankList.investors })
                                                    }
                                                }}>
                                                {Static.item.rankList.cexDex}
                                            </div>
                                            <span class="text-green">Max. 10</span>
                                        </div>
                                        <div
                                            class="scheme-card_desc text"
                                            contenteditable="plaintext-only"
                                            oninput={function () {
                                                Static.item.cexDex = this.innerText.trim()
                                                updateValue({ key: "cexDex", value: Static.item.cexDex })
                                            }}>
                                            {Static.item.cexDex}
                                        </div>
                                    </div>

                                    <div class="scheme-card">
                                        <div class="scheme-sidebar_item text">
                                            <span>Listing on aggregator</span>
                                            <div
                                                class="form-input personal-input text-green"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.rankList.aggregator = Number(this.innerText.trim())
                                                    if (Static.item.rankList.aggregator || Static.item.rankList.aggregator >= 0) {
                                                        updateValue({ key: "rankList.aggregator", value: Static.item.rankList.aggregator })
                                                    }
                                                }}>
                                                {Static.item.rankList.aggregator}
                                            </div>
                                            <span class="text-green">Max. 10</span>
                                        </div>
                                        <div
                                            class="scheme-card_desc text"
                                            contenteditable="plaintext-only"
                                            oninput={function () {
                                                Static.item.aggregator = this.innerText.trim()
                                                updateValue({ key: "aggregator", value: Static.item.aggregator })
                                            }}>
                                            {Static.item.aggregator}
                                        </div>
                                    </div>

                                    <div class="scheme-card">
                                        <div class="scheme-sidebar_item text">
                                            <span>Competitors</span>
                                            <div
                                                class="form-input personal-input text-green"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.rankList.competitors = Number(this.innerText.trim())
                                                    if (Static.item.rankList.competitors || Static.item.rankList.competitors >= 0) {
                                                        updateValue({ key: "rankList.competitors", value: Static.item.rankList.competitors })
                                                    }
                                                }}>
                                                {Static.item.rankList.competitors}
                                            </div>
                                            <span class="text-green">Max. 10</span>
                                        </div>
                                        <div
                                            class="scheme-card_desc text"
                                            contenteditable="plaintext-only"
                                            oninput={function () {
                                                Static.item.competitors = this.innerText.trim()
                                                updateValue({ key: "competitors", value: Static.item.competitors })
                                            }}>
                                            {Static.item.competitors}
                                        </div>
                                    </div>

                                    <div class="scheme-card">
                                        <div class="scheme-sidebar_item text">
                                            <span>Media</span>
                                            <div
                                                class="form-input personal-input text-green"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.rankList.mediaText = Number(this.innerText.trim())
                                                    if (Static.item.rankList.mediaText || Static.item.rankList.mediaText >= 0) {
                                                        updateValue({ key: "rankList.mediaText", value: Static.item.rankList.mediaText })
                                                    }
                                                }}>
                                                {Static.item.rankList.mediaText}
                                            </div>
                                            <span class="text-green">Max. 10</span>
                                        </div>
                                        <div
                                            class="scheme-card_desc text"
                                            contenteditable="plaintext-only"
                                            oninput={function () {
                                                Static.item.mediaText = this.innerText.trim()
                                                updateValue({ key: "mediaText", value: Static.item.mediaText })
                                            }}>
                                            {Static.item.mediaText}
                                        </div>
                                    </div>

                                    <div class="scheme-card">
                                        <div class="scheme-sidebar_item text">
                                            <span>Audit</span>
                                            <div
                                                class="form-input personal-input text-green"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.rankList.audit = Number(this.innerText.trim())
                                                    if (Static.item.rankList.audit || Static.item.rankList.audit >= 0) {
                                                        updateValue({ key: "rankList.audit", value: Static.item.rankList.audit })
                                                    }
                                                }}>
                                                {Static.item.rankList.audit}
                                            </div>
                                            <span class="text-green">Max. 10</span>
                                        </div>
                                        <div
                                            class="scheme-card_desc text"
                                            contenteditable="plaintext-only"
                                            oninput={function () {
                                                Static.item.audit = this.innerText.trim()
                                                updateValue({ key: "audit", value: Static.item.audit })
                                            }}>
                                            {Static.item.audit}
                                        </div>
                                    </div>

                                    <div class="scheme-card">
                                        <div class="scheme-sidebar_item text">
                                            <span>TOTAL</span>
                                            <div
                                                class="form-input personal-input text-green"
                                                contenteditable="true"
                                                oninput={function () {
                                                    Static.item.rankList.totalText = Number(this.innerText.trim())
                                                    if (Static.item.rankList.totalText || Static.item.rankList.totalText >= 0) {
                                                        updateValue({ key: "rankList.totalText", value: Static.item.rankList.totalText })
                                                    }
                                                }}>
                                                {Static.item.rankList.totalText}
                                            </div>
                                            <span class="text-green">Max. 10</span>
                                        </div>
                                        <div
                                            class="scheme-card_desc text"
                                            contenteditable="plaintext-only"
                                            oninput={function () {
                                                Static.item.totalText = this.innerText.trim()
                                                updateValue({ key: "totalText", value: Static.item.totalText })
                                            }}>
                                            {Static.item.totalText}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            );
        },
    });
};

export default start;