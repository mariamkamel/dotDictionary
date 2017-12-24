let main = require('../../main.js')
const menuTemplate = [
    
    process.platform == 'darwin' ? {
        label: 'dotDictionary',
        submenu: [
            {
                label:'Quit dotDictionary',
                role: 'quit'
            }
        ]
    } : 
    {},
    {
        label:'File',
        submenu: [
            {
                label: 'Add new word',
                click(){

                }
            },
            process.platform=='win32'?
            {
                label: 'Quit dotDictionary',
            role: 'quit'
                
            }:
            {}
        ]
    },
    {

        label: 'Edit',
        submenu: [
            {
                label: 'Undo',
                accelerator: process.platform === 'darwin' ? 'Command+Z' : 'Ctrl+Z',
                click() {
                    main.history.undo();
                }
            },
            {
                label: 'Redo',
                accelerator: process.platform === 'darwin' ? 'Command+Shift+Z' : 'Ctrl+Y',
                click() {
                    main.history.redo();
                }
            },
            {
                label: 'Reload',
                role: 'reload',

            },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools()
                }
            },
            {
                label: 'Copy',
                role: 'copy',
                accelerator: process.platform === 'darwin' ? 'Command+C' : 'Ctrl+C',
            },
            {
                label: 'Paste',
                role: 'paste',
                accelerator: process.platform === 'darwin' ? 'Command+V' : 'Ctrl+V',
            },

        ]
    },
    {
        label: 'Window',
submenu:[
       {
        role: 'minimize'
      },
      {
         role: 'togglefullscreen'
      }
]
    }





]
module.exports = menuTemplate;