async function fileSelected(e) {

    let loadedFile = e.target.files[0];

    if (loadedFile === undefined)
        return;

    const loadedFilePath = loadedFile.path;

    let data = await readDocxFile(loadedFilePath)
    document.getElementById("pruebaMark").innerHTML = data
}

async function readDocxFile(loadedFilePath) {

    let data = await window.electron.ipcRenderer.invoke('read-file', loadedFilePath)

    return data
}

document.getElementById("fileLoader").addEventListener("change", fileSelected);