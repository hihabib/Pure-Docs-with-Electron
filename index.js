const { app } = require('electron');
const { createMainWindow } = require('./windows/mainWindow');
const tableWindow = require('./windows/tableWindow');

app.whenReady().then(() => {
  const mainWindow = createMainWindow();
  tableWindow(mainWindow);
});
