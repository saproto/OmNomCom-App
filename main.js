const { app, BrowserWindow, globalShortcut } = require('electron')
const autoUpdater = require("electron-updater");

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        "frame": true,
        "fullscreen": true,
        "show": true,
        "experimentalFeatures" : true,
        "webPreferences": {
            "allowDisplayingInsecureContent": true,
            "allowRunningInsecureContent": true,
            "webSecurity": false,
            "nodeIntegration": false
        }
    });

    mainWindow.loadURL('https://www.proto.utwente.nl/omnomcom/store/')

    // Use Ctrl+12 to enable DevTools
    globalShortcut.register("CmdOrCtrl+F12", () => {
        mainWindow.isFocused() && mainWindow.webContents.toggleDevTools()
    })

    // Press escape to quit application
    globalShortcut.register("Escape", () => {
        app.quit()
    })
})

// Automatically check for updates whenever the app is started.
app.on("ready", () => {
    autoUpdater.checkForUpdatesAndNotify();
});

// On OS X it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})