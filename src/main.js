const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const mammoth = require("mammoth");

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 1024,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            devTools: true,
            contextIsolation: true,
        }
    })

    win.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })


})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.handle('read-file', async(_, path) => {

    if (path != undefined) {

        return await mammoth.convertToHtml({ path: path }).then((result) => result.value)
    }

    return ""
})