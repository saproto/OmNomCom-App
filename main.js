const { app, BrowserWindow, globalShortcut, remote } = require('electron')
require('update-electron-app')()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

// On OS X it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

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

    let url = 'https://www.proto.utwente.nl/omnomcom/store/'
    // Use an argument during startup to determine which store to open.
    url += app.commandLine.getSwitchValue("store") ?? remote.process.argv['store']

    mainWindow.loadURL(url)

    // Use Ctrl+12 to enable DevTools.
    globalShortcut.register("CmdOrCtrl+F12", () => {
        mainWindow.isFocused() && mainWindow.webContents.toggleDevTools()
    })

    // Press escape to quit application.
    globalShortcut.register("Escape", () => {
        app.quit()
    })
})