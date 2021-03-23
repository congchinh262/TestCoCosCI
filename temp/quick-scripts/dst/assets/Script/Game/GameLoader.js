
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/GameLoader.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '19c4aFPWTlCkKn3gmuxbuV1', 'GameLoader');
// Script/Game/GameLoader.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Square = null;
        _this.PauseMenu = null;
        _this.MainMenu = null;
        _this.ValueList = [];
        _this.Rows = 4;
        _this.Columns = 4;
        _this.Timer = 0;
        _this.isPaused = false;
        return _this;
    }
    NewClass.prototype.onLoad = function () {
        var _this = this;
        this.PauseMenu.active = false;
        this.PauseMenu.getChildByName("Continue Button").
            on("click", function () { return _this.ContinueGame(_this.CheckGameEnd()); });
        this.node.parent.getChildByName("Pause Button").on("click", function () { return _this.PauseGame(); });
        this.node.parent.getChildByName("Reset Button").on("click", function () { return _this.ResetGame(); });
        this.node.parent.getChildByName("Back To Menu Button").on("click", function () { return _this.BackToMenu(); });
    };
    NewClass.prototype.onEnable = function () {
        this.ResetGame();
    };
    NewClass.prototype.start = function () {
        this.ResetGame();
    };
    NewClass.prototype.SetValueList = function (rows, columns) {
        this.ValueList = [];
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                var value = i * columns + j;
                if (value !== 0) {
                    this.ValueList.push(value);
                }
            }
        }
    };
    NewClass.prototype.Init = function (rows, columns) {
        var layout = this.node.getComponent(cc.Layout);
        layout.cellSize = cc.size((this.node.width - layout.paddingLeft) / columns - layout.spacingX, (this.node.height - layout.paddingTop) / rows - layout.spacingY);
        this.CreateChildren();
    };
    NewClass.prototype.CreateChildren = function () {
        var _this = this;
        this.node.removeAllChildren();
        this.ValueList.forEach(function (value, index) {
            if (value !== 0) {
                var newSquare = cc.instantiate(_this.Square);
                newSquare.width = _this.node.getComponent(cc.Layout).cellSize.width;
                newSquare.height = _this.node.getComponent(cc.Layout).cellSize.height;
                newSquare.getComponent('Square').Init(value, index);
                newSquare.on('touchstart', function () { return _this.Onclick(index); });
                _this.node.addChild(newSquare);
            }
            else {
                var node = new cc.Node('Blank');
                _this.node.addChild(node);
            }
        });
    };
    NewClass.prototype.Shuffle = function (array) {
        var _a, _b;
        var currentIndex = 0;
        while (currentIndex < array.length) {
            var randomIndex = Math.floor(Math.random() * (array.length - currentIndex) + currentIndex);
            _a = [array[randomIndex], array[currentIndex]], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
            currentIndex++;
        }
        var inversion = 0;
        for (var i = 0; i < array.length - 1; i++) {
            var count = 0;
            for (var j = i + 1; j < array.length; j++) {
                if (array[i] > array[j]) {
                    count++;
                }
            }
            console.log(count);
            inversion += count;
        }
        console.log(inversion);
        if (inversion % 2 !== 0) {
            _b = [array[1], array[0]], array[0] = _b[0], array[1] = _b[1];
        }
    };
    NewClass.prototype.Onclick = function (index) {
        var _a;
        var blankIndex = this.ValueList.findIndex(function (value) {
            return value === 0;
        });
        if ((Math.floor(index / this.Columns) === Math.floor(blankIndex / this.Columns)
            && Math.abs(index - blankIndex) === 1)
            || Math.abs(index - blankIndex) === this.Columns) {
            _a = [this.ValueList[blankIndex], this.ValueList[index]], this.ValueList[index] = _a[0], this.ValueList[blankIndex] = _a[1];
            this.CreateChildren();
        }
    };
    NewClass.prototype.CheckGameEnd = function () {
        var isAllCorrect = true;
        this.ValueList.forEach(function (value, index) {
            if (value - index !== 1 && value !== 0) {
                isAllCorrect = false;
            }
        });
        return isAllCorrect;
    };
    NewClass.prototype.BackToMenu = function () {
        this.PauseMenu.active = false;
        this.node.parent.active = false;
        this.MainMenu.active = true;
    };
    NewClass.prototype.PauseGame = function () {
        this.PauseMenu.active = true;
        this.isPaused = true;
    };
    NewClass.prototype.ResetGame = function () {
        this.SetValueList(this.Rows, this.Columns);
        this.Shuffle(this.ValueList);
        this.ValueList.push(0);
        this.Init(this.Rows, this.Columns);
        this.Timer = 0;
    };
    NewClass.prototype.ContinueGame = function (isGameEnd) {
        this.PauseMenu.active = false;
        this.isPaused = false;
        if (isGameEnd) {
            this.ResetGame();
        }
    };
    NewClass.prototype.GetTime = function () {
        var seconds = Math.floor(this.Timer) % 60;
        var minutes = Math.floor(this.Timer / 60);
        var time = "";
        if (minutes < 10) {
            time += "0" + minutes + " : ";
        }
        else {
            time += minutes + " : ";
        }
        if (seconds < 10) {
            time += "0" + seconds;
        }
        else {
            time += seconds;
        }
        return { time: time, seconds: seconds, minutes: minutes };
    };
    NewClass.prototype.update = function (dt) {
        if (!this.isPaused) {
            this.Timer += dt;
        }
        this.node.parent.getChildByName("TimerLabel").getComponent(cc.Label).string = this.GetTime().time;
        if (this.CheckGameEnd()) {
            this.PauseMenu.active = true;
            this.isPaused = true;
            this.PauseMenu.getChildByName("PauseMenuLabel").getComponent(cc.Label).string
                = "Good jobs, you complete the puzzle in " + this.GetTime().minutes + " minutes and "
                    + this.GetTime().seconds + " seconds!!! \n Do you want to play again???";
        }
    };
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "Square", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "PauseMenu", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "MainMenu", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9HYW1lTG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBOExDO1FBM0xHLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFFekIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQixjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLGVBQVMsR0FBYSxFQUFFLENBQUM7UUFDekIsVUFBSSxHQUFXLENBQUMsQ0FBQztRQUNqQixhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLFdBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsY0FBUSxHQUFZLEtBQUssQ0FBQzs7SUFpTDlCLENBQUM7SUEvS0cseUJBQU0sR0FBTjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDO1lBQ2hELEVBQUUsQ0FBQyxPQUFPLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQXRDLENBQXNDLENBQUMsQ0FBQztRQUUxRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFoQixDQUFnQixDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FB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QUFTLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNO2tCQUMzRSx3Q0FBd0MsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxHQUFHLGVBQWU7c0JBQ25GLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEdBQUcsNkNBQTZDLENBQUM7U0FDNUU7SUFDTCxDQUFDO0lBMUxEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NENBQ0s7SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDUTtJQUUxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNPO0lBUFIsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQThMNUI7SUFBRCxlQUFDO0NBOUxELEFBOExDLENBOUxxQyxFQUFFLENBQUMsU0FBUyxHQThMakQ7a0JBOUxvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0NsYXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgU3F1YXJlOiBjYy5QcmVmYWIgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIFBhdXNlTWVudTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgTWFpbk1lbnU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgVmFsdWVMaXN0OiBudW1iZXJbXSA9IFtdO1xuICAgIFJvd3M6IG51bWJlciA9IDQ7XG4gICAgQ29sdW1uczogbnVtYmVyID0gNDtcbiAgICBUaW1lcjogbnVtYmVyID0gMDtcbiAgICBpc1BhdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5QYXVzZU1lbnUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuUGF1c2VNZW51LmdldENoaWxkQnlOYW1lKFwiQ29udGludWUgQnV0dG9uXCIpLlxuICAgICAgICBvbihcImNsaWNrXCIsICgpID0+IHRoaXMuQ29udGludWVHYW1lKHRoaXMuQ2hlY2tHYW1lRW5kKCkpKTtcblxuICAgICAgICB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKFwiUGF1c2UgQnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5QYXVzZUdhbWUoKSk7XG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJSZXNldCBCdXR0b25cIikub24oXCJjbGlja1wiLCAoKSA9PiB0aGlzLlJlc2V0R2FtZSgpKTtcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZShcIkJhY2sgVG8gTWVudSBCdXR0b25cIikub24oXCJjbGlja1wiLCAoKSA9PiB0aGlzLkJhY2tUb01lbnUoKSk7XG4gICAgfVxuXG4gICAgb25FbmFibGUgKCkge1xuICAgICAgICB0aGlzLlJlc2V0R2FtZSgpO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgdGhpcy5SZXNldEdhbWUoKTtcbiAgICB9XG5cbiAgICBTZXRWYWx1ZUxpc3Qocm93czpudW1iZXIsIGNvbHVtbnM6IG51bWJlcikge1xuICAgICAgICB0aGlzLlZhbHVlTGlzdCA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gaSAqIGNvbHVtbnMgKyBqO1xuICAgICAgICAgICAgICAgIGlmKHZhbHVlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVmFsdWVMaXN0LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gXG5cbiAgICBJbml0IChyb3dzOm51bWJlciwgY29sdW1uczogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGxheW91dCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuTGF5b3V0KTtcbiAgICAgICAgbGF5b3V0LmNlbGxTaXplID0gY2Muc2l6ZSgodGhpcy5ub2RlLndpZHRoIC0gbGF5b3V0LnBhZGRpbmdMZWZ0KS9jb2x1bW5zIC0gbGF5b3V0LnNwYWNpbmdYLFxuICAgICAgICAodGhpcy5ub2RlLmhlaWdodCAtIGxheW91dC5wYWRkaW5nVG9wKS9yb3dzIC0gbGF5b3V0LnNwYWNpbmdZKTtcblxuICAgICAgICB0aGlzLkNyZWF0ZUNoaWxkcmVuKCk7XG4gICAgfVxuXG4gICAgQ3JlYXRlQ2hpbGRyZW4gKCkge1xuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcblxuICAgICAgICB0aGlzLlZhbHVlTGlzdC5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGxldCBuZXdTcXVhcmUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLlNxdWFyZSk7XG4gICAgICAgICAgICAgICAgbmV3U3F1YXJlLndpZHRoID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5MYXlvdXQpLmNlbGxTaXplLndpZHRoO1xuICAgICAgICAgICAgICAgIG5ld1NxdWFyZS5oZWlnaHQgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkuY2VsbFNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIG5ld1NxdWFyZS5nZXRDb21wb25lbnQoJ1NxdWFyZScpLkluaXQodmFsdWUsIGluZGV4KTtcbiAgICAgICAgICAgICAgICBuZXdTcXVhcmUub24oJ3RvdWNoc3RhcnQnLCAoKSA9PiB0aGlzLk9uY2xpY2soaW5kZXgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobmV3U3F1YXJlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZSgnQmxhbmsnKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIFNodWZmbGUgKGFycmF5OiBudW1iZXJbXSkge1xuICAgICAgICBsZXQgY3VycmVudEluZGV4ID0gMDtcblxuICAgICAgICB3aGlsZSAoY3VycmVudEluZGV4IDwgYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnJheS5sZW5ndGggLSBjdXJyZW50SW5kZXgpICsgY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgIFthcnJheVtjdXJyZW50SW5kZXhdLCBhcnJheVtyYW5kb21JbmRleF1dID0gW2FycmF5W3JhbmRvbUluZGV4XSwgYXJyYXlbY3VycmVudEluZGV4XV07XG4gICAgICAgICAgICBjdXJyZW50SW5kZXgrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbnZlcnNpb24gPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgYXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZihhcnJheVtpXSA+IGFycmF5W2pdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coY291bnQpO1xuICAgICAgICAgICAgaW52ZXJzaW9uICs9IGNvdW50O1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGludmVyc2lvbik7XG4gICAgICAgIGlmIChpbnZlcnNpb24gJSAyICE9PSAwKSB7XG4gICAgICAgICAgICBbYXJyYXlbMF0sYXJyYXlbMV1dID0gW2FycmF5WzFdLGFycmF5WzBdXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIE9uY2xpY2sgKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGJsYW5rSW5kZXggPSB0aGlzLlZhbHVlTGlzdC5maW5kSW5kZXgoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICgoTWF0aC5mbG9vcihpbmRleCAvIHRoaXMuQ29sdW1ucykgPT09IE1hdGguZmxvb3IoYmxhbmtJbmRleCAvIHRoaXMuQ29sdW1ucykgXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhpbmRleCAtIGJsYW5rSW5kZXgpID09PSAxKSBcbiAgICAgICAgICAgIHx8IE1hdGguYWJzKGluZGV4IC0gYmxhbmtJbmRleCkgPT09IHRoaXMuQ29sdW1ucykge1xuICAgICAgICAgICAgICAgIFt0aGlzLlZhbHVlTGlzdFtpbmRleF0sIHRoaXMuVmFsdWVMaXN0W2JsYW5rSW5kZXhdXSA9XG4gICAgICAgICAgICAgICAgW3RoaXMuVmFsdWVMaXN0W2JsYW5rSW5kZXhdLCB0aGlzLlZhbHVlTGlzdFtpbmRleF1dO1xuICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuQ3JlYXRlQ2hpbGRyZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIENoZWNrR2FtZUVuZCAoKSB7XG4gICAgICAgIGxldCBpc0FsbENvcnJlY3QgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuVmFsdWVMaXN0LmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYodmFsdWUgLSBpbmRleCAhPT0gMSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGlzQWxsQ29ycmVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaXNBbGxDb3JyZWN0O1xuICAgIH1cblxuICAgIEJhY2tUb01lbnUgKCkge1xuICAgICAgICB0aGlzLlBhdXNlTWVudS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5NYWluTWVudS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIFBhdXNlR2FtZSAoKSB7XG4gICAgICAgIHRoaXMuUGF1c2VNZW51LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIFJlc2V0R2FtZSAoKSB7XG4gICAgICAgIHRoaXMuU2V0VmFsdWVMaXN0KHRoaXMuUm93cywgdGhpcy5Db2x1bW5zKTtcbiAgICAgICAgdGhpcy5TaHVmZmxlKHRoaXMuVmFsdWVMaXN0KTtcbiAgICAgICAgdGhpcy5WYWx1ZUxpc3QucHVzaCgwKTtcbiAgICAgICAgdGhpcy5Jbml0KHRoaXMuUm93cywgdGhpcy5Db2x1bW5zKTtcbiAgICAgICAgdGhpcy5UaW1lciA9IDA7XG4gICAgfVxuXG4gICAgQ29udGludWVHYW1lIChpc0dhbWVFbmQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5QYXVzZU1lbnUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcblxuICAgICAgICBpZihpc0dhbWVFbmQpIHtcbiAgICAgICAgICAgIHRoaXMuUmVzZXRHYW1lKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBHZXRUaW1lICgpIHtcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IE1hdGguZmxvb3IodGhpcy5UaW1lcikgJSA2MDtcbiAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IodGhpcy5UaW1lciAvIDYwKTtcbiAgICAgICAgbGV0IHRpbWUgPSBcIlwiO1xuXG4gICAgICAgIGlmKG1pbnV0ZXMgPCAxMCkge1xuICAgICAgICAgICAgdGltZSArPSBcIjBcIiArIG1pbnV0ZXMgKyBcIiA6IFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGltZSArPSBtaW51dGVzICsgXCIgOiBcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNlY29uZHMgPCAxMCkge1xuICAgICAgICAgICAgdGltZSArPSBcIjBcIiArIHNlY29uZHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aW1lICs9IHNlY29uZHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyB0aW1lLCBzZWNvbmRzLCBtaW51dGVzIH1cbiAgICB9XG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGlmKCF0aGlzLmlzUGF1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLlRpbWVyICs9IGR0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZShcIlRpbWVyTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLkdldFRpbWUoKS50aW1lO1xuXG4gICAgICAgIGlmICh0aGlzLkNoZWNrR2FtZUVuZCgpKSB7XG4gICAgICAgICAgICB0aGlzLlBhdXNlTWVudS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pc1BhdXNlZCA9IHRydWVcblxuICAgICAgICAgICAgdGhpcy5QYXVzZU1lbnUuZ2V0Q2hpbGRCeU5hbWUoXCJQYXVzZU1lbnVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZ1xuICAgICAgICAgICAgPSBcIkdvb2Qgam9icywgeW91IGNvbXBsZXRlIHRoZSBwdXp6bGUgaW4gXCIgKyB0aGlzLkdldFRpbWUoKS5taW51dGVzICsgXCIgbWludXRlcyBhbmQgXCIgXG4gICAgICAgICAgICArIHRoaXMuR2V0VGltZSgpLnNlY29uZHMgKyBcIiBzZWNvbmRzISEhIFxcbiBEbyB5b3Ugd2FudCB0byBwbGF5IGFnYWluPz8/XCI7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=