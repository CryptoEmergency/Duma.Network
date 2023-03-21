import express from 'express'
import path from "path";
import fileUpload from 'express-fileupload'
const app = express();
const Router = express.Router();

const pathFile = path.resolve("public/assets/upload/")

app.use(fileUpload());

Router.post('/upload', function (req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.json({ error: 'No files were uploaded.' });
    }

    const acceptExe = ["png", "jpg", "jpeg", "gif", "mp4", "mov", "mkv", "avi", "flv", "mp3", "wav", "aiff", "aac", "ogg", "wma"]



    var sampleFile = req.files.media;
    var mime = sampleFile.mimetype.split("/")[0]
    var nameFile = sampleFile.md5
    var exe = sampleFile.name.split(".").pop().toLowerCase()
    if (exe == "jpg") { exe = "jpeg" }
    nameFile = nameFile + "." + exe

    if (acceptExe.indexOf(exe) === -1) {
        return res.json({ error: 'Wrong extension' });
    }

    var puthType = path.join(pathFile, nameFile)

    sampleFile.mv(puthType, function (err) {
        if (err) {
            console.log("Error upload file", err)
            return res.json({ error: 'Some error' });
        }
        return res.json({ name: nameFile, mimetype: sampleFile.mimetype, size: sampleFile.size, error: null });
    });
});


const startExpress = async function (port = 53535) {
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