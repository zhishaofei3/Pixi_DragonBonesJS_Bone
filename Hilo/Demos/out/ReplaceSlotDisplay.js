"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ReplaceSlotDisplay = /** @class */ (function (_super) {
    __extends(ReplaceSlotDisplay, _super);
    function ReplaceSlotDisplay() {
        var _this = _super.call(this) || this;
        _this._displayIndex = 0;
        _this._replaceDisplays = [
            // Replace normal display.
            "display0002", "display0003", "display0004", "display0005", "display0006", "display0007", "display0008", "display0009", "display0010",
            // Replace mesh display.
            "meshA", "meshB", "meshC",
        ];
        _this._factory = dragonBones.HiloFactory.factory;
        _this._resources.push("resource/assets/replace_slot_display/main_ske.json", "resource/assets/replace_slot_display/main_tex.json", "resource/assets/replace_slot_display/main_tex.png", "resource/assets/replace_slot_display/replace_ske.json", "resource/assets/replace_slot_display/replace_tex.json", "resource/assets/replace_slot_display/replace_tex.png");
        return _this;
    }
    ReplaceSlotDisplay.prototype._onStart = function () {
        var _this = this;
        var factory = dragonBones.HiloFactory.factory;
        factory.parseDragonBonesData(this._hiloResources["resource/assets/replace_slot_display/main_ske.json"]);
        factory.parseTextureAtlasData(this._hiloResources["resource/assets/replace_slot_display/main_tex.json"], this._hiloResources["resource/assets/replace_slot_display/main_tex.png"]);
        factory.parseDragonBonesData(this._hiloResources["resource/assets/replace_slot_display/replace_ske.json"]);
        factory.parseTextureAtlasData(this._hiloResources["resource/assets/replace_slot_display/replace_tex.json"], this._hiloResources["resource/assets/replace_slot_display/replace_tex.png"]);
        //
        this._armatureDisplay = this._factory.buildArmatureDisplay("MyArmature");
        this._armatureDisplay.animation.timeScale = 0.1;
        this._armatureDisplay.animation.play();
        this._armatureDisplay.x = this.stageWidth * 0.5;
        this._armatureDisplay.y = this.stageHeight * 0.5;
        this.addChild(this._armatureDisplay);
        //
        this.on(Hilo.event.POINTER_START, function () {
            _this._replaceDisplay();
        }, false);
        //
        this.createText("Click to replace slot display.");
    };
    ReplaceSlotDisplay.prototype._replaceDisplay = function () {
        this._displayIndex = (this._displayIndex + 1) % this._replaceDisplays.length;
        var replaceDisplayName = this._replaceDisplays[this._displayIndex];
        if (replaceDisplayName.indexOf("mesh") >= 0) {
            switch (replaceDisplayName) {
                case "meshA":
                    // Normal to mesh.
                    this._factory.replaceSlotDisplay("replace", "MyMesh", "meshA", "weapon_1004_1", this._armatureDisplay.armature.getSlot("weapon"));
                    // Replace mesh texture. 
                    this._factory.replaceSlotDisplay("replace", "MyDisplay", "ball", "display0002", this._armatureDisplay.armature.getSlot("mesh"));
                    break;
                case "meshB":
                    // Normal to mesh.
                    this._factory.replaceSlotDisplay("replace", "MyMesh", "meshB", "weapon_1004_1", this._armatureDisplay.armature.getSlot("weapon"));
                    // Replace mesh texture. 
                    this._factory.replaceSlotDisplay("replace", "MyDisplay", "ball", "display0003", this._armatureDisplay.armature.getSlot("mesh"));
                    break;
                case "meshC":
                    // Back to normal.
                    this._factory.replaceSlotDisplay("replace", "MyMesh", "mesh", "weapon_1004_1", this._armatureDisplay.armature.getSlot("weapon"));
                    // Replace mesh texture. 
                    this._factory.replaceSlotDisplay("replace", "MyDisplay", "ball", "display0005", this._armatureDisplay.armature.getSlot("mesh"));
                    break;
            }
        }
        else {
            this._factory.replaceSlotDisplay("replace", "MyDisplay", "ball", replaceDisplayName, this._armatureDisplay.armature.getSlot("ball"));
        }
    };
    return ReplaceSlotDisplay;
}(BaseTest));
