class Ceilvt extends BaseDemo {

    private armatureDisplay:dragonBones.PixiArmatureDisplay;
    private bulletSlot:dragonBones.Bone;

    private ori:Object = {};
    public constructor() {
        super();

        this._resources.push(
            "resource/ceilvt/ceilvt_ske.json",
            "resource/ceilvt/ceilvt_tex.json",
            "resource/ceilvt/ceilvt_tex.png"
        );
    }

    protected _onStart(): void {
        const factory = dragonBones.PixiFactory.factory;
        factory.parseDragonBonesData(this._pixiResources["resource/ceilvt/ceilvt_ske.json"].data);
        factory.parseTextureAtlasData(this._pixiResources["resource/ceilvt/ceilvt_tex.json"].data, this._pixiResources["resource/ceilvt/ceilvt_tex.png"].texture);

        this.armatureDisplay = factory.buildArmatureDisplay('ceilvt');



        this.addChild(this.armatureDisplay);
        this.bulletSlot = this.armatureDisplay.armature.getBone("ceilvt");
        this.armatureDisplay.interactive = true;

        var _self = this;
        this.armatureDisplay.pointerdown = function(e){

            var p = e.data.global;
                _self.ori = {'x':p.x,'y':p.y};
            console.log('start');
            _self.armatureDisplay.pointermove = function(e2){
                var p2 = e2.data.global;
                console.log(p2.x,p2.y);
                let x1 = p2.x - _self.ori.x;
                let y1 = p2.y - _self.ori.y;
                _self._moveTo(x1,y1);
                _self.ori = {'x':p2.x,'y':p2.y};

            }


        }
        document.body.addEventListener('touchend',function(){
            console.log('抬起');
            _self.armatureDisplay.pointermove = null;

        })

    }


    private _moveTo(_x,_y): void {

            this.bulletSlot.offset.x += _x; // Random scale.
            this.bulletSlot.offset.y += _y; // Random scale.


       // this.bulletSlot.offset.y +=_y;
        this.bulletSlot.invalidUpdate();
    }

}