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
var Task = /** @class */ (function (_super) {
    __extends(Task, _super);
    function Task(id, dateWritten, title, text, imageAddress, lastExecutionDate) {
        var _this = _super.call(this, id, dateWritten, title, text, imageAddress) || this;
        _this.lastExecutionDate = lastExecutionDate;
        _this.imageAddress = "https://st.depositphotos.com/1000422/2038/i/380/depositphotos_20383227-stock-photo-check-list.jpg";
        return _this;
    }
    Task.prototype.alertStart = function () {
        console.log("Task '".concat(this.title, "' was created on ").concat(this.dateWritten, " and has a last execution date of ").concat(this.lastExecutionDate, "."));
    };
    return Task;
}(Note));
