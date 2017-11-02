const yargs = require('yargs');
const titleOption = {
    describe:"Title of note",
    demand:true,
    alias:"t"
};
const bodyOption = {
    describe:"Note Content",
    demand:true,
    alias:"b"
};
const args = yargs
.command("add","Add a new note",{
    title:titleOption,
    body:bodyOption
})
.command("list","List all notes")
.command("read","Read a note by title",{
    title:titleOption
})
.command("remove","Remove a note by title",{
    title:titleOption
})
.help()
.argv;
const notes = require('./notes');
const command = args._[0];
var title = args.title;
var body = args.body;
console.log("Starting app.js");

console.log(`Command ${command}`);
console.log(args);
 
switch(command){
    case "add":
        var note = notes.addNote(title,body);
        if(note){
          console.log("Note created");
          notes.logNote(note);
        }else{
          console.log("title is repeat! please rename title");
        }
        break;
    case "list":
        notesArray = notes.getAll();
        console.log(`Printing ${notesArray.length} note(s).`);
        notesArray.forEach(note=>{
            notes.logNote(note);
        });
        //console.log(notesArray);
        break;
    case "read":
        note = notes.getNote(title);
        if(note){
            console.log("Note read");
            notes.logNote(note);
        }else{
            notes.logNotfound();
        }
        break;
    case "remove":
        title = notes.removeNote(title);
        if(title){
            console.log(title+" is removed!");
        }else{
            notes.logNotfound();
        }
        break;
    default:
        console.log("Notfound this command");
}