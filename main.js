if (require('electron-squirrel-startup')) return;

require('update-electron-app')();

const {
    app,
    BrowserWindow,
    autoUpdater,
    dialog,
    ipcMain
} = require('electron');
const path = require('path');
const url = require('url');

let webContents;

let createWindow = () => {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            devTools: true
        }
    });

    webContents = win.webContents;

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'src/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    // webContents.openDevTools();
};

app.on('ready', () => createWindow());

app.on('window-all-closed', () => app.quit());