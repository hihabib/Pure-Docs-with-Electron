const { dialog, ipcMain, app } = require('electron');
const fs = require('fs');

const subMenuFile = (mainWindow) => {
  let theFilePath = '';
  const saveFile = (filePath, data) => {
    fs.writeFile(filePath, data, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Saved Successfully');
      }
    });
  };
  const submenu = [
    {
      label: 'Save',
      click: async () => {
        if (theFilePath === '') {
          const { filePath } = await dialog.showSaveDialog(mainWindow, {
            title: 'Save pure document',
            defaultPath: 'untitled-pure-docs.pure',
          });
          theFilePath = filePath;
        }

        mainWindow.webContents.send('save');
        ipcMain.handle('content', (event, data) => {
          saveFile(theFilePath, data);
        });
      },
      accelerator: process.platform === 'darwin' ? 'Cmd+S' : 'Ctrl+S',
    },
    {
      label: 'Save As',
      click: async () => {
        const { filePath } = await dialog.showSaveDialog(mainWindow, {
          title: 'Save pure document',
          defaultPath: 'untitled-pure-docs.pure',
        });

        mainWindow.webContents.send('save');
        ipcMain.handle('content', (event, data) => {
          saveFile(filePath, data);
        });
      },
      accelerator: process.platform === 'darwin' ? 'Cmd+Shift+S' : 'Ctrl+Shift+S',
    },
    {
      label: 'Open file',
      click: async () => {
        const { filePaths } = await dialog.showOpenDialog(mainWindow, {
          filters: [{ name: 'Pure Docs File', extensions: ['pure'] }],
        });
        fs.readFile(filePaths[0], { encoding: 'utf8' }, (error, data) => {
          if (!error) {
            const [filePath] = filePaths;
            theFilePath = filePath;
            mainWindow.webContents.send('open-file', data);
          }
        });
      },
      accelerator: process.platform === 'darwin' ? 'Cmd+O' : 'Ctrl+O',
    },
    {
      label: 'Print current document',
      click: () => {
        mainWindow.webContents.send('print-docs');
      },
      accelerator: process.platform === 'darwin' ? 'Cmd+P' : 'Ctrl+P',
    },
    {
      label: 'Exit',
      click: () => {
        app.quit();
      },
    },
  ];
  return submenu;
};

module.exports = subMenuFile;
