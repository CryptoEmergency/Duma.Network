

const forExport = async function ({ file, onload, onprogress }) {
    let nameFile = "file.png"
    if (file.name) {
        nameFile = file.name
    }
    const formData = new FormData()
    formData.append('media', file, nameFile);
    let xhr = new XMLHttpRequest()
    xhr.open('POST', `/upload/`)
    xhr.onload = onload
    if (onprogress) {
        xhr.upload.onprogress = onprogress
    }
    xhr.send(formData)
    return
}

export default forExport