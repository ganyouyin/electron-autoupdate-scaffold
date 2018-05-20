const { app, BrowserWindow, autoUpdater } = require('electron');
const path = require('path');
const url = require('url');

let createWindow = ({ url, width = 800, height = 600 }) => {
    let win = new BrowserWindow({ width, height });

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, url),
            protocol: 'file:',
            slashes: true
        })
    );
};

app.on('ready', () => {
    // 安装后第一次启动不去检测更新，go做的事情就是启动我们的应用
    if (process.argv[1] == '--squirrel-firstrun') {
        createWindow({ url: 'src/index.html' });
        return;
    }

    const feedURL = 'http://127.0.0.1:8080/latest';

    autoUpdater.setFeedURL(feedURL);
    autoUpdater.on('update-downloaded', () => autoUpdater.quitAndInstall()); // 下载完成，更新前端显示
    try {
        // 不是安装应用的情况下启动下会出错，此时直接正常启动应用
        autoUpdater.checkForUpdates();
    } catch (ex) {
        console.log('checkForUpdates 出错', ex);
        return createWindow({ url: 'src/index.html' });
    }

    // createWindow是我们自己定义的方法，用来创建窗口，此处用来创建检测更新的窗口
    createWindow({
        name: 'updateWindow',
        url: 'check-for-updates.html',
        title: "checkForUpdates",
        frame: false,
        width: 1306,
        height: 750
    });
});

app.on('window-all-closed', () => app.quit());