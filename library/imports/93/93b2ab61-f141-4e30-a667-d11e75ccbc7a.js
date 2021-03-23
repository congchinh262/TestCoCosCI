"use strict";
cc._RF.push(module, '93b2ath8UFOMKZn0R51zLx6', 'Square');
// Script/Prefab/Square.ts

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
        _this.Value = 0;
        _this.Index = 0;
        return _this;
    }
    NewClass.prototype.Init = function (value, index) {
        this.Index = index;
        this.Value = value;
        this.node.getChildByName("NumberLabel").getComponent(cc.Label).string = value.toString();
        this.node.getChildByName("BorderTop").setContentSize(cc.size(this.node.getContentSize().width, 2));
        this.node.getChildByName("BorderBottom").setContentSize(cc.size(this.node.getContentSize().width, 2));
        this.node.getChildByName("BorderLeft").setContentSize(cc.size(2, this.node.getContentSize().height));
        this.node.getChildByName("BorderRight").setContentSize(cc.size(2, this.node.getContentSize().height));
    };
    //onLoad () {}
    //start () {}
    NewClass.prototype.update = function (dt) {
        if (this.Value - this.Index === 1) {
            this.node.color = cc.color(0, 255, 155, 255);
            this.node.getChildByName("NumberLabel").color = cc.color(0, 155, 0, 255);
        }
        else {
            this.node.color = cc.color(0, 255, 255, 255);
            this.node.getChildByName("NumberLabel").color = cc.color(0, 0, 255, 255);
        }
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();