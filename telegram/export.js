
import fetch from "node-fetch";

const telegramSend = async function (str) {
    if (!process.env.TELTOKEN) {
        return
    }
    return new Promise(async (resolve, reject) => {
        let loc = "Office"
        if (process.env.DISABLERELOAD) {
            loc = "Server"
        }
        const btoken = process.env.TELTOKEN
        var postData = { chat_id: -748894302 };
        postData.text = `📡 DUMA (${loc}) 📡\n${str}`;
        postData.disable_web_page_preview = true;
        const url = `https://api.telegram.org/bot${btoken}/sendMessage`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            // const result = await response.json();
            resolve(true)
        } catch (error) {
            console.error('Error Telegram', error)
            resolve(true)
        }
    })
}

export { telegramSend }