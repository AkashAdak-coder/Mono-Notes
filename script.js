const newNoteBtn = document.getElementById('newNoteBtn');
const notesList = document.querySelector('.notes-list');
const noteTitleInput = document.getElementById('note-title');
const noteContentDiv = document.getElementById('note-content');
const contentBox = document.querySelector('.content .input-box');

let notes = []; 
let currentNoteId = null; 

function createNewNote() {
    const newNote = {
        id: Date.now(),
        title: '',
        content: ''
    };
    notes.push(newNote);
    currentNoteId = newNote.id;
    noteTitleInput.value = '';
    contentBox.value = '';
    contentBox.focus();

    renderNotesList();
}

function renderNotesList() {
    notesList.innerHTML = '';
    notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note.title || 'Untitled';
        li.dataset.id = note.id;
        if (note.id === currentNoteId) li.classList.add('active');
        notesList.appendChild(li);
    });
}

function saveCurrentNote() {
    if (currentNoteId === null) return; 

    const note = notes.find(n => n.id === currentNoteId);
    if (!note) return;

    note.title = noteTitleInput.value || 'Untitled';
    note.content = contentBox.value;

    renderNotesList();
}

function openNote(id) {
    const note = notes.find(n => n.id == id);
    if (!note) return;

    currentNoteId = note.id;
    noteTitleInput.value = note.title;
    contentBox.value = note.content;

    renderNotesList();
}



newNoteBtn.addEventListener('click', createNewNote);

noteTitleInput.addEventListener('input', () => {
    saveCurrentNote(); 
});

contentBox.addEventListener('input', () => {
    saveCurrentNote(); 
});

notesList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        openNote(e.target.dataset.id);
    }
});

createNewNote();