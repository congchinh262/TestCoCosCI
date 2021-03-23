
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Prefab/Square.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvUHJlZmFiL1NxdWFyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQTZCQztRQTNCRyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFdBQUssR0FBVyxDQUFDLENBQUM7O0lBMEJ0QixDQUFDO0lBeEJHLHVCQUFJLEdBQUosVUFBTSxLQUFhLEVBQUUsS0FBYTtRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekYsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQsY0FBYztJQUVkLGFBQWE7SUFFYix5QkFBTSxHQUFOLFVBQVEsRUFBRTtRQUNOLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtZQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pFO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pFO0lBQ0wsQ0FBQztJQTVCZ0IsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTZCNUI7SUFBRCxlQUFDO0NBN0JELEFBNkJDLENBN0JxQyxFQUFFLENBQUMsU0FBUyxHQTZCakQ7a0JBN0JvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0NsYXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIFZhbHVlOiBudW1iZXIgPSAwO1xuICAgIEluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgSW5pdCAodmFsdWU6IG51bWJlciwgaW5kZXg6IG51bWJlcikgeyAgICAgIFxuICAgICAgICB0aGlzLkluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIk51bWJlckxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQm9yZGVyVG9wXCIpLnNldENvbnRlbnRTaXplKGNjLnNpemUodGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCkud2lkdGgsIDIpKTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQm9yZGVyQm90dG9tXCIpLnNldENvbnRlbnRTaXplKGNjLnNpemUodGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCkud2lkdGgsIDIpKTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQm9yZGVyTGVmdFwiKS5zZXRDb250ZW50U2l6ZShjYy5zaXplKDIsIHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpLmhlaWdodCkpO1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCb3JkZXJSaWdodFwiKS5zZXRDb250ZW50U2l6ZShjYy5zaXplKDIsIHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpLmhlaWdodCkpO1xuICAgIH1cblxuICAgIC8vb25Mb2FkICgpIHt9XG5cbiAgICAvL3N0YXJ0ICgpIHt9XG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLlZhbHVlIC0gdGhpcy5JbmRleCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmNvbG9yID0gY2MuY29sb3IoMCwyNTUsMTU1LDI1NSk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJOdW1iZXJMYWJlbFwiKS5jb2xvciA9IGNjLmNvbG9yKDAsMTU1LDAsMjU1KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5jb2xvciA9IGNjLmNvbG9yKDAsMjU1LDI1NSwyNTUpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiTnVtYmVyTGFiZWxcIikuY29sb3IgPSBjYy5jb2xvcigwLDAsMjU1LDI1NSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=