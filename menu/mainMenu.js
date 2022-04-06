const subMenuFile = require('./file');

// get the file path if it is previously open
const getMenuItems = (mainWindow) => {
  const menuItems = [
    {
      label: 'File',
      submenu: subMenuFile(mainWindow),
    },
  ];
  if (process.platform === 'darwin') {
    menuItems.unshift({});
  }
  return menuItems;
};

module.exports = getMenuItems;
