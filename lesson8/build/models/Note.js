var Note = /** @class */ (function () {
    function Note(id, dateWritten, title, text, imageAddress) {
        this.id = 0;
        this.id = id + 1;
        this.dateWritten = dateWritten;
        this.title = title;
        this.text = text;
        this.imageAddress = imageAddress;
    }
    return Note;
}());
