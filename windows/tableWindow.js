const { BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let table;
const tableWindow = (parent) => {
  table = new BrowserWindow({
    height: 300,
    width: 400,
    modal: true,
    show: false,
    frame: false,
    resizable: false,
    parent,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preloads', 'tablePreloads.js'),
    },
  });

  // hide table after cliking on cancle button from modal
  ipcMain.handle('cancel-insert', () => {
    table.hide();
  });
  // show table after clicking on "Insert table" item from menu
  ipcMain.handle('show-table', () => {
    table.show();
  });
  ipcMain.handle('close', () => {
    table.close();
  });
  table.loadFile(path.join(__dirname, '..', 'src', 'windows', 'insert-table.html'));
  if (isDev) {
    // table.webContents.openDevTools();
  }
};

module.exports = tableWindow;
