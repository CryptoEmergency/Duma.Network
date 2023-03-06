import { initGo, Variable, parsingUrl } from "@betarost/cemserver/cem.js";

const forExport = async function (e) {
    let link

    if (typeof e == "string") {
        link = e

    } else {
        e.preventDefault();
        if (!e.currentTarget || !e.currentTarget.href) {
            console.error("Not have href")
            return
        }
        link = e.currentTarget.href;
    }

    if (link == window.location.href || link == Variable.dataUrl.href) {
        history.pushState(null, null, link);
        initGo("newPage")
    } else {

        history.pushState(null, null, link);
        await parsingUrl()
    }
    return
}

export default forExport