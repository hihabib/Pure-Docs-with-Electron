const { app } = require('electron');
const tableWindow = require('./menu/insert/tableWindow');
const { createMainWindow } = require('./windows/mainWindow');

app.whenReady().then(() => {
  const mainWindow = createMainWindow();
  tableWindow(mainWindow);
});
