const { BrowserWindow } = require('electron');
const path = require('path');
// const isDev = require('electron-is-dev');

let table;
const tableWindow = (parent) => {
  table = new BrowserWindow({
    height: 200,
    width: 400,
    modal: true,
    show: true,
    parent,
  });
  table.loadFile(path.join(__dirname, 'window', 'index.html'));
  // if (isDev) {
  //   table.webContents.openDevTools();
  // }
};

module.exports = tableWindow;
