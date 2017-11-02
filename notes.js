console.log('Starting notes');
const fs = require('fs');
const fileName = "notes-data.json";

var fetchNotes = ()=>{
    try{
        var notesString = fs.readFileSync(fileName);
        notes = JSON.parse(notesString);
        return notes;
    }catch(e){
        return [];
    }
}
var saveNotes = (notes)=>{
    fs.writeFileSync(fileName,JSON.stringify(notes));
}

var addNote = (title,body)=>{
    var notes = [];
    var note = {
        title,
        body
    }
    notes = fetchNotes();
    var duplicateNotes = notes.filter((o)=>{ return o.title == title});
    if(duplicateNotes.length){
        return 0;
    }else{
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () =>{
    var notes = fetchNotes();
    return notes;
};

var getNote = (title)=>{
    var notes = fetchNotes();
    var note = notes.filter((o)=>{ return o.title == title});
    if(note.length){
        return note[0];
    }else{
        return 0;
    }
}

var removeNote = (title)=>{
    var notes = fetchNotes();
    var notesFilter = notes.filter((o)=>{ return o.title != title});
    if(notesFilter.length != notes.length){
        saveNotes(notesFilter);
        return title;
    }else{
        return 0;
    }
}

var logNote = (note)=>{
    debugger;
    //Break on this line and use repl to output note
    //Use read command with --title
    console.log("--");
    console.log(`Title ${note.title}`);
    console.log(`Body ${note.body}`);
}

var logNotfound = ()=>{
    console.log("Note notfound!");
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote,
    logNotfound
}