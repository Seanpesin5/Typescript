
  class NoteFunction{
    private lastId: number 
    allNotes: (Task | Meeting | SportsAndLeisure)[] = [];

    constructor() {
        this.setupRemoveNoteListeners();
        this.setupEventListeners();
        this.EditmodeLisnteners();
        this.addSampleNotes();
        this.render();
       
    }
    public removeNote(index: number): void {
        this.allNotes.splice(index, 1); 
    }
    private setupRemoveNoteListeners(): void {
        document.querySelectorAll('.remove-note').forEach(button => {
            button.addEventListener('click', (event) => {
                const noteId = (event.target as HTMLElement).getAttribute('data-id');
                const noteIndex = this.allNotes.findIndex(note => note.id.toString() === noteId);
                if (noteIndex > -1) {
                    this.removeNote(noteIndex); 
                    
                }
            });
        });
    }
    private EditmodeLisnteners(): void{    
    
        const edit:  HTMLInputElement = document.getElementById('editMode') as HTMLInputElement;
        edit.addEventListener('change', () => {
         this.displayNotes(); 
        
    }
)}   
    public setupEventListeners(): void {
        const addNoteButton = document.getElementById('addNoteButton');
        if (addNoteButton) {
            addNoteButton.addEventListener('click', () => this.addNote());
        } else {
            console.error('Add Note button not found');
        }
        const noteTypeSelect: HTMLSelectElement = document.getElementById('noteType') as HTMLSelectElement;
        
        noteTypeSelect.addEventListener('change', (event) => {
            const selectedType = (event.target as HTMLSelectElement).value;
            this.generateDynamicInputs(selectedType);
           
            
        });
    }
   public render(): void {
        this.displayNotes();  
    }
    
   
   
    
    
    private generateDynamicInputs(noteType: string): void {
        console.log(`Generating inputs for note type: ${noteType}`); 
       
        const dynamicInputsContainer = document.getElementById('dynamicInputs');
        dynamicInputsContainer.innerHTML = ''; 

        let inputHtml = '';
        let numberOfInputs = 0;

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

        for (let i = 1; i <= numberOfInputs; i++) {
           
    
        inputHtml += `<label id="label${i}" for="input${i}"></label><input type="text" id="input${i}" name="input${i}"><br>`;
}

        dynamicInputsContainer.innerHTML = inputHtml;
        const titleLabel = document.getElementById('label1') as HTMLLabelElement;
        titleLabel.innerHTML = "Enter Note Title: ";
    
        const DescriptionLabel = document.getElementById('label2') as HTMLLabelElement;
        DescriptionLabel.innerHTML = "Enter Note: ";
       
       if(noteType =='task'){
        const lastExeLabel = document.getElementById('label3') as HTMLLabelElement;
        lastExeLabel.innerHTML = "Enter last exe date: ";
       }
       if(noteType =='meeting'){
        const LocLabel = document.getElementById('label3') as HTMLLabelElement;
        LocLabel.innerHTML = "Enter location: ";
        const dateLab = document.getElementById('label4') as HTMLLabelElement;
        dateLab.innerHTML = "Enter meeting date ";
       }
       if(noteType =='sportsAndLeisure'){
        const LocLabel = document.getElementById('label3') as HTMLLabelElement;
        LocLabel.innerHTML = "Enter location: ";
        const dateLab = document.getElementById('label4') as HTMLLabelElement;
        dateLab.innerHTML = "Enter meeting date ";
        const equLab = document.getElementById('label5') as HTMLLabelElement;
        equLab.innerHTML = "Enter nedded equipment ";
       }

    }
    public displayNotes(): void {
        const notesContainer = document.getElementById('notesContainer');
        const editModeCheckbox = document.getElementById('editMode') as HTMLInputElement;
    
        if (!notesContainer) {
            console.error('Notes container div not found');
            return;
        }
    
        let notesHtml = '';
        this.allNotes.forEach((note, index) => {
            let noteDetails = ''; 
    
            if ('lastExecutionDate' in note) { 
                noteDetails = `<p>Last Execution Date: ${note.lastExecutionDate}</p>`;
            } else if ('dateTime' in note) { 
                noteDetails = `<p>Location: ${note.location}</p><p>Date & Time: ${note.dateTime}</p>`;
            } else if ('trainingDate' in note) { 
                noteDetails = `<p>Location: ${note.location}</p><p>Training Date: ${note.trainingDate}</p><p>Required Equipment: ${note.requiredEquipment}</p>`;
            }
    
            notesHtml += `
                <div class="note">
                    <h3>${note.title}</h3>
                    <p>${note.text}</p>
                    <img src="${note.imageAddress}" alt="${note.title} image" style="width:100px;height:auto;">
                    <p>Date Written: ${note.dateWritten}</p>
                    ${noteDetails}`;
    

            if (editModeCheckbox.checked) {
                notesHtml += `<button class="remove-note" data-index="${index}">X</button>`;
                notesHtml += '</div><hr>'
            }  
            
            notesContainer.innerHTML = notesHtml;
        });
       
      
    }


    public addNote(): void {
        this.render();
        this.EditmodeLisnteners();
        const noteTypeSelect: HTMLSelectElement = document.getElementById('noteType') as HTMLSelectElement;
       
        const titleInput: HTMLInputElement = document.getElementById('input1') as HTMLInputElement;
        const textInput: HTMLInputElement = document.getElementById('input2') as HTMLInputElement;
        const desInput: HTMLInputElement = document.getElementById('input3') as HTMLInputElement; // Description or Location
        const varInp: HTMLInputElement = document.getElementById('input4')as HTMLInputElement; // Date/Time or Training Date
        const equInput: HTMLInputElement = document.getElementById('input5') as HTMLInputElement; // Equipment, optional

        
        

        switch (noteTypeSelect.value) {
            case "task":
                 const TaskNote: Task = {
                     id: this.generateNoteId(),
                     title: titleInput.value,
                     text: textInput.value,
                     dateWritten: new Date().toLocaleString(),

                     lastExecutionDate: desInput.value,
                     alertStart: function (): void { console.log("Alert for Task"); },
                     imageAddress: "https://st.depositphotos.com/1000422/2038/i/380/depositphotos_20383227-stock-photo-check-list.jpg"
                 } 
                  this.allNotes.push(TaskNote); 
                break;
              
            case "meeting":
                const newNote: Meeting = {
                    id: this.generateNoteId(),
                    title: titleInput.value,
                    text: textInput.value,
                    dateWritten: new Date().toLocaleString(),
                    imageAddress: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9iMT84wsD1NyljSL5KHl-ybvxjjxGODR_Pg&usqp=CAU",
                    location: desInput.value, 
                    dateTime: varInp.value,
                    alertStart: function (): void { console.log("Alert for Meeting"); }
                } 
                this.allNotes.push(newNote); 
                break;
            case "sportsAndLeisure":
                const sprtNote: SportsAndLeisure = {
                    id: this.generateNoteId(),
                    title: titleInput.value,
                    text: textInput.value,
                    dateWritten: new Date().toLocaleString(),
                    imageAddress: "https://st.depositphotos.com/1229718/1910/i/380/depositphotos_19103837-stock-photo-sports-equipment.jpg",
                    location: desInput.value,
                    trainingDate: varInp.value,
                    requiredEquipment: equInput.value,
                    time: "", 
                    alertStart: function (): void { console.log("Alert for Sports and Leisure"); }
                } 
                this.allNotes.push(sprtNote); 
                break;
            default:
                console.error(`Unsupported note type: ${noteTypeSelect.value}`);
                return;
                
        }

        
       
    console.log("Note added successfully");
    this.render();
    }

    private generateNoteId(): number {
        let lastId =1
        return ++lastId;
    }
   
    public addSampleNotes(): void {
        const taskNote = new Task(
            this.generateNoteId(),
            "Task Title",
            "Complete the task",
            new Date().toLocaleString(),
            "http://example.com/task-image.jpg",
            "2023-12-31"
        );
        
        const meetingNote = new Meeting(
            this.generateNoteId(),
            "Meeting Title",
            "Discuss project updates",
            new Date().toLocaleString(),
            "http://example.com/meeting-image.jpg",
            "Office", 
            "2023-01-01 10:00"
        );
    
        const sportsAndLeisureNote = new SportsAndLeisure(
            this.generateNoteId(),
            "Sports Event",
            "Participate in the event",
            new Date().toLocaleString(),
            "http://example.com/event-image.jpg",
            "Local Park", 
            "2023-05-15",
            "10:00",
            "Gloves, Water bottle"
        );
       this.allNotes.push(taskNote, sportsAndLeisureNote, meetingNote);
      
    }
   
}
       
const noteFunctionApp = new NoteFunction();    

