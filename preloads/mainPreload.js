const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('handleFile', {
  call: (callback) => ipcRenderer.on('save', callback),
  save: ipcRenderer.invoke,
  open: (callback) => ipcRenderer.on('open-file', callback),
  print: (callback) => ipcRenderer.on('print-docs', callback),
  table: (callback) => ipcRenderer.on('table', callback),
});

contextBridge.exposeInMainWorld('handleTable', {
  // send table data to renderer
  tableData: (callback) => ipcRenderer.on('tableData', callback),
});

ipcRenderer.on('show-table', () => {
  ipcRenderer.invoke('show-table');
});
