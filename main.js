const { app, BrowserWindow, globalShortcut } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        frame: false,
        fullscreen: true,
        show: true,
        experimentalFeatures: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            sandbox: true,
            nodeIntegration: false
        }
    });

    const store = process.env.STORE || app.commandLine.getSwitchValue("store");
    let url = "https://www.proto.utwente.nl/omnomcom/store/";
    if (store) {
        url += store;
    }
    else{
        url += "protopolis";
    }

    mainWindow.loadURL(url);

    globalShortcut.register("CmdOrCtrl+F12", () => {
        if (mainWindow.isFocused()) {
            mainWindow.webContents.toggleDevTools();
        }
    });

    globalShortcut.register("Escape", () => {
        app.quit();
    });
}

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.whenReady().then(() => {

    // Auto-update now that app is ready
    autoUpdater.checkForUpdatesAndNotify();

    createWindow();
});