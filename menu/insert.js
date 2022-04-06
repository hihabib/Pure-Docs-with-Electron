const subMenuInsert = (mainWindow) => {
  const submenu = [
    {
      label: 'Insert table',
      accelerator: process.platform === 'darwin' ? 'Cmd+Shift+T' : 'Ctrl+Shift+T',
      click: () => {
        mainWindow.webContents.send('show-table');
      },
    },
  ];

  return submenu;
};

module.exports = subMenuInsert;
