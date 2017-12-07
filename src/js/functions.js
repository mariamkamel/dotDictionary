function openAddModal(){
    var modal = document.getElementById("add");
    var editmodal = document.getElementById("editmodal");
    modal.style.minHeight="260pt";
    modal.style.minWidth="350pt";
    modal.style.display= "block";
    editmodal.style.display="none";
    
}
function addWord(){
  var w =  document.getElementById('nameinput').value;
  var t = document.getElementById('typeinput').value;
  var d =document.getElementById('difinput').value;
  var s = " ";
  if (w.length==0){
      s+="You Should Enter A Word.\n";
  }
   if(t.length==0){
     s+="You Should Enter A Type.\n";
  }
   if (d.length==0){
     s+="You Should Enter A Definition.";
    
  }

  else {
    appending(w,d,t);
    document.getElementById("add").style.display ="none";
   document.getElementById("division");
   return;
  }
  alert(s);
}
function appending(word,definition,Type) {

    var main = document.getElementById("division");
    var req = document.getElementById("required");
    var inside =req.childNodes[1];
    var defDiv = req.childNodes[3];
    var cloned = req.cloneNode(true);
    var type = document.createElement("P");
    var t = document.createTextNode(Type);
    type.appendChild(t);
    type.className += "typeParagraph";
    var w = document.createElement("P");
    var Word = document.createTextNode(word);
    w.appendChild(Word);
    w.className += "word";
    var d = document.createElement("P");
    var define = document.createTextNode(definition);
    d.appendChild(define);
    d.className += "definitionClass"; 
    inside.replaceChild(w,inside.childNodes[1]);
    inside.replaceChild(type,inside.childNodes[2]);
    defDiv.replaceChild(d,defDiv.childNodes[1]);
    main.appendChild(cloned);
    req.style.display ="block";        
    
}

function deleteWord(){
    alert("Are you sure you want to delete it? :(");
}
function editWord(){
    var w =  document.getElementById('wordlbl').textContent;    
    var t = document.getElementById('editTypeInput').value;
    var d =document.getElementById('editDifInput').value;
    var s = " ";
     if(t.length==0){
       s+="You Should Enter A Type.\n";
    }
     if (d.length==0){
       s+="You Should Enter A Definition.";
      
    }
    else {
      appending(w,d,t);
      document.getElementById("editmodal").style.display ="none";
     document.getElementById("division");
     return;
    }
    alert(s);
}
function openEditModal(){
    var w =  document.getElementById('nameinput').value;
    var modal = document.getElementById("editmodal");
    var addmodal = document.getElementById("add");
    
    document.getElementById('wordlbl').innerHTML = w;
     
    modal.style.minHeight="260pt";
    modal.style.minWidth="350pt";
    modal.style.display= "block";
    addmodal.style.display="none";
    
}
function canceledit(){
    document.getElementById("editmodal").style.display ="none";
    document.getElementById("division");
    
}
function canceladd(){
    document.getElementById("add").style.display ="none";
    document.getElementById("division");
    
}