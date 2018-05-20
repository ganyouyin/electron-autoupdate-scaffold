const path = require('path');
const url = require('url');
const {
    app,
    BrowserWindow,
    autoUpdater,
    dialog,
    ipcMain
} = require('electron');

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

    webContents.openDevTools();
};

app.on('ready', () => {
    if (require('electron-squirrel-startup')) {
        return;
    }

    createWindow();

    setTimeout(() => {
        require('update-electron-app')({
            repo: 'ganyouyin/electron-autoupdate-scaffold',
            logger: {
                log(...args) {
                    webContents.send('message', args);
                }
            }
        });
    }, 1000);
});

app.on('window-all-closed', () => app.quit());