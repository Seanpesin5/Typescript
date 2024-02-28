var NoteManager = /** @class */ (function () {
    function NoteManager() {
        this.notes = [];
        this.editingMode = false;
        this.setupEventListeners();
    }
    NoteManager.prototype.setupEventListeners = function () {
        var _this = this;
        document.getElementById('editModeToggle').addEventListener('change', function (e) {
            _this.toggleEditingMode();
        });
    };
    NoteManager.prototype.toggleEditingMode = function () {
        var isChecked = document.getElementById('editModeToggle').checked;
        this.editingMode = isChecked;
        this.updateNotesDisplay();
    };
    NoteManager.prototype.updateNotesDisplay = function () {
        var _this = this;
        var notesContainer = document.getElementById('notesContainer');
        notesContainer.innerHTML = ''; // Clear current notes display
        this.notes.forEach(function (note) {
            var noteElement = document.createElement('div');
            noteElement.innerHTML = "\n                <h3>".concat(note.title, "</h3>\n                <p>").concat(note.text, "</p>\n                ").concat(_this.editingMode ? '<button onclick="noteManager.deleteNoteById(' + note.id + ')">Delete</button>' : '', "\n            ");
            notesContainer.appendChild(noteElement);
        });
    };
    return NoteManager;
}());
