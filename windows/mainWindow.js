const { BrowserWindow, Menu, ipcMain } = require('electron');
const windowStateKeeper = require('electron-window-state');
const path = require('path');
const isDev = require('electron-is-dev');
const getMenuItems = require('../menu/mainMenu');

let mainWindow;
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
      preload: path.join(__dirname, '..', 'preloads', 'mainPreload.js'),
    },
    icon: path.join(__dirname, '..', 'src', 'img', 'icon.png'),
  });
  // show developer option if it is development mode
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  const menu = Menu.buildFromTemplate(getMenuItems(mainWindow));

  Menu.setApplicationMenu(menu);

  ipcMain.handle('insert-table', (event, row, column) => {
    console.log(row, column);
    event.sender.send('close');
  });
  mainWindow.loadFile(path.join(__dirname, '..', 'src', 'window', 'index.html'));

  // Let us register listeners on the window, so we can update the state
  // automatically (the listeners will be removed when the window is closed)
  // and restore the maximized or full screen state
  mainWindowState.manage(mainWindow);

  return mainWindow;
};

module.exports = { createMainWindow };
