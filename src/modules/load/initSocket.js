import { Variable, initReload } from '@betarost/cemserver/cem.js'
import { io } from "socket.io-client"

const options = {
    // reconnectionDelayMax: 10000,
    "force new connection": true,
    "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    "timeout": 10000, //before connect_error and connect_timeout are emitted.
    "transports": ["websocket"],
    pingTimeout: 3000,
    pingInterval: 3000,
    path: '/api/v2/',
    auth: {
        uuid: Variable.uuid
    }
}

let socket = null

const initSocket = async function () {

    return new Promise((resolve, reject) => {
        let linkTimer = setTimeout(() => {
            resolve()
        }, 1000);
        options.auth.uuid = Variable.uuid
        options.auth.status = Variable.auth
        // socket = io("/", options)
        socket = io(options)

        socket.on("connect", (socket) => {
            console.log('=862894=', "Socket connect!")
            Variable.socketConnect = true
            clearTimeout(linkTimer)
            if (Variable.load) {
                initReload()
            } else {
                resolve()
            }
        });

        socket.on('disconnect', () => {
            console.log('=862894=', "Socket disconnect!")
            // socket = null
            Variable.socketConnect = false
            clearTimeout(linkTimer)
            if (Variable.load) {
                initReload()
            } else {
                resolve()
            }
        });


        for (let key in Variable.socketList) {
            socket.on(key, Variable.socketList[key])
        }



    })
}

export { initSocket, socket };