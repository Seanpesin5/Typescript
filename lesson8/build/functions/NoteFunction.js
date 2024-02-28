var NoteFunction = /** @class */ (function () {
    function NoteFunction() {
        this.lastId = 4;
        this.allNotes = [];
        this.addSampleNotes();
        this.render();
        this.setupEventListeners();
    }
    NoteFunction.prototype.removeNote = function (noteId) {
        this.allNotes = this.allNotes.filter(function (note) { return note.id !== noteId; });
        this.render();
    };
    NoteFunction.prototype.setupRemoveNoteListeners = function () {
        var _this = this;
        document.addEventListener('DOMContentLoaded', function () {
            var notesContainer = document.getElementById('notesContainer');
            notesContainer.addEventListener('click', function (event) {
                var target = event.target;
                if (target.classList.contains('remove-note')) {
                    var noteId_1 = parseInt(target.getAttribute('data-id'), 10);
                    if (!isNaN(noteId_1)) {
                        _this.allNotes = _this.allNotes.filter(function (note) { return note.id !== noteId_1; });
                        _this.render();
                    }
                }
            });
        });
    };
    NoteFunction.prototype.EditmodeLisnteners = function () {
        var _this = this;
        var edit = document.getElementById('editMode');
        edit.addEventListener('change', function () {
            _this.render();
        });
    };
    NoteFunction.prototype.setupEventListeners = function () {
        var _this = this;
        this.EditmodeLisnteners();
        this.setupRemoveNoteListeners();
        var addNoteButton = document.getElementById('addNoteButton');
        if (addNoteButton) {
            addNoteButton.addEventListener('click', function () { return _this.addNote(); });
        }
        else {
            console.error('Add Note button not found');
        }
        var noteTypeSelect = document.getElementById('noteType');
        noteTypeSelect.addEventListener('change', function (event) {
            var selectedType = event.target.value;
            _this.generateDynamicInputs(selectedType);
        });
    };
    NoteFunction.prototype.render = function () {
        this.displayNotes();
    };
    NoteFunction.prototype.generateDynamicInputs = function (noteType) {
        console.log("Generating inputs for note type: ".concat(noteType));
        var dynamicInputsContainer = document.getElementById('dynamicInputs');
        dynamicInputsContainer.innerHTML = '';
        var inputHtml = '';
        var numberOfInputs = 0;
        switch (noteType) {
            case 'task':
                numberOfInputs = 3;
                break;
            case 'meeting':
                numberOfInputs = 4;
                break;
            case 'sportsAndLeisure':
                numberOfInputs = 5;
                break;
            default:
                numberOfInputs = 0;
                break;
        }
        for (var i = 1; i <= numberOfInputs; i++) {
            inputHtml += "<label id=\"label".concat(i, "\" for=\"input").concat(i, "\"></label><input type=\"text\" id=\"input").concat(i, "\" name=\"input").concat(i, "\"><br>");
        }
        dynamicInputsContainer.innerHTML = inputHtml;
        var titleLabel = document.getElementById('label1');
        titleLabel.innerHTML = "Enter Note Title: ";
        var DescriptionLabel = document.getElementById('label2');
        DescriptionLabel.innerHTML = "Enter Note: ";
        if (noteType == 'task') {
            var lastExeLabel = document.getElementById('label3');
            lastExeLabel.innerHTML = "Enter last exe date: ";
        }
        if (noteType == 'meeting') {
            var LocLabel = document.getElementById('label3');
            LocLabel.innerHTML = "Enter location: ";
            var dateLab = document.getElementById('label4');
            dateLab.innerHTML = "Enter meeting date ";
        }
        if (noteType == 'sportsAndLeisure') {
            var LocLabel = document.getElementById('label3');
            LocLabel.innerHTML = "Enter location: ";
            var dateLab = document.getElementById('label4');
            dateLab.innerHTML = "Enter meeting date ";
            var equLab = document.getElementById('label5');
            equLab.innerHTML = "Enter nedded equipment ";
        }
    };
    NoteFunction.prototype.displayNotes = function () {
        var notesContainer = document.getElementById('notesContainer');
        var editModeCheckbox = document.getElementById('editMode');
        if (!notesContainer) {
            console.error('Notes container div not found');
            return;
        }
        var notesHtml = '';
        this.allNotes.forEach(function (note) {
            var noteDetails = '';
            if ('lastExecutionDate' in note) {
                noteDetails = "<p>Last Execution Date: ".concat(note.lastExecutionDate, "</p>");
            }
            else if ('dateTime' in note) {
                noteDetails = "<p>Location: ".concat(note.location, "</p><p>Date & Time: ").concat(note.dateTime, "</p>");
            }
            else if ('trainingDate' in note) {
                noteDetails = "<p>Location: ".concat(note.location, "</p><p>Training Date: ").concat(note.trainingDate, "</p><p>Required Equipment: ").concat(note.requiredEquipment, "</p>");
            }
            notesHtml += "\n                <div class=\"note\">\n                    <h3>".concat(note.title, "</h3>\n                    <p>").concat(note.text, "</p>\n                    <img src=\"").concat(note.imageAddress, "\" alt=\"").concat(note.title, " image\" class=\"note-image\" data-id=\"").concat(note.id, "\" style=\"width:100px;height:auto;\">\n                    <p>Date Written: ").concat(note.dateWritten, "</p>\n                    ").concat(noteDetails);
            if (editModeCheckbox.checked) {
                notesHtml += "<button class=\"remove-note\" data-id=\"".concat(note.id, "\">X</button>");
                notesHtml += '</div><hr>';
            }
        });
        notesContainer.innerHTML = notesHtml;
        this.setupRemoveNoteListeners();
    };
    NoteFunction.prototype.addNote = function () {
        this.render();
        this.EditmodeLisnteners();
        var noteTypeSelect = document.getElementById('noteType');
        var titleInput = document.getElementById('input1');
        var textInput = document.getElementById('input2');
        var desInput = document.getElementById('input3'); // Description or Location
        var varInp = document.getElementById('input4'); // Date/Time or Training Date
        var equInput = document.getElementById('input5'); // Equipment, optional
        switch (noteTypeSelect.value) {
            case "task":
                var TaskNote = {
                    id: this.generateNoteId(),
                    title: titleInput.value,
                    text: textInput.value,
                    dateWritten: new Date().toLocaleString(),
                    lastExecutionDate: desInput.value,
                    alertStart: function () { alert("Task '".concat(this.title, "' was created on ").concat(this.dateWritten, " and has a last execution date of ").concat(this.lastExecutionDate, ".")); },
                    imageAddress: "https://st.depositphotos.com/1000422/2038/i/380/depositphotos_20383227-stock-photo-check-list.jpg"
                };
                this.allNotes.push(TaskNote);
                this.render();
                TaskNote.alertStart();
                console.log("Sample notes added with IDs:", TaskNote.id);
                break;
            case "meeting":
                var newNote = {
                    id: this.generateNoteId(),
                    title: titleInput.value,
                    text: textInput.value,
                    dateWritten: new Date().toLocaleString(),
                    imageAddress: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9iMT84wsD1NyljSL5KHl-ybvxjjxGODR_Pg&usqp=CAU",
                    location: desInput.value,
                    dateTime: varInp.value,
                    alertStart: function () { alert("Meeting '".concat(this.title, "'\n on ").concat(this.dateTime, ": ").concat(this.text, ". Location: ").concat(this.location, ".")); }
                };
                this.allNotes.push(newNote);
                newNote.alertStart();
                this.render();
                break;
            case "sportsAndLeisure":
                var sprtNote = {
                    id: this.generateNoteId(),
                    title: titleInput.value,
                    text: textInput.value,
                    dateWritten: new Date().toLocaleString(),
                    imageAddress: "https://st.depositphotos.com/1229718/1910/i/380/depositphotos_19103837-stock-photo-sports-equipment.jpg",
                    location: desInput.value,
                    trainingDate: varInp.value,
                    requiredEquipment: equInput.value,
                    time: "",
                    alertStart: function () { alert("training/event  '".concat(this.title)); }
                };
                this.allNotes.push(sprtNote);
                sprtNote.alertStart();
                this.render();
                break;
            default:
                console.error("Unsupported note type: ".concat(noteTypeSelect.value));
                return;
        }
        console.log("Note added successfully");
    };
    NoteFunction.prototype.generateNoteId = function () {
        return ++this.lastId;
    };
    NoteFunction.prototype.addSampleNotes = function () {
        var taskNote = new Task(1, "Task Title", "Complete the task", new Date().toLocaleString(), "http://example.com/task-image.jpg", "2023-12-31");
        var meetingNote = new Meeting(2, "Meeting Title", "Discuss project updates", new Date().toLocaleString(), "http://example.com/meeting-image.jpg", "Office", "2023-01-01 10:00");
        var sportsAndLeisureNote = new SportsAndLeisure(3, "Sports Event", "Participate in the event", new Date().toLocaleString(), "http://example.com/event-image.jpg", "Local Park", "2023-05-15", "10:00", "Gloves, Water bottle");
        this.allNotes.push(taskNote, sportsAndLeisureNote, meetingNote);
        console.log("Sample notes added with IDs:", taskNote.id, meetingNote.id, sportsAndLeisureNote.id);
    };
    return NoteFunction;
}());
var noteFunctionApp = new NoteFunction();
