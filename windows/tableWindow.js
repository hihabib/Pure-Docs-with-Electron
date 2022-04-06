const { BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let table;
const tableWindow = (parent) => {
  table = new BrowserWindow({
    height: 300,
    width: 400,
    modal: true,
    show: true,
    frame: false,
    parent,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preloads', 'tablePreloads.js'),
    },
  });
  ipcMain.handle('test', () => {
    table.close();
  });
  table.loadFile(path.join(__dirname, '..', 'src', 'windows', 'insert-table.html'));
  if (isDev) {
    table.webContents.openDevTools();
  }
};

module.exports = tableWindow;
