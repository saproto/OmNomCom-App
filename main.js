const { app, BrowserWindow, globalShortcut } = require('electron')
require('update-electron-app')()

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        "frame": false,
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

// On OS X it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})