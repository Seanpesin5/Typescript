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
var SportsAndLeisure = /** @class */ (function (_super) {
    __extends(SportsAndLeisure, _super);
    function SportsAndLeisure(id, dateWritten, title, text, imageAddress, location, trainingDate, time, requiredEquipment) {
        var _this = _super.call(this, id, dateWritten, title, text, imageAddress) || this;
        _this.location = location;
        _this.trainingDate = trainingDate;
        _this.time = time;
        _this.requiredEquipment = requiredEquipment;
        _this.trainingDate = trainingDate;
        _this.imageAddress = "https://st.depositphotos.com/1229718/1910/i/380/depositphotos_19103837-stock-photo-sports-equipment.jpg";
        return _this;
    }
    SportsAndLeisure.prototype.alertStart = function () {
    };
    return SportsAndLeisure;
}(Note));
