const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('handleFile', {
  call: (callback) => ipcRenderer.on('save', callback),
  save: ipcRenderer.invoke,
  open: (callback) => ipcRenderer.on('open-file', callback),
  print: (callback) => ipcRenderer.on('print-docs', callback),
  table: (callback) => ipcRenderer.on('table', callback),
});
