import { parsingUrl, Variable, Data } from '@betarost/cemserver/cem.js'

const loadListen = async function () {
    try {
        document.addEventListener('click', async function (e) {
            if (Data.Static.elVideoMain && Data.Static.elVideoMain.paused) {
                try {
                    Data.Static.elVideoMain.play()
                } catch (error) {
                    console.error(error)
                }
            }
        })

        // window.addEventListener("scroll", function () {
        //     console.log('=ab023b=', Data.Static.elVideoMain, Data.Static.elVideoMain.paused)
        //     if (Data.Static.elVideoMain && Data.Static.elVideoMain.paused) {
        //         try {
        //             Data.Static.elVideoMain.play()
        //         } catch (error) {
        //             console.error(error)
        //         }
        //     }
        // })

        window.onpopstate = function (e) {
            e.preventDefault()
            parsingUrl()
        }

        await parsingUrl();
        return

    } catch (error) {
        console.error(error, "loadListen")
    }
}

export { loadListen };