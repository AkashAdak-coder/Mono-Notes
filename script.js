const newNoteBtn = document.getElementById('newNoteBtn');
const notesList = document.querySelector('.notes-list');
const noteTitleInput = document.getElementById('note-title');
const noteContentDiv = document.getElementById('note-content');
const contentBox = document.querySelector('.input-box');
const buttons = document.querySelectorAll('.toolbar-btn');

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
  contentBox.innerHTML = '';
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
  note.content = contentBox.innerHTML;

  renderNotesList();
}

function openNote(id) {
  const note = notes.find(n => n.id == id);
  if (!note) return;

  currentNoteId = note.id;
  noteTitleInput.value = note.title;
  contentBox.innerHTML = note.content;

  renderNotesList();
}

function formatText(styleType) {
  const selection = window.getSelection();
   if (!selection.rangeCount || selection.isCollapsed) return;

  const range = selection.getRangeAt(0);

  if (!contentBox.contains(range.commonAncestorContainer)) {
    console.log("Selection is outside the input box!");
    return;
  }

  // Apply requested style
  if (styleType === 'bold') {
    document.execCommand('bold', false, null);
  } else if (styleType === 'italic') {
    document.execCommand('italic', false, null);
  } else if (styleType === 'underline') {
    document.execCommand('underline', false, null);
  }

  saveCurrentNote();
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