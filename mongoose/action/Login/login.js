import * as crypto from 'crypto';
import { Api } from "../../export.js"

const forExport = {}

forExport.all = async function ({ email, pass }, { uuid }) {
    email = email.toLowerCase()
    let checkuser = await Api["getUsers"].full({ filter: { email, password: crypto.createHash('md5').update("du" + pass + "ma").digest("hex") } }, { action: "findOne" })
    if (!checkuser) {
        return { error: [-11, "Email or password is not specified correctly"] }
    }
    await Api["setSessions"].full({ insert: { uuid, user: checkuser._id } }, { action: "insert" })
    return checkuser
}

export default forExport