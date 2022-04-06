const { app } = require('electron');
const { createMainWindow } = require('./windows/mainWindow');

app.whenReady().then(() => {
  createMainWindow();
});
