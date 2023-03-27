import * as crypto from 'crypto';
import { Api } from "../../export.js"

const forExport = {}

forExport.all = async function ({ email, pass, firstName }) {
    email = email.toLowerCase()
    let checkuser = await Api["getUsers"].full({ filter: { email } }, { action: "findOne" })
    if (checkuser) {
        return { error: [-10, "A user with such an email is registered"] }
    }
    await Api["setUsers"].full({ insert: { email, firstName, password: crypto.createHash('md5').update("du" + pass + "ma").digest("hex") } }, { action: "insert" })
    return []
}

export default forExport