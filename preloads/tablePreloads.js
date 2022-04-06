const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('handleTable', {
  insertTable: (row, column) => ipcRenderer.invoke('insert-table', row, column),
});
