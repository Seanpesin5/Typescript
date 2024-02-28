class Task extends Note implements ITasks {
    lastExecutionDate: string;

    constructor(id: number, dateWritten: string, title: string, text: string, imageAddress: string, lastExecutionDate: string) {
        super(id, dateWritten, title, text, imageAddress);
        this.lastExecutionDate = lastExecutionDate;
        this.imageAddress = "https://st.depositphotos.com/1000422/2038/i/380/depositphotos_20383227-stock-photo-check-list.jpg"
    }

    alertStart(): void {
    }
}
