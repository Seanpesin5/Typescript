abstract class Note {
    public id: number =0;
    public dateWritten: string; 
    public title: string;
    public text: string;
    public imageAddress: string;

    constructor(id: number, dateWritten: string, title: string, text: string, imageAddress: string) {
        this.id = id+1;
        this.dateWritten = dateWritten;
        this.title = title;
        this.text = text;
        this.imageAddress = imageAddress;
    }

    abstract alertStart(): void;
}