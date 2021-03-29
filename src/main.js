const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const mammoth = require("mammoth");

const fs = require('fs').promises;

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

ipcMain.handle('read-file', async(ipcEvent, path) => {

    if (path != undefined) {

        const docxToHTML = mammoth.convertToHtml({ path: path }).then((result) => result).then((content) => content.value)

        const htmlContent = async(loadedFilePath) => {
            const html = await docxToHTML;
            return html;
        };

        return await htmlContent(path)
    }
})