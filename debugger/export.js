

const closeServer = async function (fn) {

    fn()
    return
}

const runDebugger = function () {
    process.on('uncaughtException', async function (error) {
        let errText = "🔔❗️ uncaughtException Error ❗️🔔\n\n"
        if (error?.message) {
            errText += error.message + "\n\n"
            // Если надо в телегу отправляем
            // errText += error.stack
        } else {
            errText += error
            // Если надо в телегу отправляем
        }

        console.error(errText);
    })

    process.on('unhandledRejection', async function (error, promise) {
        // console.log('=d40c88=', promise)
        let errText = "🔔❗️ unhandledRejection Error ❗️🔔\n\n"
        if (error?.message) {
            errText += error.message + "\n\n"
            // Если надо в телегу отправляем
            // errText += error.stack
        } else {
            errText += error
            // Если надо в телегу отправляем
        }

        console.error(errText);
        closeServer(() => {
            process.exit(1);
        });
        setTimeout(() => {
            process.abort();
        }, 1000).unref()
    })
}

export { runDebugger }