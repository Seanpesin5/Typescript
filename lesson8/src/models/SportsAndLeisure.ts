class SportsAndLeisure extends Note implements ISportsAndLeisure {
    location: string;
    trainingDate: string;
    time: string;
    requiredEquipment: string;

    constructor(id: number, dateWritten: string, title: string, text: string, imageAddress: string, location: string, trainingDate: string, time: string, requiredEquipment: string) {
        super(id, dateWritten, title, text, imageAddress);
        this.location = location;
        this.trainingDate = trainingDate;
        this.time = time;
        this.requiredEquipment = requiredEquipment;
        this.trainingDate = trainingDate;
        this.imageAddress = "https://st.depositphotos.com/1229718/1910/i/380/depositphotos_19103837-stock-photo-sports-equipment.jpg"
    }
    alertStart(): void {
        console.log(`training/event'${this.title}`);
    }

}
