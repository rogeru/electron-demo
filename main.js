// main process (node)
const {app, BrowserWindow, Menu, Tray, shell} = require('electron')

// Keep a global reference of the window and tray object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, tray;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {

  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800
  })

  // and load the index.html of the app.
  win.loadURL(`file:///${__dirname}/index.html`)

  // Open the DevTools.
  win.webContents.on('did-finish-load', () => {
    //win.webContents.openDevTools()
  })

  // Emitted when the window is closed.
  win.on('closed', function() {
    win = null;
  });

  tray = new Tray('circuit.png')
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open Circuit',
      click () { shell.openExternal('https://circuitsandbox.net')}
    },
     { role: 'quit' }
  ])
  tray.setContextMenu(contextMenu)
})

// Quit when all windows are closed.
app.on('window-all-closed', () => app.quit())
