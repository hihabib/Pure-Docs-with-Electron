const {
  app, BrowserWindow, Menu, dialog, ipcMain,
} = require('electron');
const windowStateKeeper = require('electron-window-state');
const path = require('path');
const fs = require('fs');
const isDev = require('electron-is-dev');

let mainWindow;

const saveFile = (filePath, data) => {
  fs.writeFile(filePath, data, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Saved Successfully');
    }
  });
};

const createMainWindow = () => {
  // Load the previous state with fallback to defaults
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800,
  });

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    backgroundColor: 'rgb(248, 249, 250)',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, 'src', 'img', 'icon.png'),
  });

  // show developer option if it is development mode
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  // get the file path if it is previously open
  let theFilePath = '';
  const menuItems = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Save',
          click: async () => {
            if (theFilePath === '') {
              const { filePath } = await dialog.showSaveDialog(mainWindow, {
                title: 'Save pure document',
                defaultPath: 'untitled-pure-docs.pure',
              });
              theFilePath = filePath;
            }

            mainWindow.webContents.send('save');
            ipcMain.handle('content', (event, data) => {
              saveFile(theFilePath, data);
            });
          },
        },
        {
          label: 'Open file',
          click: async () => {
            const { filePaths } = await dialog.showOpenDialog(mainWindow, {
              filters: [{ name: 'Pure Docs File', extensions: ['pure'] }],
            });
            fs.readFile(filePaths[0], { encoding: 'utf8' }, (error, data) => {
              if (!error) {
                const [filePath] = filePaths;
                theFilePath = filePath;
                mainWindow.webContents.send('open-file', data);
              }
            });
          },
        },
        {
          label: 'Close',
          click: () => {
            app.quit();
          },
        },
      ],
    },
  ];

  if (process.platform === 'darwin') {
    menuItems.unshift({});
  }
  const menu = Menu.buildFromTemplate(menuItems);

  Menu.setApplicationMenu(menu);
  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));
  // Let us register listeners on the window, so we can update the state
  // automatically (the listeners will be removed when the window is closed)
  // and restore the maximized or full screen state
  mainWindowState.manage(mainWindow);
};
app.whenReady().then(() => {
  createMainWindow();
});
