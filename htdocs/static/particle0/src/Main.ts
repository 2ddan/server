
class Main extends egret.DisplayObject {

    constructor() {
        super();

        this.once(egret.Event.ADDED_TO_STAGE, async () => {

            this.createCanvas();
            this.createView();
            this.createCameraCtl();
            this.createParticle();
        }, this);


    }

    private _egret3DCanvas: egret3d.Egret3DCanvas;
    private context3d
    private createCanvas() {
        this.context3d = new egret3d.Egret3DCanvas(this.stage);
        egret.setRendererContext(this.context3d);
    }

    private _view: egret3d.View3D;
    private createView() {
        this._view = new egret3d.View3D(0, 0, this.context3d.width, this.context3d.height);
        this._view.backColor = 0xff000000;
        this._view.camera3D.lookAt(new egret3d.Vector3D(0, 100, -100), new egret3d.Vector3D(0, 0, 0));
        this.context3d.addView3D(this._view);

    }

    private _cameraCtl: egret3d.HoverController;
    private createCameraCtl() {

        this._cameraCtl = new egret3d.HoverController(this._view.camera3D);
        this._cameraCtl.tiltAngle = 60;
        this._cameraCtl.distance = 1000;
        this.context3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    }
    public update(evt: egret3d.Event3D) {
        this._cameraCtl.update();
    }
    private OnWindowResize(evt: egret3d.Event3D): void {
        this._view.height = this.context3d.height;
        this._view.width = this.context3d.width;
    }

    private particle: egret3d.ParticleEmitter;
    private plane: egret3d.Mesh;
    private uvSpriteSheetMethod: egret3d.UVSpriteSheetMethod;
    private mat: egret3d.TextureMaterial;
    private createParticle() {

        let mat = new egret3d.TextureMaterial();
        this.mat = mat;
        this.mat.repeat = true;
        this.plane = new egret3d.Mesh(new egret3d.CubeGeometry(200, 200, 200), this.mat);
        this._view.addChild3D(this.plane);
        var uvSpriteSheetMethod = new egret3d.UVSpriteSheetMethod(34, 6, 6, 3.0);
        this.mat.diffusePass.addMethod(uvSpriteSheetMethod);
        uvSpriteSheetMethod.start(true);
        this.uvSpriteSheetMethod = uvSpriteSheetMethod;
        var loadtex = new egret3d.URLLoader("resource/222222.png");
        loadtex.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
        egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.onKeyDown, this);
    }
    private onKeyDown = function (e) {
        switch (e.keyCode) {
            case egret3d.KeyCode.Key_1:
                this.plane.material.diffusePass.removeMethod(this.plane.material.diffusePass.getMethod(egret3d.UVSpriteSheetMethod));
                break;
            case egret3d.KeyCode.Key_2:
                this.mat.diffusePass.addMethod(this.uvSpriteSheetMethod);
                break;
        }
    };

    private onLoadTexture(e) {
        this.mat.diffuseTexture = e.loader.data;
        this.mat.diffuseTexture.smooth = false;
    }


}
