const {remote} = require('electron');
const {dictionary} = remote.require('./main.js');

function openAddModal() {
    canceledit();
    const modal = document.getElementById("add");
    modal.style.minHeight = "260pt";
    modal.style.minWidth = "350pt";
    modal.style.display = "block";
}

function addWord() {
    const word =  document.getElementById('nameinput').value;
    const type = document.getElementById('typeinput').value;
    const definition = document.getElementById('difinput').value;
    let err = "";
    if (!word.length) {
        err = "You Should Enter A Word.";
    } else if (!type.length) {
        err = "You Should Enter A Type.";
    } else if (!definition.length) {
        err = "You Should Enter A Definition.";  
    } else {
        dictionary.insert(word, type, definition);
        appendWord(word, definition, type);
        document.getElementById("add").style.display = "none";
        return;
    }
    alert(err);
}

function appendWord(word, definition, type) {
    let main = document.getElementById('division');
    let element = document.getElementById('required').cloneNode(true);

    let wordElement = element.childNodes[1].childNodes[1];
    let typeElement = element.childNodes[1].childNodes[3];
    let defElement = element.childNodes[3];
    
    element.childNodes[5].addEventListener('click', function(e) {
        openEditModal(word, type, definition);
    });

    element.childNodes[7].addEventListener('click', function(e) {
        console.log(word);
        deleteWord();
    });

    wordElement.innerHTML = word;
    typeElement.innerHTML = `.${type}.`;
    defElement.innerHTML = definition;

    element.style.display = 'block';
    main.appendChild(element);
}

function deleteWord() {
    console.log(
    confirm("Are you sure you want to delete it? :("));
}

function editWord() {
    const word =  document.getElementById('wordlbl').textContent;    
    const type = document.getElementById('editTypeInput').value;
    const definition = document.getElementById('editDifInput').value;
    let err = "";
    if (!type.length) {
        err = "You Should Enter A Type.\n";
    } else if (!definition.length) {
        err = "You Should Enter A Definition."; 
    } else {
        appendWord(word, definition, type);
        document.getElementById("editmodal").style.display = "none";
        return;
    }
    alert(err);
}

function openEditModal(word, type, definition) {
    canceladd();
    const modal = document.getElementById("editmodal");

    document.getElementById('wordlbl').innerHTML = word;
    document.getElementById('editTypeInput').value = type;
    document.getElementById('editDifInput').value = definition;
    
    modal.style.minHeight = "260pt";
    modal.style.minWidth = "350pt";
    modal.style.display = "block";
}

function canceledit() {
    document.getElementById("editmodal").style.display = "none";    
}

function canceladd() {
    document.getElementById("add").style.display = "none";
}

function speechRecognition() {
    alert('you have clicked');
}

function submitSearch() {
    const query = document.getElementById('searchField').value;
    if (!query) return;
    
    renderElements(dictionary.search(query));
}

function showAllFunc() {
    document.getElementById('searchField').value = null;
    renderElements(dictionary.getAll());
}

function renderElements(result) {
    document.getElementById('division').innerHTML = null;
    if (!result) return;
    for (let word of result) {
        appendWord(word.word, word.definition, word.type);
    }
}