import express from 'express'
import path from "path";

const app = express();
const Router = express.Router();

const pathFile = path.resolve("public/assets/upload/")

console.log('=cab60f pathFile=', pathFile)
Router.post('/upload/:type', function (req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.json({ error: 'No files were uploaded.' });
    }

    var aceptParam = ["avatar", "question", "posts", "news", "answers", "galary", "exchange", "worldPress", "background", "chat", "gallery"]
    var aceptImage = ["png", "jpg", "jpeg", "gif"]
    var aceptVideo = ["mp4", "mov", "mkv", "avi", "flv"]
    var aceptAudio = ["mp3", "wav", "aiff", "aac", "ogg", "wma"]

    if (!req.params || req.params.type === undefined || aceptParam.indexOf(req.params.type) === -1) {
        return res.json({ error: 'Type not accepted' });
    }

    var sampleFile = req.files.media;
    //console.log("sampleFile.mimetype",sampleFile.mimetype)
    //if (sampleFile.name == "blob"){sampleFile.name = "blob.wav"}
    //console.log("==================================",sampleFile,req.params);
    var mime = sampleFile.mimetype.split("/")[0]
    var nameFile = sampleFile.md5
    var exe = sampleFile.name.split(".").pop().toLowerCase()
    if (exe == "jpg") { exe = "jpeg" }
    nameFile = nameFile + "." + exe

    var puthOrig = path.join(process.env.PATH_FILE, "upload/orig/", nameFile)
    var puthType = path.join(process.env.PATH_FILE, "upload/", req.params.type, nameFile)
    //console.log(puthType);
    if (mime == "image") {
        if (aceptImage.indexOf(exe) === -1) {
            return res.json({ error: 'Wrong extension' });
        }
        sampleFile.mv(puthOrig, function (err) { });
        if (req.params.type == "avatar") {
            if (exe != "gif") {
                if (process.env.OS == "Windows_NT") {
                    sampleFile.mv(puthType, function (err) {
                        if (err) {
                            console.log("Error upload file", err)
                            return res.json({ error: 'Some error' });
                        }
                        //console.log(err,"oh");
                        return res.json({ name: nameFile, mimetype: sampleFile.mimetype, size: sampleFile.size, error: null });
                    });
                } else {
                    gm(sampleFile.data)
                        .resize(240, 240, ">")
                        .write(puthType, function (err) {
                            if (err) {
                                console.log("Error upload file", err)
                                return res.json({ error: 'Some error' });
                            }
                            res.json({ name: nameFile, mimetype: sampleFile.mimetype, size: sampleFile.size, error: null });
                            return;
                        });
                }
            } else {
                sampleFile.mv(puthType, function (err) {
                    if (err) {
                        console.log("Error upload file GIF", err)
                        return res.json({ error: 'Some error' });
                    }
                    console.log(err, "oh2");
                    res.json({ name: nameFile, mimetype: sampleFile.mimetype, size: sampleFile.size, error: null });
                    return;
                });
            }

        } else if (req.params.type == "background") {
            if (exe != "gif") {
                if (process.env.OS == "Windows_NT") {
                    sampleFile.mv(puthType, function (err) {
                        if (err) {
                            console.log("Error upload file", err)
                            return res.json({ error: 'Some error' });
                        }
                        //console.log(err,"oh");
                        return res.json({ name: nameFile, mimetype: sampleFile.mimetype, size: sampleFile.size, error: null });
                    });
                } else {
                    gm(sampleFile.data)
                        .resize(1400, 1400, ">")
                        .write(puthType, function (err) {
                            if (err) {
                                console.log("Error upload file", err)
                                return res.json({ error: 'Some error' });
                            }
                            res.json({ name: nameFile, mimetype: sampleFile.mimetype, size: sampleFile.size, error: null });
                            return;
                        });
                }
            } else {
                sampleFile.mv(puthType, function (err) {
                    if (err) {
                        console.log("Error upload file GIF", err)
                        return res.json({ error: 'Some error' });
                    }
                    console.log(err, "oh2");
                    res.json({ name: nameFile, mimetype: sampleFile.mimetype, size: sampleFile.size, error: null });
                    return;
                });
            }
        } else {
            if (process.env.OS == "Windows_NT") {
                sampleFile.mv(puthType, function (err) {
                    if (err) {
                        console.log("Error upload file", err)
                        return res.json({ error: 'Some error' });
                    }
                    return res.json({ name: nameFile, mimetype: sampleFile.mimetype, size: sampleFile.size, error: null });
                });
            } else {
                gm(sampleFile.data)
                    .resize(850, 850, ">")
                    .write(puthType, function (err) {
                        if (err) {
                            console.log("Error upload file", err)
                            return res.json({ error: 'Some error' });
                        }
                        res.json({ name: nameFile, mimetype: sampleFile.mimetype, size: sampleFile.size, error: null });
                        return;
                    });
            }
        }
    } else if (mime == "video") {
        if (aceptVideo.indexOf(exe) === -1) {
            return res.json({ error: 'Wrong extension' });
        }
        sampleFile.mv(puthType, function (err) {
            if (err) {
                console.log("Error upload file", err)
                return res.json({ error: 'Some error' });
            }
            return res.json({ name: nameFile, mimetype: sampleFile.mimetype, size: sampleFile.size, error: null });
        });
    } else if (mime == "audio") {
        if (aceptAudio.indexOf(exe) === -1) {
            return res.json({ error: 'Wrong extension' });
        }
        sampleFile.mv(puthType, function (err) {
            if (err) {
                console.log("Error upload file", err)
                return res.json({ error: 'Some error' });
            }
            return res.json({ name: nameFile, mimetype: sampleFile.mimetype, size: sampleFile.size, error: null });
        });
    } else {
        return res.json({ error: 'Mimetype not undefinded' });
    }
});


const startExpress = function (port = 53535) {
    app.use(Router);
    app.listen(port, (error) => {
        if (error) {
            console.error("Ошибка запуска сервера.", error)
            return;
        } else {
            console.log("👍 Сервер запущен 👍\n Ошибок не обнаружено!")
            return;
        }
    });
}

export { startExpress }