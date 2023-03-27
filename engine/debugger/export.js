import fs from 'fs';
import { telegramSend } from '../telegram/export.js';
import { dirname, join as PatchJoin } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __logs = PatchJoin(__dirname, "../../logs/")

const catchError = async function (error, str, ret) {
    let telMessage = `🔔❗️ Catch (${str}) ❗️🔔\n\n`
    let errText = `🔔❗️ Catch (${str}) ❗️🔔\n`
    if (error?.message) {
        telMessage += error.message
        errText += error.message + "\n"
        errText += error.stack
    } else {
        telMessage += error
        errText += error
    }
    console.error(telMessage);
    await writeLogs(errText)
    await telegramSend(telMessage)
    return ret
}

const writeLogs = async function (errorText) {
    return new Promise((resolve, reject) => {
        try {
            let today = new Date();
            let today_file_name = today.getDate() + '.' + today.getMonth() + '.' + today.getFullYear() + '.log'
            let str = (new Date).toUTCString() + '\n=======>\n' + errorText + '\n<=======\n'
            let pathLogsFile = PatchJoin(__logs, today_file_name);
            fs.appendFile(pathLogsFile, str, function (error) {
                if (error) throw error;
                resolve(true)
            });
        } catch (error) {
            console.error("Ошибка writeLogs", error);
            resolve(true)
        }
    })
}

const closeServer = async function (error, telMessage, fn) {
    console.error(telMessage);
    await writeLogs(error)
    await telegramSend(telMessage)
    fn()
    return
}

const runDebugger = function () {
    process.on('uncaughtException', async function (error) {
        let telMessage = "🔔❗️ Unhandled Exception ❗️🔔\n\n"
        let errText = "🔔❗️ Unhandled Exception ❗️🔔\n"
        if (error?.message) {
            telMessage += error.message
            errText += error.message + "\n"
            errText += error.stack
        } else {
            telMessage += error
            errText += error
        }

        closeServer(errText, telMessage, () => {
            process.exit(1);
        });

        setTimeout(() => {
            process.abort();
        }, 5000).unref()
    })

    process.on('unhandledRejection', async function (error, promise) {
        let telMessage = "🔔❗️ Unhandled Rejection ❗️🔔\n\n"
        let errText = "🔔❗️ Unhandled Rejection ❗️🔔\n"
        if (error?.message) {
            telMessage += error.message
            errText += error.message + "\n"
            errText += error.stack
        } else {
            telMessage += error
            errText += error
        }

        closeServer(errText, telMessage, () => {
            process.exit(1);
        });

        setTimeout(() => {
            process.abort();
        }, 2000).unref()
    })
}

export { runDebugger, writeLogs, catchError }