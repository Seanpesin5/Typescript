class Meeting extends Note implements IMeetings {
    location: string;
    dateTime: string;

    constructor(id: number, dateWritten: string, title: string, text: string, imageAddress: string, location: string, dateTime: string) {
        super(id, dateWritten, title, text, imageAddress);
        this.location = location;
        this.dateTime = dateTime;
        this.imageAddress = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9iMT84wsD1NyljSL5KHl-ybvxjjxGODR_Pg&usqp=CAU";
    }

    alertStart(): void {
    }
}
