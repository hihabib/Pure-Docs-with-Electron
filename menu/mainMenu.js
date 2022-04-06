const subMenuFile = require('./file');
const subMenuInsert = require('./insert');

// get the file path if it is previously open
const getMenuItems = (mainWindow) => {
  const menuItems = [
    {
      label: 'File',
      submenu: subMenuFile(mainWindow),
    },
    {
      label: 'Insert',
      submenu: subMenuInsert(mainWindow),
    },
  ];
  if (process.platform === 'darwin') {
    menuItems.unshift({});
  }
  return menuItems;
};

module.exports = getMenuItems;
