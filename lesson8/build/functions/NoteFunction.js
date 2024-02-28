var NoteFunction = /** @class */ (function () {
    function NoteFunction() {
        this.allNotes = [];
        this.setupRemoveNoteListeners();
        this.setupEventListeners();
        this.EditmodeLisnteners();
        this.addSampleNotes();
        this.render();
    }
    NoteFunction.prototype.removeNote = function (index) {
        this.allNotes.splice(index, 1);
    };
    NoteFunction.prototype.setupRemoveNoteListeners = function () {
        var _this = this;
        document.querySelectorAll('.remove-note').forEach(function (button) {
            button.addEventListener('click', function (event) {
                var noteId = event.target.getAttribute('data-id');
                var noteIndex = _this.allNotes.findIndex(function (note) { return note.id.toString() === noteId; });
                if (noteIndex > -1) {
                    _this.removeNote(noteIndex);
                }
            });
        });
    };
    NoteFunction.prototype.EditmodeLisnteners = function () {
        var _this = this;
        var edit = document.getElementById('editMode');
        edit.addEventListener('change', function () {
            _this.displayNotes();
        });
    };
    NoteFunction.prototype.setupEventListeners = function () {
        var _this = this;
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
        this.allNotes.forEach(function (note, index) {
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
            notesHtml += "\n                <div class=\"note\">\n                    <h3>".concat(note.title, "</h3>\n                    <p>").concat(note.text, "</p>\n                    <img src=\"").concat(note.imageAddress, "\" alt=\"").concat(note.title, " image\" style=\"width:100px;height:auto;\">\n                    <p>Date Written: ").concat(note.dateWritten, "</p>\n                    ").concat(noteDetails);
            if (editModeCheckbox.checked) {
                notesHtml += "<button class=\"remove-note\" data-index=\"".concat(index, "\">X</button>");
                notesHtml += '</div><hr>';
            }
            notesContainer.innerHTML = notesHtml;
        });
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
                    alertStart: function () { console.log("Alert for Task"); },
                    imageAddress: "https://st.depositphotos.com/1000422/2038/i/380/depositphotos_20383227-stock-photo-check-list.jpg"
                };
                this.allNotes.push(TaskNote);
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
                    alertStart: function () { console.log("Alert for Meeting"); }
                };
                this.allNotes.push(newNote);
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
                    alertStart: function () { console.log("Alert for Sports and Leisure"); }
                };
                this.allNotes.push(sprtNote);
                break;
            default:
                console.error("Unsupported note type: ".concat(noteTypeSelect.value));
                return;
        }
        console.log("Note added successfully");
        this.render();
    };
    NoteFunction.prototype.generateNoteId = function () {
        var lastId = 1;
        return ++lastId;
    };
    NoteFunction.prototype.addSampleNotes = function () {
        var taskNote = new Task(this.generateNoteId(), "Task Title", "Complete the task", new Date().toLocaleString(), "http://example.com/task-image.jpg", "2023-12-31");
        var meetingNote = new Meeting(this.generateNoteId(), "Meeting Title", "Discuss project updates", new Date().toLocaleString(), "http://example.com/meeting-image.jpg", "Office", "2023-01-01 10:00");
        var sportsAndLeisureNote = new SportsAndLeisure(this.generateNoteId(), "Sports Event", "Participate in the event", new Date().toLocaleString(), "http://example.com/event-image.jpg", "Local Park", "2023-05-15", "10:00", "Gloves, Water bottle");
        this.allNotes.push(taskNote, sportsAndLeisureNote, meetingNote);
    };
    return NoteFunction;
}());
var noteFunctionApp = new NoteFunction();
