import * as http from "http"
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import { Server } from "socket.io";
import { Api } from "../mongoose/export.js";

const server = http.createServer();
const io = new Server(server, {
    path: '/api/v2',
    pingTimeout: 3000,
    pingInterval: 3000,
    transports: ['websocket'],
    // allowUpgrades: false,
    // upgrade: false,
    // cookie: false
});

const onCrypto = {}

onCrypto.wrong = async function ({ _id = null, method, params, result, error }, callback) {
    if (callback) { callback({ result: [], error: [-2, "Wrong handshake"] }) }
    return
}

onCrypto.standart = async function ({ _id = null, method, params = {}, result, error, action }, callback) {
    if (!method || !Api[method]) {
        if (callback) { callback({ result: [], error: [-1, "Method not found"] }) }
        return
    }

    if (!this.userInfo) {
        const session = await Api["getSessions"].full({
            filter: { uuid: this.uuid }, populate: {
                path: 'user',
                select: {
                    _id: 1,
                    firstName: 1,
                    email: 1,
                    role: 1
                },
            }
        }, { action: "findOne" })
        if (!session) {
            this.userType = "visitors"
            this.userAuth = false
            this.userInfo = {}
        } else {
            this.userType = "auth"
            this.userAuth = true
            this.userInfo = session.user
        }
    }
    const response = { result: [] }
    if (Api[method].all) {
        let tmp = await Api[method].all({ ...params }, { _id, userInfo: this.userInfo, uuid: this.uuid, action })
        if (!tmp) { tmp = {} }
        if (tmp.error) {
            response.result = []
            response.error = tmp.error
        } else { response.result = tmp }
        if (callback) { callback(response) }
        return
    }
    if (!Api[method][this.userType]) {
        response.error = [-3, "Method type not found"]
        if (callback) {
            callback(response)
        }
        return
    }

    response.result = await Api[method][this.userType]({ ...params }, { _id, userInfo: this.userInfo, uuid: this.uuid, action })
    if (callback) { callback(response) }
    return
}

io.on("connection", async function (socket) {
    if (!socket.handshake || !socket.handshake.auth || typeof socket.handshake.auth.uuid == "undefined" || typeof socket.handshake.auth.status == "undefined") {
        socket.on("Crypto", onCrypto.wrong);
        return;
    }

    if (socket.handshake.auth.uuid == 0) {
        socket.uuid = uuidv4()
    } else {
        if (validator.isUUID(socket.handshake.auth.uuid, 4)) {
            socket.uuid = socket.handshake.auth.uuid
        } else {
            socket.uuid = uuidv4()
        }
    }
    socket.on("Crypto", onCrypto.standart);

    const response = { method: "update", params: [socket.uuid] }
    const session = await Api["getSessions"].full({
        filter: { uuid: socket.uuid }, populate: {
            path: 'user',
            select: {
                _id: 1,
                firstName: 1,
                email: 1,
                role: 1
            },
        }
    }, { action: "findOne" })

    if (!session) {
        socket.userType = "visitors"
        socket.userAuth = false
        socket.userInfo = {}
    } else {
        socket.userType = "auth"
        socket.userAuth = true
        socket.userInfo = session.user
    }

    response.params.push(socket.userInfo)
    socket.emit("myInfo", response)

    let timerLink = setInterval(async () => {
        const response = { method: "update", params: [socket.uuid] }
        const session = await Api["getSessions"].full({
            filter: { uuid: socket.uuid }, populate: {
                path: 'user',
                select: {
                    _id: 1,
                    firstName: 1,
                    email: 1,
                    role: 1
                },
            }
        }, { action: "findOne" })
        if (!session) {
            socket.userType = "visitors"
            socket.userAuth = false
            socket.userInfo = {}
        } else {
            socket.userType = "auth"
            socket.userAuth = true
            socket.userInfo = session.user
        }

        response.params.push(socket.userInfo)
        socket.emit("myInfo", response)
    }, 3000);

    socket.on('disconnect', () => { clearInterval(timerLink) });
});

const startSocket = async function (port) {
    io.listen(port);
}

export { startSocket, io }