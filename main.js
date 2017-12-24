const {app, BrowserWindow,Menu} = require('electron');
const Trie = require('./src/DataStructures/Trie.js');
const fs = require('fs');
const History = require('./src/DataStructures/History.js');

let dictionary = new Trie();
let dictionaryDB;
let history = new History();
let mainWindow;

try {
    dictionaryDB = require(`${__dirname}/dotDictionaryData.json`);
} catch(err) {
    dictionaryDB = {
        data: [],
    };
    fs.writeFile(`${__dirname}/dotDictionaryData.json`, JSON.stringify(dictionaryDB), 'utf8', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The Dictionary Data File was created successfully.");
        }
    });
}

loadTrieData(dictionaryDB.data);


app.on('ready', () => {
  const  mainWindow = new BrowserWindow({
        minWidth: 800,
        minHeight:600,
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

const menuTemplate = [
    {

        label: 'Edit',
        submenu: [   
            {
                label: 'Undo',
                accelerator: process.platform === 'drawin'? 'Command+Shift+Z':'Ctrl+Z',
                click(){
                    history.undo();
                }
            },
            {
                label: 'Redo',
                accelerator: process.platform === 'drawin'? 'Command+Shift+Y':'Ctrl+Y',
                click() {
                    history.redo();
                }
            },
           /* {
            label: 'Reload',
           role: 'reload',

            },*/
            {
                label: 'Copy',
                role: 'copy',
                accelerator: process.platform === 'drawin'? 'Command+C':'Ctrl+C',
            },
              {
                label: 'Paste',
                role: 'paste',
                accelerator: process.platform === 'drawin'? 'Command+V':'Ctrl+V',
            }
            
        ],
    },
    {
        label: 'File',
        submenu: [
             {
                label: 'Quit',
                accelerator: process.platform === 'drawin'? 'Command+Q': 'Ctrl+Q',
                click(){
                    app.quit();
                }
            },
        ]
    }
];

app.on('before-quit', () => {
    dictionaryDB.data = dictionary.getAll();
    fs.writeFile(`${__dirname}/dotDictionaryData.json`, JSON.stringify(dictionaryDB), 'utf8', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The Dictionary Data File was saved successfully.");
        }
    });
})

async function loadTrieData(dictionaryDB) {
    for (let word of dictionaryDB) {
        dictionary.insert(word.word, word.type, word.definition);
    }
}

exports.dictionary = dictionary;
exports.history = history;
