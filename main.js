const electron = require('electron');
const Trie = require('./src/DataStructures/Trie.js');

const {app, BrowserWindow} = electron;

app.on('ready', () => {
   const mainWindow = new BrowserWindow({
       minWidth: 800,
       minHeight:600
   });  
   mainWindow.loadURL(`file://${__dirname}/src/index.html`);
}); 
