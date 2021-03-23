"use strict";
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