const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('handleTable', {
  // get row and column from insert-table.html and send to mainWindow.js (main)
  insertTable: (row, column) => ipcRenderer.invoke('insert-table', row, column),
});
// get response after getting row and column
// and give a response to close to tableWindow.js (main
ipcRenderer.on('close', () => ipcRenderer.invoke('test'));
