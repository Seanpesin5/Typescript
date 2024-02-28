var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Meeting = /** @class */ (function (_super) {
    __extends(Meeting, _super);
    function Meeting(id, dateWritten, title, text, imageAddress, location, dateTime) {
        var _this = _super.call(this, id, dateWritten, title, text, imageAddress) || this;
        _this.location = location;
        _this.dateTime = dateTime;
        _this.imageAddress = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9iMT84wsD1NyljSL5KHl-ybvxjjxGODR_Pg&usqp=CAU";
        return _this;
    }
    Meeting.prototype.alertStart = function () {
        console.log("Meeting '".concat(this.title, "' on ").concat(this.dateTime, ": ").concat(this.text, ". Location: ").concat(this.location, "."));
    };
    return Meeting;
}(Note));
