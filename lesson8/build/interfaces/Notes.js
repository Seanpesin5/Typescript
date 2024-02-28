var Notes = /** @class */ (function () {
    function Notes() {
        this.notes = [];
        this.editingMode = false;
        this.notes = [];
        this.editingMode = false;
        document.getElementById('editModeToggle').addEventListener('change', this.toggleEditingMode.bind(this));
        document.getElementById('addNoteButton').addEventListener('click', this.addNote.bind(this));
        this.updateNotesDisplay(); // Initial display
    }
    Notes.prototype.toggleEditingMode = function () {
        this.editingMode = document.getElementById('editModeToggle').checked;
        document.getElementById('addNoteForm').style.display = this.editingMode ? 'block' : 'none';
        this.updateNotesDisplay();
    };
    Notes.prototype.addNote = function () {
        var title = document.getElementById('noteTitle').value;
        var text = document.getElementById('noteText').value;
        // Resetting input fields after adding a note
        document.getElementById('noteTitle').value = ''; // Reset input field
        document.getElementById('noteText').value = ''; // Reset textarea
        var newNote = { id: Date.now(), title: title, text: text }; // Simplified note structure
        this.notes.push(newNote);
        this.updateNotesDisplay();
    };
    Notes.prototype.deleteNoteById = function (noteId) {
        this.notes = this.notes.filter(function (note) { return note.id !== noteId; });
        this.updateNotesDisplay();
    };
    Notes.prototype.updateNotesDisplay = function () {
        var _this = this;
        var container = document.getElementById('notesContainer');
        container.innerHTML = ''; // Clear existing notes
        this.notes.forEach(function (note) {
            var noteElement = document.createElement('div');
            noteElement.innerHTML = "\n                <h3>".concat(note.title, "</h3>\n                <p>").concat(note.text, "</p>\n                ").concat(_this.editingMode ? "<button onclick=\"noteManager.deleteNoteById(".concat(note.id, ")\">Delete</button>") : '', "\n            ");
            container.appendChild(noteElement);
        });
    };
    return Notes;
}());
