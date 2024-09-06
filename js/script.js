popup = () => {
    const popupContainer = document.createElement('div');
    popupContainer.id = 'popupContainer';
    popupContainer.innerHTML = `
   <div id="popupContainer">
        <h1>New Note</h1>
        <textarea id="note-text" placeholder= "Enter your note"></textarea>
        <div id = "btn-container">
            <button id = "submitbtn" onclick = "createNote()">Create Note</button>
            <button id = "closebtn" onclick = "closePopup()">Close</button>
        </div>
   </div>
    `;
    document.body.appendChild(popupContainer);
}

function closePopup(){
    const closebtn = document.getElementById('popupContainer');
    if(popupContainer){
        popupContainer.remove();
    }  
}

function createNote(){
    const popupContainer = document.getElementById('popupContainer');
    const noteText = document.getElementById('note-text').value;

    if(noteText.trim() !== ''){
        const note = {
            id: new Date().getTime(),
            text:  noteText
        }

        const exsitingNote = JSON.parse(localStorage.getItem('notes')) || [];
        exsitingNote.push(note);

        localStorage.setItem('notes', JSON.stringify(exsitingNote));
        document.getElementById('note-text').value = '';

        closePopup();
        displayNotes();

    }
    displayNotes();
}


function displayNotes(){
    const noteList = document.getElementById('notes-list');
    noteList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note =>{
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <span>${note.text}</span>
        <div class = "noteBtn-container">
        <button id = "editBtn" onclick = "editNote(${note.id})"><i class="fa-solid fa-pen"></i></button>
        <button id = "delBtn" onclick = "deleteNote(${note.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
    })

    noteList.appendChild(listItem);
    
};

editNote=(noteId)=>{
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note=>note.id==noteId);
    const noteText = noteToEdit ? noteToEdit.text : '';
    const editingPopup = document.createElement('div');
    editingPopup.id = 'editing-container';
    editingPopup.innerHTML = `
    <div id = "editing-container" date-note-id="${noteId}">
        <h1>Edit Note </h1>
        <textarea  id = "note-text">${noteText}</textarea>
        <div id="btn-container">
            <button id = "submitBtn" onclick = "updateNote()">Done<button>
            <button id = "closeBtn" onclick = "closeEditPopup()">Cancel<button>
        </div>   
    </div>
    `;

    document.body.appendChild(editingPopup);
}

displayNotes();
 
function closeEditPopup(){
    const editingPopup = document.getElementById("editing-container");
    if(editingPopup){
        editingPopup.remove();
    }
}

function updateNote(){
    const noteText = document.getElementById("note-text").value.trim();
    const editingPopup = document.getElementById("editing-container");

    if(noteText !== ''){
        const noteId = editingPopup.dataset.noteId;
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        // find note to update
        const updateNote = notes.map(note=>{
            if (note.id == noteId){
                return {id: note.id, text: noteText};
            }

            return note;
        })

        // update the note in the local storage
        localStorage.setItem('notes', JSON.stringify(updateNote));

        closeEditPopup();
        displayNotes();
    }
}




function deleteNote(noteId){
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

displayNotes(); 